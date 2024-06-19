import SocketHelper from "./utils/SocketHelper";
import HttpHelper from "./utils/HttpHelper";
import mapManager from "./configs/mapManager";
import MainRT from "./MainRT";

const Event = Laya.Event

const {regClass, property} = Laya;
const dataManager = new mapManager();

@regClass()
export class HallScript extends Laya.Script {
	declare owner : Laya.Sprite;
	//ws实例
	public _socket: SocketHelper;
	
	@property({type: Laya.Button})
	public createRoomBtn: Laya.Button;
	
	@property({type: Laya.Button})
	public joinRoomBtn: Laya.Button;
	
	@property({type: Laya.TextInput})
	public roomTextInput: Laya.TextInput;
	
	//组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	onEnable(): void {
		// 1、登陆之后就可以通过websocket与服务端进行连接
		this._socket = SocketHelper.getInstance("");
		this._socket.connect(()=>{
			const userInfo = dataManager.getData('userInfo');
			// 通知服务端进行长连接的用户，也可以在connect的时候将 唯一标识带在请求url后面（这样会暴露）
			console.log('-----------------111------------------', userInfo)
			this._socket.sendMessage(JSON.stringify({type: "setUserId", data: userInfo.id}))
		});
		// 2、UI挂载事件
		this.createRoomBtn.on(Event.CLICK, this, this.handleCreateRoom)
		this.joinRoomBtn.on(Event.CLICK, this, this.handleJoinRoom)
	}
	
	/***
	 * websocket连接成功后的回调
	 * @private
	 */
	public onSocketOpen(): void {
		// const userInfo = dataManager.getData('userInfo');
		// // 通知服务端进行长连接的用户，也可以在connect的时候将 唯一标识带在请求url后面（这样会暴露）
		// console.log(this._socket,'-----------------111------------------', this)
		// HallScript._socket.sendMessage(JSON.stringify({type: "setUserId", data: userInfo.id}))
	}
	
	/**
	 * 创建房间
	 * @private
	 */
	private handleCreateRoom(): void {
		console.log("在大厅创建一个房间")
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
		// const keys = Object.keys(data);
		// dataManager.setData("roomInfo", data[keys[0]])
		dataManager.setData("roomInfo", data?.result)
		console.log(data, '2222222222222222222222222222222222222222222')
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
			console.log(data, '--------------------------')
			dataManager.setData("roomInfo", data?.result);
			MainRT.getInstance().enterGameScene()
		}
	}
}
