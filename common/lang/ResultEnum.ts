//===========================================================
// <T>结果枚举。</T>
//
// @enum
// @author maocy
// @version 150114
//===========================================================
export enum ResultEnum {
   // @attribute Integer 成功
   Success = 0,
   // @attribute Integer 继续
   Continue = 1,
   // @attribute Integer 跳过
   Skip = 2,
   // @attribute Integer 停止
   Finish = 3,
   // @attribute Integer 失败
   Failure = -1,
   // @attribute Integer 取消
   Cancel = -2,
}
