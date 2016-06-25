import {ObjectBase} from './ObjectBase';
import {StringUtil} from './StringUtil';

//==========================================================
// <T>16进制工具。</T>
//
// @reference
// @author maocy
// @version 150201
//==========================================================
export class HexUtil {
   // @define
   public static NUMBER: string = '0x123456789ABCDEF';
   public static PAD: string = '0';
   public static PAD2: ObjectBase = new ObjectBase();

   //===========================================================
   // <T>判断是否有效16进制内容。</T>
   //
   // @method
   // @param value:Object 内容
   // @return Boolean 是否有效
   //===========================================================
   public static isValid(value) {
      return StringUtil.isPattern(value, this.NUMBER);
   }

   //===========================================================
   // <T>解析16进制内容。</T>
   //
   // @method
   // @param value:Object 内容
   // @return String 内容
   //===========================================================
   public static parse(value) {
      return value ? parseInt('0x' + value) : 0;
   }

   //===========================================================
   // <T>格式化16进制内容。</T>
   //
   // @method
   // @param value:Number 内容
   // @param length:Integer 长度
   // @return String 内容
   //===========================================================
   public static format(value, length) {
      var result = null;
      if (value) {
         result = value.toString(16);
      } else {
         result = '0';
      }
      return length ? StringUtil.lpad(result, length, this.PAD) : result;
   }
}
