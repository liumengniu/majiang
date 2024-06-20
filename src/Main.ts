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
		// this.renderAvatar()
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
	 * @param room
	 * @private
	 */
	private renderAvatar(viewPos: number[], idx: number): void {
		const userInfo = dataManager.getData("userInfo");
		let avatar: Laya.Image = new Image(this.avatarImg);
		avatar.width = 100;
		avatar.height = 100;
		let x: number, y: number = 0;
		if (viewPos[idx] === 0) { // 玩家本人位置
			x = 200;
			y = Laya.stage.designHeight - avatar.height - 30
		} else if(viewPos[idx] === 1) {
			x = Laya.stage.designWidth - avatar.width - 30;
			y = Laya.stage.designHeight/2 - avatar.height/2;
		} else if(viewPos[idx] === 2){
			x = Laya.stage.designWidth/2 - avatar.width/2;;
			y = 30;
		} else if(viewPos[idx] === 3){
			x = 30;
			y = Laya.stage.designHeight/2 - avatar.height/2;
		}
		avatar.pos(x, y);
		this.owner.addChild(avatar);
	}
	
	
	/**
	 * 玩家视角的座位算法
	 * 原理如下
	 * 玩家A、B、C、D 座位如下
	   A-0 B-1 -2 D-3
			
			首先获取所有玩家的服务器位置：Index = 0，1，2，3
			加入现在是B的视角
			则：移位 = B.index 1 - 0 = 1 ，说明移动一个位置
			新座位的序号：
			B = B.index - 移位 = 1-1 = 0
			C = C.index - 移位 = 2-1 = 1
			D = D.index - 移位 = 3-1 = 2
			A = A.index - 移位 = 0 - 1 = -1，如果是负数，则+总人数4：-1+4=3
			
			同理：C的视角
			移位= C.index 2-0 = 2
			C = C.index - 移位 = 2-2 = 0
			D = D.index - 移位 = 3-2 = 1
			A = A.index - 移位 = 0 - 2 = -2，如果是负数，则+总人数4：-2+4=2
			B = B.index - 移位 = 1 - 2 = -1，如果是负数，则+总人数4：-1+4=3
			
			同理：D的视角
			移位= D.index 3-0 = 3
			D = D.index - 移位 = 3 - 3 = 0
			A = A.index - 移位 = 0 - 3 = -3，如果是负数，则+总人数4：-3+4=1
			B = B.index - 移位 = 1 - 3 = -2，如果是负数，则+总人数4：-2+4=2
			C = C.index - 移位 = 2 - 3 = -1，如果是负数，则+总人数4：-1+4=3
	 */
	private getPlayerViewPos(move: number, keys: Array<string>): Array<number> {
		return keys.map((k, idx)=>{
			return this.getViewPos(idx,move,keys.length);
		})
	}
	
	/**
	 * 获取单个客户端位置（参照视角玩家）
	 * @param pos 视角玩家的服务端位置
	 * @param move 视角玩家调整到靠显示器一侧的移位
	 * @param len 玩家数量
	 */
	getViewPos(pos: number, move: number, len: number): number {
		return pos - move >= 0 ? pos - move : pos - move + len;
	}
	
	/**
	 * 绘制全部玩家头像
	 * @private
	 */
	private renderAllPlayer(roomInfo: any): void {
		const userInfo = dataManager.getData("userInfo");
		if (!roomInfo || JSON.stringify(roomInfo) === "{}") return
		const keys = Object.keys(roomInfo);
		this.playerNum = keys?.length;
		const meIdx: number = keys.findIndex(o => o == userInfo?.id);
		
		const viewPos: Array<number> = this.getPlayerViewPos(meIdx, keys)
		console.log(viewPos, '================================')
		
		keys.map((o, idx)=>{
			this.renderAvatar(viewPos, idx)
		})
		
		// keys.map((o, idx) => {
		// 	if (idx === meIdx) {
		// 		this.renderMeAvatar();
		// 	} else {
		// 		this.renderOtherAvatar(roomInfo[o], meIdx, idx)
		// 	}
		// })
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
		// console.log(roomInfo, '=================roomInfo==================')
		if (Object.keys(roomInfo).length > this.playerNum) { //玩家数量更新
			this.renderAllPlayer(roomInfo);
		}
	}
}
