import {DateTime} from './DateTime';
import {IntegerUtil} from './IntegerUtil';
import {StringUtil} from './StringUtil';

//===========================================================
// <T>日期时间的操作类。</T>
//
// @reference
// @author maocy
// @version 150619
//===========================================================
export class DateUtil {
   //..........................................................
   // @constant
   public static MinYear = 1800;
   public static MaxYear = 2400;
   public static Pattern = 'n-: /';
   public static Chars = '0123456789-:/';
   public static DisplayFormat = 'yyyy-mm-dd hh24:mi:ss';
   public static DataFormat = 'yyyymmddhh24miss';
   public static MonthDays = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
   // o.DaySeconds    = 1000// 60// 60// 24;
   public static Parts = new Array('YYYY', 'MM', 'DD', 'HH24', 'MI', 'SS');
   public static PartsDefine = { 'YYYY': ['Year', 4], 'MM': ['Month', 2], 'DD': ['Day', 2], 'HH24': ['Hour', 2], 'MI': ['Minute', 2], 'SS': ['Second', 2] };

   //===========================================================
   // <T>获得非空日期。</T>
   //
   // @method
   // @param value:Object 日期
   // @return TDate 日期
   //===========================================================
   public static nvl(value) {
      return value ? value : new DateTime();
   }

   //===========================================================
   // <T>以某个格式格式化时间日期对象。</T>
   //
   // @method
   // @param format:String 格式化模板
   // @return String 字符串
   //===========================================================
   public static format(format) {
      return this.formatDate(new DateTime(), format);
   }

   //===========================================================
   // <T>以指定格式格式化时间日期对象。</T>
   //
   // @method
   // @param date:TDate 时间
   // @param format:String 格式
   // @return String 字符串
   //===========================================================
   public static formatText(date, format) {
      if (!date) {
         return false;
      }
      var value = format.toLowerCase();
      // 替换年份
      value = value.replace(/yyyy/g, date.substring(0, 4));
      date = date.substring(4);
      // 替换月份
      value = value.replace(/mm/g, date.substring(0, 2));
      date = date.substring(2);
      // 替换天
      value = value.replace(/dd/g, date.substring(0, 2));
      date = date.substring(2);
      // 替换小时
      value = value.replace(/hh24/g, date.substring(0, 4));
      date = date.substring(4);
      value = value.replace(/mi/g, date.substring(0, 2));
      date = date.substring(2);
      value = value.replace(/ss/g, date.substring(0, 2));
      date = date.substring(2);
      return value;
   }

   //===========================================================
   // <T>以指定格式格式化时间日期对象。</T>
   //
   // @method
   // @param date:TDate 时间
   // @param format:String 格式
   // @return String 字符串
   //===========================================================
   public static formatDate(date, format: string = null) {
      if (!date) {
         return '';
      }
      var value = format ? format.toLowerCase() : this.DataFormat;
      value = value.replace(/yyyy/g, IntegerUtil.format(date.year, 4));
      value = value.replace(/yy/g, IntegerUtil.format(date.year % 100, 2));
      value = value.replace(/mm/g, IntegerUtil.format(date.month, 2));
      value = value.replace(/dd/g, IntegerUtil.format(date.day, 2));
      value = value.replace(/hh24/g, IntegerUtil.format(date.hour, 2));
      value = value.replace(/mi/g, IntegerUtil.format(date.minute, 2));
      value = value.replace(/ss/g, IntegerUtil.format(date.second, 2));
      value = value.replace(/ms/g, IntegerUtil.format(date.ms, 3));
      return value;
   }

   //===========================================================
   // <T>计算指定年月的天数。</T>
   //
   // @method
   // @param year:Integer 年
   // @param month:Integer 月
   // @return Integer 天数
   //===========================================================
   public static monthDays(year, month) {
      if (!year || !month) {
         return 0;
      }
      year = parseInt(year);
      month = parseInt(month);
      if (month == 2) {
         return (((year % 4 == 0) || (year % 400 == 0)) && (year % 100 != 0)) ? 29 : 28;
      }
      return this.MonthDays[month];
   }

   //===========================================================
   // <T>根据指定格式分割时间字符串。</T>
   //
   // @method
   // @param value:String 时间字符串
   // @param format:String 格式化模板
   // @return Array 项目集合
   //===========================================================
   public static splitFormat(value, format): any {
      if (!value) {
         return false;
      }
      format = format.toLowerCase();
      var items = new Array();
      while (format.length > 0) {
         if (format.indexOf('yyyy') == 0) {
            items['year'] = value.substring(0, 4);
            format = format.substring(4);
            value = value.substring(4);
         } else if (format.indexOf('mm') == 0) {
            items['month'] = value.substring(0, 2);
            format = format.substring(2);
            value = value.substring(2);
         } else if (format.indexOf('dd') == 0) {
            items['day'] = value.substring(0, 2);
            format = format.substring(2);
            value = value.substring(2);
         } else if (format.indexOf('hh24') == 0) {
            items['hour'] = value.substring(0, 2);
            format = format.substring(4);
            value = value.substring(2);
         } else if (format.indexOf('mi') == 0) {
            items['minute'] = value.substring(0, 2);
            format = format.substring(2);
            value = value.substring(2);
         } else if (format.indexOf('ss') == 0) {
            items['second'] = value.substring(0, 2);
            format = format.substring(2);
            value = value.substring(2);
         } else if (format.indexOf('ms') == 0) {
            items['ms'] = value.substring(0, 2);
            format = format.substring(2);
            value = value.substring(3);
         } else {
            format = format.substring(1);
            value = value.substring(1);
         }
      }
      return items;
   }

   //===========================================================
   // <T>根据字符串自动分割时间。</T>
   //
   // @method
   // @param date:TDate 时间
   // @param value:String 字符串
   //===========================================================
   public static splitTime(date, value) {
      if (!value) {
         return;
      }
      if (value.indexOf(':') != -1) {
         var items = value.split(':');
         if (items.length >= 1) {
            date.hour = IntegerUtil.parse(items[0]);
         }
         if (items.length >= 2) {
            date.minute = IntegerUtil.parse(items[1]);
         }
         if (items.length >= 3) {
            date.second = IntegerUtil.parse(items[2]);
         }
      } else if (value.length == 6) {
         date.hour = IntegerUtil.parse(value.substr(0, 2));
         date.minute = IntegerUtil.parse(value.substr(2, 2));
         date.second = IntegerUtil.parse(value.substr(4, 2));
      } else if (value.length == 4) {
         date.hour = IntegerUtil.parse(value.substr(0, 2));
         date.minute = IntegerUtil.parse(value.substr(2, 2));
      } else if (value.length == 2) {
         date.hour = IntegerUtil.parse(value.substr(0, 2));
      }
   }

   //===========================================================
   // <T>根据字符串自动分割日期。</T>
   //
   // @method
   // @param date:TDate 时间
   // @param value:String 字符串
   //===========================================================
   public static splitDate(date, value) {
      if (!value) {
         return;
      }
      if (value.indexOf('-') != -1 || value.indexOf('/') != -1) {
         var items = null;
         if (value.indexOf('-') != -1) {
            items = value.split('-');
         } else if (value.indexOf('/') != -1) {
            items = value.split('/');
         }
         if (items.length >= 1) {
            date.year = IntegerUtil.parse(items[0]);
         }
         if (items.length >= 2) {
            date.month = IntegerUtil.parse(items[1]);
         }
         if (items.length >= 3) {
            date.day = IntegerUtil.parse(items[2]);
         }
      } else if (value.indexOf(':') != -1) {
         this.splitTime(date, value);
      } else if (value.length == 14) {
         date.year = IntegerUtil.parse(value.substr(0, 4));
         date.month = IntegerUtil.parse(value.substr(4, 2));
         date.day = IntegerUtil.parse(value.substr(6, 2));
         date.hour = IntegerUtil.parse(value.substr(8, 2));
         date.minute = IntegerUtil.parse(value.substr(10, 2));
         date.second = IntegerUtil.parse(value.substr(12, 2));
      } else if (value.length == 8) {
         date.year = IntegerUtil.parse(value.substr(0, 4));
         date.month = IntegerUtil.parse(value.substr(4, 2));
         date.day = IntegerUtil.parse(value.substr(6, 2));
      } else if (value.length == 6) {
         date.year = IntegerUtil.parse(value.substr(0, 4));
         date.month = IntegerUtil.parse(value.substr(4, 2));
      } else if (value.length == 4) {
         date.year = IntegerUtil.parse(value);
      }
   }

   //===========================================================
   // <T>检查时间数字是否正确。</T>
   //
   // @method
   // @param items:items:String 检查的项目
   // @return Boolean 是否正确
   //===========================================================
   public static checkItems(items) {
      var o = this;
      if (!items) {
         return false;
      }
      var year = IntegerUtil.parse(items["year"]);
      if (year < o.MinYear || year > o.MaxYear) {
         return false;
      }
      var month = IntegerUtil.parse(items["month"]);
      if (month < 1 || month > 12) {
         return false;
      }
      var day = IntegerUtil.parse(items["day"]);
      if (day < 1 || day > o.monthDays(year, month)) {
         return false;
      }
      var hour = IntegerUtil.parse(items["hour"]);
      if (hour < 0 || hour > 23) {
         return false;
      }
      var second = IntegerUtil.parse(items["second"]);
      if (second < 0 || second > 59) {
         return false;
      }
      var ms = IntegerUtil.parse(items["ms"]);
      if (ms < 0 || ms > 99) {
         return false;
      }
      return true;
   }

   //===========================================================
   // <T>检查时间数字是否正确。</T>
   //
   // @method
   // @param value:String 日期字符串
   // @param format:String 格式化字符串
   // @return Boolean 是否正确
   //===========================================================
   public static check(value, format) {
      return this.checkItems(this.splitFormat(value, format));
   }

   //===========================================================
   // <T>生成日期对象。</T>
   //
   // @method
   // @param yyyy:Integer 年
   // @param mm:Integer 月
   // @param dd:Integer 天
   // @param hh:Integer 时
   // @param mi:Integer 分
   // @param ss:Integer 秒
   // @return TDate 日期
   //===========================================================
   public static make(yyyy, mm, dd, hh, mi, ss) {
      return new DateTime(new Date(yyyy, mm, dd));
   }

   //===========================================================
   // <T>生成日期对象。</T>
   //
   // @method
   // @param value:TDate 时间
   // @param items:Object 项目
   // @return TDate 返回日期时间
   //===========================================================
   public static makeDate(value, items) {
      var year = IntegerUtil.parse(items.year);
      var month = IntegerUtil.parse(items.month) - 1;
      var day = IntegerUtil.parse(items.day);
      var hour = IntegerUtil.parse(items.hour);
      var minute = IntegerUtil.parse(items.minute);
      var second = IntegerUtil.parse(items.second);
      var ms = IntegerUtil.parse(items.ms);
      var date = new Date(year, month, day, hour, minute, second, ms);
      if (value) {
         value.setDate(date);
         return value;
      }
      return new DateTime(date);
   }

   //===========================================================
   // <T>生成日期对象。</T>
   // 用时间模板从一个时间类型解析一个时间对象
   //
   // @method
   // @param date:date:Date 日期
   // @param value:value:Date 内容
   // @param format:String 格式
   // @return TDate 返回日期时间
   //===========================================================
   public static parse(date, value, format) {
      if (!format) {
         format = this.DataFormat;
      }
      var items = this.splitFormat(value, format);
      if (this.checkItems(items)) {
         return this.makeDate(date, items);
      }
      return null;
   }

   //===========================================================
   // <T>解析数据到时间对象内。</T>
   //
   // @method
   // @param date:TDate 日期
   // @param value:String 内容
   // @return boolean
   //===========================================================
   public static autoParse(date, value) {
      if (!value) {
         return null;
      }
      var o = this;
      date = o.nvl(date);
      var items = new Array();
      items['year'] = 2000;
      items['month'] = 1;
      items['day'] = 1;
      items['hour'] = 0;
      items['minute'] = 0;
      items['second'] = 0;
      value = StringUtil.trim(value);
      if (value.indexOf(' ') == -1) {
         o.splitDate(items, value);
      } else {
         var valueItems = value.split(' ');
         if (valueItems.length == 2) {
            o.splitDate(items, valueItems[0]);
            o.splitTime(items, valueItems[1]);
         }
      }
      if (o.checkItems(items)) {
         return o.makeDate(date, items);
      }
      return null;
   }
}
