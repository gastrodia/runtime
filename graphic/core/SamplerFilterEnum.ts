//==========================================================
// <T>取样过滤枚举。</T>
//
// @enum
// @author maocy
// @version 150116
//==========================================================
export enum SamplerFilterEnum {
   // @member 未知
   Unknown = 0,
   // @member 近似
   Nearest = 1,
   // @member 插值
   Linear = 2,
   // @member 重复
   Repeat = 3,
   // @member 镜像重复
   MirroredRepeat = 4,
   // @member 边剪裁
   ClampToEdge = 5,
   // @member 边界剪裁
   ClampToBorder = 6
}
