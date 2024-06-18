const {regClass, property} = Laya;

@regClass()
export class Main extends Laya.Script {
	
	onStart() {
		console.log("Game start");
	}
	
	/**
	 * 场景启动
	 */
	onAwake(): void {
	
	}
}
