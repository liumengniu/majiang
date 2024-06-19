// 定义 Map 的类型
import tempDataMap from './tempDataMap';

class DataManager {
	// 设置数据
	public setData(key: string, value: { [key: string]: any }): void {
		tempDataMap.set(key, value);
	}
	
	// 获取数据
	public getData(key: string): { [key: string]: any } | undefined {
		return tempDataMap.get(key);
	}
	
	// 删除数据
	public deleteData(key: string): void {
		tempDataMap.delete(key);
	}
	
	// 清空所有数据
	public clearData(): void {
		tempDataMap.clear();
	}
}

export default DataManager;
