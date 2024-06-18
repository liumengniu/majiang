import HttpHelper from "./utils/HttpHelper";

const {regClass, property} = Laya;
const Event = Laya.Event;

@regClass()
export class Script extends Laya.Script {
	declare owner : Laya.Sprite;
	
	@property({type: Laya.TextInput})
	public accountTextInput: Laya.TextInput;
	
	@property({type: Laya.TextInput})
	public passwordTextInput: Laya.TextInput;
	
	@property({type: Laya.Button})
	public btn: Laya.Button;
	
	//组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	onAwake(): void {
		this.btn.on(Event.CLICK,this, this.handleLogin)
	}
	
	/**
	 * 登录
	 * @private
	 */
	private handleLogin(): void{
		const account = this.accountTextInput?.text;
		const password = this.passwordTextInput?.text;
		let http = new HttpHelper();
		http.post("/user/login", {account, password}, this.loginCallback)
		console.log(this.accountTextInput, '--------------')
	}
	
	/**
	 * 登录请求的回调
	 * @private
	 */
	public loginCallback(data: any): any{
		console.log(data, '=====================data')
		if(data.errCode === 0){
			Laya.Scene.open("Hall.ls");
		}
	}
	
	//组件被启用后执行，例如节点被添加到舞台后
	//onEnable(): void {}
	
	//组件被禁用时执行，例如从节点从舞台移除后
	//onDisable(): void {}
	
	//第一次执行update之前执行，只会执行一次
	//onStart(): void {}
	
	//手动调用节点销毁时执行
	//onDestroy(): void {}
	
	//每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
	onUpdate(): void {}
	
	//每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
	//onLateUpdate(): void {}
	
	//鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
	//onMouseClick(): void {}
}
