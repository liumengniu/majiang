import SocketHelper from "./utils/SocketHelper";
import HttpHelper from "./utils/HttpHelper";
import mapManager from "./configs/mapManager";
import MainRT from "./MainRT";

const Event = Laya.Event

const {regClass, property} = Laya;
const dataManager = new mapManager();

@regClass()
export default class HallScript extends Laya.Script {
	declare owner : Laya.Sprite;
	//ws实例
	public _socket: SocketHelper;
	/** 创建房间按钮 **/
	@property({type: Laya.Image})
	public createRoomBtn: Laya.Image;
	/** 加入房间唤起弹框按钮 **/
	@property({type: Laya.Image})
	public joinRoomBtn: Laya.Image;
	
	@property({type: Laya.TextInput})
	public roomTextInput: Laya.TextInput;
	
	/** 加入房间弹框 **/
	@property({type: Laya.Dialog})
	public joinRoomDialog: Laya.Dialog;
	/** 加入房间按钮 **/
	@property({type: Laya.Image})
	public joinBtn: Laya.Image;
	/** 加入房间弹框的关闭按钮 **/
	@property({type: Laya.Button})
	public joinRoomDialogClose: Laya.Button;
	
	/** 断线，重连进房弹框 **/
	@property({type: Laya.Dialog})
	public reconnectDialog: Laya.Dialog;
	/** 断线，确定重新进房按钮 **/
	@property({type: Laya.Image})
	public enterRoomBtn: Laya.Image;
	/** 断线，重连进房弹框关闭按钮 **/
	@property({type: Laya.Button})
	public reconnectDialogClose: Laya.Button;

	/** 点击创建房间按钮时间戳 */
	private clickCreateRoomBtnTimestamp: number = 0; // 时间戳（毫秒）
	/** 点击加入房间按钮时间戳 */
	private clickJoinRoomBtnTimestamp: number = 0; // 时间戳（毫秒）
	
	//组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	onEnable(): void {
		// 1、登陆之后就可以通过websocket与服务端进行连接
		this._socket = SocketHelper.getInstance("");
		this._socket.connect(()=>{
			const userInfo = dataManager.getData('userInfo');
			// 通知服务端进行长连接的用户，也可以在connect的时候将 唯一标识带在请求url后面（这样会暴露）
			this._socket.sendMessage(JSON.stringify({type: "setUserId", data: userInfo.id}))
		});
		// 2、UI挂载事件
		this.createRoomBtn.on(Event.CLICK, this, this.handleCreateRoom)
		this.joinRoomBtn.on(Event.CLICK, this, this.handleJoinRoomDialog)
		this.joinBtn.on(Event.CLICK, this, this.handleJoinRoom)
		this.joinRoomDialogClose.on(Event.CLICK, this, this.handleJoinRoomDialogClose)
		
		this.enterRoomBtn.on(Event.CLICK, this, this.enterRoom)
		this.reconnectDialogClose.on(Event.CLICK, this, this.handleReconnectDialogClose)
	}
	
	/**
	 * 创建房间
	 * @private
	 */
	private handleCreateRoom(): void {
		// 连续快速多次点击创建房间按钮是无效的，会造成创建多个无用的房间，需要避免这种错误！
		const timestamp2 = Date.now();
		const diff = timestamp2 - this.clickCreateRoomBtnTimestamp;
		if (diff <= 2000) { // 两次时间戳相隔小于等于 2 秒
			return;
		}
		this.clickCreateRoomBtnTimestamp = timestamp2;
		const userInfo = dataManager.getData('userInfo');
		let http = new HttpHelper();
		http.post("/room/createRoom", {userId: userInfo?.id}, this.onCreateRoomCallback)
	}
	
	/**
	 * 创建房间回调
	 * @param data
	 * @private
	 */
	private onCreateRoomCallback(data: any) {
		if(!data || JSON.stringify(data) === "{}"){
			return
		}
		dataManager.setData("roomInfo", data?.result)
	}
	
	/**
	 * 唤起加入房间弹框
	 */
	handleJoinRoomDialog(): void{
		if (!this.joinRoomDialog.visible) {
			this.joinRoomDialog.visible = true
		}
		// this.joinRoomDialog.popup(true, false)
	}

	handleJoinRoomDialogClose(): void{
		/*
		 * 由于Laya默认行为：Dialog内的某个按钮命名为close 或者 cancel sure no yes ok，点击此按钮则会关闭Dialog；所以最好将按钮改名来避免默认行为
		 * Dialog.close() 会带来怪异行为，最好使用visible属性
		 */
		this.joinRoomDialog.visible = false
	}
	
	/**
	 * 关闭加入房间弹框
	 */
	handleReconnectDialogClose(): void{
		const userInfo = dataManager.getData('userInfo');
		let http = new HttpHelper();
		http.post("/room/quitRoom", {userId: userInfo?.id, roomId: userInfo?.roomId}, this.onQuitRoomCallback)
	}
	
	/**
	 * 退出房间回调方法
	 * @param data
	 * @private
	 */
	onQuitRoomCallback(data:any): void{
		console.log(data)
	}
	
	
	/**
	 * 加入房间
	 * @private
	 */
	private handleJoinRoom(): void {
		if (!this.roomTextInput?.text) { //未输入房间号
			console.log("未输入房间号！！！！", this.roomTextInput?.text)
			return
		}
		// 连续快速多次点击加入房间按钮是无效的，需要避免这种错误！
		const timestamp2 = Date.now();
		const diff = timestamp2 - this.clickJoinRoomBtnTimestamp;
		if (diff <= 2000) { // 两次时间戳相隔小于等于 2 秒
			return;
		}
		this.clickJoinRoomBtnTimestamp = timestamp2;
		const userInfo = dataManager.getData('userInfo');
		let http = new HttpHelper();
		http.post("/room/joinRoom", {userId: userInfo?.id, roomId: this.roomTextInput?.text}, this.onJoinRoomCallback)
	}
	
	/**
	 * 加入房间
	 * @private
	 */
	private onJoinRoomCallback(data: any): void{
		if(data?.errCode === 0){
			dataManager.setData("roomInfo", data?.result);
			MainRT.getInstance().enterGameScene();
		}
	}
	
	/**
	 * 断线之后，重连且重新进房
	 * @private
	 */
	private enterRoom(): void{
		Laya.Scene.open("Game.ls", true, "oldPlayer");
	}
}
