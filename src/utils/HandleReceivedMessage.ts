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
		if (type === "create") { //创建房间成功
			const roomInfo = data?.data?.roomInfo;
			dataManager.setData("gameInfo", data?.data?.gameInfo);
			if(roomInfo && typeof roomInfo === 'object' && JSON.stringify(roomInfo) !== "{}"){
				MainRT.getInstance().enterGameScene();
			}
			// 2、绘制头像
		} else if (type === "join") {  //加入房间成功
			dataManager.setData("roomInfo", data?.data?.roomInfo);
			dataManager.setData("gameInfo", data?.data?.gameInfo);
		} else if (type === "startGame"){
			dataManager.setData("roomInfo", data?.data?.roomInfo);
			dataManager.setData("gameInfo", data?.data?.gameInfo);
			MainRT.getInstance().readyGameStart();
		} else if(type === "reconnect"){
			const roomInfo = data?.data?.roomInfo;
			const gameInfo = data?.data?.gameInfo;
			const playerInfo = data?.data?.playerInfo;
			const playerId = data?.data?.playerId;
			dataManager.setData("roomInfo", roomInfo);
			dataManager.setData("gameInfo", gameInfo);
			dataManager.setData("playerInfo", playerInfo);
			MainRT.getInstance().initViewPos()
			const keys = Object.keys(roomInfo);
			MainRT.getInstance().renderTimeStatus();
			keys.map((o, idx) => {
				MainRT.getInstance().renderHandCards(idx, roomInfo[o]?.handCards);
				MainRT.getInstance().renderPlayedCards(null, o, roomInfo, gameInfo);
			})
		}else if(type === "playCard"){
			const roomInfo = data?.data?.roomInfo;
			const gameInfo = data?.data?.gameInfo;
			const playerId = data?.data?.playerId;
			const cardNum = data?.data?.cardNum;
			dataManager.setData("roomInfo", roomInfo);
			dataManager.setData("gameInfo", gameInfo);
			MainRT.getInstance().renderPlayedCards(cardNum, playerId, roomInfo, gameInfo);
			const keys = Object.keys(roomInfo);
			const idx = keys?.findIndex(o=> o === playerId);
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
			MainRT.getInstance().renderTimeStatus();
		} else if (type === "operate") { // 服务器检测到可以操作（杠、碰、胡）
			const playerId = data?.data?.playerId;
			const operateType = data?.data?.operateType;
			const gameInfo = data?.data?.gameInfo;
			dataManager.setData("gameInfo", gameInfo);
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
			const roomInfo = data?.data?.roomInfo;
			const gameInfo = data?.data?.gameInfo;
			const playerId = data?.data?.playerId;
			const keys = Object.keys(roomInfo);
			dataManager.setData("roomInfo", roomInfo);
			dataManager.setData("gameInfo", gameInfo);
			const idx = keys?.findIndex(o=> o === playerId);
			MainRT.getInstance().renderPlayedCards(null, playerId, roomInfo, gameInfo);
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
			MainRT.getInstance().renderTimeStatus();
		} else if (type === "winning")  {   //  胡牌了，服务端结算完毕
			const result = data.data?.result;
			MainRT.getInstance().winning(result)
			MainRT.getInstance().stopGame()
		} else if (type === "deliverCard") {  // 服务器发给下家一张新牌
			const roomInfo = data?.data?.roomInfo;
			const playerId = data?.data?.playerId;
			const cardNum = data?.data?.cardNum;
			const keys = Object.keys(roomInfo);
			const idx = keys?.findIndex(o => o === playerId);
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
