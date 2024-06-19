const Stage = Laya.Stage;
const Event = Laya.Event

const {regClass, property} = Laya;

@regClass()
export default class Main extends Laya.Script {
	
	onStart() {
		console.log("Game start");
	}
	
	/**
	 * 场景启动
	 */
	onAwake(): void {
		this.handleAdaptive()
	}
	
	/**
	 * 屏幕自适应
	 * @private
	 */
	private handleAdaptive(): void {
		console.log(Laya.stage, '--------------------------------------', Laya.stage.designHeight)
		// Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
		Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
		Laya.stage.designWidth = Laya.stage.width;
		Laya.stage.designHeight = Laya.stage.height;
		Laya.stage.on(Event.RESIZE, this, () => {
			Laya.stage.designWidth = Laya.stage.width;
			Laya.stage.designHeight = Laya.stage.height;
		})
	}
}
