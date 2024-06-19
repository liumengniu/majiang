const HandleReceivedMessage = {
	isJSON: function (str: string|null) :Boolean{
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
	},
	/**
	 * ws回调操作
	 */
	onMessageReceived: function (message: string) {
		let data:any;
		if(!this.isJSON(message)){
			data = message;
		}
		data = JSON.parse(message);
		const type = data?.type;
		if (type === "create") { //创建房间成功
		
		} else if (message === "join") {  //加入房间成功
		
		}
	}
}

export default HandleReceivedMessage
