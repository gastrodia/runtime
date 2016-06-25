import {AssertUtil} from '../common/AssertUtil';
import {DataStream} from '../common/io/DataStream';
import {DataTypeEnum} from '../common/lang/DataTypeEnum';
import {Fatal} from '../common/lang/Fatal';
import {FloatUtil} from '../common/lang/FloatUtil';
import {MathUtil} from './MathUtil';
import {Matrix4} from './Matrix4';

/**
 * 四维向量。
 */
export class Vector4 {
   // X分量
   public x: number;
   // Y分量
   public y: number;
   // Z分量
   public z: number;
   // W分量
   public w: number;

   /**
    * 构造处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param w W分量
    */
   public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
   }

   /**
    * 判断是否有效。
    *
    * @return 有效
    */
   public isValid(): boolean {
      return !isNaN(this.x) && !isNaN(this.y) && !isNaN(this.z) && !isNaN(this.w);
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty() {
      return (this.x == 0) && (this.y == 0) && (this.z == 0) && (this.w == 0);
   }

   /**
    * 判断是否相等。
    *
    * @param value 数据
    * @return 是否相等
    */
   public equals(value: Vector4): boolean {
      var ex = this.x == value.x;
      var ey = this.y == value.y;
      var ez = this.z == value.z;
      var ew = this.w == value.w;
      return ex && ey && ez && ew;
   }

   /**
    * 判断是否相等。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param w W分量
    * @return 是否相等
    */
   public equalsValue(x: number, y: number, z: number, w: number): boolean {
      return (this.x == x) && (this.y == y) && (this.w == w);
   }

   /**
    * 判断是否近似相等。
    *
    * @param value 数据
    * @param tolerance 公差
    * @return 是否相等
    */
   public nearlyEquals(value: Vector4, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEqualsValue(value.x, value.y, value.z, value.w, tolerance);
   }

   /**
    * 判断是否近似相等。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param tolerance 公差
    * @return 是否相等
    */
   public nearlyEqualsValue(x: number, y: number, z: number, w: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      var ex = MathUtil.nearlyEquals(this.x, x, tolerance);
      var ey = MathUtil.nearlyEquals(this.y, y, tolerance);
      var ez = MathUtil.nearlyEquals(this.z, z, tolerance);
      var ew = MathUtil.nearlyEquals(this.w, w, tolerance);
      return ex && ey && ez && ew;
   }

   /**
    * 设置X分量。
    *
    * @param x X分量
    * @return 向量
    */
   public setX(x: number): Vector4 {
      this.x = x;
      return this;
   }

   /**
    * 设置Y分量。
    *
    * @param y Y分量
    * @return 向量
    */
   public setY(y: number): Vector4 {
      this.y = y;
      return this;
   }

   /**
    * 设置Z分量。
    *
    * @param z Z分量
    * @return 向量
    */
   public setZ(z: number): Vector4 {
      this.z = z;
      return this;
   }

   /**
    * 设置W分量。
    *
    * @param w W分量
    * @return 向量
    */
   public setW(w: number): Vector4 {
      this.w = w;
      return this;
   }

   /**
    * 设置数据。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param w W分量
    * @return 向量
    */
   public set(x: number, y: number, z: number, w: number): Vector4 {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
   }

   /**
    * 设置数据。
    *
    * @param value 数据
    * @return 向量
    */
   public setScalar(value: number): Vector4 {
      this.x = value;
      this.y = value;
      this.z = value;
      this.w = value;
      return this;
   }

   /**
    * 获得组件内容。
    *
    * @param index 索引
    * @return 数据
    */
   public getComponent(index: number): number {
      switch (index) {
         case 0:
            return this.x;
         case 1:
            return this.y;
         case 2:
            return this.z;
         case 3:
            return this.w;
         default:
            throw new Fatal(this, 'Invalid component index.');
      }
   }

   /**
    * 设置组件内容。
    *
    * @param index 索引
    * @param value 数据
    */
   public setComponent(index: number, value: number) {
      switch (index) {
         case 0:
            this.x = value; break;
         case 1:
            this.y = value; break;
         case 2:
            this.z = value; break;
         case 3:
            this.w = value; break;
         default:
            throw new Fatal(this, 'Invalid component index.');
      }
   }

   /**
    * 接收数据。
    *
    * @param value 数据
    * @return 向量
    */
   public assign(value: Vector4): Vector4 {
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
      this.w = value.w;
      return this;
   }

   /**
    * 加运算处理。
    *
    * @param scalar 内容
    * @return 向量
    */
   public addScalar(scalar: number): Vector4 {
      this.x += scalar;
      this.y += scalar;
      this.z += scalar;
      this.w += scalar;
      return this;
   }

   /**
    * 单个数据相加处理。
    *
    * @param value 数据
    * @return 向量
    */
   public add(value): Vector4 {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
      this.w += value.w;
      return this;
   }

   /**
    * 分量数据相加处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param w W分量
    * @return 向量
    */
   public addValue(x: number, y: number, z: number, w: number): Vector4 {
      this.x += x;
      this.y += y;
      this.z += z;
      this.w += w;
      return this;
   }

   /**
    * 比率数据相加处理。
    *
    * @param value 数据
    * @param scale 比率
    * @return 向量
    */
   public addScaledVector(value: Vector4, scale: number): Vector4 {
      this.x += value.x * scale;
      this.y += value.y * scale;
      this.z += value.z * scale;
      this.w += value.w * scale;
      return this;
   }

   /**
    * 多个数据相加处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public addVectors(value1: Vector4, value2: Vector4): Vector4 {
      this.x = value1.x + value2.x;
      this.y = value1.y + value2.y;
      this.z = value1.z + value2.z;
      this.w = value1.w + value2.w;
      return this;
   }

   /**
    * 数据相减处理。
    *
    * @param value 数据
    * @return 向量
    */
   public subScalar(value: number): Vector4 {
      this.x -= value;
      this.y -= value;
      this.z -= value;
      this.w -= value;
      return this;
   }

   /**
    * 单个数据相减处理。
    *
    * @param value 数据
    * @return 向量
    */
   public sub(value: Vector4): Vector4 {
      this.x -= value.x;
      this.y -= value.y;
      this.z -= value.z;
      this.w -= value.w;
      return this;
   }

   /**
    * 分量数据相减处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param w W分量
    * @return 向量
    */
   public subValue(x: number, y: number, z: number, w: number): Vector4 {
      this.x -= x;
      this.y -= y;
      this.z -= z;
      this.w -= w;
      return this;
   }

   /**
    * 多个数据相减处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public subVectors(value1: Vector4, value2: Vector4): Vector4 {
      this.x = value1.x - value2.x;
      this.y = value1.y - value2.y;
      this.z = value1.z - value2.z;
      this.w = value1.w - value2.w;
      return this;
   }

   /**
    * 数据相乘处理。
    *
    * @param value 数据
    * @return 向量
    */
   public multiplyScalar(value: number): Vector4 {
      this.x *= value;
      this.y *= value;
      this.z *= value;
      this.w *= value;
      return this;
   }

   /**
   * 单个个数据相乘处理。
   *
   * @param value 数据
    * @return 向量
   */
   public multiply(value: Vector4): Vector4 {
      this.x *= value.x;
      this.y *= value.y;
      this.z *= value.z;
      this.w *= value.w;
      return this;
   }

   /**
    * 分量数据相乘处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param w W分量
    * @return 向量
    */
   public multiplyValue(x: number, y: number, z: number, w: number): Vector4 {
      this.x *= x;
      this.y *= y;
      this.z *= z;
      this.w *= w;
      return this;
   }

   /**
    * 多个数据相乘处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public multiplyVectors(value1: Vector4, value2: Vector4): Vector4 {
      this.x = value1.x * value2.x;
      this.y = value1.y * value2.y;
      this.z = value1.z * value2.z;
      this.w = value1.w * value2.w;
      return this;
   }

   /**
    * 除运算处理。
    *
    * @param scalar 内容
    * @return 向量
    */
   public divideScalar(value: number): Vector4 {
      var scalar = 1 / value;
      return this.multiplyScalar(scalar);
   }

   /**
    * 单个数据相除处理。
    *
    * @param value 数据
    * @return 向量
    */
   public divide(value: Vector4): Vector4 {
      this.x /= value.x;
      this.y /= value.y;
      this.z /= value.z;
      this.w /= value.w;
      return this;
   }

   /**
    * 分量数据相除处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @param w W分量
    * @return 向量
    */
   public divideValue(x: number, y: number, z: number, w: number): Vector4 {
      this.x /= x;
      this.y /= y;
      this.z /= z;
      this.w /= w;
      return this;
   }

   /**
    * 获得长度。
    *
    * @return 长度
    */
   public length(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
   }

   /**
    * 获得平方长度。
    *
    * @return 长度
    */
   public lengthSquared(): number {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
   }

   /**
    * 获得模长度。
    *
    * @return 长度
    */
   public lengthManhattan(): number {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
   }

   /**
    * 设置长度。
    *
    * @param length 长度
    * @return 向量
    */
   public setLength(length: number): Vector4 {
      var currentLength = this.length();
      var rate = length / currentLength;
      return this.multiplyScalar(rate);
   }

   /**
    * 单位化处理。
    *
    * @return 向量
    */
   public normalize(): Vector4 {
      var length = this.length();
      return this.divideScalar(length);
   }

   /**
    * 计算取反的数据。
    *
    * @return 向量
    */
   public negate(): Vector4 {
      this.x = - this.x;
      this.y = - this.y;
      this.z = - this.z;
      this.w = - this.w;
      return this;
   }

   /**
    * 计算向下取整的数据。
    *
    * @return 向量
    */
   public floor(): Vector4 {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      this.w = Math.floor(this.w);
      return this;
   }

   /**
    * 计算向上取整的数据。
    *
    * @return 向量
    */
   public ceil(): Vector4 {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      this.w = Math.ceil(this.w);
      return this;
   }

   /**
    * 计算4舍5入的数据。
    *
    * @return 向量
    */
   public round(): Vector4 {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      this.w = Math.round(this.w);
      return this;
   }

   /**
    * 计算向0取整的数据。
    *
    * @return 向量
    */
   public roundToZero(): Vector4 {
      this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
      this.w = (this.w < 0) ? Math.ceil(this.w) : Math.floor(this.w);
      return this;
   }

   /**
    * 计算最小数据。
    *
    * @param value 数据
    * @return 向量
    */
   public min(value: Vector4): Vector4 {
      this.x = Math.min(this.x, value.x);
      this.y = Math.min(this.y, value.y);
      this.z = Math.min(this.z, value.z);
      this.w = Math.min(this.w, value.w);
      return this;
   }

   /**
    * 计算最大数据。
    *
    * @param value 数据
    * @return 向量
    */
   public max(value: Vector4): Vector4 {
      this.x = Math.max(this.x, value.x);
      this.y = Math.max(this.y, value.y);
      this.z = Math.max(this.z, value.z);
      this.w = Math.max(this.w, value.w);
      return this;
   }

   /**
    * 计算最小和最大之间数据。
    *
    * @param min 最小数据
    * @param max 最大数据
    * @return 向量
    */
   public clamp(min: Vector4, max: Vector4): Vector4 {
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      this.z = Math.max(min.z, Math.min(max.z, this.z));
      this.w = Math.max(min.w, Math.min(max.w, this.w));
      return this;
   }

   /**
    * 计算最小和最大之间数据。
    *
    * @param min 最小数据
    * @param max 最大数据
    * @return 向量
    */
   public clampScalar(min: number, max: number): Vector4 {
      this.x = Math.max(min, Math.min(max, this.x));
      this.y = Math.max(min, Math.min(max, this.y));
      this.z = Math.max(min, Math.min(max, this.z));
      this.w = Math.max(min, Math.min(max, this.w));
      return this;
   }

   /**
    * 计算点积处理。
    *
    * @param value 数据
    * @return 数据
    */
   public dot(value: Vector4): number {
      return this.x * value.x + this.y * value.y + this.z * value.z + this.w * value.w;
   }

   /**
    * 计算插值处理。
    *
    * @param value 数据
    * @param rate 比率
    * @return 向量
    */
   public lerp(value: Vector4, rate: number): Vector4 {
      this.x += (value.x - this.x) * rate;
      this.y += (value.y - this.y) * rate;
      this.z += (value.z - this.z) * rate;
      this.w += (value.w - this.w) * rate;
      return this;
   }

   /**
    * 计算插值处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @param rate 比率
    * @return 向量
    */
   public lerpVectors(value1: Vector4, value2: Vector4, rate: number): Vector4 {
      this.subVectors(value2, value1).multiplyScalar(rate).add(value1);
      return this;
   }

   /**
    * 应用矩阵处理。
    *
    * @param matrix 矩阵
    * @return 向量
    */
   public applyMatrix4(matrix: Matrix4): Vector4 {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var w = this.w;
      var data = matrix.elements;
      this.x = (data[0] * x) + (data[4] * y) + (data[8] * z) + (data[12] * w);
      this.y = (data[1] * x) + (data[5] * y) + (data[9] * z) + (data[13] * w);
      this.z = (data[2] * x) + (data[6] * y) + (data[10] * z) + (data[14] * w);
      this.w = (data[3] * x) + (data[7] * y) + (data[11] * z) + (data[15] * w);
      return this;
   }

   /**
    * 从数组中获得数据。
    *
    * @param array 数组
    * @param offset 位置
    * @return 向量
    */
   public fromArray(array: Array<number>, offset: number = 0) {
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      this.w = array[offset + 3];
      return this;
   }

   /**
    * 设置数据到数组中。
    *
    * @param array 数组
    * @param offset 位置
    * @return 数组
    */
   public toArray(array: Array<number>, offset: number = 0): Array<number> {
      if (array == null) {
         array = new Array<number>();
      }
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      array[offset + 3] = this.w;
      return array;
   }

   /**
    * 序列化数据到输出流里。
    *
    * @param output 数据流
    * @param dataCd 数据类型
    * @return 向量
    */
   public serialize(output: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32): Vector4 {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            output.writeInt32(this.x);
            output.writeInt32(this.y);
            output.writeInt32(this.z);
            output.writeInt32(this.w);
            break;
         case DataTypeEnum.Float32:
            output.writeFloat(this.x);
            output.writeFloat(this.y);
            output.writeFloat(this.z);
            output.writeFloat(this.w);
            break;
         case DataTypeEnum.Float64:
            output.writeDouble(this.x);
            output.writeDouble(this.y);
            output.writeDouble(this.z);
            output.writeDouble(this.w);
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
    * @return 向量
    */
   public unserialize(input: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32): Vector4 {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            this.x = input.readInt32();
            this.y = input.readInt32();
            this.z = input.readInt32();
            this.w = input.readInt32();
            break;
         case DataTypeEnum.Float32:
            this.x = input.readFloat();
            this.y = input.readFloat();
            this.z = input.readFloat();
            this.w = input.readFloat();
            break;
         case DataTypeEnum.Float64:
            this.x = input.readDouble();
            this.y = input.readDouble();
            this.z = input.readDouble();
            this.w = input.readDouble();
            break;
         default:
            throw new Fatal(this, 'Unserialize invalid.');
      }
      return this;
   }

   /**
    * 解析字符串。
    *
    * @param value 字符串
    * @return 向量
    */
   public parse(value: string): Vector4 {
      var items = value.split(',')
      if (items.length == 4) {
         this.x = parseFloat(items[0]);
         this.y = parseFloat(items[1]);
         this.z = parseFloat(items[2]);
         this.w = parseFloat(items[3]);
      } else {
         throw new Fatal(this, "Parse value failure. (value={1})", value);
      }
      AssertUtil.debugNumber(this.x, this.y, this.z, this.w);
      return this;
   }

   /**
    * 格式化为字符串。
    *
    * @param precision 精度
    * @return 字符串
    */
   public format(precision: number = MathUtil.DEFAULT_PRECISION): string {
      var x = FloatUtil.trunc(this.x, precision);
      var y = FloatUtil.trunc(this.y, precision);
      var z = FloatUtil.trunc(this.z, precision);
      var w = FloatUtil.trunc(this.w, precision);
      return x + ',' + y + ',' + z + ',' + w;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString() {
      return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
   }

   /**
    * 克隆当前数据。
    *
    * @return 向量
    */
   public clone() {
      return new (this as any).constructor(this.x, this.y, this.z, this.w);
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.x = null;
      this.y = null;
      this.z = null;
      this.w = null;
   }

   /**
    * 根据数据获得对象。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @param value3 数据3
    * @param value4 数据4
    * @return 向量
    */
   public static from(value1?: any, value2?: any, value3?: any, value4?: any): Vector4 {
      var x = null;
      var y = null;
      var z = null;
      var w = null;
      var count = arguments.length;
      if (count == 1) {
         var value = arguments[0];
         if (Array.isArray(value)) {
            x = value[0];
            y = value[1];
            z = value[2];
            w = value[3];
         } else {
            x = value.x;
            y = value.y;
            z = value.z;
            w = value.w;
         }
      } else if (count == 4) {
         x = arguments[0];
         y = arguments[1];
         z = arguments[2];
         w = arguments[2];
      }
      AssertUtil.debugNumber(x, y, z, w);
      return new Vector4(x, y, z, w);
   }

   /**
    * 多个数据相加处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public static addVectors(value1: Vector4, value2: Vector4): Vector4 {
      var cx = value2.x + value1.x;
      var cy = value2.y + value1.y;
      var cz = value2.z + value1.z;
      var cw = value2.w + value1.w;
      return new Vector4(cx, cy, cz, cw);
   }

   /**
    * 多个数据相减处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public static subVectors(value1: Vector4, value2: Vector4): Vector4 {
      var cx = value2.x - value1.x;
      var cy = value2.y - value1.y;
      var cz = value2.z - value1.z;
      var cw = value2.w - value1.w;
      return new Vector4(cx, cy, cz, cw);
   }

   /**
    * 获得方向。
    *
    * @param point1 开始点
    * @param point2 结束点
    * @return 方向
    */
   public static direction(point1: Vector4, point2: Vector4): Vector4 {
      var cx = point2.x - point1.x;
      var cy = point2.y - point1.y;
      var cz = point2.z - point1.z;
      var cw = point2.w - point1.w;
      var direction = new Vector4(cx, cy, cz, cw);
      direction.normalize();
      return direction;
   }

   // public setAxisAngleFromQuaternion(q) {
   //    this.w = 2 * Math.acos(q.w);
   //    var s = Math.sqrt(1 - q.w * q.w);
   //    if (s < 0.0001) {
   //       this.x = 1;
   //       this.y = 0;
   //       this.z = 0;
   //    } else {
   //       this.x = q.x / s;
   //       this.y = q.y / s;
   //       this.z = q.z / s;
   //    }
   //    return this;
   // }

   // public setAxisAngleFromRotationMatrix(m) {
   //    var angle, x, y, z;
   //    var epsilon = 0.01;
   //    var epsilon2 = 0.1;
   //    var te = m.elements;
   //    var m11 = te[0], m12 = te[4], m13 = te[8];
   //    var m21 = te[1], m22 = te[5], m23 = te[9];
   //    var m31 = te[2], m32 = te[6], m33 = te[10];
   //    if ((Math.abs(m12 - m21) < epsilon) && (Math.abs(m13 - m31) < epsilon) && (Math.abs(m23 - m32) < epsilon)) {
   //       if ((Math.abs(m12 + m21) < epsilon2) && (Math.abs(m13 + m31) < epsilon2) && (Math.abs(m23 + m32) < epsilon2) && (Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {
   //          this.set(1, 0, 0, 0);
   //          return this;
   //       }
   //       angle = Math.PI;
   //       var xx = (m11 + 1) / 2;
   //       var yy = (m22 + 1) / 2;
   //       var zz = (m33 + 1) / 2;
   //       var xy = (m12 + m21) / 4;
   //       var xz = (m13 + m31) / 4;
   //       var yz = (m23 + m32) / 4;
   //       if ((xx > yy) && (xx > zz)) {
   //          if (xx < epsilon) {
   //             x = 0;
   //             y = 0.707106781;
   //             z = 0.707106781;
   //          } else {
   //             x = Math.sqrt(xx);
   //             y = xy / x;
   //             z = xz / x;
   //          }
   //       } else if (yy > zz) {
   //          if (yy < epsilon) {
   //             x = 0.707106781;
   //             y = 0;
   //             z = 0.707106781;
   //          } else {
   //             y = Math.sqrt(yy);
   //             x = xy / y;
   //             z = yz / y;
   //          }
   //       } else {
   //          if (zz < epsilon) {
   //             x = 0.707106781;
   //             y = 0.707106781;
   //             z = 0;
   //          } else {
   //             z = Math.sqrt(zz);
   //             x = xz / z;
   //             y = yz / z;
   //          }
   //       }
   //       this.set(x, y, z, angle);
   //       return this;
   //    }
   //    var s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
   //    if (Math.abs(s) < 0.001) {
   //       s = 1;
   //    }
   //    this.x = (m32 - m23) / s;
   //    this.y = (m13 - m31) / s;
   //    this.z = (m21 - m12) / s;
   //    this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
   //    return this;
   // }

   // public fromAttribute(attribute, index, offset) {
   //    if (offset === undefined) offset = 0;
   //    index = index * attribute.itemSize + offset;
   //    this.x = attribute.array[index];
   //    this.y = attribute.array[index + 1];
   //    this.z = attribute.array[index + 2];
   //    this.w = attribute.array[index + 3];
   //    return this;
   // }
   // //==========================================================
   // // <T>获得绝对值。</T>
   // //
   // // @method
   // // @return Number 绝对值
   // //==========================================================
   // public absolute() {
   //    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
   // }
}
