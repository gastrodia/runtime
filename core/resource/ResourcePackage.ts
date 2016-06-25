import {ResourceObject} from './ResourceObject';

//==========================================================
// <T>资源打包。</T>
//
// @class
// @author maocy
// @version 150727
//==========================================================
export class ResourcePackage extends ResourceObject {
   //..........................................................
   // @attribute
   //o._uri = MO.Class.register(o, new MO.AGetSet('_uri'));
   //o._url = MO.Class.register(o, new MO.AGetter('_url'));
   // @attribute
   //protected _statusReady: boolean = false;
   // @attribute
   public loader: any = null;

   //==========================================================
   // <T>初始化处理。</T>
   //
   // @method
   //==========================================================
   public onLoad(event) {
      //var o = this;
      // 反序列化数据
      //o.unserializeBuffer(event.content, true);
      // 设置标志
      //o._statusReady = true;
      //MO.Logger.debug(o, 'Load resource package success. (url={1})', o._url);
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   //public testReady() {
   //   return this._statusReady;
   //}

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   public load() {
      //var o = this;
      //common.RAssert.debugFalse(o._statusReady);
      // 获得地址
      //var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parseUrl(o._uri);
      // 加载数据
      //var connection = MO.Console.find(MO.FHttpConsole).sendAsync(url);
      //connection.addLoadListener(o, o.onLoad);
      //return connection;
   }
}
