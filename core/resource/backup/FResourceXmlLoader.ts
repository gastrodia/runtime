import {ResourceLoader} from '../ResourceLoader';

//==========================================================
// <T>资源XML加载器。</T>
//
// @class
// @author maocy
// @version 160122
//==========================================================
export class FResourceXmlLoader extends ResourceLoader {
   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   public onLoad(event) {
      var o = this;
      // 加载配置
      //var xconfig = event.root;
      //o._resource.loadConfig(xconfig);
      // 完成处理
      //o.complete();
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   public load() {
      //var o = this;
      //o.__base.FResourceLoader.load.call(o);
      // 加载处理
      //var connection = MO.Console.find(MO.FXmlConsole).send(o._url);
      //connection.addLoadListener(o, o.onLoad);
   }
}
