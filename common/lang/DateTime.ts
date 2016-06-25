import {ClassUtil} from '../reflect/ClassUtil';
import {DateUtil} from './DateUtil';
import {IntegerUtil} from './IntegerUtil';

//===========================================================
// 日期时间的工具类
//
// @tool
// @author maochunyang
// @version 1.0.1
//===========================================================
export class DateTime {
   //..........................................................
   // @attribute
   public date = null;
   public year = null;
   public month = null;
   public day = null;
   public hour = null;
   public minute = null;
   public second = null;
   public ms = null;

   //===========================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param date:Date 日期对象
   //===========================================================
   constructor(date: Date = null) {
      this.date = date ? date : new Date();
      this.refresh();
   }

   //===========================================================
   // <T>判断数据是否相等。</T>
   //
   // @method
   // @param date:Date 日期对象
   // @return Boolean 是否相等
   //===========================================================
   public quals(date) {
      return this.date.getTime() == date.date.getTime();
   }

   //===========================================================
   // <T>判断当前时间是否在指定时间之前。</T>
   //
   // @method
   // @param date:Date 日期对象
   // @return Boolean 是否之前
   //===========================================================
   public isBefore(date) {
      return this.date.getTime() < date.date.getTime();
   }

   //===========================================================
   // <T>判断当前时间是否在指定时间之后。</T>
   //
   // @method
   // @param date:Date 日期对象
   // @return Boolean 是否之后
   //===========================================================
   public isAfter(date) {
      return this.date.getTime() > date.date.getTime();
   }

   //===========================================================
   // <T>取得当前的月的天数。</T>
   //
   // @method
   // @return Integer 天数
   //===========================================================
   public monthDays() {
      return DateUtil.monthDays(this.year, this.month);
   }

   //===========================================================
   // <T>取得当前的周的天数。</T>
   //
   // @method
   // @return Integer 天数
   //===========================================================
   public monthWeekDay() {
      return (8 - (this.day - this.weekDay()) % 7) % 7;
   }

   //===========================================================
   // <T>接收数据。<T>
   //
   // @method
   //===========================================================
   public assign(value) {
      var o = this;
      o.date.setTime(value.date.getTime());
      o.refresh();
   }

   //===========================================================
   // <T>根据当前时间，数显时间变量。<T>
   //
   // @method
   //===========================================================
   public refresh() {
      var o = this;
      var date = o.date;
      if (date) {
         o.year = date.getFullYear();
         o.month = date.getMonth() + 1;
         o.day = date.getDate();
         o.hour = date.getHours();
         o.minute = date.getMinutes();
         o.second = date.getSeconds();
         o.ms = date.getMilliseconds();
      }
   }

   //===========================================================
   // <T>取得当前周的天数。</T>
   //
   // @method
   // @return Integer 天数
   //===========================================================
   public weekDay() {
      return this.date.getDay();
   }

   //===========================================================
   // <T>取得总秒数。</T>
   //
   // @method
   // @return Integer 总秒数
   //===========================================================
   public totalSecond() {
      return parseInt((this.date.getTime() / 1000) as any);
   }

   //===========================================================
   // <T>取得当日秒数。</T>
   //
   // @method
   // @return Integer 秒数
   //===========================================================
   public daySecond() {
      var o = this;
      return o.hour * 3600 + o.minute * 60 + o.second;
   }

   //===========================================================
   // <T>设置年。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   public setYear(value) {
      var o = this;
      o.date.setFullYear(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置月。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   public setMonth(value) {
      var o = this;
      o.date.setMonth(parseInt(value, 10) - 1);
      o.refresh();
   }

   //===========================================================
   // <T>设置天。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   public setDay(value) {
      var o = this;
      o.date.setDate(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置小时。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   public setHour(value) {
      var o = this;
      o.date.setHours(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置分钟。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   public setMinute(value) {
      var o = this;
      o.date.setMinutes(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置秒。</T>
   //
   // @method
   // @param value:Integer 内容
   //===========================================================
   public setSecond(value) {
      var o = this;
      o.date.setSeconds(value);
      o.refresh();
   }

   //===========================================================
   // <T>设置时间，并改变相应的时间变量。<T>
   //
   // @method
   // @param value:Date 日期对象
   //===========================================================
   public setDate(value) {
      var o = this;
      o.date = value;
      o.refresh();
   }

   //===========================================================
   // <T>设定为当前时间。<T>
   //
   // @method
   //===========================================================
   public setNow() {
      var o = this;
      o.date = new Date();
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的年数。</T>
   //
   // @method
   // @param value:Integer 年数
   //===========================================================
   public addYear(value) {
      var o = this;
      var year = o.date.getFullYear();
      o.date.setFullYear(year + IntegerUtil.nvl(value, 1));
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的月数。<T>
   //
   // @method
   // @param value:Integer 月数
   //===========================================================
   public addMonth(value) {
      var o = this;
      var month = o.date.getMonth();
      o.date.setMonth(month + IntegerUtil.nvl(value, 1));
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的天数。<T>
   //
   // @method
   // @param value:Integer 天数
   //===========================================================
   public addDay(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time + (1000 * 60 * 60 * 24 * IntegerUtil.nvl(value, 1));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的小时。<T>
   //
   // @method
   // @param value:Integer 小时
   //===========================================================
   public addHour(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time + (1000 * 60 * 60 * IntegerUtil.nvl(value, 1));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的分钟。<T>
   //
   // @method
   // @param value:Integer 分钟
   //===========================================================
   public addMinute(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time + (1000 * 60 * IntegerUtil.nvl(value, 1));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的秒数。<T>
   //
   // @method
   // @param value:Integer 秒数
   //===========================================================
   public addSecond(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time + (1000 * IntegerUtil.nvl(value, 1));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>增加指定的毫秒。<T>
   //
   // @method
   // @param value:Integer 毫秒数
   //===========================================================
   public add(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time + IntegerUtil.nvl(value, 1);
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>截取掉天时间。<T>
   //
   // @method
   // @param value:Integer 天数
   //===========================================================
   public truncDay(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time - (time % (1000 * 60 * 60 * 24 * IntegerUtil.nvl(value, 1)));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>截取掉小时时间。<T>
   //
   // @method
   // @param value:Integer 小时数
   //===========================================================
   public truncHour(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time - (time % (1000 * 60 * 60 * IntegerUtil.nvl(value, 1)));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>截取掉分钟时间。<T>
   //
   // @method
   // @param value:Integer 分钟数
   //===========================================================
   public truncMinute(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time - (time % (1000 * 60 * IntegerUtil.nvl(value, 1)));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>截取掉秒时间。<T>
   //
   // @method
   // @param value:Integer 秒数
   //===========================================================
   public truncSecond(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time - (time % (1000 * IntegerUtil.nvl(value, 1)));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>截取掉毫秒时间。<T>
   //
   // @method
   // @param value:Integer 毫秒数
   //===========================================================
   public trunc(value) {
      var o = this;
      var time = o.date.getTime();
      var tick = time - (time % IntegerUtil.nvl(value, 1));
      o.date.setTime(tick);
      o.refresh();
   }

   //===========================================================
   // <T>获得数据。<T>
   //
   // @method
   // @return Integer 数据
   //===========================================================
   public get(value) {
      return this.date.getTime();
   }

   //===========================================================
   // <T>设置数据。<T>
   //
   // @method
   // @param value:Integer 数据
   //===========================================================
   public set(value) {
      var o = this;
      o.date.setTime(value);
      o.refresh();
   }

   //===========================================================
   // <T>根据格式解析时间字符串。</T>
   //
   // @method
   // @param value:String 字符串
   // @param format:String 格式
   //===========================================================
   public parse(value, format) {
      return DateUtil.parse(this, value, format);
   }

   //===========================================================
   // <T>根据格式解析时间字符串。</T>
   //
   // @method
   // @param value:String 字符串
   //===========================================================
   public parseAuto(value) {
      return DateUtil.autoParse(this, value);
   }

   //===========================================================
   // <T>根据指定格式格式化时间。</T>
   //
   // @method
   // @param format 格式
   // @return String 字符串
   //===========================================================
   public format(format) {
      return DateUtil.formatDate(this, format);
   }

   //===========================================================
   // <T>复制当前对象为新对象。</T>
   //
   // @method
   // @return TDate 时间
   //===========================================================
   public clone() {
      var value = new Date();
      value.setTime(this.date.getTime());
      return new DateTime(value);
   }

   //===========================================================
   // <T>获得运行时字符串。</T>
   //
   // @method
   // @return String 字符串
   //===========================================================
   public dump() {
      return ClassUtil.dump(this) + ' ' + DateUtil.formatDate(this);
   }
}
