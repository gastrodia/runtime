import {StringUtil} from './StringUtil';

//==========================================================
// <T>整型对象的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class IntegerUtil {
   //..........................................................
   // @define
   static Chars: string = '0123456789-%';
   static NUMBER: string = '0123456789-%';
   static LEFT_CHAR: string = '0';
   static MAX_UINT16: number = 65535;
   static MAX_UINT32: number = 4294967295;

   //==========================================================
   // <T>检验传入值是否是整型值。</T>
   //
   // @method
   // @param v:value:String 待检验的字符串
   // @return Boolean 是否整数
   //==========================================================
   public static isInt(v) {
      return StringUtil.isPattern(v, 'n');
   }

   //==========================================================
   // <T>获取非空内容。</T>
   //
   // @method
   // @param value:Integer 数字
   // @param defaultValue:Integer 默认内容
   // @return Integer 非空内容
   //==========================================================
   public static nvl(value: any, defaultValue?: any) {
      if (value != null) {
         return parseInt(value);
      }
      if (defaultValue != null) {
         return defaultValue;
      }
      return 0;
   }

   //============================================================
   // <T>计算一个整数的字节宽。</T>
   //
   // @param value 整数
   // @return 字节宽
   //============================================================
   public static strideByte(value) {
      if (value > 65535) {
         return 4;
      } else if (value > 255) {
         return 2;
      } else {
         return 1;
      }
   }

   //============================================================
   // <T>计算一个整数的位宽。</T>
   //
   // @param value 整数
   // @return 位宽
   //============================================================
   public static strideBit(value) {
      if (value > 65535) {
         return 32;
      } else if (value > 255) {
         return 16;
      } else {
         return 8;
      }
   }

   //==========================================================
   // <T>将传入值转换为整型值。</T>
   //
   // @method
   // @param value:value:String 待转换的字符串
   // @return int 转换后的整型值
   //==========================================================
   public static parse(v: string, d: number = 0) {
      // 设置默认值
      if (d == null) {
         d = 0;
      }
      // 判断内容为空
      if (v == null) {
         return d;
      }
      if (v == '') {
         return d;
      }
      // 去掉两边不可见字符
      v = StringUtil.trim(v.toString());
      // 去掉左边0字符
      while (true) {
         if (v.charAt(0) != '0') {
            break;
         }
         v = v.substr(1);
      }
      // 变换类型
      var r = (v.length > 0) ? parseInt(v) : d;
      return isNaN(r) ? d : r;
   }

   //==========================================================
   // <T>格式化数字。</T>
   //
   // @param value 数字
   // @param length 格式化长度
   // @param pad 补足字符串
   // @return 格式化内容
   //==========================================================
   public static format(value: number, length: number, pad?: string): string {
      if (!pad) {
         pad = this.LEFT_CHAR;
      }
      var source = value.toString();
      var count = length - source.length;
      for (var i = 0; i < count; i++) {
         source = pad + value;
      }
      return source;
   }

   //==========================================================
   // <T>返回范围内的数字化。</T>
   //
   // @method
   // @param value:Integer 数字
   // @param min:Integer 最小数字
   // @param max:Integer 最大数字
   // @return Integer 数字
   //==========================================================
   public static toRange(value, min, max) {
      if (value == null) {
         value = 0;
      }
      if (isNaN(value)) {
         value = 0;
      }
      if (value < min) {
         value = min;
      }
      if (value > max) {
         value = max;
      }
      return value;
   }

   //==========================================================
   // <T>计算最接近2的指数的数字。</T>
   //
   // @method
   // @param value:Integer 数字
   // @return Integer 数字
   //==========================================================
   public static pow2(value) {
      if (value > 4096) {
         return 8192;
      } else if (value > 2048) {
         return 4096;
      } else if (value > 1024) {
         return 2048;
      } else if (value > 512) {
         return 1024;
      } else if (value > 256) {
         return 512;
      } else if (value > 128) {
         return 256;
      } else if (value > 64) {
         return 128;
      } else if (value > 32) {
         return 64;
      } else if (value > 16) {
         return 32;
      } else if (value > 8) {
         return 16;
      } else if (value > 4) {
         return 8;
      } else if (value > 2) {
         return 4;
      } else if (value > 1) {
         return 2;
      }
      return 1;
   }

   //==========================================================
   // <T>计算参数集合的和。</T>
   //
   // @method
   // @param a:arguments:Object[] 参数集合
   // @return Integer 合计数字
   //==========================================================
   public static sum() {
      var r = 0;
      var a = arguments;
      var c = a.length;
      for (var n = 0; n < c; n++) {
         if (a[n] != null) {
            r += parseInt(a[n]);
         }
      }
      return r;
   }

   //==========================================================
   // <T>把两个字符串进行算术运算。</T>
   //
   // @method
   // @param f:function:String 方法
   // @param a:value1:String 参数1
   // @param b:value2:String 参数2
   // @return String 计算内容
   //==========================================================
   public static calculate(f, a, b) {
      a = this.parse(a);
      b = this.parse(b);
      var r = 0;
      if (f == '+') {
         r = a + b;
      } else if (f == '-') {
         r = a - b;
      } else if (f == 'x') {
         r = a * b;
      } else if (f == '/') {
         r = a / b;
      }
      return r.toString();
   }

   //===========================================================
   // <T>复制整数数组。</T>
   //
   // @method
   // @param po:outputData:Array 输出数据
   // @param poi:outputIndex:Integer 输出位置
   // @param pi:inputData:Array 输入数据
   // @param pii:inputIndex:Integer 输入位置
   // @param pc:count:Integer 总数
   //===========================================================
   public static copy(po, poi, pi, pii, pc) {
      for (var i = 0; i < pc; i++) {
         po[poi++] = pi[pii++];
      }
   }

   //==========================================================
   // <T>把布尔值转化为字符串。</T>
   //
   // @method
   // @param p:value:Integer 数值
   // @return String 字符串
   //==========================================================
   public static toString(p) {
      return (p == null) ? '0' : p.toString();
   }
}
