//==========================================================
// <T>声音。</T>
//
// @class
// @author maocy
// @history 150526
//==========================================================
export class MAudio {
   //o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @attribute
   //o._ready = MO.Class.register(o, new MO.AGetterSource('_ready', 'testReady'), false);
   //o._loaded = MO.Class.register(o, new MO.AGetterSource('_loaded', 'testLoaded'), false);
   //o._finish = MO.Class.register(o, new MO.AGetterSource('_finish', 'testFinish'), false);
   // @attribute
   //o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   //..........................................................
   // @method
   //o.construct = MO.MAudio_construct;
   // @method
   //o.volume = MO.MAudio_volume;
   //o.setVolume = MO.MAudio_setVolume;
   //o.loop = MO.MAudio_loop;
   //o.setLoop = MO.MAudio_setLoop;
   //o.play = MO.MAudio_play;
   //o.pause = MO.MAudio_pause;
   // @method
   //o.dispose = MO.MAudio_dispose;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
   }

   //==========================================================
   // <T>获得音量。</T>
   //
   // @method
   // @return 音量
   //==========================================================
   public volume() {
      return 0;
   }

   //==========================================================
   // <T>设置音量。</T>
   //
   // @method
   // @param value:Number 设置音量
   //==========================================================
   public setVolume(value) {
   }

   //==========================================================
   // <T>获得循环。</T>
   //
   // @method
   // @return Boolean 循环
   //==========================================================
   public loop() {
      return false;
   }

   //==========================================================
   // <T>设置循环。</T>
   //
   // @method
   // @param value:Boolean 设置循环
   //==========================================================
   public setLoop(value) {
   }

   //==========================================================
   // <T>播放处理。</T>
   //
   // @method
   //==========================================================
   public play(position) {
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return 是否准备好
   //==========================================================
   public pause() {
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      //o.__base.MListener.dispose.call(o);
   }
}
