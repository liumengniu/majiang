const Event = Laya.Event

const {regClass, property} = Laya;

@regClass()
export class HallScript extends Laya.Script {
	//declare owner : Laya.Sprite3D;
	declare owner : Laya.Sprite;
	
	@property({type: Laya.Button})
	public createRoomBtn: Laya.Button;
	
	@property({type: Laya.Button})
	public joinRoomBtn: Laya.Button;
	
	@property({type: Laya.TextInput})
	public roomTextInput: Laya.TextInput;
	
	//组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	onAwake(): void {
		this.createRoomBtn.on(Event.CLICK, this, this.handleCreateRoom)
		this.joinRoomBtn.on(Event.CLICK, this, this.handleJoinRoom)
	}
	
	/**
	 * 创建房间
	 * @private
	 */
	private handleCreateRoom(): void{
	
	}
	
	/**
	 * 加入房间
	 * @private
	 */
	private handleJoinRoom(): void{
		if(this.roomTextInput?.text){ //未输入房间号
			return
		}
		
	}
}
