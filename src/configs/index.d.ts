const Applets = {
	dev: "dev",
	test: "test",
	prod: "prod",
};

// export declare module '../configs' {
// 	// 在这里声明模块的类型
// 	// 例如，如果模块导出一个对象：
// 	export interface Config {
// 		host: "http://192.168.1.8",
// 		port: 4000,
// 		ws: "ws://192.168.1.9:8082",
// 	}
//
// 	const config: Config;
// 	export default config;
// }

export declare module '../configs' {
	export const someConfig: string;
	export function someFunction(): void;
}
