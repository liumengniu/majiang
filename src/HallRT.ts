import HallControl from "./HallScript";

const { regClass } = Laya;
import { HallRTBase } from "./HallRT.generated";

@regClass()
export default class HallRT extends HallRTBase {
	/**设置单例的引用方式，方便其他类引用 */
	public static instance: HallRT;
	
	/**
	 * 上个场景的参数
	 * @param params
	 */
	onOpened(params: any): void{
		if(params && params === "oldPlayer"){
			this.reconnect.visible = true;
		}
	}
}