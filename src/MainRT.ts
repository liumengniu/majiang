import GameControl from "./Main"
import mapManager from "./configs/mapManager";
const dataManager = new mapManager();

const {regClass, property} = Laya;

@regClass()
export default class MainRT extends Laya.Scene {
	/**设置单例的引用方式，方便其他类引用 */
	public static instance: MainRT;
	/**当前游戏积分字段 */
	private _score: number;
	/**游戏控制脚本引用，避免每次获取组件带来不必要的性能开销 */
	private _control: GameControl;
	// declare owner : Laya.Sprite;
	
	constructor() {
		super();
		MainRT.instance = this;
	}
	
	public static getInstance(): MainRT{
		if(!MainRT.instance){
			MainRT.instance = new MainRT();
		}
		return MainRT.instance
	}
	
	/**
	 * 上个场景的参数
	 * @param params
	 */
	onOpened(params: any): void{
		if(params && params === "oldPlayer"){
			//重新加入游戏,重新绘制界面
			this._control.getDataByPlayerId();
		} else {
			this._control?.joinRoom(null)
		}
	}
	
	/**
	 * 有时候onEnable执行的太慢，长连接的回调先于onEnable执行，导致this._control还没初始化
	 */
	init(): void {
		this._control = this.getComponent(GameControl);
	}
	
	onEnable(): void {
		this._control = this.getComponent(GameControl);
	}
	
	/**
	 * 初始化玩家视角位置
	 */
	initViewPos(): void{
		this._control.initViewPos()
	}
	
	/**
	 * 开始游戏
	 */
	startGame(): void{
		this._control.startGame()
	}
	
	/**
	 * 结束游戏
	 */
	stopGame(): void{
		this._control.stopGame()
	}
	
	/**
	 * 有玩家加入了房间
	 */
	joinRoom(roomInfo: any): void{
		this._control?.joinRoom(roomInfo)
	}
	
	/**
	 * 准备绘制游戏牌和人物
	 */
	readyGameStart(): void{
		this._control.readyGameStart()
	}
	
	/**
	 * 绘制打出去的牌
	 */
	renderPlayedCards(cardNum: number|null, playerId: string,roomInfo: any, gameInfo: any): void{
		this._control.renderPlayedCards(cardNum, playerId,roomInfo, gameInfo);
	}
	
	/**
	 * 绘制手牌
	 */
	renderHandCards(idx: number, handCards:any): void{
		this._control.renderHandCards(idx, handCards)
	}
	
	/**
	 * 服务器下发一张牌
	 */
	public deliverCard(cardNum: number, playerId: string){
		this._control.deliverCard(cardNum, playerId)
	}
	
	/**
	 * 绘制操作人指示图标
	 */
	renderTimeStatus(): void{
		this._control.renderTimeStatus()
	}
	
	/**
	 * 可以操作
	 */
	public checkOperate(operateType: string, playerId: string): void{
		this._control.checkOperate(operateType,playerId);
	}
	
	/**
	 * 胡牌结算
	 */
	public winning(result: any, type: string): void{
		this._control.winning(result, type);
	}
	
	/**
	 * 进入游戏场景
	 */
	enterGameScene() :void{
		Laya.Scene.open("Game.ls")
	}
}
