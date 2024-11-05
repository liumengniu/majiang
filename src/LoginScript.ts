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
		this.preloadRes(); // UI主线程加载网络资源文件会 block UI渲染，影响UX，可以使用 html5 web worker多线程
	}
	
	/**
	 * 预加载比较大的资源，比如音效、音乐
	 */
	preloadRes(): void{
		let resArr: Array<string> = [
			/**
			 * 一小部分图片资源预先加载放置在了 index.html head，这里就不需要再次预加载了，可能某些老旧浏览器不支持 html head preload
			 * index.html head预加载较多资源会导致 index页面render过于延后，严重影响UX
			 */
			// `resources/apes/ui/startImg.jpg`,
			// `resources/apes/login/loginBtn.png`,
			`resources/apes/ui/hallBg.jpg`,
			`resources/apes/dialog/dialogBg.png`,
			`resources/apes/operate/createRoom.png`,
			`resources/apes/operate/joinRoom.png`,
			`resources/apes/ui/table.jpg`,
			`atlas/comp.png`, // 这是构建时生成的由多个小资源图片组合成的大图片，用于减少资源请求次数，提高性能
			`resources/sound/背景音乐.mp3`,
			`resources/sound/牌点击音效.mp3`,
			`resources/sound/出牌音效.mp3`
		];
		if (window.Worker) { // 检测浏览器是否支持 HTML5 web worker
			// let response = await fetch("/json") wait for HTTP header
			// let json = await response.json() wait for HTTP body
			let script = `
			// 应该替换成你自己的网站域名
			const url_prefix = "https://xxx.yyy/";
			const resourceUrls = [
			"Hall.ls", "Game.ls",
			"resources/apes/ui/hallBg.jpg",
			"resources/apes/dialog/dialogBg.png",
			"resources/apes/operate/createRoom.png",
			"resources/apes/operate/joinRoom.png",
			"atlas/comp.atlas",
			"resources/apes/dialog/confirm.png",
			"resources/apes/ui/table.jpg",
			"atlas/comp.png",
			"resources/apes/ui/room_时间提示框.png",
			"resources/apes/ui/剩余      张.png",
			"resources/apes/ui/剩余      局.png",
			"resources/apes/ui/room_time_0.png",
			"resources/apes/ui/room_time_1.png",
			"resources/apes/ui/room_time_2.png",
			"resources/apes/ui/room_time_3.png",
			"resources/apes/operate/backHall.png",
			"resources/apes/ui/remainingBg.png",
			"resources/apes/ui/activeCard.png",
			"resources/apes/settlement/win.png",
			"resources/apes/operate/option_guo.png",
			"resources/apes/operate/option_peng.png",
			"resources/apes/operate/option_gang.png",
			"resources/apes/operate/option_hu.png",
			"resources/apes/ui/roomIgBg.png",
			"resources/apes/avatar/avatarBg.png",
			"resources/apes/avatar/avatarCommon.png",
			"resources/apes/avatar/avatar.png",
			"resources/apes/avatar/banker.png",
			"resources/apes/avatar/avatar2.png",
			"resources/sound/背景音乐.mp3",
			"resources/sound/牌点击音效.mp3",
			"resources/sound/出牌音效.mp3",
			"resources/sound/发牌音效.mp3",
			"resources/sound/杠音效.mp3",
			"resources/sound/碰音效.mp3",
			"resources/sound/胡音效.mp3",
			"resources/animations/win.png",
			"resources/animations/win.atlas"
			];
			for (let i = 0; i < resourceUrls.length; i++) {
			    fetch(url_prefix + resourceUrls[i]).then(response => {
					if (response.status === 200) {
						// 将资源存储在缓存中
						//caches.open('my-cache').then(cache => {
				    	//cache.put(url_prefix + resourceUrls[i], response);
						//});
					}
					return response.blob()
				}).then((blob) => {
					console.log("already got http body")
				})
				.catch(error => {
					console.log("web worker error:", error)
				});
			}
			`
			let workerBlob = new Blob([script], { type: "text/javascript" });
			let url = URL.createObjectURL(workerBlob);
			let worker = new Worker(url);
		} else {
			Laya.loader.load(resArr).then((res: Array<Laya.Sound>) => {
			})
		}
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
				dataManager.setData("roomInfo", data?.result?.roomInfo);
				dataManager.setData("gameInfo", data?.result?.gameInfo);
				Laya.Scene.open("Hall.ls", false, "oldPlayer");
			} else { // 玩家不在游戏中，进入游戏大厅
				Laya.Scene.open("Hall.ls");
			}
		}
	}
	
	//每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
	onUpdate(): void {}
}
