import {IntegerUtil} from '../common/lang/IntegerUtil';
import {StringUtil} from '../common/lang/StringUtil';
import {ClassUtil} from '../common/reflect/ClassUtil';

//==========================================================
// <T>范围结构。</T>
//
// @struct
// @author maocy
// @version 141230
//==========================================================
export class Range {
   // public left: number = 0;
   // public top: number = 0;
   // public right: number = 0;
   // public bottom: number = 0;

   // //============================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // // @param l:width:Number 宽度
   // // @param t:height:Number 高度
   // // @param r:deep:Number 深度
   // // @param b:deep:Number 深度
   // //============================================================
   // public constructor(left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) {
   //    // Attribute
   //    this.left = left;
   //    this.top = top;
   //    this.right = right;
   //    this.bottom = bottom;
   // }

   // //============================================================
   // // <T>重置数据。</T>
   // //
   // // @method
   // //============================================================
   // public reset() {
   //    var o = this;
   //    o.left = 0;
   //    o.top = 0;
   //    o.right = 0;
   //    o.bottom = 0;
   // }

   // //============================================================
   // // 指定矩形坐标类
   // //
   // // @method
   // // @param rect:rectangle:rectangle 矩形对象
   // //============================================================
   // public assign(rect) {
   //    this.left = rect.left;
   //    this.top = rect.top;
   //    this.right = rect.right;
   //    this.bottom = rect.bottom;
   // }

   // //============================================================
   // // 指定当前矩形的四个坐标
   // //
   // // @method
   // //============================================================
   // public set(left, top, right, bottom) {
   //    this.left = left;
   //    this.top = top;
   //    this.right = right;
   //    this.bottom = bottom;
   // }

   // //============================================================
   // // 设定边框的位置
   // //
   // // @method
   // //============================================================
   // public setBounds(left, top, width, height) {
   //    var o = this;
   //    o.left = left;
   //    o.top = top;
   //    o.right = o.left + width - 1;
   //    o.bottom = o.top + height - 1;
   // }

   // //============================================================
   // // 取得宽度
   // //
   // // @method
   // //============================================================
   // public width() {
   //    return this.right - this.left + 1;
   // }

   // //============================================================
   // // 设定矩形宽度
   // //
   // // @method
   // // @param width:width:Integer 设置的宽度
   // //============================================================
   // public setWidth(width) {
   //    if (width) {
   //       this.right = this.left + width - 1;
   //    }
   // }

   // //============================================================
   // // 得到矩形的高度
   // //
   // // @method
   // //============================================================
   // public height() {
   //    return this.bottom - this.top + 1;
   // }

   // //============================================================
   // // 设定矩形的高度
   // //
   // // @method
   // //============================================================
   // public setHeight(height) {
   //    if (height) {
   //       this.bottom = this.top + height - 1;
   //    }
   // }

   // //============================================================
   // // 把矩形移动到某个位置
   // //
   // // @method
   // // @param x:xPosition:Integ
   // //============================================================
   // public move(x, y) {
   //    this.left += x;
   //    this.top += y;
   //    this.right += x;
   //    this.bottom += y;
   // }

   // //============================================================
   // // 放大指定的大小
   // //
   // // @method
   // //============================================================
   // public inc(border) {
   //    var n = IntegerUtil.nvl(border, 1);
   //    this.left -= n;
   //    this.top -= n;
   //    this.right += n;
   //    this.bottom += n;
   // }

   // //============================================================
   // // 把矩形缩小指定的宽度和高度
   // //
   // // @method
   // //============================================================
   // public dec(border) {
   //    var n = IntegerUtil.nvl(border, 1);
   //    this.left += n;
   //    this.top += n;
   //    this.right -= n;
   //    this.bottom -= n;
   // }

   // //============================================================
   // // <T>获得调试信息。</T>
   // //
   // // @method
   // //============================================================
   // public dump(d) {
   //    d = StringUtil.nvlString(d);
   //    d.append(ClassUtil.shortName(this));
   //    d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   //    return d;
   // }
}
