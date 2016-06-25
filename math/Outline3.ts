import {Vector3} from './Vector3';

//==========================================================
// <T>三维轮廓。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
export class Outline3 {
   // 最小点
   public min: Vector3 = new Vector3();
   // 最大点
   public max: Vector3 = new Vector3();

   //============================================================
   // <T>判断是否为空。</T>
   //
   // @return  是否为空
   //============================================================
   public isEmpty(): boolean {
      // return this.min.isEmpty() && this.max.isEmpty();
      return false;
   }

   //============================================================
   // <T>接收一个三维轮廓。</T>
   //
   // @param value 三维轮廓
   //============================================================
   public assign(value: Outline3) {
      this.min.assign(value.min);
      this.max.assign(value.max);
   }

   //==========================================================
   // <T>设置最小轮廓。</T>
   //==========================================================
   public setMin() {
      // this.min.setMax();
      // this.max.setMin();
   }

   //==========================================================
   // <T>设置最大轮廓。</T>
   //==========================================================
   public setMax() {
      // this.min.setMin();
      // this.max.setMax();
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @param minX 最小X坐标
   // @param minY 最小Y坐标
   // @param minZ 最小Z坐标
   // @param maxX 最大X坐标
   // @param maxY 最大Y坐标
   // @param maxZ 最大Z坐标
   //==========================================================
   public set(minX, minY, minZ, maxX, maxY, maxZ) {
      this.min.set(minX, minY, minZ);
      this.max.set(maxX, maxY, maxZ);
   }

   //==========================================================
   // <T>合并最小轮廓。</T>
   //
   // @param outline  轮廓
   //==========================================================
   public mergeMin(outline) {
      // this.min.mergeMax(outline.min);
      // this.max.mergeMin(outline.max);
   }

   //==========================================================
   // <T>合并最大轮廓。</T>
   //
   // @param outline 轮廓
   //==========================================================
   public mergeMax(outline) {
      // this.min.mergeMin(outline.min);
      // this.max.mergeMax(outline.max);
   }

   //==========================================================
   // <T>合并点。</T>
   //
   // @param x X坐标
   // @param y Y坐标
   // @param z Z坐标
   //==========================================================
   public mergePoint(x, y, z) {
      // this.min.mergeMin3(x, y, z);
      // this.max.mergeMax3(x, y, z);
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @param output 数据流
   //==========================================================
   public serialize(output) {
      // this.min.serialize(output);
      // this.max.serialize(output);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @param input  数据流
   //==========================================================
   public unserialize(input) {
      // this.min.unserialize(input);
      // this.max.unserialize(input);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return 字符串
   //============================================================
   public toString() {
      return '(' + this.min + ')-(' + this.max + ')';
   }
}
