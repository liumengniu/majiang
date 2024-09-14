/**
 * 开发and生产配置
 */

const Applets = {
	dev: "dev",
	test: "test",
	prod: "prod",
};

const env = "dev"  //"prod"

interface AppConfig {
	dev: {
		[key: string]: string | number,
	},
	test: {
		[key: string]: string | number,
	},
	prod: {
		[key: string]: string | number,
	},
}

const appConfig: AppConfig = {
	dev: {
		"host": "http://192.168.1.8",
		"port": 4000,
		"ws": "ws://192.168.1.8:8082",
	},
	test: {
		"host": "http://192.168.1.8",
		"port": 4000,
		"ws": "ws://192.168.1.8:8082",
	},
	prod: {
		"host": "http://192.168.1.8",
		"port": 4000,
		"ws": "ws://192.168.1.8:8082",
	}
};

export default appConfig[env]
