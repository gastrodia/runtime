import {Fatal} from '../common/lang/Fatal';
import {ClassUtil} from '../common/reflect/ClassUtil';

//==========================================================
// <T>填充结构。</T>
//
// @struct
// @param l:left:Number 左边距
// @param t:top:Number 上边距
// @param r:right:Number 右边距
// @param b:bottom:Number 下边距
// @author maocy
// @version 150101
//==========================================================
export class Padding {
   // protected left: number = 0;
   // protected top: number = 0;
   // protected right: number = 0;
   // protected bottom: number = 0;

   // //============================================================
   // // <T>构造处理。</T>
   // //
   // // @method
   // // @param x:Number X分量
   // // @param y:Number Y分量
   // // @param z:Number Z分量
   // //============================================================
   // constructor(left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) {
   //    this.left = left;
   //    this.top = top;
   //    this.right = right;
   //    this.bottom = bottom;
   // }

   // //============================================================
   // // <T>判断内容是否为空。</T>
   // //
   // // @method
   // // @return Boolean 是否为空
   // //============================================================
   // public isEmpty() {
   //    return (this.left == 0) && (this.top == 0) && (this.right == 0) && (this.bottom == 0);
   // }

   // //============================================================
   // // <T>重置数据。</T>
   // //
   // // @method
   // //============================================================
   // public reset() {
   //    this.left = 0;
   //    this.top = 0;
   //    this.right = 0;
   //    this.bottom = 0;
   // }

   // //============================================================
   // // <T>接收填充对象。</T>
   // //
   // // @method
   // // @param p:padding:SPadding 填充对象
   // //============================================================
   // public assign(p) {
   //    this.left = p.left;
   //    this.top = p.top;
   //    this.right = p.right;
   //    this.bottom = p.bottom;
   // }

   // //============================================================
   // // <T>设置数据内容。</T>
   // //
   // // @method
   // // @param l:left:Number 左边距
   // // @param t:top:Number 上边距
   // // @param r:right:Number 右边距
   // // @param b:bottom:Number 下边距
   // //============================================================
   // public set(l, t, r, b) {
   //    this.left = l;
   //    this.top = t;
   //    this.right = r;
   //    this.bottom = b;
   // }

   // //============================================================
   // // <T>解析字符串。</T>
   // //
   // // @method
   // // @param v:value:String 字符串
   // //============================================================
   // public parse(v) {
   //    var r = v.split(',')
   //    if (r.length == 4) {
   //       this.left = parseInt(r[0]);
   //       this.top = parseInt(r[1]);
   //       this.right = parseInt(r[2]);
   //       this.bottom = parseInt(r[3]);
   //    } else {
   //       throw new Fatal(this, "Parse value failure. (value={1})", v);
   //    }
   // }

   // //============================================================
   // // <T>获得字符串。</T>
   // //
   // // @method
   // // @return String 字符串
   // //============================================================
   // public toString() {
   //    return this.left + ',' + this.top + ',' + this.right + ',' + this.bottom;
   // }

   // //============================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //============================================================
   // public dispose() {
   //    this.left = null;
   //    this.top = null;
   //    this.right = null;
   //    this.bottom = null;
   // }

   // //============================================================
   // // <T>获得运行信息。</T>
   // //
   // // @method
   // // @return String 运行信息
   // //============================================================
   // public dump(d) {
   //    return ClassUtil.dump(this) + ' [' + this.left + ',' + this.top + ',' + this.right + ',' + this.bottom + ']';
   // }
}
