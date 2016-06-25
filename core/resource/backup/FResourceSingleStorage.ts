import {FResourceStorage} from './FResourceStorage';

//==========================================================
// <T>资源存储。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
export class FResourceSingleStorage extends FResourceStorage {
   //o = MO.Class.inherits(this, o, MO.FResourceStorage, MO.MResourceData);

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param buffer:ArrayBuffer 数据
   //==========================================================
   public load(buffer) {
      var o = this;
      var resource = o._resource;
      //o._compressLength = buffer.byteLength;
      //o._compressData = new Uint8Array(buffer);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public complete() {
      var o = this;
      //var resource = o._resource;
      //resource.onComplete(o._data);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      //o.__base.MResourceData.dispose.call(o);
      //o.__base.FResourceStorage.dispose.call(o);
   }
}
