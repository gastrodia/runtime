//==========================================================
// <T>矩形结构。</T>
//
// @struct
// @author maocy
// @version 150130
//==========================================================
export class Rectangle {
   // protected left: number = 0;
   // protected top: number = 0;
   // protected width: number = 0;
   // protected height: number = 0;

   // //============================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // // @param l:width:Number 宽度
   // // @param t:height:Number 高度
   // // @param r:deep:Number 深度
   // // @param b:deep:Number 深度
   // //============================================================
   // constructor(left: number = 0, top: number = 0, width: number = 0, height: number = 0) {
   //    this.left = left;
   //    this.top = top;
   //    this.width = width;
   //    this.height = height;
   // }

   // //============================================================
   // // <T>获得右位置。</T>
   // //
   // // @method
   // // @return Number 右位置
   // //============================================================
   // public right() {
   //    return this.left + this.width;
   // }

   // //============================================================
   // // <T>获得下位置。</T>
   // //
   // // @method
   // // @return Number 下位置
   // //============================================================
   // public bottom() {
   //    return this.top + this.height;
   // }

   // //============================================================
   // // <T>测试是否为空。</T>
   // //
   // // @method
   // // @return Boolean 是否为空
   // //============================================================
   // public isEmpty() {
   //    var o = this;
   //    if ((o.width > 0) && (o.height > 0)) {
   //       return false;
   //    }
   //    return true;
   // }

   // //============================================================
   // // <T>测试是否在范围内。</T>
   // //
   // // @method
   // // @param x:Number 横坐标
   // // @param y:Number 纵坐标
   // // @return Boolean 是否在范围内
   // //============================================================
   // public testRange(x, y) {
   //    var o = this;
   //    if (x < o.left) {
   //       return false;
   //    }
   //    if (y < o.top) {
   //       return false;
   //    }
   //    if (x - o.left > o.width) {
   //       return false;
   //    }
   //    if (y - o.top > o.height) {
   //       return false;
   //    }
   //    return true;
   // }

   // //============================================================
   // // <T>测试是否在范围内。</T>
   // //
   // // @method
   // // @param value:SRectangle 矩形
   // // @return Boolean 是否在范围内
   // //============================================================
   // public testRectangle(value) {
   //    var o = this;
   //    return (o.left < value.left + value.width && o.left + o.width > value.left && o.top < value.top + value.height && o.top + o.height > value.top);
   // }

   // //============================================================
   // // <T>重置数据。</T>
   // //
   // // @method
   // //============================================================
   // public reset() {
   //    this.left = 0;
   //    this.top = 0;
   //    this.width = 0;
   //    this.height = 0;
   // }

   // //============================================================
   // // <T>接收一个矩形数据。</T>
   // //
   // // @method
   // // @param value:SRectangle 矩形
   // //============================================================
   // public assign(value) {
   //    this.left = value.left;
   //    this.top = value.top;
   //    this.width = value.width;
   //    this.height = value.height;
   // }

   // //============================================================
   // // <T>设置位置。</T>
   // //
   // // @method
   // // @param left:Number 左位置
   // // @param top:Number 上位置
   // //============================================================
   // public setLocation(left, top) {
   //    this.left = left;
   //    this.top = top;
   // }

   // //============================================================
   // // <T>设置大小。</T>
   // //
   // // @method
   // // @param width:Number 宽度
   // // @param height:Number 高度
   // //============================================================
   // public setSize(width, height) {
   //    this.width = width;
   //    this.height = height;
   // }

   // //============================================================
   // // <T>设置位置和大小。</T>
   // //
   // // @method
   // // @param location:SPoint2 位置
   // // @param size:SSize2 位置
   // //============================================================
   // public setLocationSize(location, size) {
   //    this.left = location.x;
   //    this.top = location.y;
   //    this.width = size.width;
   //    this.height = size.height;
   // }

   // //============================================================
   // // <T>设置位置和大小。</T>
   // //
   // // @method
   // // @param left:Number 左位置
   // // @param top:Number 上位置
   // // @param width:Number 宽度
   // // @param height:Number 高度
   // //============================================================
   // public set(left, top, width, height) {
   //    this.left = left;
   //    this.top = top;
   //    this.width = width;
   //    this.height = height;
   // }

   // //============================================================
   // // <T>获得字符串。</T>
   // //
   // // @return String 字符串
   // //============================================================
   // public toString() {
   //    return this.left + ',' + this.top + ',' + this.width + ',' + this.height;
   // }

   // //============================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //============================================================
   // public dispose() {
   //    this.left = null;
   //    this.top = null;
   //    this.width = null;
   //    this.height = null;
   // }
}
