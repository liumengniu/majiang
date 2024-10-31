import mapManager from "./configs/mapManager";
import SocketHelper from "./utils/SocketHelper";
import Sprite = Laya.Sprite;
import Handler = Laya.Handler;
import HttpHelper from "./utils/HttpHelper";
import VBox = Laya.VBox;
const Stage = Laya.Stage;
const Event = Laya.Event;
const Image = Laya.Image;
const HBox = Laya.HBox;
import Tween = Laya.Tween;


const {regClass, property} = Laya;
const dataManager = new mapManager();

@regClass()
export default class Main extends Laya.Script {
	/** 游戏开始状态**/
	private _started: boolean = false
	/**游戏区域**/
	@property({type: Sprite})
	public gameLayout: Sprite;
	// 房间号label
	@property({type: Laya.Label})
	public roomNum: Laya.Label;
	
	/**桌面操作**/
	@property({type: Laya.Image})
	public startBtn: Laya.Image;
	@property({type: Laya.Sprite})
	public optionsSpe: Laya.Button;
	@property({type: Laya.Image})
	public passBtn: Laya.Image;
	@property({type: Laya.Image})
	public bumpBtn: Laya.Image;
	@property({type: Laya.Image})
	public gangBtn: Laya.Image;
	@property({type: Laya.Image})
	public winningBtn: Laya.Image;
	
	/**桌面状态UI相关**/
	@property({type: Laya.Image})
	public time0: Laya.Image;
	@property({type: Laya.Image})
	public time1: Laya.Image;
	@property({type: Laya.Image})
	public time2: Laya.Image;
	@property({type: Laya.Image})
	public time3: Laya.Image;
	// 指示灯资源数组
	public timesArr: Array<number> = [0,1,2,3]
	@property({type: Laya.Image})
	public countdown0: Laya.Image;
	@property({type: Laya.Image})
	public countdown1: Laya.Image;
	// 每次打牌后最多20秒倒计时
	private countdownNum: number = 20;
	// 剩余多少张牌label
	@property({type: Laya.Label})
	public remainingLabel: Laya.Label;
	
	/** 打出的牌容器 **/
	@property({type: Sprite})
	public playedCards0: Sprite;
	@property({type: Sprite})
	public playedCards1: Sprite;
	@property({type: Sprite})
	public playedCards2: Sprite;
	@property({type: Sprite})
	public playedCards3: Sprite;
	@property({type: Laya.Image})
	public activePlayedImg: Laya.Image;
	
	/** 结算相关 **/
	@property({type: Laya.Dialog})
	public settlementDialog: Laya.Dialog;
	@property({type: Laya.Image})
	public status: Laya.Image;
	@property({type: Laya.Sprite})
	public playerCards0: Laya.Sprite;
	@property({type: Laya.Sprite})
	public playerCards1: Laya.Sprite;
	@property({type: Laya.Sprite})
	public playerCards2: Laya.Sprite;
	@property({type: Laya.Sprite})
	public playerCards3: Laya.Sprite;
	@property({type: Laya.Image})
	public backHall: Laya.Image;
	@property({type: Sprite})
	public backHallOverlay: Sprite;
	
	// declare owner : Laya.Sprite;
	//ws实例
	public _socket: SocketHelper;
	private avatarBg: string = "resources/apes/avatar/avatarBg.png";
	private avatarCommon: string = "resources/apes/avatar/avatarCommon.png";
	private bankerImg: string = "resources/apes/avatar/banker.png";
	private avatarImg: string = "resources/apes/avatar/avatar.png";
	private avatarImg2: string = "resources/apes/avatar/avatar2.png";
	private avatarImg3: string = "resources/apes/avatar/avatar3.png";
	private avatarImg4: string = "resources/apes/avatar/avatar4.png";
	private rightInHand: string = "resources/apes/cardBack/right_inhand_0.png";
	private oppositeInHand: string = "resources/apes/cardBack/opposite_inhand_0.png";
	private leftInHand: string = "resources/apes/cardBack/left_inhand_0.png";
	private playerNum: number = 0;
	private viewPos: Array<number> = [];
	
	private cardIdx: number;
	private tableCards: number[] = [];
	
	private activeCard: Laya.Image;    //用户当前操作的牌
	private activeCardNum: number;
	private clickActiveCardTimestamp: number = 0; // 时间戳（毫秒）
	
	private myCardImgs: Array<Laya.Image> =[];
	private allUiCards: Array<Laya.Image> =[];   // 存储所有牌的UI节点，方便特殊操作
	
	// 一局允许的玩家数量
	private allowPlayerCount:number = 2;
	
	// layaAir 引擎会在场景或网页失焦和最小化时，timer会置为0帧，timer.frameloop 会停止
	// 兼容方案： 1、用JS的setInterval  2、使用 onUpdate 生命周期
	// 一般来说也无需兼容，laya默认推荐开发者场景失焦就降为0帧，这个视情况而定
	private timeInterval:number = 1000;
	/** 开始时间 **/
	private startTime: number = 0;

	private backgroundSoundNode: Laya.SoundNode;
	
	onStart() {}
	
	/**
	 * 场景启动
	 */
	onAwake(): void {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const tableIds = gameInfo?.tableIds;
		this._socket = SocketHelper.getInstance("");
		if(roomInfo && userInfo?.id === tableIds[0]){ //我是房主，可以开始游戏
			this.startBtn.visible = true;
		}
		this.roomNum.visible = true;
		this.roomNum.text = "房号:" + roomInfo[userInfo?.id]?.roomId;
		this.startBtn.on(Event.CLICK, this, this.startGame)
		this.passBtn.on(Event.CLICK, this, this.pass)
		this.bumpBtn.on(Event.CLICK, this, this.peng)
		this.gangBtn.on(Event.CLICK, this, this.gang)
		this.winningBtn.on(Event.CLICK, this, this.win)
		// 返回大厅
		this.backHall.on(Event.CLICK, this, this.backToHall)
		
		// 测试按钮
		// const testBtn = this.owner.getChildByName("testBtn")
		// testBtn.on(Event.CLICK, this, this.winning, [null])
	}
	
	/**
	 * 绘制头像
	 * @param viewPos
	 * @param idx
	 * @private
	 */
	private renderAvatar(viewPos: number[], idx: number): void {
		let avatarBg: Laya.Image = new Image(this.avatarBg);
		let avatarCommon: Laya.Image = new Image(this.avatarCommon);
		let avatar: Laya.Image = new Image(this.avatarImg);
		let bankerImg: Laya.Image = new Image(this.bankerImg);
		bankerImg.name = "banker"
		avatarCommon.zOrder = 1;
		avatarCommon.name = "player_avatar_node_" + idx.toString();
		bankerImg.zOrder = 2;
		avatarBg.width = 108;
		avatarBg.height = 108;
		avatar.width = 100;
		avatar.height = 100;
		avatarCommon.width = 100;
		avatarCommon.height = 100;
		let x: number, y: number = 0;
		if (viewPos[idx] === 0) { // 玩家本人位置
			x = 40;
			y = Laya.stage.designHeight - avatar.height - 30
			avatar.skin = this.avatarImg2
		} else if(viewPos[idx] === 1) {
			x = Laya.stage.designWidth - avatar.width - 30;
			y = 90;
			avatar.skin = this.avatarImg3
		} else if(viewPos[idx] === 2){
			x = 240;
			y = 30;
			avatar.skin = this.avatarImg4
		} else if(viewPos[idx] === 3){
			x = 30;
			y = 70;
		}
		avatarBg.pos(x -1, y-1);
		avatar.pos(x, y);
		avatarCommon.pos(x, y)
		bankerImg.pos(x + 100 - 25, y + 100 - 25);
		// this.owner.addChild(avatarBg);
		// this.owner.addChild(avatar);
		this.owner.addChild(avatarCommon)
		if(idx === 0){ // 庄家
			this.owner.addChild(bankerImg)
		}
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
		const gameInfo = dataManager.getData("gameInfo");
		const tableIds = gameInfo?.tableIds;
		if (!roomInfo || JSON.stringify(roomInfo) === "{}") return
		this.playerNum = tableIds?.length;
		const meIdx: number = tableIds.findIndex((o: string) => o == userInfo?.id);
		
		const viewPos: Array<number> = this.viewPos = this.getPlayerViewPos(meIdx, tableIds)
		
		// 移除已经渲染的全部玩家的头像
		for (let i = 0; i < 4; i++) {
			const node = this.owner.getChildByName("player_avatar_node_" + i.toString());
			node?.removeSelf()
		}
		const banker = this.owner.getChildByName("banker")
		banker?.removeSelf()
		
		tableIds.map((o: string, idx: number)=>{
			this.renderAvatar(viewPos, idx)
		})
	}
	
	/**
	 * 有玩家进入房间
	 */
	joinRoom(roomInfo: any): void{
		if(!roomInfo){
			roomInfo = dataManager.getData("roomInfo");
		}
		this.renderAllPlayer(roomInfo);
	}

	/**
	 * 有玩家退出房间，如果此时游戏已经开始那么结束该游戏并解散房间
	 */
	quitRoom(roomInfo: any, quitPlayerId: string, roomPlaying: boolean): void{
		if (roomPlaying) {
			this.backgroundSoundNode.destroy();
			// 返回大厅场景
			Laya.Scene.open("Hall.ls", true);
			return
		}
		if(!roomInfo){
			roomInfo = dataManager.getData("roomInfo");
		}
		this.renderAllPlayer(roomInfo);
	}

	/**
	 * 开始游戏
	 * @private
	 */
	startGame(): void {
		const roomInfo = dataManager.getData("roomInfo");
		const userInfo = dataManager.getData("userInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const tableIds = gameInfo?.tableIds;
		const player = roomInfo[userInfo?.id];
		// todo 玩家数量检测，开发时可以注销
		if (tableIds.length < this.allowPlayerCount){
			return;
		}
		if (!player?.isHomeOwner) { // 仅有房主能开始游戏
			return;
		}
		this.playerNum = tableIds?.length;
		const meIdx: number = tableIds.findIndex((o: string) => o == userInfo?.id);
		const viewPos: Array<number> = this.viewPos = this.getPlayerViewPos(meIdx, tableIds)
		const roomId = roomInfo[userInfo?.id]?.roomId;
		this._socket.sendMessage(JSON.stringify({type: "startGame", roomId}))
		this.startBtn.visible = false;
	}
	
	/**
	 * 断线重连，获取全部数据
	 */
	getDataByPlayerId(): void{
		const userInfo = dataManager.getData("userInfo");
		this._socket.sendMessage(JSON.stringify({type: "reconnect", data: {userId: userInfo?.id}}))
	}

	/**
	 * 绘制重连后的背景声音，全部玩家等资源
	 */
	renderOtherResourceAfterReconnect(): void {
		// 绘制全部玩家头像
		const roomInfo = dataManager.getData("roomInfo");
		this.renderAllPlayer(roomInfo);
		const gameInfo = dataManager.getData("gameInfo");
		const playerInfo = dataManager.getData("playerInfo");
		/**
		 * roomInfo[playerId].status 玩家的房间状态  0 未准备  1 准备  2 游戏中  3 已解散
		 * playerInfo.playerStatus   玩家的状态  0 未登录   1 已登录   2 房间中  3 游戏中
		 */
		if (playerInfo?.playerStatus === 3) {
			this.startBtn.visible = false;
			this._started = true;
			this.playAudio("背景音乐");
			this.renderTimeStatus();
		}
		const remainingNum = gameInfo?.remainingNum;
		this.remainingLabel.text = remainingNum?.toString();
	}
	
	/**
	 * 初始化玩家视角位置
	 */
	initViewPos(): void {
		const userInfo = dataManager.getData("userInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const tableIds = gameInfo?.tableIds;
		this.playerNum = tableIds?.length;
		const meIdx: number = tableIds.findIndex((o: string) => o == userInfo?.id);
		const viewPos: Array<number> = this.viewPos = this.getPlayerViewPos(meIdx, tableIds)
	}
	
	/**
	 * 获取手牌的图片资源
	 */
	getHandCardImageUrl(num: number): string{
		let unit = num % 50 > 30 ? "b" : num % 50 > 20 ? 't' : num % 50 > 10 ? "w" : '';
		let unitNum = (num % 50)%10;
		return `resources/apes/myCard/${unit}${unitNum}.png`
	}
	
	/**
	 * 获取打出去的牌的图片资源
	 * @param num
	 * @param viewPosNum
	 */
	getPlayedCardsImageUrl(num: number, viewPosNum: number): string{
		const unit = num % 50 > 30 ? "b" : num % 50 > 20 ? 't' : num % 50 > 10 ? "w" : '';
		const unitNum = (num % 50)%10;
		const posFolder = viewPosNum === 0 ? 'first' : viewPosNum === 1 ? 'second' : viewPosNum === 2 ? 'third' : viewPosNum === 3 ? 'fourth' : "";
		return `resources/apes/${posFolder}/b${unit}${unitNum}.png`
	}
	
	
	/**
	 * 绘制手牌
	 */
	renderHandCards(idx: number, handCards: number[] = [], pengCards: number[] = [], gangCards: number[] = []): void{
		this.myCardImgs = [];
		// 按客户端玩家视角绘制手牌
		if (this.viewPos[idx] === 0) { // 玩家本人位置
			let hbox:any = this.owner.getChildByName(`frontInHand`);
			if (hbox) {
				hbox.destroyChildren();
			} else {
				hbox = new HBox();
				hbox.name = "frontInHand";
			}
			let firstX = (Laya.stage.designWidth - handCards.length * 65) / 2 + (pengCards.length/3 + gangCards.length/4) * 46,
				firstY = Laya.stage.designHeight - 99 - 30;
			const operateCards = pengCards.concat(gangCards);
			operateCards?.map((p: number, childIdx: number)=>{
				let imgUrl = this.getPlayedCardsImageUrl(p, this.viewPos[idx])
				let img = new Image(imgUrl);
				img.pos(146 + childIdx * 42, firstY + 20);
				img.name = `pengCard`;
				this.owner.addChild(img);
			})
			handCards?.map((h: number, childIdx: number) => {
				let imgUrl = this.getHandCardImageUrl(h);
				let img = new Image(imgUrl);
				img.name = `myCard`;
				this.myCardImgs.push(img);
				hbox.name = "frontInHand";
				img.on(Event.CLICK, this, this.handleCardClick, [firstY, `frontInHand`, childIdx, h])
				hbox.size(handCards.length * 65, 99);
				hbox.pos(firstX, firstY);
				hbox.addChild(img);
				return img;
			})
			this.owner.addChild(hbox);
		} else if (this.viewPos[idx] === 1) {
			let vbox: any = this.owner.getChildByName(`rightInHand`);
			const firstX = Laya.stage.designWidth - 30 - 30 - 26, firstY = 200;
			if(vbox){
				vbox.destroyChildren();
			} else {
				vbox = new VBox();
				vbox.name = `rightInHand`;
				vbox.pos(firstX, firstY);
				vbox.space = -36;
			}
			const operateCards = pengCards.concat(gangCards);
			operateCards?.map((p: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(p, this.viewPos[idx])
				let img = new Image(imgUrl);
				img.pos(firstX - 59 - 30, firstY + 36 * childIdx);
				img.name = `pengCard`;
				this.owner.addChild(img);
			})
			handCards?.map((h: number, childIdx: number) => {
				let img = new Image(this.rightInHand);
				img.name = `rightInHand${childIdx}`;
				img.pos(0, 20 * childIdx);
				vbox.addChild(img)
			})
			this.owner.addChild(vbox)
		} else if (this.viewPos[idx] === 2) {
			const firstX = 370, firstY = 30;
			const operateCards = pengCards.concat(gangCards);
			let hbox:any = this.owner.getChildByName(`oppositeInHand`);
			if (hbox) {
				hbox?.destroyChildren()
			} else {
				hbox = new HBox();
				hbox.name = `oppositeInHand`;
				hbox.pos(firstX, firstY);
			}
			operateCards?.map((p: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(p, this.viewPos[idx])
				let img = new Image(imgUrl);
				img.pos(Laya.stage.designWidth - 200 - childIdx * 40, firstY);
				img.name = `pengCard`;
				this.owner.addChild(img);
			})
			handCards?.map((h: number, childIdx: number) => {
				let img = new Image(this.oppositeInHand);
				img.pos(childIdx * 44, 0);
				img.name = `handCard-${idx}-${childIdx}`;
				hbox.size(handCards?.length * 44, 72);
				hbox.addChild(img)
			})
			this.owner.addChild(hbox)
		} else if (this.viewPos[idx] === 3) {
			let vbox: any = this.owner.getChildByName(`leftInHand`);
			const firstX = 30 + 20, firstY = 200;
			if(vbox){
				vbox.destroyChildren();
			} else {
				vbox = new VBox();
				vbox.name = `leftInHand`;
				vbox.pos(firstX, firstY);
				vbox.space = -36;
			}
			const operateCards = pengCards.concat(gangCards);
			operateCards?.map((p: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(p, this.viewPos[idx])
				let img = new Image(imgUrl);
				img.pos(firstX + 40, firstY + 32 * childIdx);
				img.name = `pengCard`;
				this.owner.addChild(img);
			})
			handCards?.map((h: number, childIdx: number) => {
				let img = new Image(this.leftInHand);
				vbox.addChild(img);
			})
			this.owner.addChild(vbox)
		}
	}
	
	/**
	 * 选中牌
	 * @param y
	 * @param name
	 * @param childIdx
	 * @param cardNum
	 * @private
	 */
	private handleCardClick(y: number, name: string, childIdx: number, cardNum: number): void {
		let permission = this.checkCanOperate()
		if(!permission) return
		const hbox = this.owner.getChildByName(name);
		const cardNode: any = hbox.getChildAt(childIdx);
		if (cardNode.y === 0) {
			cardNode.y = cardNode.y - 50;
			// @ts-ignore
			hbox?._children.map((node: Laya.Image, idx: number)=>{
				if(childIdx !== idx) node.y = 0
			})
			this.playAudio("牌点击");
		} else {
			// 连续快速多次点击要出的牌是无效的，会造成该牌被多次出，需要避免这种错误！
			const timestamp2 = Date.now();
			const diff = timestamp2 - this.clickActiveCardTimestamp;
			if (diff >= 1000) { // 两次时间戳相隔大于等于 1 秒
				this.clickActiveCardTimestamp = timestamp2;
				this.activeCard = cardNode;
				this.handleCardPlay(cardNum);
			}
		}
	}
	
	/**
	 * 出牌
	 */
	public handleCardPlay(cardNum: number): void{
		const roomInfo = dataManager.getData("roomInfo");
		const userInfo = dataManager.getData("userInfo");
		const roomId = roomInfo[userInfo?.id]?.roomId;
		this._socket.sendMessage(JSON.stringify({type: "playCard", data: {roomId, cardNum, userId: userInfo?.id}}))
		this.activeCardNum = cardNum;
		if(this.bumpBtn.visible) this.bumpBtn.visible = false;
		if(this.gangBtn.visible) this.gangBtn.visible = false;
		if(this.winningBtn.visible) this.winningBtn.visible = false;
		this.playAudio("出牌");
	}
	
	/**
	 * 20秒倒计时之后，玩家仍未出牌，则系统AI直接辅助出牌
	 */
	public handleCardPlayByAI(): void {
		if (this.winningBtn.visible) { //直接胡牌
			this.win()
			this.winningBtn.visible = false
			this.passBtn.visible = false
			return;
		}
		if (this.gangBtn.visible) { //直接杠
			this.gang()
			this.gangBtn.visible = false
			this.passBtn.visible = false
			return;
		}
		if (this.bumpBtn.visible) { //直接碰
			this.peng()
			this.bumpBtn.visible = false
			this.passBtn.visible = false
			return;
		}
		let permission = this.checkCanOperate()
		if(!permission) return
		// todo 先随机出一张牌，后期增加AI托管功能
		const roomInfo = dataManager.getData("roomInfo");
		const userInfo = dataManager.getData("userInfo");
		const roomId = roomInfo[userInfo?.id]?.roomId;
		const handCards = roomInfo[userInfo?.id]?.handCards;
		const len = handCards?.length;
		const randomIdx = Math.floor(Math.random() * len);
		const cardNum = handCards[randomIdx];
		this._socket.sendMessage(JSON.stringify({type: "playCard", data: {roomId, cardNum, userId: userInfo?.id}}))
		this.activeCardNum = cardNum;
		if(this.passBtn.visible)this.passBtn.visible=false
		if(this.bumpBtn.visible)this.bumpBtn.visible=false
		if(this.gangBtn.visible)this.gangBtn.visible=false
	}
	
	/**
	 * 绘制打出去的牌
	 */
	public renderPlayedCards(cardNum: number, playerId: string, roomInfo: any, gameInfo: any): void {
		if (typeof cardNum === "number") this.activeCardNum = cardNum;
		const tableIds = gameInfo?.tableIds;
		const playerCards = roomInfo[playerId]?.playedCards;
		const idx = tableIds?.findIndex((o: string)=> o === playerId);
		if (this.viewPos[idx] === 0) {
			const hCount: number = 12;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			this.playedCards0.removeChildren();
			playerCards?.map((k: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard-${idx}-${childIdx}`;
				// 牌桌空间足够放置打出36张牌（3排12列，一副麻将牌108张，每人最多摸36张）
				// PS:如果是其他地方麻将，为兼容极端情况（比如含有东南西北风之类），36张牌后依然没人胡牌，超过36张牌，可以叠放在之前的牌上（不过这种情况就算是其他地方麻将也极少概率出现）
				rowNum = (Math.floor(childIdx/hCount)) % 3;
				colNum = childIdx % hCount;
				img.pos(colNum * 44, rowNum * 46)
				this.playedCards0.addChild(img)
				if(k === cardNum){ // 出的牌指示图标
					this.activePlayedImg.visible = true;
					this.activePlayedImg.pos(this.playedCards0.x + colNum * 44 + 15, this.playedCards0.y + rowNum * 52 - 35);
					this.createTween(this.playedCards0.y + rowNum * 52 - 35);
				}
			})
		} else if (this.viewPos[idx] === 1) {
			const vCount: number = 9;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			this.playedCards1.removeChildren();
			playerCards?.map((k: number, childIdx: number) => {
				let oldImg = this.owner.getChildByName(`playedCard-${idx}-${childIdx}`);
				if(oldImg) oldImg.removeSelf()
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard-${idx}-${childIdx}`;
				rowNum = childIdx % vCount;
				colNum = (Math.floor(childIdx/vCount)) % 4;
				img.pos(colNum * 54, rowNum * 36)
				this.playedCards1.addChild(img)
				if(k === cardNum){ // 出的牌指示图标
					this.activePlayedImg.visible = true;
					this.activePlayedImg.pos(this.playedCards1.x + colNum * 54 + 22, this.playedCards1.y + rowNum * 36 - 30);
					this.createTween(this.playedCards1.y + rowNum * 36 - 30);
				}
			})
		} else if (this.viewPos[idx] === 2) {
			const hCount: number = 12;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			this.playedCards2.removeChildren();
			playerCards?.map((k: number, childIdx: number) => {
				let oldImg = this.owner.getChildByName(`playedCard-${idx}-${childIdx}`);
				if(oldImg) oldImg.removeSelf()
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard-${idx}-${childIdx}`;
				rowNum = (Math.floor(childIdx/hCount)) % 3;
				colNum = childIdx % hCount;
				img.zOrder = 2 - rowNum;
				img.pos(colNum * 40, (2-rowNum) * 44);
				this.playedCards2.addChild(img)
				if(k === cardNum){ // 出的牌指示图标
					this.activePlayedImg.visible = true;
					this.activePlayedImg.pos(this.playedCards2.x + colNum * 40 + 12, this.playedCards2.y + (2-rowNum) * 54 - 30);
					this.createTween(this.playedCards2.y + (2-rowNum) * 54 - 30);
				}
			})
		} else if (this.viewPos[idx] === 3) {
			const vCount: number = 9;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			this.playedCards3.removeChildren();
			playerCards?.map((k: number, childIdx: number) => {
				let oldImg = this.owner.getChildByName(`playedCard-${idx}-${childIdx}`);
				if(oldImg) oldImg.removeSelf()
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard-${idx}-${childIdx}`;
				rowNum = childIdx % vCount;
				colNum = (Math.floor(childIdx/vCount)) % 4;
				img.pos((3-colNum) * 54, rowNum * 32)
				this.playedCards3.addChild(img)
				if(k === cardNum){ // 出的牌指示图标
					this.activePlayedImg.visible = true;
					this.activePlayedImg.pos(this.playedCards3.x + (3-colNum) * 54 + 20, this.playedCards3.y + rowNum * 32 - 35);
					this.createTween(this.playedCards3.y + rowNum * 32 - 35);
				}
			})
		}
	}
	
	/**
	 * 创建指示logo漂浮动画
	 * @private
	 */
	private createTween(y: number): void {
		Laya.timer.frameLoop(1, this, this.createTweenFn, [y]);
	}
	
	/**
	 * 创建指示logo漂浮动画函数
	 * @param y
	 * @private
	 */
	private createTweenFn(y: number): void{
		Tween.to(this.activePlayedImg, {"y": y - 10}, 400, Laya.Ease.sineInOut, Laya.Handler.create(this, () => {
			Tween.to(this.activePlayedImg, {"y": y + 10}, 400, Laya.Ease.sineInOut)
		}));
	}
	
	/**
	 * todo 绘制桌上未开的牌
	 */
	renderTableCards(): void{}
	
	/**
	 * 暂停游戏
	 */
	private pauseGame(): void{
		Laya.timer.pause()
	}
	/**
	 * 停止游戏
	 */
	public stopGame(): void {
		// 1.状态置为结束
		this._started = false;
		// 2.销毁所有定时器
		Laya.timer.clearAll(this);
	}
	
	/**
	 * 渲染牌桌状态（出牌人指向等）
	 */
	public renderTimeStatus(): void {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const tableIds = gameInfo?.tableIds;
		this.playerNum = tableIds?.length;
		const move: number = tableIds.findIndex((o: string) => o == userInfo?.id);
		const optionPos = gameInfo?.optionPos;
		let optionIdx: number = 0;
		optionIdx = optionPos - move >= 0 ? optionPos - move : optionPos - move + this.viewPos.length;
		this.timesArr.map(tmp=>{
			if(optionIdx === tmp){
				// @ts-ignore
				this[`time${tmp}`].visible = true
			} else {
				// @ts-ignore
				this[`time${tmp}`].visible = false
			}
		})
		// 开始倒计时
		// this.renderCountdownInterval()
		this.startTime = Date.now();
	}
	
	/**
	 * 渲染牌桌中间的倒计时
	 * 每次出牌自定义20秒杠碰胡考虑时间
	 */
	public renderCountdown(): void {
		const gameInfo = dataManager.getData("gameInfo");
		const optionTime = gameInfo?.optionTime;
		const currentTime = Date.now(); // 当前时间
		// 计算已经过去的时间（毫秒）
		const elapsedMillis = currentTime - optionTime;
		// 剩余时间（秒）
		let remainingTime = this.countdownNum - Math.floor(elapsedMillis / 1000);
		if (remainingTime < 0) {
			remainingTime = 0; // 防止剩余时间变成负数
		}
		// 计算倒计时的十位和个位
		let firstDigit = Math.floor(remainingTime / 10);
		let secondDigit = remainingTime % 10;
		const imgUrl1 = `resources/apes/number/${firstDigit}.png`
		const imgUrl2 = `resources/apes/number/${secondDigit}.png`
		this.countdown0.skin = imgUrl1;
		this.countdown1.skin = imgUrl2;
		this.countdown0.visible = true;
		this.countdown1.visible = true;
		if (remainingTime <= 0) {
			this.handleCardPlayByAI();
			Laya.timer.clear(this, this.renderCountdown)
			this.countdown0.visible = false;
			this.countdown1.visible = false;
		}
	}
	
	/**
	 * 倒计时定时器方法
	 */
	public renderCountdownInterval(): void{
		Laya.timer.clear(this, this.renderCountdown);
		Laya.timer.frameLoop(60, this, this.renderCountdown);
	}
	
	/**
	 * 已经准备好，开始游戏
	 */
	public readyGameStart(): void {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const remainingNum = gameInfo?.remainingNum;
		const tableIds = gameInfo?.tableIds;
		this.playerNum = tableIds?.length;
		const meIdx: number = tableIds.findIndex((o: string) => o == userInfo?.id);
		this.viewPos = this.getPlayerViewPos(meIdx, tableIds)
		this.renderTimeStatus()
		tableIds.map((o: string, idx: number) => {
			this.renderHandCards(idx, roomInfo[o]?.handCards)
		})
		// 绘制全部玩家头像
		this.renderAllPlayer(roomInfo);
		this._started = true;
		this.playAudio("背景音乐");
		this.remainingLabel.text = remainingNum?.toString();
	}
	
	
	/**
	 * 服务器下发一张牌（摸一张新牌）
	 * @param cardNum
	 * @param playerId
	 */
	deliverCard(cardNum: number, playerId: string): void{
		const userInfo = dataManager.getData("userInfo");
		const gameInfo = dataManager.getData("gameInfo");
		if(userInfo?.id === playerId){  //服务器下发新牌的玩家，需要更新检测，其他人不需要
			this.activeCardNum = cardNum;
		}
		const remainingNum = gameInfo?.remainingNum;
		this.remainingLabel.text = remainingNum?.toString()
	}
	
	/**
	 * 检测我当前状态是否轮到我操作
	 */
	public checkCanOperate(): boolean {
		const userInfo = dataManager.getData("userInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const optionPos = gameInfo?.optionPos;
		const tableIds = gameInfo?.tableIds;
		if (tableIds[optionPos] === userInfo?.id) {
			return true
		} else {
			return false
		}
	}
	
	/**
	 * 检测道可以执行操作（碰杠胡）
	 */
	public checkOperate(operateType: string, playerId: string): void{
		const userInfo = dataManager.getData("userInfo");
		if (userInfo?.id !== playerId) return
		if (operateType === "peng") {
			this.bumpBtn.visible = true;
			this.passBtn.visible = true;
		} else if (operateType === "gang") {
			this.gangBtn.visible = true;
			this.passBtn.visible = true;
		} else if (operateType === "win") {
			this.winningBtn.visible = true;
		} else {
		
		}
	}
	
	/**
	 * 过
	 * 【不执行任何操作，隐藏 杠/碰 】
	 */
	private pass(): void{
		this.passBtn.visible = false;
		this.bumpBtn.visible = false;
		this.gangBtn.visible = false;
	}
	/**
	 * 碰
	 * 【打出2张牌】
	 */
	private peng(): void{
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const handCards = roomInfo[userInfo?.id]?.handCards;
		const roomId = roomInfo[userInfo?.id]?.roomId;
		let pengArr: number[] = []
		handCards.map((m: number)=>{
			if(m%50 === this.activeCardNum%50){
				pengArr.push(m)
			}
		})
		this._socket.sendMessage(JSON.stringify({type: "peng", data: {roomId, pengArr, userId: userInfo?.id, cardNum: this.activeCardNum}}))
		this.bumpBtn.visible = false;
		this.passBtn.visible = false;
		this.playAudio("碰")
	}
	
	/**
	 * 杠
	 * 【打出3张牌】
	 */
	private gang(): void{
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const handCards = roomInfo[userInfo?.id]?.handCards;
		const roomId = roomInfo[userInfo?.id]?.roomId;
		let gangArr: number[] = []
		handCards.map((m: number)=>{
			if(m%50 === this.activeCardNum%50){
				gangArr.push(m)
			}
		})
		this._socket.sendMessage(JSON.stringify({type: "gang", data: {roomId, gangArr, userId: userInfo?.id, cardNum: this.activeCardNum}}))
		this.gangBtn.visible = false
		this.passBtn.visible = false;
		this.playAudio("杠")
	}
	
	/**
	 * 点击选择胡牌
	 * 【告诉服务端，玩家选择胡牌操作】
	 */
	private win(): void {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const roomId = roomInfo[userInfo?.id].roomId;
		this._socket.sendMessage(JSON.stringify({type: "win", data: {roomId, cardNum: this.activeCardNum, userId: userInfo?.id}}))
		this.playAudio("胡")
	}
	
	/**
	 * 胡牌之后的结算
	 * 服务端统一计算
	 */
	public winning(result: any, type: string): void {
		if (!result) return
		if(type === "winning"){
			this.playAnimation();  // 播放胡牌动画
		}
		this.activePlayedImg.visible = false;
		this.settlementDialog.visible = true;
		this.settlementDialog.zOrder = 1000;
		const userInfo = dataManager.getData("userInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const tableIds = gameInfo?.tableIds;
		if (result[userInfo?.id].isFlow) {
			this.status.skin = `resources/apes/settlement/draw.png`
		} else if (result[userInfo?.id].isWinner) {
			this.status.skin = `resources/apes/settlement/win.png`
		} else {
			this.status.skin = `resources/apes/settlement/lost.png`
		}
		tableIds.map((o: string, idx: number) => {
			const info = result[o];
			const cards = info?.cards || [];
			cards.map((c: any, cardIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(c, 0);
				const img = new Image(imgUrl);
				img.scale(0.8,0.8);
				// @ts-ignore
				const hBox = this[`playerCards${idx}`].getChildByName("HBox")
				hBox.addChild(img)
			})
			// @ts-ignore
			const txt = this[`playerCards${idx}`].getChildByName("score")
			txt.text = info?.score >= 0 ? '+' + info?.score : info?.score?.toString();
		})
		this.winningBtn.visible = false
		this.passBtn.visible = false
		this.backHall.visible = true
		this.backHallOverlay.visible = true;
	}
	
	/**
	 * 返回大厅
	 */
	backToHall(): void{
		this.backgroundSoundNode.destroy();
		// 打开场景
		Laya.Scene.open("Hall.ls");
		// 调用服务端
		const userInfo = dataManager.getData('userInfo');
		let http = new HttpHelper();
		http.post("/room/quitRoom", {userId: userInfo?.id, roomId: userInfo?.roomId}, ()=>{})
	}
	
	/**
	 * 播放动画
	 */
	playAnimation(): void{
		let ani: Laya.Animation = new Laya.Animation();
		ani.pos(590, 230);
		ani.source = "resources/animations/win.atlas";
		ani.play(0, false);
		this.owner.addChild(ani); //添加节点
		ani.on(Event.COMPLETE, this, () => {
			ani.destroy();
		})
	}
	
	/**
	 * 播放音频
	 */
	playAudio(type: string): void {
		let sound = new Laya.SoundNode();
		// 添加到舞台
		sound.source = this.getAudioRes(type);
		sound.loop = 0;
		sound.autoPlay = true;
		sound.isMusic = type === "背景音乐";
		sound.play(type === "背景音乐" ? 0 : 1, Handler.create(this, this.playAudioCb, [sound]))
		if (type === "背景音乐") this.backgroundSoundNode = sound;
		this.owner.addChild(sound);
	}
	
	/**
	 * 获取音效资源
	 */
	getAudioRes(type: string): string {
		let audioUrl: string;
		if (type === "背景音乐") {
			audioUrl = `resources/sound/背景音乐.mp3`;
		} else if (type === "牌点击") {
			audioUrl = `resources/sound/牌点击音效.mp3`;
		} else if (type === "出牌") {
			audioUrl = `resources/sound/出牌音效.mp3`;
		} else if (type === "碰") {
			audioUrl = `resources/sound/碰音效.mp3`;
		} else if (type === "杠") {
			audioUrl = `resources/sound/杠音效.mp3`;
		} else if (type === "胡") {
			audioUrl = `resources/sound/胡音效.mp3`;
		}
		return audioUrl
	}
	/**
	 * 播放音频handle回调
	 * @param sound
	 */
	playAudioCb(sound: Laya.SoundNode): void {
		sound.destroy();
	}
	
	
	//每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
	onUpdate(): void {
		let now = Date.now();
		if (now - this.startTime > this.timeInterval && this._started) {
			this.startTime = now;
			this.renderCountdown()
		}
	}
}
