import {Vector2} from './Vector2';

//==========================================================
// <T>二维轮廓。</T>
//
// @struct
// @author maocy
// @version 150912
//==========================================================
export class Outline2 {
   //..........................................................
   // @attribute
   public min: Vector2 = new Vector2();
   public max: Vector2 = new Vector2();

   //============================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //============================================================
   public isEmpty(p) {
      // return this.min.isEmpty() && this.max.isEmpty();
   }

   //============================================================
   // <T>接收一个三维轮廓。</T>
   //
   // @method
   // @param value:SOutline2 三维轮廓
   //============================================================
   public assign(value) {
      this.min.assign(value.min);
      this.max.assign(value.max);
   }

   //==========================================================
   // <T>设置最小轮廓。</T>
   //
   // @method
   //==========================================================
   public setMin() {
      // this.min.setMax();
      // this.max.setMin();
   }

   //==========================================================
   // <T>设置最大轮廓。</T>
   //
   // @method
   //==========================================================
   public setMax() {
      // this.min.setMin();
      // this.max.setMax();
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param ix:minX:Number 最小X坐标
   // @param iy:minY:Number 最小Y坐标
   // @param ax:maxX:Number 最大X坐标
   // @param ay:maxY:Number 最大Y坐标
   //==========================================================
   public set(minX, minY, maxX, maxY) {
      this.min.set(minX, minY);
      this.max.set(maxX, maxY);
   }

   //==========================================================
   // <T>合并最小轮廓。</T>
   //
   // @method
   // @param p:outline:SOutline 轮廓
   //==========================================================
   public mergeMin(p) {
      // this.min.mergeMax(p.min);
      // this.max.mergeMin(p.max);
   }

   //==========================================================
   // <T>合并最大轮廓。</T>
   //
   // @method
   // @param p:outline:SOutline 轮廓
   //==========================================================
   public mergeMax(p) {
      // this.min.mergeMin(p.min);
      // this.max.mergeMax(p.max);
   }

   //==========================================================
   // <T>合并最大轮廓。</T>
   //
   // @method
   // @param x:Number 横坐标
   // @param y:Number 纵坐标
   //==========================================================
   public mergeMax2(x, y) {
      // this.min.mergeMin2(x, y);
      // this.max.mergeMax2(x, y);
   }

   //==========================================================
   // <T>合并点。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   public mergePoint(x, y, z) {
      //this.min.mergeMin3(x, y, z);
      //this.max.mergeMax3(x, y, z);
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public serialize(p) {
      // this.min.serialize(p);
      // this.max.serialize(p);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public unserialize(p) {
      // this.min.unserialize(p);
      // this.max.unserialize(p);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      return '(' + this.min + ')-(' + this.max + ')';
   }
}
