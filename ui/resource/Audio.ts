import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {ObjectBase} from '../../common/lang/ObjectBase';
import {ServiceUtil} from '../../core/ServiceUtil';
import {EnvironmentService} from '../../core/service/EnvironmentService';
import {DeviceService} from '../service/DeviceService';
import {HtmlUtil} from '../util/HtmlUtil';

//==========================================================
// <T>声音。</T>
//
// @class
// @author maocy
// @history 150526
//==========================================================
export class Audio extends ObjectBase {
   // 地址
   protected _url: string = null;
   // 句柄
   protected _hAudio = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>加载处理。</T>
   //==========================================================
   public ohLoad() {
      var linker = (this as any).__linker;
      linker._ready = true;
      linker._hAudio.oncanplay = null;
      LoggerUtil.info(linker, 'Audio load success. (url={1})', linker._url);
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //==========================================================
   public ohLoaded(event) {
      var linker = (this as any).__linker;
      linker._ready = true;
      linker._loaded = true;
      linker._finish = true;
      linker._hAudio.oncanplaythrough = null;
      LoggerUtil.info(linker, 'Audio loaded success. (url={1})', linker._url);
   }

   //==========================================================
   // <T>错误处理。</T>
   //==========================================================
   public ohError(event) {
      var linker = (this as any).__linker;
      linker._finish = true;
      LoggerUtil.error(linker, 'Audio load failure. (url={1})', linker._url);
   }

   //==========================================================
   // <T>获得音量。</T>
   //
   // @return 音量
   //==========================================================
   public get volume() {
      return this._hAudio.volume;
   }

   //==========================================================
   // <T>设置音量。</T>
   //
   // @param value 设置音量
   //==========================================================
   public set volume(value) {
      this._hAudio.volume = value;
   }

   //==========================================================
   // <T>获得循环。</T>
   //
   // @return 循环
   //==========================================================
   public loop() {
      return this._hAudio.loop;
   }

   //==========================================================
   // <T>设置循环。</T>
   //
   // @param value 设置循环
   //==========================================================
   public setLoop(value) {
      this._hAudio.loop = value;
   }

   //==========================================================
   // <T>播放处理。</T>
   //
   // @param position 位置
   //==========================================================
   public play(position) {
      var hAudio = this._hAudio;
      if (position != null) {
         if (hAudio.currentTime != position) {
            hAudio.currentTime = position;
         }
      }
      hAudio.play();
      LoggerUtil.debug(this, 'Audio play. (url={1}, position={2})', this._url, position);
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public pause() {
      this._hAudio.pause();
      LoggerUtil.debug(this, 'Audio pause. (url={1})', this._url);
   }

   //==========================================================
   // <T>加载网络地址资源。</T>
   //
   // @param uri 网络地址
   //==========================================================
   public loadUrl(uri) {
      var url = ServiceUtil.find(EnvironmentService).parseUrl(uri);
      // 创建图片
      var hAudio = this._hAudio;
      if (!hAudio) {
         hAudio = this._hAudio = new Audio();
         hAudio.__linker = this;
         hAudio.oncanplay = this.ohLoad;
         hAudio.oncanplaythrough = this.ohLoaded;
         hAudio.onerror = this.ohError;
         hAudio.loop = false;
      }
      // 不支持声音完成检测
      var deviceService: DeviceService = ServiceUtil.find(DeviceService);
      if (!deviceService.capability.soundFinish) {
         //this._ready = true;
         //this._loaded = true;
         //this._finish = true;
      }
      // 加载图片
      this._url = url;
      hAudio.src = url;
   }

   //==========================================================
   // <T>选择处理。</T>
   //
   // @method
   //==========================================================
   public select() {
      this._hAudio.play();
      this._hAudio.pause();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 清空属性
      this._hAudio = HtmlUtil.dispose(this._hAudio);
      super.dispose();
   }
}
