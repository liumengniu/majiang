import HttpHelper from "./utils/HttpHelper";
import mapManager from './configs/mapManager';


const {regClass, property} = Laya;
const Event = Laya.Event;

@regClass()
export class Script extends Laya.Script {
	declare owner : Laya.Sprite;
	
	@property({type: Laya.TextInput})
	public accountTextInput: Laya.TextInput;
	
	@property({type: Laya.TextInput})
	public passwordTextInput: Laya.TextInput;
	
	@property({type: Laya.Image})
	public btn: Laya.Image;
	
	//组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	onAwake(): void {
		this.btn.on(Event.CLICK,this, this.handleLogin);
		this.preloadRes()
	}
	
	/**
	 * 预加载比较大的资源，比如音效、音乐
	 */
	preloadRes(): void{
		let resArr: Array<string> = [
			`resources/sound/background.mp3`,
			`resources/sound/牌点击音效.mp3`,
			`resources/sound/出牌音效.mp3`
		];
		Laya.loader.load(resArr).then((res: Array<Laya.Sound>) => {
		
		})
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
	}
	
	/**
	 * 登录请求的回调
	 * @private
	 */
	public loginCallback(data: any): any{
		if(data.errCode === 0){
			const dataManager = new mapManager();
			const playerInfo = data?.result?.playerInfo;
			dataManager.setData('gameServerInfo', data?.result?.gameServerInfo);
			dataManager.setData('userInfo',data?.result?.userInfo);
			dataManager.setData('playerInfo',playerInfo);
			if(playerInfo && playerInfo?.playerStatus >= 2) { // 判断玩家是否在房间中，如果在游戏中，则直接回到牌桌
				Laya.Scene.open("Hall.ls", false, "oldPlayer");
			} else { // 玩家不在游戏中，进入游戏大厅
				Laya.Scene.open("Hall.ls");
			}
		}
	}
	
	//每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
	onUpdate(): void {}
}
