//==========================================================
// <T>计时管理类。</T>
//
// @reference
// @author maocy
// @version 150106
//==========================================================
export class Timer {

   public _startTime;
   public _lastTime;
   public _count;
   public interval;

   public constructor() {
      this._startTime = 0;
      this._lastTime = 0;
      this._count = 0;
   }

   //===========================================================
   // <T>配置处理。</T>
   //
   // @method
   //===========================================================
   public setup() {
      var tick = new Date().getTime();
      this._startTime = tick;
      this._lastTime = tick;
      this.interval = 0;
   }

   //====================================1=======================
   // <T>获得现在时刻。</T>
   //
   // @method
   // @return Number 时刻
   //===========================================================
   public now() {
      return new Date().getTime();
   }

   //===========================================================
   // <T>获得当前时间。</T>
   //
   // @method
   // @return Number 时间
   //===========================================================
   public get length() {
      return this._lastTime - this._startTime;
   }

   //===========================================================
   // <T>获得当前时间。</T>
   //
   // @method
   // @return Number 时间
   //===========================================================
   public get current() {
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
      var tick = new Date().getTime();
      this._count++;
      this.interval = tick - this._lastTime;
      this._lastTime = tick;
   }
}
