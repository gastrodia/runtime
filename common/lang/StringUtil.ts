import {RuntimeUtil} from '../RuntimeUtil';
import {FloatUtil} from './FloatUtil';
import {IntegerUtil} from './IntegerUtil';
import {StringBuffer} from './StringBuffer';

//==========================================================
// <T>各种字符串处理的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class StringUtil {
   /** 空字符串 */
   public static EMPTY: string = '';
   public static SPACE: string = '   ';
   public static PAD: string = ' ';
   public static TRIM: string = ' \t\r\n';
   public static LOWER: string = 'abcdefghijklmnopqrstuvwxyz';
   public static UPPER: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   public static CodeLowerA: number = 'a'.charCodeAt(0);
   public static CodeLowerZ: number = 'z'.charCodeAt(0);
   public static CodeUpperA: number = 'A'.charCodeAt(0);
   public static CodeUpperZ: number = 'Z'.charCodeAt(0);
   /** 哈希数据 */
   private static _hashData;

   /**
    * 判断字符串是否为空。
    *
    * @param value 字符串
    * @return 是否为空
    */
   public static isEmpty(value) {
      if (value != null) {
         return (value.length == 0);
      }
      return true;
   }

   /**
    * 判断字符串不包含开始和结尾的空格，是否为空。
    *
    * @param value 字符串
    * @return 是否为空
    */
   public static isBlank(value) {
      if (value != null) {
         var trim = value.trim();
         return trim.length == 0;
      }
      return true;
   }

   /**
    * 判断字符串是否为ANSI编码。
    * 字符串内每一个字符编码在256之下，为ANSI编码的判断标准。
    *
    * @param value 字符串
    * @return 是否指定类型
    */
   public static isAnsi(value) {
      if (value != null) {
         var count = value.length;
         for (var i = 0; i < count; i++) {
            if (value.charCodeAt(i) > 255) {
               return false;
            }
         }
         return true;
      }
      return false;
   }

   /**
    * 判断字符串是否为DBCS编码。
    * 字符串内每一个字符编码在255之上，为DBCS编码的判断标准。
    *
    * @param value 字符串
    * @return 是否指定类型
    */
   public static isDbcs(value) {
      if (value == null) {
         var count = value.length;
         for (var i = 0; i < count; i++) {
            if (value.charCodeAt(i) < 256) {
               return false;
            }
         }
         return true;
      }
      return false;
   }

   /**
    * 判断字符串是否和指定模板相匹配。
    * <P>特定字符表示一个范围内容
    *    <L value='$a'>所有小写字符(abcdefghijklmnopqrstuvwxyz)</L>
    *    <L value='$A'>所有大写字符(ABCDEFGHIJKLMNOPQRSTUVWXYZ)</L>
    *    <L value='$i'>所有整数字符(0123456789)</L>
    *    <L value='$n'>所有整数字符(0123456789-)</L>
    *    <L value='$f'>所有浮点数字符(0123456789-.)</L>
    * </P>
    *
    * @param value 字符串
    * @param parttern 模板字符串
    * @return 是否匹配
    */
   public static isPattern(value, parttern) {
      if (value != null) {
         // 展开模板内容
         var source = (parttern == null) ? '$a$A$f' : parttern;
         source = source.replace(/\a/g, this.LOWER);
         source = source.replace(/\A/g, this.UPPER);
         source = source.replace(/\f/g, FloatUtil.NUMBER);
         source = source.replace(/\n/g, IntegerUtil.NUMBER);
         // 检查匹配
         var count = value.length;
         for (var i = 0; i < count; i++) {
            if (source.indexOf(value.charAt(i)) == -1) {
               return false;
            }
         }
         return true;
      }
      return false;
   }

   /**
    * 判断字符串是否和指定模板相匹配。
    * <P>特定字符表示一个范围内容
    *    <L value='$a'>所有小写字符(abcdefghijklmnopqrstuvwxyz)</L>
    *    <L value='$A'>所有大写字符(ABCDEFGHIJKLMNOPQRSTUVWXYZ)</L>
    *    <L value='$i'>所有整数字符(0123456789)</L>
    *    <L value='$n'>所有整数字符(0123456789-)</L>
    *    <L value='$f'>所有浮点数字符(0123456789-.)</L>
    * </P>
    *
    * @param value 字符串
    * @param parttern 模板字符串
    * @return 是否匹配
    */
   public static inChars(value, parttern) {
      var b = this.findChars(parttern, value);
      if (b != -1) {
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>判断两个字符串是否相等。</T>
   //
   // @method
   // @param s:source:String 源字符串
   // @param t:target:String 目标字符串
   // @param f:boolean:Boolean 是否忽略大小写(默认为忽略大小写)
   // @return Boolean 是否相等
   //==========================================================
   public static equals(source: string, target: string, caseCare: boolean = true) {
      // 获得参数
      if (source == null) {
         source = '';
      } else if (source.constructor != String) {
         source = source.toString();
      }
      if (target == null) {
         target = '';
      } else if (target.constructor != String) {
         target = target.toString();
      }
      // 比较相同
      if (caseCare) {
         return (source == target);
      } else {
         return (source.toLowerCase() == target.toLowerCase());
      }
   }

   //==========================================================
   // <T>判断是否包含指定字符串。</T>
   //
   // @param source 字符串
   // @param values 内容集合
   // @return 是否包含
   //==========================================================
   public static contains(source, ...values: Array<any>) {
      if (source != null) {
         // 转换成字符串
         if (source.constructor != String) {
            source = source.toString();
         }
         // 判断内容包含
         var count: number = values.length;
         for (var i: number = 0; i < count; i++) {
            var value = values[i];
            if (source.indexOf(value) != -1) {
               return true;
            }
         }
      }
      return false;
   }

   //==========================================================
   // <T>判断字符串是否以特定字符串开始。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param s:search:String 特定字符串
   // @return Boolean
   //    <L value='true'>是</L>
   //    <L value='false'>否</L>
   //==========================================================
   public static startsWith(v, s) {
      if (s == null) {
         return true;
      }
      return (v != null) ? (v.indexOf(s) == 0) : false;
   }

   //==========================================================
   // <T>判断字符串是否以特定字符串结束。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param s:search:String 特定字符串
   // @return Boolean
   //    <L value='true'>是</L>
   //    <L value='false'>否</L>
   //==========================================================
   public static endsWith(v, s) {
      if (s == null) {
         return true;
      }
      var n = (v != null) ? v.indexOf(s) : -1;
      return (n != -1) ? (n == (v.length - s.length)) : false;
   }

   //==========================================================
   // <T>在字符串中查找指定字符列表。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param s:search:String 字符列表
   // @return Integer 位置索引
   //==========================================================
   public static findChars(v, s) {
      if ((v != null) && (s != null)) {
         var c = v.length;
         for (var n = 0; n < c; n++) {
            if (s.indexOf(v.charAt(n)) != -1) {
               return n;
            }
         }
      }
      return -1;
   }

   //==========================================================
   // <T>判断指定字符串是否在一个字符串数组中含有。</T>
   //
   // @method
   // @param v:value:String 源字符串
   // @param rs:ranges:String[] 字符串数组
   // @param f:boolean:Boolean 是否忽略大小写(默认为忽略大小写)
   // @return Boolean
   //    <L value='true'>含有</L>
   //    <L value='false'>不含有</L>
   //==========================================================
   public static inRange(v, rs, f) {
      if (v && rs) {
         if (!f) {
            v = v.toLowerCase();
         }
         var c = rs.length;
         for (var n = 0; n < c; n++) {
            var r = rs[n];
            if (r != null) {
               if (f) {
                  if (v == r) {
                     return true;
                  }
               } else {
                  if (v == r.toLowerCase()) {
                     return true;
                  }
               }
            }
         }
      }
      return false;
   }

   //==========================================================
   // <T>返回一个不为空的字符串。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param d:default:String 缺省字符串
   // @return String 非空字符串
   //==========================================================
   public static nvl(v: string, d: string = ''): string {
      if (v != null) {
         var s = null;
         if (v.constructor != String) {
            s = v.toString();
         } else {
            s = v;
         }
         if (s.length > 0) {
            return s;
         }
      }
      if (d != null) {
         return d;
      }
      return this.EMPTY;
   }

   //==========================================================
   // <T>返回一个不为空的字符串对象。</T>
   //
   // @method
   // @param p:value:String 字符串对象
   // @return String 非空字符串对象
   //==========================================================
   public static nvlString(value: StringBuffer): StringBuffer {
      if (value == null) {
         return new StringBuffer();
      }
      return value;
   }

   //==========================================================
   // <T>如果字符串为空，则返回空。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @return String 空字符串
   //==========================================================
   public static empty(v) {
      if (v != null) {
         var s = null;
         if (v.constructor != String) {
            s = v.toString();
         } else {
            s = v;
         }
         if (s.length > 0) {
            return s;
         }
      }
      return null;
   }

   //==========================================================
   //<T>计算字符串的哈希值。</T>
   //
   //@method
   //@param source:String 字符串
   //@param code:Integer 参照码
   //@return Integer 哈希值
   //==========================================================
   public static calculateHash(source, code) {
      var data = this._hashData;
      if (!data) {
         data = this._hashData = new Int32Array(1);
      }
      data[0] = RuntimeUtil.nvl(code, 0);
      var length = source.length;
      for (var i = 0; i < length; i++) {
         var value = source.charCodeAt(i);
         data[0] = 31 * data[0] + value;
      }
      return Math.abs(data[0]);
   }

   //==========================================================
   // <T>将字符串的首字符变为大写。</T>
   //
   // @method
   // @param value:String 字符串
   // @return String 首字母是大写的字符串
   //==========================================================
   public static firstUpper(value) {
      return (value != null) ? value.charAt(0).toUpperCase() + value.substr(1) : value;
   }

   //==========================================================
   // <T>将字符串的首字符变为小写。</T>
   //
   // @method
   // @param value:String 字符串
   // @return String 首字母是小写的字符串
   //==========================================================
   public static firstLower(value) {
      return (value != null) ? value.charAt(0).toLowerCase() + value.substr(1) : value;
   }

   //==========================================================
   // <T>获得字符串中第一行字符串。</T>
   //
   // @method
   // @param value:String 字符串
   // @return String 第一行字符串
   //==========================================================
   public static firstLine(value) {
      if (value) {
         var n = Math.min(value.indexOf('\r'), value.indexOf('\n'));
         if (-1 != n) {
            return value.substr(0, n);
         }
         return value;
      }
      return '';
   }

   //==========================================================
   // <T>格式化一个字符串内容，将参数中{x}内容替换为参数内容。</T>
   //
   // @method
   // @param value:String 字符串
   // @param parameters:Object... 参数字符
   // @return String 格式化后的字符串
   //==========================================================
   public static format(value, parameters) {
      var count = arguments.length;
      for (var i = 1; i < count; i++) {
         var parameter = arguments[i];
         if (parameter == null) {
            parameter = '';
         } else if (typeof (parameter) == 'function') {
            // parameter = MO.Method.name(parameter);
         }
         value = value.replace('{' + i + '}', parameter);
      }
      return value;
   }

   //==========================================================
   // <T>格式化多行文本。</T>
   //
   // @method
   // @param s:source:String 字符串
   // @return String 字符串
   //==========================================================
   public static formatLines(p: string): string {
      p = p.replace(/\\r/g, '');
      var ls = p.split('\n');
      var c = ls.length;
      var r: StringBuffer = new StringBuffer();
      for (var i = 0; i < c; i++) {
         var l: string = ls[i]
         l = this.trim(l);
         if (this.isEmpty(l)) {
            continue;
         }
         if (this.startsWith(l, '//')) {
            continue;
         }
         r.appendLine(l);
      }
      return r.flush();
   }

   //==========================================================
   // <T>获得重复指定次数的字符串。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param c:count:Integer 重复的次数
   // @return String 重复后的字符串
   //==========================================================
   public static repeat(v, c) {
      return new Array(c + 1).join(v);
   }

   //==========================================================
   // <T>通过追加空格使字符串对齐指定长度，字符串内容位于对齐后字符串的中间位置。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param l:length:Integer 对齐后长度
   // @param p:pad:String 补齐字符(默认为空格字符)
   // @return Boolean 补齐长度的字符串
   //==========================================================
   public static pad(v, l, p) {
      v = (v != null) ? v.toString() : this.EMPTY;
      var n = l - v.length;
      if (n > 0) {
         if (p == null) {
            p = this.PAD;
         }
         var r = (n % 2 == 0) ? n / 2 : (n - 1) / 2;
         return new Array(r + 1).join(p) + v + new Array(n - r + 1).join(p);
      }
      return v;
   }

   //==========================================================
   // <T>通过在左边追加空格使字符串对齐指定长度。</T>
   //
   // @param value 字符串
   // @param length 对齐后长度
   // @param pad 补齐字符(默认为空格字符)
   // @return 补齐长度的字符串
   //==========================================================
   public static lpad(v, l, p?) {
      v = (v != null) ? v.toString() : this.EMPTY;
      var n = l - v.length;
      if (n > 0) {
         if (p == null) {
            p = this.PAD;
         }
         var a = new Array(n);
         a[a.length] = v;
         return a.join(p);
      }
      return v;
   }

   //==========================================================
   // <T>通过在右边追加空格使字符串对齐指定长度。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param l:length:Integer 对齐后长度
   // @param p:pad:String 补齐字符(默认为空格字符)
   // @return Boolean 补齐长度的字符串
   //==========================================================
   public static rpad(v, l, p: string = null) {
      var o = this;
      v = (v != null) ? v.toString() : o.EMPTY;
      var n = l - v.length;
      if (n > 0) {
         if (p == null) {
            p = o.PAD;
         }
         return v + new Array(n + 1).join(p);
      }
      return v;
   }

   //==========================================================
   // <T>去掉字符串开始和结尾的空格字符和非显示字符。</T>
   //
   // @method
   // @param v:value:String 字符串对象
   // @param ts:trims:String 要去除的字符串
   // @return String 去掉开始和结尾的空格和非显示字符的字符串
   //==========================================================
   public static trim(v: string, ts: string = null): string {
      var o = this;
      v = o.nvl(v);
      ts = o.nvl(ts, o.TRIM);
      var l = 0;
      var r = v.length - 1;
      for (; l < r; l++) {
         if (-1 == ts.indexOf(v.charAt(l))) {
            break;
         }
      }
      for (; r >= l; r--) {
         if (-1 == ts.indexOf(v.charAt(r))) {
            break;
         }
      }
      if (l == r + 1) {
         return null;
      }
      if ((l != 0) || (r != v.length - 1)) {
         return v.substring(l, r + 1);
      }
      return v;
   }

   //==========================================================
   // <T>去掉字符串开始的空格字符和非显示字符。</T>
   //
   // @method
   // @param v:value:String 字符串对象
   // @param ts:trims:String 要去除的字符串
   // @return String 去掉开始的空格和非显示字符的字符串
   //==========================================================
   public static ltrim(v: string, ts: string) {
      v = this.nvl(v);
      ts = this.nvl(ts, this.TRIM);
      var l = 0;
      var r = v.length - 1;
      for (; l < r; l++) {
         if (-1 == ts.indexOf(v.charAt(l))) {
            break;
         }
      }
      if (0 != l) {
         return v.substring(l, r + 1);
      }
      return v;
   }

   //==========================================================
   // <T>去掉字符串结尾的空格字符和非显示字符。</T>
   //
   // @method
   // @param v:value:String 字符串对象
   // @param ts:trims:String 要去除的字符串
   // @return String 去掉结尾的空格和非显示字符的字符串
   //==========================================================
   public static rtrim(v: string, ts: string): string {
      v = this.nvl(v);
      ts = this.nvl(ts, this.TRIM);
      var r = v.length - 1;
      for (; r >= 0; r--) {
         if (-1 == ts.indexOf(v.charAt(r))) {
            break;
         }
      }
      if (r != v.length - 1) {
         return v.substring(0, r + 1);
      }
      return v;
   }

   //==========================================================
   // <T>从字符串中截取开始字符串到结束字符串中间的部分字符串。</T>
   // <P>开始字符串不存在的话，从字符串开始位置截取。</B>
   // 结束字符串不存在的话，截取到字符串的最终位置。</P>
   //
   // @method
   // @param v:value:String 字符传对象
   // @param b:begin:String 起始字符串
   // @param e:end:String 结束字符串
   // @return String 截取后的部分字符串
   //==========================================================
   public static mid(v, b, e) {
      if (v == null) {
         return v;
      }
      var l = 0;
      if (b != null) {
         var f = v.indexOf(b);
         if (f != -1) {
            l = f + b.length;
         }
      }
      var r = v.length;
      if (e != null) {
         var f = v.indexOf(e, l);
         if (f != -1) {
            r = f;
         }
      }
      return v.substring(l, r);
   }

   //==========================================================
   // <T>将字符串中的控制字符转换为一行可以存储的字符串。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @return String 行字符串
   //==========================================================
   public static toLine(v) {
      return v.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
   }

   //===========================================================
   // <T>将字符串中的大写变成下划线。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @return String 字符串
   //===========================================================
   public static toUnderline(v) {
      var r = null;
      if (v) {
         var s: StringBuffer = new StringBuffer();
         var c = v.length;
         for (var i = 0; i < c; i++) {
            var h = v.charAt(i);
            if (h.toUpperCase() == h) {
               if (i > 0) {
                  s.append('_');
               }
               s.append(h.toLowerCase());
            } else {
               s.append(h);
            }
         }
         r = s.flush();
      }
      return r;
   }

   //==========================================================
   // <T>在字符串转化为小写字符串。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @return String 小写字符串
   //==========================================================
   public static toLower(v) {
      return (v != null) ? v.toLowerCase() : this.EMPTY;
   }

   //==========================================================
   // <T>在字符串转化为大写字符串。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @return String 大写字符串
   //==========================================================
   public static toUpper(v) {
      return (v != null) ? v.toUpperCase() : this.EMPTY;
   }

   //==========================================================
   // <T>把一个字符串分割为字符串数组。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param p:split:String 分割字符串
   // @return String 分割后的字符串数组
   //==========================================================
   public static split(s, p) {
      return (s && p) ? s.split(p) : null;
   }

   //==========================================================
   // <T>把一个字符串分割为两个字符串的数组。</T>
   //
   // @method
   // @param v:value:String 字符串
   // @param p:split:String 分割字符
   // @return String 分割后的字符串数组
   //==========================================================
   public static splitTwo(s, p) {
      if (s && p) {
         var r = new Array();
         var n = s.indexOf(p);
         if (n == -1) {
            r.push(s);
         } else {
            r.push(s.substring(0, n));
            r.push(s.substring(n + p.length));
         }
         return r;
      }
      return null;
   }

   //==========================================================
   //<T>从字符串中截取与匹配字符相等的子字符串组。</T>
   //
   //@method
   //@param s:string:String 字符串
   //@param p:value:Array 要截取的参照字符的组合
   //@return Array 截取的字符数组
   //==========================================================
   public static splitParts(s, p) {
      var b = new Array();
      var k = 0;
      var l = s.length;
      for (var i = 0; i < l; i++) {
         for (var j in p) {
            if (this.startsWith(p[j], s.charAt(i))) {
               if (this.equals(s.substr(i, p[j].length), p[j])) {
                  b[k++] = p[j];
                  i = i + p[j].length - 1;
                  break;
               }
            }
         }
      }
      return b;
   }

   //==========================================================
   //<T>从字符串中截取与匹配字符相等的子字符串组。</T>
   //
   //@method
   //@param s:string:String 字符串
   //@param p:value:Array 要截取的参照字符的组合
   //@return Array 截取的字符数组
   //==========================================================
   public static splitPattern(s, p) {
      var r = new Array();
      if (s) {
         var sl = s.length;
         var pl = p.length;
         var t = '';
         for (var n = 0; n < sl; n++) {
            var v = false;
            for (var i = 0; i < pl; i++) {
               var f = p[i];
               if (s.indexOf(f) == -1) {
                  if (t.length) {
                     r[r.length] = t;
                     t = '';
                  }
                  r[r.length] = f;
                  s = s.substring(f.length);
                  v = true;
                  break;
               }
            }
            if (!v) {
               t += s.charAt(0);
               s = s.substring(1);
            }
         }
      }
      return r;
   }

   //==========================================================
   // <T>替换字符串全部内容。</T>
   //
   // @method
   // @param value:String 字符串
   // @param source:String 源字符串
   // @param target:String 目标字符串
   // @return String 字符串
   //==========================================================
   public static replace(value, source, target) {
      return value.replace(new RegExp(source, 'g'), target);
   }

   //==========================================================
   // <T>替换全部指定字符。</T>
   //
   // @param value 字符串
   // @param source 源字符
   // @param target 目标字符
   // @return 字符串
   //==========================================================
   public static replaceChar(value, source, target) {
      var result = null;
      if (value != null) {
         var count = value.length;
         var chars = new Array();
         for (var n = 0; n < count; n++) {
            var char = value.charAt(n);
            if (char == source) {
               chars[chars.length] = target;
            } else {
               chars[chars.length] = char;
            }
         }
         result = chars.join('');
      }
      return result;
   }

   //==========================================================
   // <T>解析字符数组为字符串。</T>
   //
   // @method
   // @param data:Array 数组
   // @return String 字符串
   //==========================================================
   public static decodeUtf(data) {
      var i = 0;
      var j = 0;
      var x = 0;
      var y = 0;
      var z = 0;
      var l = data.length;
      var result = [];
      var codes = [];
      for (; i < l; ++i, ++j) {
         x = data[i] & 255;
         if (!(x & 128)) {
            if (!x) {
               return data;
            }
            codes[j] = x;
         } else if ((x & 224) == 192) {
            if (i + 1 >= l) {
               return data;
            }
            y = data[++i] & 255;
            if ((y & 192) != 128) {
               return data;
            }
            codes[j] = ((x & 31) << 6) | (y & 63);
         } else if ((x & 240) == 224) {
            if (i + 2 >= l) {
               return data;
            }
            y = data[++i] & 255;
            if ((y & 192) != 128) {
               return data;
            }
            z = data[++i] & 255;
            if ((z & 192) != 128) {
               return data;
            }
            codes[j] = ((x & 15) << 12) | ((y & 63) << 6) | (z & 63);
         } else {
            return data;
         }
         if (j == 65535) {
            var charLength = codes.length;
            for (var index = 0; index < charLength; index++) {
               result.push(String.fromCharCode(codes[index]));
            }
            j = -1;
         }
      }
      if (j > 0) {
         codes.length = j;
         var charLength = codes.length;
         for (var index = 0; index < charLength; index++) {
            result.push(String.fromCharCode(codes[index]));
         }
      }
      return result.join("");
   }

   //==========================================================
   // <T>删除字符串中的指定字符。</T>
   //
   // @method
   // @param s:source:String 源字符串
   // @param t:target:String 目标字符串
   // @return String 删除后的字符串
   //==========================================================
   public static remove(value, t) {
      return value.replace(t, '');
   }

   /**
    * 删除字符串中的指定字符集合。
    *
    * @param value 字符串
    * @param removes 移除内容
    * @return 删除后的字符串
    */
   public static removeChars(value: string, removes: string) {
      if (value != null) {
         var count = value.length;
         var result = new Array();
         for (var i = 0; i < count; i++) {
            var char = value.charAt(i);
            if (removes.indexOf(char) != -1) {
               continue;
            }
            result[result.length] = char;
         }
         return result.join('');
      }
      return value;
   }
}
