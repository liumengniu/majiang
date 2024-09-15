/**
 * 封装websocket类
 * @author Kevin
 * @Date: 2024-6-18
 */
import appConfig from '../configs';
import HandleReceivedMessage from './HandleReceivedMessage';

class SocketHelper {
	private websocket: Laya.Socket | null = null;
	private onSocketOpenCallback: Function;
	private static _instance: SocketHelper;
	private output: Laya.Byte;
	private wsUrl: string = `${appConfig?.ws}`
	private url: string;
	private heartbeatMsg: string = 'ping'; // 心跳消息，可以根据需要修改
	private heartbeatInterval: number | null = null; // 心跳定时器ID
	private heartbeatTimeoutInterval: number | null = null; // 心跳超时定时器ID
	private heartbeatTimeout: number = 40000; // 心跳超时时间，单位毫秒
	private reconnectInterval: number = 5000; // 重连间隔，单位毫秒
	private maxReconnectAttempts: number = 10; // 最大重连次数
	private reconnectAttempts: number = 0; // 当前重连次数
	
	private constructor(url: string) {
		//创建Socket对象
		// this.websocket = new Laya.Socket();
		this.url = `${this.wsUrl}${url}`;
	}
	
	/**
	 * websocket单例
	 */
	public static getInstance(url: string): SocketHelper {
		if (!this._instance) {
			this._instance = new SocketHelper(url);
		}
		return this._instance;
	}
	
	/**
	 * 客户端主动连接
	 * @param onSocketOpenCallback
	 */
	public connect(onSocketOpenCallback: Function): void {
		this.onSocketOpenCallback = onSocketOpenCallback;
		this.createWebSocket();
		// //创建Socket对象
		// this.websocket = new Laya.Socket();
		// //对服务器建立连接
		// this.websocket.connectByUrl(this.url);
		// //表示需要发送至服务端的缓冲区中的数据
		// this.output = this.websocket.output;
		// this.onSocketOpenCallback = onSocketOpenCallback;
		// // console.log("开始链接------------connect", SocketHelper._instance)
		// //添加监听事件
		// this.websocket.on(Laya.Event.OPEN, this, this.onSocketOpen);
		// this.websocket.on(Laya.Event.CLOSE, this, this.onSocketClose);
		// this.websocket.on(Laya.Event.MESSAGE, this, this.onMessageReceived);
		// this.websocket.on(Laya.Event.ERROR, this, this.onConnectError);
	}
	
	/**
	 * 创建websocket连接
	 * @private
	 */
	private createWebSocket(): void {
		this.websocket = new Laya.Socket();
		this.websocket.connectByUrl(this.url);
		this.output = this.websocket.output;
		this.websocket.on(Laya.Event.OPEN, this, this.onSocketOpen);
		this.websocket.on(Laya.Event.CLOSE, this, this.onSocketClose);
		this.websocket.on(Laya.Event.MESSAGE, this, this.onMessageReceived);
		this.websocket.on(Laya.Event.ERROR, this, this.onConnectError);
	}
	
	/**
	 * 连接建立成功回调
	 * @param e
	 * @private
	 */
	public onSocketOpen(e: any = null): void {
		console.log("ws连接服务端成功");
		this.onSocketOpenCallback();
		this.startHeartbeat();
		this.reconnectAttempts = 0;
	}
	
	/**
	 * 客户端发送心跳消息
	 */
	private sendHeartbeat(): void {
		this.sendMessage(this.heartbeatMsg);
		this.resetHeartbeatTimeout();
	}
	
	/**
	 * 启动心跳定时器
	 */
	private startHeartbeat(): void {
		this.heartbeatInterval = setInterval(() => {
			this.sendHeartbeat();
		}, 30000); // 每30秒发送一次心跳
		// todo 放弃客户端心跳超时处理，仅在服务端做心跳超时主动断开链接操作，但是保留重连机制
		// todo 不同端应用（App、小程序，web）的websocket表现形式不一致，chrome浏览器端失焦的时候，可能会降低 JavaScript 计时器的精度，导致心跳机制不准确
		// todo 心跳保活 + 服务端ping帧/pong帧 检测足够了
		// this.resetHeartbeatTimeout();
	}
	
	/**
	 * 重置心跳超时定时器
	 */
	private resetHeartbeatTimeout(): void {
		this.clearHeartbeatTimeout();
		this.heartbeatTimeoutInterval = setTimeout(() => {
			console.log('心跳超时，断开连接');
			this.websocket?.close();
		}, this.heartbeatTimeout);
	}
	
	/**
	 * 停止心跳定时器
	 */
	private stopHeartbeat(): void {
		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval);
			this.heartbeatInterval = null;
		}
		this.clearHeartbeatTimeout();
	}
	
	/**
	 * 清除心跳超时定时器
	 */
	private clearHeartbeatTimeout(): void {
		if (this.heartbeatTimeoutInterval) {
			clearTimeout(this.heartbeatTimeoutInterval);
			this.heartbeatTimeoutInterval = null;
		}
	}
	
	/**
	 * websocket重连
	 * @private
	 */
	private reconnect(): void {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			console.log(`Reconnecting attempt ${this.reconnectAttempts}...`);
			setTimeout(() => {
				this.createWebSocket();
			}, this.reconnectInterval);
		} else {
			console.log("Max reconnect attempts reached");
		}
	}
	
	/**
	 * 客户端发送消息
	 * @param msg
	 */
	sendMessage(msg: any): void {
		this.websocket.send(msg);
		this.websocket.flush();
	}
	
	/**
	 * 客户端发送byte数据
	 * @param byte
	 */
	public sendByte(byte: Laya.Byte): void {
		// 使用output.writeByte发送
		var message: string = "demonstrate <output.writeByte>";
		for (var i: number = 0; i < message.length; ++i) {
			// 直接写缓冲区中的数据
			this.output?.writeByte(message.charCodeAt(i));
		}
		
		// 发送缓冲区中的数据到服务器
		this.websocket.flush();
	}
	
	/**
	 * 连接断开后的事件回调
	 * PS:服务器主动断开链接
	 * @param e
	 * @private
	 */
	private onSocketClose(e: any = null): void {
		console.log("Socket closed");
		this.stopHeartbeat();
		this.reconnect();
	}
	
	/**
	 * 有数据接收时的事件回调
	 * @param message
	 * @private
	 */
	private onMessageReceived(message: any = null): void {
		console.log("从服务端接收websocket消息:", message);
		if(message === "pong"){
			this.resetHeartbeatTimeout();
		} else if (typeof (message) == 'string') {
			HandleReceivedMessage.onMessageReceived(message);
		} else if (message instanceof ArrayBuffer) {
			console.log(new Laya.Byte(message).readUTFBytes());
		}
		// 清理缓存的服务端发来的数据
		this.websocket.input.clear();
		// 收到消息时重置心跳超时定时器
		this.resetHeartbeatTimeout();
	}
	
	/**
	 * 出现异常后的事件回调
	 * @param e
	 * @private
	 */
	private onConnectError(e: Event = null): void {
		console.log("error");
		this.reconnect();
	}
}

export default SocketHelper
