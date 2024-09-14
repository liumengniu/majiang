import MainRT from "../MainRT";
import mapManager from "../configs/mapManager";

const {regClass, property} = Laya;
const dataManager = new mapManager();

@regClass()
class HandleReceivedMessage{
	isJSON(str: string|null) :Boolean{
		if (typeof str == 'string') {
			try {
				JSON.parse(str);
				return true;
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	}
	
	/**
	 * Object.fromEntries 的兼容替代（Object.fromEntries是ES2019的语法）
	 * @param entries
	 */
	fromEntries<K extends string | number | symbol, V>(entries: [K, V][]): Record<K, V> {
		return entries.reduce((accumulator, [key, value]) => {
			accumulator[key] = value;
			return accumulator;
		}, {} as Record<K, V>);
	}
	
	
	
	
	/**
	 * websocket接收服务端消息后 - 回调操作
	 */
	onMessageReceived (message: string) {
		let data:any;
		if(!this.isJSON(message)){
			data = message;
		} else {
			data = JSON.parse(message);
		}
		console.log("处理来自服务端的消息:", data);
		const type = data?.type;
		const gameInfo = data?.data?.gameInfo;
		const roomInfo = data?.data?.roomInfo;
		const playerInfo = data?.data?.playerInfo;
		roomInfo && dataManager.setData("roomInfo", roomInfo);
		gameInfo && dataManager.setData("gameInfo", gameInfo);
		playerInfo && dataManager.setData("playerInfo", playerInfo);
		if (type === "create") { //创建房间成功
			if(roomInfo && typeof roomInfo === 'object' && JSON.stringify(roomInfo) !== "{}"){
				MainRT.getInstance().enterGameScene();
			}
			// 2、绘制头像
		} else if (type === "join") {  //加入房间成功

		} else if (type === "startGame"){
			MainRT.getInstance().readyGameStart();
		} else if(type === "reconnect"){
			MainRT.getInstance().initViewPos()
			MainRT.getInstance().renderTimeStatus();
			gameInfo?.tableIds?.map((o: string, idx: number) => {
				MainRT.getInstance().renderHandCards(idx, roomInfo[o]?.handCards);
				MainRT.getInstance().renderPlayedCards(null, o, roomInfo, gameInfo);
			})
		}else if(type === "playCard"){
			const playerId = data?.data?.playerId;
			const cardNum = data?.data?.cardNum;
			MainRT.getInstance().renderPlayedCards(cardNum, playerId, roomInfo, gameInfo);
			const idx = gameInfo?.tableIds?.findIndex((o: string)=> o === playerId);
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
			MainRT.getInstance().renderTimeStatus();
		} else if (type === "operate") { // 服务器检测到可以操作（杠、碰、胡）
			const playerId = data?.data?.playerId;
			const operateType = data?.data?.operateType;
			if(operateType === 4){
				MainRT.getInstance().checkOperate("win", playerId);
				MainRT.getInstance().renderTimeStatus();
			} else if(operateType === 3) {
				MainRT.getInstance().checkOperate("gang", playerId);
				MainRT.getInstance().renderTimeStatus();
			} else if(operateType === 2){
				MainRT.getInstance().checkOperate("peng", playerId);
				MainRT.getInstance().renderTimeStatus();
			}
		} else if (type === "peng" || type === "gang") {  // 碰 or 杠
			const playerId = data?.data?.playerId;
			const idx = gameInfo?.tableIds?.findIndex((o: string)=> o === playerId);
			MainRT.getInstance().renderPlayedCards(null, playerId, roomInfo, gameInfo);
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
			MainRT.getInstance().renderTimeStatus();
		} else if (type === "winning")  {   //  胡牌了，服务端结算完毕
			const result = data.data?.result;
			MainRT.getInstance().winning(result)
			MainRT.getInstance().stopGame()
		} else if (type === "deliverCard") {  // 服务器发给下家一张新牌
			const playerId = data?.data?.playerId;
			const cardNum = data?.data?.cardNum;
			const tableIds = gameInfo?.tableIds;
			const idx = tableIds?.findIndex((o: string) => o === playerId);
			MainRT.getInstance().deliverCard(cardNum, playerId)
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
		} else if(type === "flow"){ //流局，无人胜出，平局结算
			const result = data.data?.result;
			MainRT.getInstance().winning(result)
			MainRT.getInstance().stopGame()
		}
	}
}

const handleReceivedMessage = new HandleReceivedMessage()

export default handleReceivedMessage
