//===========================================================
// <T>请求状态枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
export class HttpStatusEnum {
   // @attribute Integer 未初始化
   public static Uninitialized = 0;
   // @attribute Integer 打开
   public static Open = 1;
   // @attribute Integer 发送
   public static Send = 2;
   // @attribute Integer 接收中
   public static Receiving = 3;
   // @attribute Integer 加载
   public static Loaded = 4;
}
