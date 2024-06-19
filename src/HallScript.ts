import SocketHelper from "./utils/SocketHelper";
import HttpHelper from "./utils/HttpHelper";

const Event = Laya.Event

const {regClass, property} = Laya;

@regClass()
export class HallScript extends Laya.Script {
	//declare owner : Laya.Sprite3D;
	declare owner: Laya.Sprite;
	//ws实例
	private _socket: SocketHelper;
	
	@property({type: Laya.Button})
	public createRoomBtn: Laya.Button;
	
	@property({type: Laya.Button})
	public joinRoomBtn: Laya.Button;
	
	@property({type: Laya.TextInput})
	public roomTextInput: Laya.TextInput;
	
	//组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	onAwake(): void {
		// 1、登陆之后就可以通过websocket与服务端进行连接
		// this._socket = SocketHelper.getInstance(this.onSocketOpen);
		// this._socket.connect("")
		
		this.createRoomBtn.on(Event.CLICK, this, this.handleCreateRoom)
		this.joinRoomBtn.on(Event.CLICK, this, this.handleJoinRoom)
	}
	
	/***
	 * websocket连接成功后的回调
	 * @private
	 */
	onSocketOpen(): void {
		// UI组件挂载回调事件
		this.createRoomBtn.on(Event.CLICK, this, this.handleCreateRoom)
		this.joinRoomBtn.on(Event.CLICK, this, this.handleJoinRoom)
	}
	
	/**
	 * 创建房间
	 * @private
	 */
	private handleCreateRoom(): void {
		console.log("在大厅创建一个房间")
		let http = new HttpHelper();
		http.post("/room/createRoom", {userId: "xxxx"}, this.onCreateRoomCallback)
	}
	
	/**
	 * 创建房间回调
	 * @param data
	 * @private
	 */
	private onCreateRoomCallback(data: any) {
		console.log(data, '2222222222222222222222222222222222222222222')
	}
	
	/**
	 * 加入房间
	 * @private
	 */
	private handleJoinRoom(): void {
		if (this.roomTextInput?.text) { //未输入房间号
			return
		}
	}
}
