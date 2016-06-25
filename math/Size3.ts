import {AssertUtil} from '../common/AssertUtil';
import {DataStream} from '../common/io/DataStream';
import {DataTypeEnum} from '../common/lang/DataTypeEnum';
import {Fatal} from '../common/lang/Fatal';
import {FloatUtil} from '../common/lang/FloatUtil';
import {ClassUtil} from '../common/reflect/ClassUtil';
import {MathUtil} from './MathUtil';

/**
 * 三维尺寸。
 */
export class Size3 {
   // 宽度
   public width: number;
   // 高度
   public height: number;
   // 深度
   public deep: number;

   /**
    * 构造处理。
    *
    * @param width 宽度
    * @param height 高度
    * @param deep 深度
    */
   public constructor(width: number = 0, height: number = 0, deep: number = 0) {
      this.width = width;
      this.height = height;
      this.deep = deep;
   }

   /**
    * 判断内容是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return (this.width == 0) && (this.height == 0) && (this.deep == 0);
   }

   /**
    * 判断数据是否相等。
    *
    * @param width 宽度
    * @param height 高度
    * @return 是否为空
    */
   public equalsData(width: number, height: number, deep: number): boolean {
      if (this.width != width) {
         return false;
      }
      if (this.height != height) {
         return false;
      }
      if (this.deep != deep) {
         return false;
      }
      return true;
   }

   /**
    * 判断是否相等。
    *
    * @param value 内容
    * @return 是否相等
    */
   public equals(value: Size3): boolean {
      if (this.width != value.width) {
         return false;
      }
      if (this.height != value.height) {
         return false;
      }
      if (this.deep != value.deep) {
         return false;
      }
      return true;
   }

   /**
    * 接收对象数据。
    *
    * @param value 内容
    * @return 三维尺寸
    */
   public assign(value: Size3): Size3 {
      this.width = value.width;
      this.height = value.height;
      this.deep = value.deep;
      return this;
   }

   /**
    * 设置数据内容。
    *
    * @param width 宽度
    * @param height 高度
    * @param deep 深度
    * @return 三维尺寸
    */
   public set(width: number, height: number, deep: number): Size3 {
      this.width = width;
      this.height = height;
      this.deep = deep;
      return this;
   }

   /**
    * 序列化数据到输出流里。
    *
    * @param output 数据流
    * @param dataCd 数据类型
    * @return 三维尺寸
    */
   public serialize(output: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32) {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            output.writeInt32(this.width);
            output.writeInt32(this.height);
            output.writeInt32(this.deep);
            break;
         case DataTypeEnum.Float32:
            output.writeFloat(this.width);
            output.writeFloat(this.height);
            output.writeFloat(this.deep);
            break;
         case DataTypeEnum.Float64:
            output.writeDouble(this.width);
            output.writeDouble(this.height);
            output.writeDouble(this.deep);
            break;
         default:
            throw new Fatal(this, 'Serialize invalid.');
      }
      return this;
   }

   /**
    * 从输入流里反序列化数据。
    *
    * @param input 数据流
    * @param dataCd 数据类型
    */
   public unserialize(input: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32) {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            this.width = input.readInt32();
            this.height = input.readInt32();
            this.deep = input.readInt32();
            break;
         case DataTypeEnum.Float32:
            this.width = input.readFloat();
            this.height = input.readFloat();
            this.deep = input.readFloat();
            break;
         case DataTypeEnum.Float64:
            this.width = input.readDouble();
            this.height = input.readDouble();
            this.deep = input.readDouble();
            break;
         default:
            throw new Fatal(this, 'Unserialize invalid.');
      }
      return this;
   }

   /**
    * 解析字符串。
    *
    * @param source 字符串
    * @return 向量
    */
   public parse(source: string): Size3 {
      var items = source.split(',')
      if (items.length == 2) {
         this.width = parseFloat(items[0]);
         this.height = parseFloat(items[1]);
         this.deep = parseFloat(items[2]);
      } else {
         throw new Fatal(this, "Parse value failure. (source={1})", source);
      }
      AssertUtil.debugNumber(this.width, this.height, this.deep);
      return this;
   }

   /**
    * 格式化为字符串。
    *
    * @param precision 精度
    * @return 字符串
    */
   public format(precision: number = MathUtil.DEFAULT_PRECISION): string {
      var x = FloatUtil.trunc(this.width, precision);
      var y = FloatUtil.trunc(this.height, precision);
      var z = FloatUtil.trunc(this.deep, precision);
      return x + ',' + y + ',' + z;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString() {
      return this.width + ',' + this.height;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.width = null;
      this.height = null;
   }

   // //============================================================
   // // <T>解析字符串。</T>
   // //
   // // @param v:value:String 字符串
   // //============================================================
   // public parse(v) {
   //    var o = this;
   //    var r = v.split(',')
   //    if (r.length == 3) {
   //       o.width = parseInt(r[0]);
   //       o.height = parseInt(r[1]);
   //       o.deep = parseInt(r[2]);
   //    } else {
   //       throw new Fatal(o, "Parse value failure. (value={1})", v);
   //    }
   // }

   // //============================================================
   // // <T>获得字符串。</T>
   // //
   // // @return String 字符串
   // //============================================================
   // public toString() {
   //    var o = this;
   //    return o.width + ',' + o.height + ',' + o.deep;
   // }

   // //============================================================
   // // <T>获得运行信息。</T>
   // //
   // // @return String 运行信息
   // //============================================================
   // public dump() {
   //    var o = this;
   //    return ClassUtil.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
   // }
}
