import {AssertUtil} from '../common/AssertUtil';
import {DataStream} from '../common/io/DataStream';
import {DataTypeEnum} from '../common/lang/DataTypeEnum';
import {Fatal} from '../common/lang/Fatal';
import {FloatUtil} from '../common/lang/FloatUtil';
import {MathUtil} from './MathUtil';

/**
 * 二维尺寸。
 */
export class Size2 {
   // 宽度
   public width: number;
   // 高度
   public height: number;

   /**
    * 构造处理。
    *
    * @param width 宽度
    * @param height 高度
    */
   public constructor(width: number = 0, height: number = 0) {
      this.width = width;
      this.height = height;
   }

   /**
    * 判断内容是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return (this.width == 0) && (this.height == 0);
   }

   /**
    * 判断数据是否相等。
    *
    * @param width 宽度
    * @param height 高度
    * @return 是否为空
    */
   public equalsData(width: number, height: number): boolean {
      if (this.width != width) {
         return false;
      }
      if (this.height != height) {
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
   public equals(value: Size2): boolean {
      if (this.width != value.width) {
         return false;
      }
      if (this.height != value.height) {
         return false;
      }
      return true;
   }

   /**
    * 接收对象数据。
    *
    * @param value 内容
    * @return 二维尺寸
    */
   public assign(value: Size2): Size2 {
      this.width = value.width;
      this.height = value.height;
      return this;
   }

   /**
    * 设置数据内容。
    *
    * @param width 宽度
    * @param height 高度
    * @return 二维尺寸
    */
   public set(width: number, height: number): Size2 {
      this.width = width;
      this.height = height;
      return this;
   }

   /**
    * 计算平方值。
    *
    * @return Number 平方值
    */
   public square() {
      return this.width * this.height;
   }

   /**
    * 序列化数据到输出流里。
    *
    * @param output 数据流
    * @param dataCd 数据类型
    * @return 二维尺寸
    */
   public serialize(output: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32) {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            output.writeInt32(this.width);
            output.writeInt32(this.height);
            break;
         case DataTypeEnum.Float32:
            output.writeFloat(this.width);
            output.writeFloat(this.height);
            break;
         case DataTypeEnum.Float64:
            output.writeDouble(this.width);
            output.writeDouble(this.height);
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
    * @return 二维尺寸
    */
   public unserialize(input: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32) {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            this.width = input.readInt32();
            this.height = input.readInt32();
            break;
         case DataTypeEnum.Float32:
            this.width = input.readFloat();
            this.height = input.readFloat();
            break;
         case DataTypeEnum.Float64:
            this.width = input.readDouble();
            this.height = input.readDouble();
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
    * @return 二维尺寸
    */
   public parse(source: string): Size2 {
      var items = source.split(',')
      if (items.length == 2) {
         this.width = parseFloat(items[0]);
         this.height = parseFloat(items[1]);
      } else {
         throw new Fatal(this, "Parse value failure. (source={1})", source);
      }
      AssertUtil.debugNumber(this.width, this.height);
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
      return x + ',' + y;
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
}
