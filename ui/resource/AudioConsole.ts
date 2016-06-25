import {Dictionary} from '../../common/lang/Dictionary';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Service} from '../../core/Service';
import {ServiceUtil} from '../../core/ServiceUtil';
import {EnvironmentService} from '../../core/service/EnvironmentService';
import {Audio} from './Audio';

//==========================================================
// <T>音乐资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
export class AudioConsole extends Service {
   // 声音集合
   protected _audios: Dictionary<Audio> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._scopeCd = ScopeEnum.Global;
      this._audios = new Dictionary<Audio>();
   }

   //==========================================================
   // <T>创建声音资源。</T>
   //
   // @param uri 网络地址
   // @return 资源对象
   //==========================================================
   public create(uri) {
      var url = ServiceUtil.find(EnvironmentService).parse(uri);
      var audio: Audio = ClassUtil.create(Audio);
      audio.loadUrl(url);
      return audio;
   }

   //==========================================================
   // <T>加载声音资源。</T>
   //
   // @param uri  网络地址
   // @return 资源对象
   //==========================================================
   public load(uri) {
      var audios = this._audios;
      var audio = audios.get(uri);
      if (!audio) {
         audio = this.create(uri);
         audios.set(uri, audio);
      }
      return audio;
   }

   //==========================================================
   // <T>选择处理。</T>
   //==========================================================
   public select() {
      var audios = this._audios;
      var count: number = audios.count();
      for (var i: number = 0; i < count; i++) {
         var audio = audios.at(i);
         audio.select();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 清空变量
      this._audios = ObjectUtil.dispose(this._audios);
      // 父处理
      super.dispose();
   }
}
