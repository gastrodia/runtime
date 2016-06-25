//==========================================================
// <T>数据类型的工具类</T>
//
// @reference
// @author maocy
// @version 150112
//==========================================================
export enum DataTypeEnum {
   // @member 未知
   Unknown = 0,
   // @member 8位有符号整数
   Boolean = 1,
   // @member 8位有符号整数
   Int8 = 2,
   // @member 16位有符号整数
   Int16 = 3,
   // @member 32位有符号整数
   Int32 = 4,
   // @member 64位有符号整数
   Int64 = 5,
   // @member 8位无符号整数
   Uint8 = 6,
   // @member 16位无符号整数
   Uint16 = 7,
   // @member 32位无符号整数
   Uint32 = 8,
   // @member 64位无符号整数
   Uint64 = 9,
   // @member 16位浮点数
   Float16 = 10,
   // @member 32位浮点数
   Float32 = 11,
   // @member 64位浮点数
   Float64 = 12,
   // @member 字符串
   String = 13,
   // 枚举
   Enum = 14,
   // @member 数组集合
   Array = 15,
   // 集合
   Set = 16,
   // 表
   Map = 17,
   // 结构
   Struct = 18,
   // 结构集合
   Structs = 19,
   // 对象
   Object = 20,
   // 对象集合
   Objects = 21,
   //  字典集合
   Dictionary = 22,
   // 监听器
   Listener = 23,
   // 监听器集合
   Listeners = 24,
}
