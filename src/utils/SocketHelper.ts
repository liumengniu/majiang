/**
 * 封装websocket类
 * @author Kevin
 * @Date: 2024-6-18
 */
class SocketHelper {
	
	private socket: Laya.Socket;
	private output: Laya.Byte;
	
	private connect(): void {
		
		//创建Socket对象
		this.socket = new Laya.Socket();
		
		//对服务器建立连接
		this.socket.connectByUrl("ws://echo.websocket.org:80");
		
		//表示需要发送至服务端的缓冲区中的数据
		this.output = this.socket.output;
		
		//添加监听事件
		this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
		this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
		this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReceived);
		this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
	}
	
	//连接建立成功回调
	private onSocketOpen(e: any = null): void {
		console.log("Connected");
		
		// 发送字符串
		this.socket.send("demonstrate <sendString>");
		
		// 使用output.writeByte发送
		var message: string = "demonstrate <output.writeByte>";
		for (var i: number = 0; i < message.length; ++i) {
			// 直接写缓冲区中的数据
			this.output?.writeByte(message.charCodeAt(i));
		}
		
		// 发送缓冲区中的数据到服务器
		this.socket.flush();
	}
	
	// 连接断开后的事件回调
	private onSocketClose(e: any = null): void {
		console.log("Socket closed");
	}
	
	// 有数据接收时的事件回调
	private onMessageReceived(message: any = null): void {
		console.log("Message from server:");
		if (typeof (message) == 'string') {
			console.log(message);
		} else if (message instanceof ArrayBuffer) {
			console.log(new Laya.Byte(message).readUTFBytes());
		}
		// 清理缓存的服务端发来的数据
		this.socket.input.clear();
	}
	
	// 出现异常后的事件回调
	private onConnectError(e: Event = null): void {
		console.log("error");
	}
}
