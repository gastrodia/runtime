//==========================================================
// <T>计时管理类。</T>
//
// @reference
// @author maocy
// @version 150106
//==========================================================
export class TimerUtil {
   // 开始时间
   public static _startTime: number;
   public static _lastTime: number;
   public static _count: number;
   public static interval: number;

   //===========================================================
   // <T>构造处理。</T>
   //===========================================================
   public static initialize() {
      var tick = new Date().getTime();
      this._startTime = tick;
      this._lastTime = tick;
      this.interval = 0;
   }

   //===========================================================
   // <T>构造处理。</T>
   //===========================================================
   public static setup() {
      this.initialize();
   }

   //===========================================================
   // <T>获得现在时刻。</T>
   //
   // @return Number 时刻
   //===========================================================
   public static now() {
      return new Date().getTime();
   }

   //===========================================================
   // <T>获得当前时间。</T>
   //
   // @return 时间
   //===========================================================
   public static get current() {
      return this._lastTime;
   }

   //===========================================================
   // <T>获得经过时间。</T>
   //
   // @return Number 时间
   //===========================================================
   public static get elapsed() {
      return this._lastTime - this._startTime;
   }

   //===========================================================
   // <T>更新处理。</T>
   //===========================================================
   public static update() {
      var tick = new Date().getTime();
      this._count++;
      this.interval = tick - this._lastTime;
      this._lastTime = tick;
   }
}
TimerUtil.initialize();
