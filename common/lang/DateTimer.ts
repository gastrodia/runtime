//==========================================================
// <T>计时器。</T>
//
// @class
// @author maocy
// @version 150316
//==========================================================
export class DateTimer {
   public _count;
   public _startTime;
   public _beginTime;
   public _endTime;
   public _stopTime;
   public _span;
   public _spanSecond;
   public _lastTime;

   public constructor() {
      // @attribute
      this._count = 0;
      // @attribute
      this._startTime = 0;
      this._beginTime = 0;
      this._endTime = 0;
      this._stopTime = 0;
      // @attribute
      this._span = 0;
      this._spanSecond = 0;
      this._lastTime = 0;
   }

   //===========================================================
   // <T>配置处理。</T>
   //
   // @method
   //===========================================================
   public setup() {
      var n = new Date().getTime();
      this._startTime = n;
      this._beginTime = n;
      this._endTime = n;
   }

   //===========================================================
   // <T>获得当前时间。</T>
   //
   // @method
   // @return Number 时间
   //===========================================================
   public current() {
      return this._lastTime;
   }

   //===========================================================
   // <T>获得速率(次/秒)。</T>
   //
   // @method
   // @return Number 速率
   //===========================================================
   public rate() {
      if (this._count == 0) {
         return 0;
      }
      var t = this._lastTime - this._startTime;
      var c = this._count * 1000 / t;
      return parseInt(c as any);
   }

   //===========================================================
   // <T>更新处理。</T>
   //
   // @method
   //===========================================================
   public update() {
      this._count++;
      var b = this._beginTime = this._endTime;
      var e = this._endTime = new Date().getTime();
      var s = this._span = e - b;
      this._spanSecond = s / 1000;
   }
}
