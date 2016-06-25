import {Vector4} from './Vector4';

//==========================================================
// <T>四维坐标。</T>
//
// @struct
// @author maocy
// @version 150119
//==========================================================
export class Point4 extends Vector4 {
   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public serialize3(p) {
      var o = this;
      p.writeFloat(o.x);
      p.writeFloat(o.y);
      p.writeFloat(o.z);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public unserialize3(p) {
      var o = this;
      o.x = p.readFloat();
      o.y = p.readFloat();
      o.z = p.readFloat();
   }
}
