/**
 * 封装http请求类
 * @author Kevin
 * @Date: 2024-6-18
 */

// import {someConfig} from "../configs";
//
// console.log(someConfig, '-----------------')

class HttpHelper{
	constructor() {
	
	}
	
	private cb:Function;
	// private httpUrl: string = `${config?.host}:${config?.port}`
	private httpUrl: string = `http://192.168.1.8:4000`;
	
	public get(data:any, cb: any): void{

		let http: Laya.HttpRequest = new Laya.HttpRequest();
		//设置超时时间
		http.http.timeout = 10000;
		//发送了一个简单的请求
		http.send(this.httpUrl, "", "get", "text");//需要在resources文件夹下新建一个data.txt文件
		//设置完成事件，添加回调方法
		http.once(Laya.Event.COMPLETE, this, this.completeHandler);
		//设置错误事件，添加回调方法
		http.once(Laya.Event.ERROR, this, this.errorHandler);
		//设置进度事件，添加回调方法
		http.on(Laya.Event.PROGRESS, this, this.processHandler);
	}
	
	public post(url: string,data:any, cb: Function): void{
		console.log(`${this.httpUrl}url`, '=========================')
		let http: Laya.HttpRequest = new Laya.HttpRequest();
		this.cb = cb;
		//设置超时时间
		http.http.timeout = 10000;
		//发送了一个简单的请求
		http.send(`${this.httpUrl}${url}`, data, "post", "json");//需要在resources文件夹下新建一个data.txt文件
		//设置完成事件，添加回调方法
		http.once(Laya.Event.COMPLETE, this, this.completeHandler);
		//设置错误事件，添加回调方法
		http.once(Laya.Event.ERROR, this, this.errorHandler);
		//设置进度事件，添加回调方法
		http.on(Laya.Event.PROGRESS, this, this.processHandler);
	}
	
	private processHandler(data:any): void {
		console.log("processHandler");
	}
	
	private errorHandler(error:any): void {
		console.log("errorHandler");
	}
	
	private completeHandler(data:any): void {
		console.log("completeHandler");
	}
}

export default HttpHelper
