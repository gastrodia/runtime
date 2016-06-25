import {Dictionary} from '../../common/lang/Dictionary';
import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {ObjectBase} from '../../common/lang/ObjectBase';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {ServiceUtil} from '../../core/ServiceUtil';
import {EnvironmentService} from '../../core/service/EnvironmentService';
import {Audio} from './Audio';
import {AudioBuffer} from './AudioBuffer';

//==========================================================
// <T>音频环境。</T>
//
// @author sunpeng
// @history 150714
//==========================================================
export class AudioContext extends ObjectBase {
   //..........................................................
   // @attribute
   //o._handle = MO.Class.register(o, new MO.AGetter('_handle'));
   protected _handle = null;
   // @attribute
   //o._buffers = MO.Class.register(o, new MO.AGetter('_buffers'));
   protected _buffers: Dictionary<any> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._buffers = new Dictionary<any>();
   }

   //==========================================================
   // <T>创建声音资源。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return AudioBufferSourceNode 音频缓冲
   //==========================================================
   public setup(uri) {
      var o = this;
      // 设置属性
      //o._audioBuffers = new FDictionary();
      // 创建环境
      var context = null;
      if ((window as any).AudioContext) {
         context = new AudioContext();
      } else if ((window as any).webkitAudioContext) {
         context = new (window as any).webkitAudioContext();
      }
      if (!context) {
         return LoggerUtil.error(o, 'Invalid audio context.');
      }
      o._handle = context;
   }

   //==========================================================
   // <T>检查音频是否加载完成。</T>
   //
   // @method
   // @param uri:String 网络地址
   // @return bool 是否已加载
   //==========================================================
   public createBuffer(uri) {
      var o = this;
      var url = ServiceUtil.find(EnvironmentService).parse(uri);
      // 创建缓冲
      var buffer = null;
      o._handle = null;
      if (o._handle) {
         buffer = ClassUtil.create(AudioBuffer);
         buffer.setContext(o);
      } else {
         buffer = ClassUtil.create(Audio);
      }
      buffer.loadUrl(url);
      return buffer;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._buffers = ObjectUtil.dispose(this._buffers);
      // 父处理
      super.dispose();
   }
}
