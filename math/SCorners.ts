import {FloatUtil} from '../common/lang/FloatUtil';

//==========================================================
// <T>颜色。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
export class SCorners {
   // public red: number = 0;
   // public green: number = 0;
   // public blue: number = 0;
   // public alpha: number = 1;

   // //============================================================
   // // <T>接收数据。</T>
   // //
   // // @method
   // // @param value:SCorners 颜色
   // //============================================================
   // public assign(value: SCorners) {
   //    this.red = value.red;
   //    this.green = value.green;
   //    this.blue = value.blue;
   //    this.alpha = value.alpha;
   // }

   // //============================================================
   // // <T>接收强度数据。</T>
   // //
   // // @method
   // // @param value:SCorners 颜色
   // //============================================================
   // public assignPower(value: SCorners) {
   //    this.red = value.red * value.alpha;
   //    this.green = value.green * value.alpha;
   //    this.blue = value.blue * value.alpha;
   //    this.alpha = value.alpha;
   // }

   // //============================================================
   // // <T>设置数据内容。</T>
   // //
   // // @param red:Number 红色
   // // @param green:Number 绿色
   // // @param blue:Number 蓝色
   // // @param alpha:Number 透明
   // //============================================================
   // public set(red: number, green: number, blue: number, alpha: number) {
   //    this.red = red;
   //    this.green = green;
   //    this.blue = blue;
   //    this.alpha = alpha;
   // }

   // //==========================================================
   // // <T>序列化数据到输出流里。</T>
   // //
   // // @method
   // // @param input:FByteStream 数据流
   // //==========================================================
   // public serialize(output) {
   //    output.writeFloat(this.red);
   //    output.writeFloat(this.green);
   //    output.writeFloat(this.blue);
   //    output.writeFloat(this.alpha);
   // }

   // //==========================================================
   // // <T>从输入流里反序列化数据。</T>
   // //
   // // @method
   // // @param p:input:FByteStream 数据流
   // //==========================================================
   // public unserialize(p) {
   //    var o = this;
   //    o.red = p.readFloat();
   //    o.green = p.readFloat();
   //    o.blue = p.readFloat();
   //    o.alpha = p.readFloat();
   // }

   // //==========================================================
   // // <T>从输入流里反序列化数据。</T>
   // //
   // // @method
   // // @param p:input:FByteStream 数据流
   // //==========================================================
   // public unserialize3(p) {
   //    var o = this;
   //    o.red = p.readFloat();
   //    o.green = p.readFloat();
   //    o.blue = p.readFloat();
   //    o.alpha = 1.0;
   // }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @method
   // // @param p:config:TXmlNode 配置节点
   // //==========================================================
   // public saveConfig(p) {
   //    var o = this;
   //    p.setFloat('r', o.red);
   //    p.setFloat('g', o.green);
   //    p.setFloat('b', o.blue);
   //    p.setFloat('a', o.alpha);
   // }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @method
   // // @param p:config:TXmlNode 配置节点
   // //==========================================================
   // public savePower(p) {
   //    var o = this;
   //    p.setFloat('r', o.red);
   //    p.setFloat('g', o.green);
   //    p.setFloat('b', o.blue);
   //    p.setFloat('power', o.alpha);
   // }

   // //============================================================
   // // <T>复制内容到数组中。</T>
   // //
   // // @method
   // // @param d:data:Array 数组
   // // @param i:index:Integer 索引
   // //============================================================
   // public copyArray(d, i) {
   //    var o = this;
   //    d[i++] = o.red;
   //    d[i++] = o.green;
   //    d[i++] = o.blue;
   //    d[i++] = o.alpha;
   //    return 4;
   // }

   // //============================================================
   // // <T>获得字符串。</T>
   // //
   // // @return String 字符串
   // //============================================================
   // public toString() {
   //    return FloatUtil.format(this.red) + ',' + FloatUtil.format(this.green) + ',' + FloatUtil.format(this.blue) + ',' + FloatUtil.format(this.alpha);
   // }
}
