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
	 * ws回调操作
	 */
	onMessageReceived (message: string) {
		let data:any;
		if(!this.isJSON(message)){
			data = message;
		} else {
			data = JSON.parse(message);
		}
		const type = data?.type;
		if (type === "create") { //创建房间成功
			// todo 是否 1、再加个房间场景，做准备使用，全部准备开始再进游戏场景 ？？？  2、还是进房就是进游戏场景
			// 1、进入游戏场景
			MainRT.getInstance().enterGameScene();
			// 2、绘制头像
			
		} else if (type === "join") {  //加入房间成功
			dataManager.setData("roomInfo", data?.data);
		}
	}
}

const handleReceivedMessage = new HandleReceivedMessage()

export default handleReceivedMessage
