import {EnumObject} from './EnumObject';

//==========================================================
// <T>范围枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
export class ScopeEnum extends EnumObject {
   // @member 未知
   public static Unknown = 0;
   // @member 本地范围
   public static Local = 1;
   // @member 会话范围
   public static Session = 2;
   // @member 全局范围
   public static Global = 3;
}
