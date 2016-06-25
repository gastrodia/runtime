import {Loader} from '../service/Loader';

//==========================================================
// <T>资源加载器。</T>
//
// @class
// @author maocy
// @version 160122
//==========================================================
export class ResourceLoader extends Loader {
   //o._resource = MO.Class.register(o, new MO.AGetSet('_resource'));
   //o._url = MO.Class.register(o, new MO.AGetSet('_url'));
   // @attribute
   //o._statusLoading = MO.Class.register(o, new MO.AGetter('_statusLoading'));
   //protected _statusLoading: boolean = false;
   // @attribute
   //o._loadListeners = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));

   //==========================================================
   // <T>数据处理。</T>
   //==========================================================
   public process(): void {
      // 加载内容
      this.content.load(this);
   }

   // //==========================================================
   // // <T>加载处理。</T>
   // //
   // // @method
   // //==========================================================
   // public load() {
   //    this._statusLoading = true;
   // }

   // //==========================================================
   // // <T>完成处理。</T>
   // //
   // // @method
   // //==========================================================
   // public complete() {
   //    this._statusLoading = false;
   //    // 加载事件处理
   //    // this.processLoadListener();
   // }
}
