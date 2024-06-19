import mapManager from "./configs/mapManager";

const Stage = Laya.Stage;
const Event = Laya.Event;
const Image = Laya.Image;

const {regClass, property} = Laya;
const dataManager = new mapManager();

@regClass()
export default class Main extends Laya.Script {
	declare owner: Laya.Sprite;
	private avatarImg: string = "resources/apes/single可爱姑娘.png";
	private playerNum: number = 0;
	
	onStart() {
		console.log("Game start");
		this.renderAvatar()
	}
	
	/**
	 * 场景启动
	 */
	onAwake(): void {
		// this.handleAdaptive()
	}
	
	/**
	 * 屏幕自适应
	 * @private
	 */
	private handleAdaptive(): void {
		Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
		Laya.stage.designWidth = Laya.stage.width;
		Laya.stage.designHeight = Laya.stage.height;
		Laya.stage.on(Event.RESIZE, this, () => {
			Laya.stage.designWidth = Laya.stage.width;
			Laya.stage.designHeight = Laya.stage.height;
		})
	}
	
	/**
	 * 绘制头像
	 */
	
	private renderAvatar(): void {
		let avatar: Laya.Image = new Image(this.avatarImg);
		avatar.width = 100
		avatar.height = 100
		avatar.pos(Laya.stage.designWidth / 2 - avatar.width / 2, Laya.stage.designHeight - avatar.height - 30)
		this.owner.addChild(avatar);
	}
	
	/**
	 * 渲染全部玩家
	 * @private
	 */
	private renderAllPlayer(roomInfo: any): void {
		this.playerNum = Object.keys(roomInfo).length
	}
	
	
	/**
	 * 绘制手牌
	 */
	
	
	/**
	 * 绘制桌面上的牌
	 */
	
	//每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
	onUpdate(): void {
		const roomInfo = dataManager.getData("roomInfo");
		console.log(roomInfo, '=================roomInfo==================')
		if (Object.keys(roomInfo).length > this.playerNum) { //玩家数量更新
			this.renderAllPlayer(roomInfo);
		}
	}
}
