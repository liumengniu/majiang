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
		//创建Socket对象
		this.websocket = new Laya.Socket();
		//对服务器建立连接
		this.websocket.connectByUrl(this.url);
		//表示需要发送至服务端的缓冲区中的数据
		this.output = this.websocket.output;
		this.onSocketOpenCallback = onSocketOpenCallback;
		// console.log("开始链接------------connect", SocketHelper._instance)
		//添加监听事件
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
	}
	
	/**
	 * 有数据接收时的事件回调
	 * @param message
	 * @private
	 */
	private onMessageReceived(message: any = null): void {
		// console.log("从服务端接收websocket消息:", message);
		if (typeof (message) == 'string') {
			HandleReceivedMessage.onMessageReceived(message);
		} else if (message instanceof ArrayBuffer) {
			console.log(new Laya.Byte(message).readUTFBytes());
		}
		// 清理缓存的服务端发来的数据
		this.websocket.input.clear();
	}
	
	/**
	 * 出现异常后的事件回调
	 * @param e
	 * @private
	 */
	private onConnectError(e: Event = null): void {
		console.log("error");
	}
}

export default SocketHelper
