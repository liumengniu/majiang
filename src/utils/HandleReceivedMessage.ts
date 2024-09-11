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
	 * websocket接收服务端消息后 - 回调操作
	 */
	onMessageReceived (message: string) {
		let data:any;
		if(!this.isJSON(message)){
			data = message;
		} else {
			data = JSON.parse(message);
		}
		const type = data?.type;
		console.log(data,'-----------------------------------------------------')
		if (type === "create") { //创建房间成功
			// todo 是否 1、再加个房间场景，做准备使用，全部准备开始再进游戏场景 ？？？  2、还是进房就是进游戏场景
			// 1、进入游戏场景
			MainRT.getInstance().enterGameScene();
			// 2、绘制头像
		} else if (type === "join") {  //加入房间成功
			dataManager.setData("roomInfo", data?.data);
		} else if (type === "startGame"){
			dataManager.setData("roomInfo", data?.data?.roomInfo);
			dataManager.setData("gameInfo", data?.data?.gameInfo);
			MainRT.getInstance().readyGameStart();
		} else if(type === "playCard"){
			const roomInfo = data?.data?.roomInfo;
			const gameInfo = data?.data?.gameInfo;
			const playerId = data?.data?.playerId;
			const cardNum = data?.data?.cardNum;
			dataManager.setData("roomInfo", roomInfo);
			dataManager.setData("gameInfo", gameInfo);
			MainRT.getInstance().renderPlayedCards(cardNum, playerId, roomInfo);
			const keys = Object.keys(roomInfo);
			const idx = keys?.findIndex(o=> o === playerId);
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
			//todo 20秒的碰杠胡考虑时间（不碰杠胡则自动判定不予任何操作），然后再轮到下家摸牌
			MainRT.getInstance().renderTimeStatus();
		} else if (type === "operate") { // 服务器检测到可以操作（杠、碰、胡）
			const playerId = data?.data?.playerId;
			const operateType = data?.data?.operateType
			if(operateType === 4){
				MainRT.getInstance().checkOperate("win", playerId);
			} else if(operateType === 2) {
				MainRT.getInstance().checkOperate("peng", playerId);
			} else if(operateType === 3){
				MainRT.getInstance().checkOperate("gang", playerId);
			}
		} else if (type === "peng" || type === "gang") {  // 碰 or 杠
			const roomInfo = data?.data?.roomInfo;
			const playerId = data?.data?.playerId;
			const keys = Object.keys(roomInfo);
			const idx = keys?.findIndex(o=> o === playerId);
			MainRT.getInstance().renderPlayedCards(null, playerId, roomInfo);
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
			MainRT.getInstance().renderTimeStatus();
		} else if (type === "win")  {   //  胡牌了
			// todo 结算画面
			MainRT.getInstance().stopGame()
		} else if (type === "nextHandCard") {  //轮到下家摸牌
		
		} else if (type === "deliverCard") {  // 服务器发给下家一张新牌
			const roomInfo = data?.data?.roomInfo;
			const playerId = data?.data?.playerId;
			const cardNum = data?.data?.cardNum;
			const keys = Object.keys(roomInfo);
			const idx = keys?.findIndex(o => o === playerId);
			MainRT.getInstance().renderHandCards(idx, roomInfo[playerId].handCards);
		}
	}
}

const handleReceivedMessage = new HandleReceivedMessage()

export default handleReceivedMessage
