import {Base} from './Base';
import {LoggerUtil} from './LoggerUtil';

/**
 * 测速工具类。
 *
 * @author maocy
 * @version 141229
 */
export class Speed extends Base {
   // @attribute
   public parameters;
   // 开始时间
   public _start: number;
   // 结束时间
   public _end: number;
   // 当前间隔
   public _current: number;
   // 执行间隔
   public _span: number;
   // 最小间隔
   public _spanMin: number;
   // 最大间隔
   public _spanMax: number;
   // 开始时间
   // public start = new Date().getTime();
   //public callerName = MO.Method.name(MO.TSpeed.caller);
   // public callerName;

   /**
    * 构造处理。
    */
   public constructor(...params: Array<any>) {
      super();
      // 设置属性
      this._start = 0;
      this._end = 0;
      this._span = 0;
      this._spanMin = Number.MAX_VALUE;
      this._spanMax = 0;
      this.parameters = arguments;
   }

   /**
    * 开始处理。
    */
   public begin() {
      this._start = new Date().getTime();
   }

   /**
    * 结束处理。
    */
   public end() {
      this._end = new Date().getTime();
      var current = this._current = this._end - this._start;
      this._span += current;
      if (current < this._spanMin) {
         this._spanMin = current;
      }
      if (current > this._spanMax) {
         this._spanMax = current;
      }
   }

   /**
    * 重置数据。
    */
   public reset() {
      this._start = 0;
      this._end = 0;
      this._span = 0;
   }

   /**
    * 记录运行信息。
    */
   public record() {
      var sp = new Date().getTime() - this._start;
      // LoggerUtil.debug(this, 'Speed test. (speed={2}, arguments={3})', this.callerName, sp, this.parameters);
      // this.parameters = null;
      // this.start = null;
      // this.callerName = null;
      // this.record = null;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString() {
      return this._current + '/' + this._span + ' (' + this._spanMin + ' - ' + this._spanMax + ')';
   }
}
