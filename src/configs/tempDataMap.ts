// 定义 Map 的类型
type TempDataKey = string;
type TempDataValue = { [key: string]: any };

// 创建 Map 对象
const tempDataMap: Map<TempDataKey, TempDataValue> = new Map();


// 导出 Map 对象
export default tempDataMap;
