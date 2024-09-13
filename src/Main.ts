import mapManager from "./configs/mapManager";
import SocketHelper from "./utils/SocketHelper";
import Sprite = Laya.Sprite;

const Stage = Laya.Stage;
const Event = Laya.Event;
const Image = Laya.Image;
const HBox = Laya.HBox;


const {regClass, property} = Laya;
const dataManager = new mapManager();

@regClass()
export default class Main extends Laya.Script {
	/**游戏区域**/
	@property({type: Sprite})
	public gameLayout: Sprite;
	
	@property({type: Laya.Button})
	public startBtn: Laya.Button;
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
	
	// declare owner : Laya.Sprite;
	//ws实例
	public _socket: SocketHelper;
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
	
	
	private myCardImgs: Array<Laya.Image> =[];
	private allUiCards: Array<Laya.Image> =[];   // 存储所有牌的UI节点，方便特殊操作
	
	// 一局允许的玩家数量
	private allowPlayerCount:number = 1;
	
	onStart() {}
	
	/**
	 * 场景启动
	 */
	onAwake(): void {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		this._socket = SocketHelper.getInstance("");
		Laya.stage.on(Event.FOCUS, this, () => {
			// this.optionsSpe.visible = false;
		})
		
		if(roomInfo && userInfo?.id === Object.keys(roomInfo)[0]){ //我是房主，可以开始游戏
			this.startBtn.visible = true;
		}
		this.startBtn.on(Event.CLICK, this, this.startGame)
		this.passBtn.on(Event.CLICK, this, this.pass)
		this.bumpBtn.on(Event.CLICK, this, this.peng)
		this.gangBtn.on(Event.CLICK, this, this.gang)
		this.winningBtn.on(Event.CLICK, this, this.win)
		
		// 测试按钮
		const testBtn = this.owner.getChildByName("testBtn")
		testBtn.on(Event.CLICK, this, this.winning, [null])
	}
	
	/**
	 * 绘制头像
	 * @param viewPos
	 * @param idx
	 * @private
	 */
	private renderAvatar(viewPos: number[], idx: number): void {
		const userInfo = dataManager.getData("userInfo");
		let avatar: Laya.Image = new Image(this.avatarImg);
		avatar.width = 100;
		avatar.height = 100;
		let x: number, y: number = 0;
		if (viewPos[idx] === 0) { // 玩家本人位置
			x = 100;
			y = Laya.stage.designHeight - avatar.height - 30
			avatar.skin = this.avatarImg2
		} else if(viewPos[idx] === 1) {
			x = Laya.stage.designWidth - avatar.width - 30;
			y = Laya.stage.designHeight/2 - avatar.height/2;
			avatar.skin = this.avatarImg3
		} else if(viewPos[idx] === 2){
			x = Laya.stage.designWidth - 340;
			y = 30;
			avatar.skin = this.avatarImg4
		} else if(viewPos[idx] === 3){
			x = 30;
			y = 70;
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
		
		const viewPos: Array<number> = this.viewPos = this.getPlayerViewPos(meIdx, keys)
		
		keys.map((o, idx)=>{
			this.renderAvatar(viewPos, idx)
		})
		
		// todo 此处自动判断4个人到房间开始，实际场景可能需要4人准备，房主点击开始，后期找到UI再优化
		// if(keys.length === 2){
		// 	this.startGame();
		// }
	}
	
	/**
	 * 开始游戏
	 * @private
	 */
	startGame(): void {
		const roomInfo = dataManager.getData("roomInfo");
		const userInfo = dataManager.getData("userInfo");
		const keys = Object.keys(roomInfo)
		const room = roomInfo[userInfo?.id];
		// todo 玩家数量检测，开发时可以注销
		if (keys.length < this.allowPlayerCount){
			return;
		}
		if (!room?.isHomeOwner) { // 仅有房主能开始游戏
			return
		}
		this.playerNum = keys?.length;
		const meIdx: number = keys.findIndex(o => o == userInfo?.id);
		const viewPos: Array<number> = this.viewPos = this.getPlayerViewPos(meIdx, keys)
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
	 * 初始化玩家视角位置
	 */
	initViewPos(): void{
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const keys = Object.keys(roomInfo);
		this.playerNum = keys?.length;
		const meIdx: number = keys.findIndex(o => o == userInfo?.id);
		const viewPos: Array<number> = this.viewPos = this.getPlayerViewPos(meIdx, keys)
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
		console.log(num, '===============', viewPosNum)
		const unit = num % 50 > 30 ? "b" : num % 50 > 20 ? 't' : num % 50 > 10 ? "w" : '';
		const unitNum = (num % 50)%10;
		const posFolder = viewPosNum === 0 ? 'first' : viewPosNum === 1 ? 'second' : viewPosNum === 2 ? 'third' : viewPosNum === 3 ? 'fourth' : "";
		return `resources/apes/${posFolder}/b${unit}${unitNum}.png`
	}
	
	
	/**
	 * 绘制手牌
	 */
	renderHandCards(idx: number, handCards: number[]): void{
		console.log(handCards, '==============开始绘制全部手牌======================', this)
		this.myCardImgs = [];
		let img: Laya.Image;
		// 按客户端玩家视角绘制手牌
		if (this.viewPos[idx] === 0) { // 玩家本人位置
			let hbox:any = this.owner.getChildByName(`hbox${idx}`);
			if (hbox) {
				hbox?.destroy(true);
				hbox = new HBox()
			} else {
				hbox = new HBox()
			}
			let firstX = 250, firstY = Laya.stage.designHeight - 99 - 30;
			let imgs: Laya.Image[] = handCards.map((h: number, childIdx: number) => {
				let imgUrl = this.getHandCardImageUrl(h);
				let img = new Image(imgUrl);
				hbox.name = `hbox${idx}`;
				img.name = `myCard`;
				this.myCardImgs.push(img);
				img.on(Event.CLICK, this, this.handleCardClick, [firstY, `hbox${idx}`, childIdx, h])
				hbox.pos((Laya.stage.designWidth - handCards.length * 65) / 2, firstY);
				hbox.addChild(img)
				return img;
			})
			this.owner.addChild(hbox);
		} else if (this.viewPos[idx] === 1) {
			let firstX = Laya.stage.designWidth - 100 - 30 - 26 - 30, firstY = 200;
			handCards.map((h: number, childIdx: number) => {
				img = new Image(this.rightInHand);
				img.pos(firstX, firstY + 22 * childIdx);
				this.owner.addChild(img);
			})
		} else if (this.viewPos[idx] === 2) {
			let firstX = 370, firstY = 30 + 30;
			handCards.map((h: number, childIdx: number) => {
				img = new Image(this.oppositeInHand);
				img.pos(firstX + childIdx * 44, firstY);
				this.owner.addChild(img);
			})
		} else if (this.viewPos[idx] === 3) {
			let firstX = 30 + 30, firstY = 200;
			handCards.map((h: number, childIdx: number) => {
				img = new Image(this.leftInHand);
				img.pos(firstX, firstY + 22 * childIdx);
				this.owner.addChild(img);
			})
		}
		console.log(this.owner, '==============绘制全部手牌完成======================')
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
		} else {
			this.activeCard = cardNode;
			this.handleCardPlay(cardNum)
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
		if(this.bumpBtn.visible) this.bumpBtn.visible = false
		if(this.gangBtn.visible) this.gangBtn.visible = false
		if(this.winningBtn.visible) this.winningBtn.visible = false
	}
	
	/**
	 * 20秒倒计时之后，玩家仍未出牌，则系统AI直接辅助出牌
	 */
	public handleCardPlayByAI(): void {
		let permission = this.checkCanOperate()
		if(!permission) return
		// todo 先随机出一张牌，后期增加AI托管功能
		const roomInfo = dataManager.getData("roomInfo");
		const userInfo = dataManager.getData("userInfo");
		const roomId = roomInfo[userInfo?.id].roomId;
		const handCards = roomInfo[userInfo?.id].handCards;
		const len = handCards.length;
		const randomIdx = Math.floor(Math.random() * len);
		const cardNum = handCards[randomIdx]
		this._socket.sendMessage(JSON.stringify({type: "playCard", data: {roomId, cardNum, userId: userInfo?.id}}))
		this.activeCardNum = cardNum;
		if(this.passBtn.visible)this.passBtn.visible=false
		if(this.bumpBtn.visible)this.bumpBtn.visible=false
		if(this.gangBtn.visible)this.gangBtn.visible=false
	}
	
	/**
	 * 绘制打出去的牌
	 */
	public renderPlayedCards(cardNum: number, playerId: string, roomInfo: any): void {
		console.log(cardNum, playerId, '==============开始绘制全部已出的牌======================')
		if (typeof cardNum === "number") this.activeCardNum = cardNum;
		const playerCards = roomInfo[playerId]?.playedCards;
		const keys = Object.keys(roomInfo);
		const idx = keys?.findIndex(o=> o === playerId);
		if (this.viewPos[idx] === 0) {
			const hCount: number = 12;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			playerCards?.map((k: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard${childIdx}`;
				// 牌桌空间足够放置打出36张牌（3排12列，一副麻将牌108张，每人最多摸36张）
				// PS:如果是其他地方麻将，为兼容极端情况（比如含有东南西北风之类），36张牌后依然没人胡牌，超过36张牌，可以叠放在之前的牌上（不过这种情况就算是其他地方麻将也极少概率出现）
				rowNum = (Math.floor(childIdx/hCount)) % 3;
				colNum = childIdx % hCount;
				img.pos(380 + colNum * 44, Laya.stage.designHeight - 300 + rowNum * 56)
				this.owner.addChild(img)
			})
		} else if (this.viewPos[idx] === 1) {
			const vCount: number = 9;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			playerCards?.map((k: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard${childIdx}`;
				rowNum = childIdx % vCount;
				colNum = (Math.floor(childIdx/vCount)) % 4;
				img.pos(Laya.stage.designWidth/2 + 242 + colNum * 59, Laya.stage.designHeight /2 - 180 + rowNum*36)
				this.owner.addChild(img)
			})
		} else if (this.viewPos[idx] === 2) {
			const hCount: number = 12;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			playerCards?.map((k: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard${childIdx}`;
				rowNum = (Math.floor(childIdx/hCount)) % 3;
				colNum = childIdx % hCount;
				img.pos(380 + colNum * 42,  260 - rowNum * 56)
				this.owner.addChild(img)
			})
		} else if (this.viewPos[idx] === 3) {
			const vCount: number = 9;
			let rowNum: number = 1; //行数
			let colNum: number = 1; //列数
			playerCards?.map((k: number, childIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(k, this.viewPos[idx]);
				let img = new Image(imgUrl);
				img.name = `playedCard${childIdx}`;
				rowNum = childIdx % vCount;
				colNum = (Math.floor(childIdx/vCount)) % 4;
				img.pos( 300 - colNum * 59, Laya.stage.designHeight /2 - 180 + rowNum * 36)
				this.owner.addChild(img)
			})
		}
		console.log(this.owner, '==============绘制全部已出的牌完成======================')
	}
	
	/**
	 * 绘制桌上未开的牌
	 */
	renderTableCards(): void{
	
	}
	
	/**
	 * 暂停游戏
	 */
	private pauseGame(): void{}
	
	
	/**
	 * 停止游戏
	 */
	public stopGame(): void {
		// 1.销毁所有定时器
		// Laya.timer.pause();
		
		// 2.推到展开全部的牌
		
		// 3.计算画面
		
		// 4.退出房间，回到大厅
	}
	
	/**
	 * 渲染牌桌状态（出牌人指向等）
	 */
	public renderTimeStatus(): void {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const keys = Object.keys(roomInfo);
		this.playerNum = keys?.length;
		const move: number = keys.findIndex(o => o == userInfo?.id);
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
		this.renderCountdownInterval()
	}
	
	/**
	 * 渲染牌桌中间的倒计时
	 * 每次出牌自定义20秒杠碰胡考虑时间
	 */
	public renderCountdown(): void {
		const gameInfo = dataManager.getData("gameInfo");
		const optionTime = gameInfo?.optionTime;
		const currentTime = Date.now(); // 当前时间
		const countdownStartTime = optionTime; // 计时开始时间
		// 计算已经过去的时间（毫秒）
		const elapsedMillis = currentTime - countdownStartTime;
		// 剩余时间（秒）
		let remainingTime = 1 - Math.floor(elapsedMillis / 1000);
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
		this.countdownNum--;
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
		this.countdownNum = 20;
		Laya.timer.clear(this, this.renderCountdown);
		Laya.timer.frameLoop(60, this, this.renderCountdown);
	}
	
	/**
	 * 已经准备好，开始游戏
	 */
	public readyGameStart(): void {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const keys = Object.keys(roomInfo);
		this.playerNum = keys?.length;
		const meIdx: number = keys.findIndex(o => o == userInfo?.id);
		this.viewPos = this.getPlayerViewPos(meIdx, keys)
		this.renderTimeStatus()
		keys.map((o, idx) => {
			this.renderHandCards(idx, roomInfo[o]?.handCards)
		})
		// 绘制全部玩家头像
		this.renderAllPlayer(roomInfo);
	}
	
	
	/**
	 * 服务器下发一张牌（摸一张新牌）
	 * @param cardNum
	 * @param playerId
	 */
	deliverCard(cardNum: number, playerId: string): void{
		if(typeof cardNum === 'number'){
			this.activeCardNum = cardNum
		} else {
			this.activeCardNum = null
		}
	}
	
	/**
	 * 检测我当前状态是否轮到我操作
	 */
	public checkCanOperate(): boolean {
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const gameInfo = dataManager.getData("gameInfo");
		const optionTime = gameInfo?.optionTime;
		const optionPos = gameInfo?.optionPos;
		const keys = Object.keys(roomInfo);
		if (keys[optionPos] === userInfo?.id) {
			return true
		} else {
			return false
		}
	}
	
	/**
	 * 检测道可以执行操作（碰杠胡）
	 */
	public checkOperate(operateType: string, playerId: string): void{
		if(operateType ==="peng") {
			this.bumpBtn.visible = true;
			this.passBtn.visible = true;
		} else if(operateType ==="gang"){
			this.gangBtn.visible = true;
			this.passBtn.visible = true;
		} else if(operateType ==="win"){
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
		const handCards = roomInfo[userInfo?.id].handCards;
		const roomId = roomInfo[userInfo?.id].roomId;
		let pengArr: number[] = []
		handCards.map((m: number)=>{
			if(m%50 === this.activeCardNum%50){
				pengArr.push(m)
			}
		})
		this._socket.sendMessage(JSON.stringify({type: "peng", data: {roomId, pengArr, userId: userInfo?.id}}))
		this.bumpBtn.visible = false;
		this.passBtn.visible = false;
	}
	
	/**
	 * 杠
	 * 【打出3张牌】
	 */
	private gang(): void{
		const userInfo = dataManager.getData("userInfo");
		const roomInfo = dataManager.getData("roomInfo");
		const handCards = roomInfo[userInfo?.id].handCards;
		const roomId = roomInfo[userInfo?.id].roomId;
		let gangArr: number[] = []
		handCards.map((m: number)=>{
			if(m%50 === this.activeCardNum%50){
				gangArr.push(m)
			}
		})
		this._socket.sendMessage(JSON.stringify({type: "gang", data: {roomId, gangArr, userId: userInfo?.id}}))
		this.gangBtn.visible = false
		this.passBtn.visible = false;
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
	}
	
	/**
	 * 胡牌之后的结算
	 * 服务端统一计算
	 */
	public winning(result: any): void {
		if (!result) return
		this.settlementDialog.visible = true;
		this.settlementDialog.zOrder = 1000;
		const userInfo = dataManager.getData("userInfo");
		if(result[userInfo?.id].isWinner) {
			this.status.skin = `resources/apes/settlement/win.png`
		} else {
			this.status.skin = `resources/apes/settlement/lost.png`
		}
		const keys: Array<string> = Object.keys(result);
		keys.map((o: string, idx: number) => {
			const info = result[o];
			const cards = info?.cards || [];
			cards.map((c: any, cardIdx: number) => {
				let imgUrl = this.getPlayedCardsImageUrl(c, 0);
				const img = new Image(imgUrl);
				img.scale(0.7,0.7);
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
	}
	
	
	//每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
	onUpdate(): void {}
}
