import {Fatal} from '../common/lang/Fatal';
import {FloatUtil} from '../common/lang/FloatUtil';
import {HexUtil} from '../common/lang/HexUtil';

/**
 * 颜色。
 *
 * @author maocy
 * @version 160422
 */
export class Color4 {
   // 红色
   public red: number;
   // 绿色
   public green: number;
   // 蓝色
   public blue: number;
   // 透明
   public alpha: number;

   /**
    * 构造处理。
    *
    * @param red 红色
    * @param green 绿色
    * @param blue 蓝色
    * @param alpha 透明
    */
   public constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
   }

   /**
    * 接收数据。
    *
    * @param value 颜色
    * @return 颜色
    */
   public assign(value: Color4): Color4 {
      this.red = value.red;
      this.green = value.green;
      this.blue = value.blue;
      this.alpha = value.alpha;
      return this;
   }

   /**
    * 接收强度数据。
    *
    * @param value 颜色
    * @return 颜色
    */
   public assignPower(value: Color4): Color4 {
      this.red = value.red * value.alpha;
      this.green = value.green * value.alpha;
      this.blue = value.blue * value.alpha;
      this.alpha = value.alpha;
      return this;
   }

   /**
    * 设置数据内容。
    *
    * @param red 红色
    * @param green 绿色
    * @param blue 蓝色
    * @param alpha 透明
    * @return 颜色
    */
   public set(red: number, green: number, blue: number, alpha: number): Color4 {
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
      return this;
   }

   /**
    * 设置数据内容。
    *
    * @param value 数值
    * @return 颜色
    */
   public setInteger(value: number): Color4 {
      this.alpha = ((value >> 24) & 0xFF) / 255;
      this.red = ((value >> 16) & 0xFF) / 255;
      this.green = ((value >> 8) & 0xFF) / 255;
      this.blue = (value & 0xFF) / 255;
      return this;
   }

   /**
    * 设置数据内容。
    *
    * @param value 数值
    * @param alpha 透明
    * @return 颜色
    */
   public setIntAlpha(value: number, alpha: number): Color4 {
      this.red = ((value >> 16) & 0xFF) / 255;
      this.green = ((value >> 8) & 0xFF) / 255;
      this.blue = (value & 0xFF) / 255;
      this.alpha = alpha;
      return this;
   }

   /**
    * 设置数据内容。
    *
    * @param red 红色
    * @param green 绿色
    * @param blue 蓝色
    * @param alpha 透明
    * @return 颜色
    */
   public setHex(value: string): Color4 {
      if (value.indexOf('#') == 0) {
         value = value.substring(1);
      }
      if (value.indexOf('0x') == 0) {
         value = value.substring(2);
      }
      if (value.length == 6) {
         this.red = HexUtil.parse(value.substring(0, 2)) / 255;
         this.green = HexUtil.parse(value.substring(2, 4)) / 255;
         this.blue = HexUtil.parse(value.substring(4, 6)) / 255;
      } else {
         throw new Fatal(this, 'Invalid value.');
      }
      return this;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toRgbaString(): string {
      return 'rgba(' + parseInt((this.red * 255) as any) + ',' + parseInt((this.green * 255) as any) + ',' + parseInt((this.blue * 255) as any) + ',' + FloatUtil.format(this.alpha) + ')';
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString(): string {
      return FloatUtil.format(this.red) + ',' + FloatUtil.format(this.green) + ',' + FloatUtil.format(this.blue) + ',' + FloatUtil.format(this.alpha);
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.red = null;
      this.green = null;
      this.blue = null;
      this.alpha = null;
   }

   // //==========================================================
   // // <T>序列化数据到输出流里。</T>
   // //
   // // @param input 数据流
   // //==========================================================
   // public serialize(p) {
   //    p.writeFloat(this.red);
   //    p.writeFloat(this.green);
   //    p.writeFloat(this.blue);
   //    p.writeFloat(this.alpha);
   // }

   // //==========================================================
   // // <T>从输入流里反序列化数据。</T>
   // //
   // // @param input 数据流
   // //==========================================================
   // public unserialize(p) {
   //    this.red = p.readFloat();
   //    this.green = p.readFloat();
   //    this.blue = p.readFloat();
   //    this.alpha = p.readFloat();
   // }

   // //==========================================================
   // // <T>从输入流里反序列化数据。</T>
   // //
   // // @param input 数据流
   // //==========================================================
   // public unserialize3(p) {
   //    this.red = p.readFloat();
   //    this.green = p.readFloat();
   //    this.blue = p.readFloat();
   //    this.alpha = 1.0;
   // }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @param config 配置节点
   // //==========================================================
   // public saveConfig(p) {
   //    p.setFloat('r', this.red);
   //    p.setFloat('g', this.green);
   //    p.setFloat('b', this.blue);
   //    p.setFloat('a', this.alpha);
   // }

   // //==========================================================
   // // <T>数据内容存储到配置节点中。</T>
   // //
   // // @method
   // // @param p:config:TXmlNode 配置节点
   // //==========================================================
   // public savePower(p) {
   //    p.setFloat('r', this.red);
   //    p.setFloat('g', this.green);
   //    p.setFloat('b', this.blue);
   //    p.setFloat('power', this.alpha);
   // }

   // //============================================================
   // // <T>复制内容到数组中。</T>
   // //
   // // @method
   // // @param d:data:Array 数组
   // // @param i:index:Integer 索引
   // //============================================================
   // public copyArray(d, i) {
   //    d[i++] = this.red;
   //    d[i++] = this.green;
   //    d[i++] = this.blue;
   //    d[i++] = this.alpha;
   //    return 4;
   // }
}
