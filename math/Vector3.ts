import {AssertUtil} from '../common/AssertUtil';
import {DataStream} from '../common/io/DataStream';
import {DataTypeEnum} from '../common/lang/DataTypeEnum';
import {Fatal} from '../common/lang/Fatal';
import {FloatUtil} from '../common/lang/FloatUtil';
import {Prototype} from '../common/reflect/Prototype';
import {Euler} from './Euler';
import {IValue2} from './IValue2';
import {IValue3} from './IValue3';
import {MathUtil} from './MathUtil';
import {Matrix3} from './Matrix3';
import {Matrix4} from './Matrix4';
import {Quaternion} from './Quaternion';

/**
 * 三维向量。
 */
export class Vector3 implements IValue2, IValue3 {
   // X分量
   public x: number;
   // Y分量
   public y: number;
   // Z分量
   public z: number;

   /**
    * 构造处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    */
   public constructor(x: number = 0, y: number = 0, z: number = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
   }

   /**
    * 判断是否有效。
    *
    * @return 是否有效
    */
   public isValid(): boolean {
      return !isNaN(this.x) && !isNaN(this.y) && !isNaN(this.z);
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty() {
      return (this.x == 0) && (this.y == 0) && (this.z == 0);
   }

   /**
    * 判断是否近似为空。
    *
    * @return 是否为空
    */
   public isZero(tolerance: number = MathUtil.DEFAULT_TOLERANCE) {
      return MathUtil.isZero(this.x) && MathUtil.isZero(this.y) && MathUtil.isZero(this.z);
   }

   /**
    * 判断是否相等。
    *
    * @param value 数据
    * @return 是否相等
    */
   public equals(value: IValue3): boolean {
      var ex = this.x == value.x;
      var ey = this.y == value.y;
      var ez = this.z == value.z;
      return ex && ey && ez;
   }

   /**
    * 判断是否相等。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @return 是否相等
    */
   public equalsValue(x: number, y: number, z: number): boolean {
      return (this.x == x) && (this.y == y) && (this.z == z);
   }

   /**
    * 判断是否近似相等。
    *
    * @param value 数据
    * @param tolerance 公差
    * @return 是否相等
    */
   public nearlyEquals(value: IValue3, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEqualsValue(value.x, value.y, value.z, tolerance);
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
   public nearlyEqualsValue(x: number, y: number, z: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      var ex = MathUtil.nearlyEquals(this.x, x, tolerance);
      var ey = MathUtil.nearlyEquals(this.y, y, tolerance);
      var ez = MathUtil.nearlyEquals(this.z, z, tolerance);
      return ex && ey && ez;
   }

   /**
    * 设置X分量。
    *
    * @param x X分量
    * @return 向量
    */
   public setX(x: number): Vector3 {
      this.x = x;
      return this;
   }

   /**
    * 设置Y分量。
    *
    * @param y Y分量
    * @return 向量
    */
   public setY(y: number): Vector3 {
      this.y = y;
      return this;
   }

   /**
    * 设置Z分量。
    *
    * @param z Z分量
    * @return 向量
    */
   public setZ(z: number): Vector3 {
      this.z = z;
      return this;
   }

   /**
    * 设置数据。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @return 向量
    */
   public set(x: number, y: number, z: number): Vector3 {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
   }

   /**
    * 设置数据。
    *
    * @param value 数据
    * @return 向量
    */
   public setScalar(value: number): Vector3 {
      this.x = value;
      this.y = value;
      this.z = value;
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
            this.x = value;
            break;
         case 1:
            this.y = value;
            break;
         case 2:
            this.z = value;
            break;
         default:
            throw new Fatal(this, 'Invalid component index.');
      }
   }

   /**
    * 接收数据内容。
    *
    * @param value 数据
    * @return 向量
    */
   public assign(value: IValue3): Vector3 {
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
      return this;
   }

   /**
    * 加运算处理。
    *
    * @param scalar 内容
    * @return 向量
    */
   public addScalar(scalar: number): Vector3 {
      this.x += scalar;
      this.y += scalar;
      this.z += scalar;
      return this;
   }

   /**
    * 单个数据相加处理。
    *
    * @param value 数据
    * @return 向量
    */
   public add(value): Vector3 {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
      return this;
   }

   /**
    * 分量数据相加处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @return 向量
    */
   public addValue(x: number, y: number, z: number): Vector3 {
      this.x += x;
      this.y += y;
      this.z += z;
      return this;
   }

   /**
    * 比率数据相加处理。
    *
    * @param value 数据
    * @param scale 比率
    * @return 向量
    */
   public addScaledVector(value: IValue3, scale: number) {
      this.x += value.x * scale;
      this.y += value.y * scale;
      this.z += value.z * scale;
      return this;
   }

   /**
    * 多个数据相加处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public addVectors(value1: IValue3, value2: IValue3): Vector3 {
      this.x = value1.x + value2.x;
      this.y = value1.y + value2.y;
      this.z = value1.z + value2.z;
      return this;
   }

   /**
    * 数据相减处理。
    *
    * @param value 数据
    * @return 向量
    */
   public subScalar(value: number): Vector3 {
      this.x -= value;
      this.y -= value;
      this.z -= value;
      return this;
   }

   /**
    * 单个数据相减处理。
    *
    * @param value 数据
    * @return 向量
    */
   public sub(value: IValue3): Vector3 {
      this.x -= value.x;
      this.y -= value.y;
      this.z -= value.z;
      return this;
   }

   /**
    * 分量数据相减处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @return 向量
    */
   public subValue(x: number, y: number, z: number): Vector3 {
      this.x -= x;
      this.y -= y;
      this.z -= z;
      return this;
   }

   /**
    * 多个数据相减处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public subVectors(value1: IValue3, value2: IValue3): Vector3 {
      this.x = value1.x - value2.x;
      this.y = value1.y - value2.y;
      this.z = value1.z - value2.z;
      return this;
   }

   /**
    * 数据相乘处理。
    *
    * @param value 数据
    * @return 向量
    */
   public multiplyScalar(value: number): Vector3 {
      this.x *= value;
      this.y *= value;
      this.z *= value;
      return this;
   }

   /**
    * 单个数据相乘处理。
    *
    * @param value 数据
    * @return 向量
    */
   public multiply(value: IValue3): Vector3 {
      this.x *= value.x;
      this.y *= value.y;
      this.z *= value.z;
      return this;
   }

   /**
    * 分量数据相乘处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @return 向量
    */
   public multiplyValue(x: number, y: number, z: number): Vector3 {
      this.x *= x;
      this.y *= y;
      this.z *= z;
      return this;
   }

   /**
    * 多个数据相乘处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public multiplyVectors(value1: IValue3, value2: IValue3): Vector3 {
      this.x = value1.x * value2.x;
      this.y = value1.y * value2.y;
      this.z = value1.z * value2.z;
      return this;
   }

   /**
    * 除运算处理。
    *
    * @param scalar 内容
    * @return 向量
    */
   public divideScalar(value: number): Vector3 {
      var scalar = 1 / value;
      return this.multiplyScalar(scalar);
   }

   /**
    * 单个数据相除处理。
    *
    * @param value 数据
    * @return 向量
    */
   public divide(value: IValue3): Vector3 {
      this.x /= value.x;
      this.y /= value.y;
      this.z /= value.z;
      return this;
   }

   /**
    * 分量数据相除处理。
    *
    * @param x X分量
    * @param y Y分量
    * @param z Z分量
    * @return 向量
    */
   public divideValue(x: number, y: number, z: number): Vector3 {
      this.x /= x;
      this.y /= y;
      this.z /= z;
      return this;
   }

   /**
    * 获得长度。
    *
    * @return 长度
    */
   public length(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
   }

   /**
    * 获得平方长度。
    *
    * @return 长度
    */
   public lengthSquared(): number {
      return this.x * this.x + this.y * this.y + this.z * this.z;
   }

   /**
    * 获得模长度。
    *
    * @return 长度
    */
   public lengthManhattan(): number {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
   }

   /**
    * 设置长度。
    *
    * @param length 长度
    * @return 向量
    */
   public setLength(length: number): Vector3 {
      var currentLength = this.length();
      var rate = length / currentLength;
      return this.multiplyScalar(rate);
   }

   /**
    * 单位化处理。
    *
    * @return 向量
    */
   public normalize(): Vector3 {
      var length = this.length();
      return this.divideScalar(length);
   }

   /**
    * 计算取反的数据。
    *
    * @return 向量
    */
   public negate(): Vector3 {
      this.x = - this.x;
      this.y = - this.y;
      this.z = - this.z;
      return this;
   }

   /**
    * 计算向下取整的数据。
    *
    * @return 向量
    */
   public floor(): Vector3 {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
   }

   /**
    * 计算向上取整的数据。
    *
    * @return 向量
    */
   public ceil(): Vector3 {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
   }

   /**
    * 计算4舍5入的数据。
    *
    * @return 向量
    */
   public round(): Vector3 {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
   }

   /**
    * 计算向0取整的数据。
    *
    * @return 向量
    */
   public roundToZero() {
      this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
      return this;
   }

   /**
    * 获得朝向指定点的角度。
    *
    * @param point 顶点
    * @return 角度
    */
   public angleTo(point: Vector3): number {
      var theta = this.dot(point) / (Math.sqrt(this.lengthSquared() * point.lengthSquared()));
      return Math.acos(MathUtil.clamp(theta, - 1, 1));
   }

   /**
    * 获得到指定点的距离。
    *
    * @param point 顶点
    * @return 距离
    */
   public distanceTo(point: Vector3): number {
      return Math.sqrt(this.distanceToSquared(point));
   }

   /**
    * 获得到指定点的距离。
    *
    * @param point 顶点
    * @return 距离
    */
   public distanceToSquared(point: Vector3): number {
      var dx = this.x - point.x;
      var dy = this.y - point.y;
      var dz = this.z - point.z;
      return dx * dx + dy * dy + dz * dz;
   }

   /**
    * 计算最小数据。
    *
    * @param value 数据
    * @return 向量
    */
   public min(value: Vector3): Vector3 {
      this.x = Math.min(this.x, value.x);
      this.y = Math.min(this.y, value.y);
      this.z = Math.min(this.z, value.z);
      return this;
   }

   /**
    * 计算最大数据。
    *
    * @param value 数据
    * @return 向量
    */
   public max(value: Vector3): Vector3 {
      this.x = Math.max(this.x, value.x);
      this.y = Math.max(this.y, value.y);
      this.z = Math.max(this.z, value.z);
      return this;
   }

   /**
    * 计算最小和最大之间数据。
    *
    * @param min 最小数据
    * @param max 最大数据
    * @return 向量
    */
   public clamp(min: Vector3, max: Vector3): Vector3 {
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      this.z = Math.max(min.z, Math.min(max.z, this.z));
      return this;
   }

   /**
    * 计算最小和最大之间数据。
    *
    * @param min 最小数据
    * @param max 最大数据
    * @return 向量
    */
   public clampScalar(min: number, max: number): Vector3 {
      this.x = Math.max(min, Math.min(max, this.x));
      this.y = Math.max(min, Math.min(max, this.y));
      this.z = Math.max(min, Math.min(max, this.z));
      return this;
   }

   /**
    * 计算点积处理。已知 力和位移 求功
    * 单位化后 的dot值 是两个向量夹角的cos值
    * @param value 数据
    * @return 数据
    */
   public dot(value: Vector3): number {
      return this.x * value.x + this.y * value.y + this.z * value.z;
   }

   /**
    * 计算叉积处理。 得到垂直于两个矢量的矢量
    *
    * @param value 数据
    * @return 向量
    */
   public cross(value: Vector3): Vector3 {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      this.x = y * value.z - z * value.y;
      this.y = z * value.x - x * value.z;
      this.z = x * value.y - y * value.x;
      return this;
   }

   /**
    * 计算叉积处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public crossVectors(value1: Vector3, value2: Vector3): Vector3 {
      var ax = value1.x;
      var ay = value1.y;
      var az = value1.z;
      var bx = value2.x;
      var by = value2.y;
      var bz = value2.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
   }

   /**
    * 计算插值处理。
    *
    * @param value 数据
    * @param rate 比率
    * @return 向量
    */
   public lerp(value: Vector3, rate: number): Vector3 {
      this.x += (value.x - this.x) * rate;
      this.y += (value.y - this.y) * rate;
      this.z += (value.z - this.z) * rate;
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
   public lerpVectors(value1: Vector3, value2: Vector3, rate: number): Vector3 {
      this.subVectors(value2, value1).multiplyScalar(rate).add(value1);
      return this;
   }

   /**
    * 三维矩阵变换。
    *
    * @param matrix 矩阵
    * @return 向量
    */
   public applyMatrix3(matrix: Matrix3): Vector3 {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var data = matrix.data;
      this.x = data[0] * x + data[3] * y + data[6] * z;
      this.y = data[1] * x + data[4] * y + data[7] * z;
      this.z = data[2] * x + data[5] * y + data[8] * z;
      return this;
   }

   /**
    * 四维矩阵变换。
    *
    * @param matrix 矩阵
    * @return 向量
    */
   public applyMatrix4(matrix: Matrix4): Vector3 {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var data = matrix.elements;
      this.x = data[0] * x + data[4] * y + data[8] * z + data[12];
      this.y = data[1] * x + data[5] * y + data[9] * z + data[13];
      this.z = data[2] * x + data[6] * y + data[10] * z + data[14];
      return this;
   }

   /**
    * 从数组中获得数据。
    *
    * @param array 数组
    * @param offset 位置
    * @return 向量
    */
   public fromArray(array: Array<number>, offset: number = 0): Vector3 {
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      return this;
   }

   /**
    * 设置数据到数组中
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
      return array;
   }

   /**
    * 序列化数据到输出流里。
    *
    * @param output 数据流
    * @param dataCd 数据类型
    * @return 数组
    */
   public serialize(output: DataStream, dataCd: DataTypeEnum = DataTypeEnum.Float32) {
      switch (dataCd) {
         case DataTypeEnum.Int32:
            output.writeInt32(this.x);
            output.writeInt32(this.y);
            output.writeInt32(this.z);
            break;
         case DataTypeEnum.Float32:
            output.writeFloat(this.x);
            output.writeFloat(this.y);
            output.writeFloat(this.z);
            break;
         case DataTypeEnum.Float64:
            output.writeDouble(this.x);
            output.writeDouble(this.y);
            output.writeDouble(this.z);
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
            this.x = input.readInt32();
            this.y = input.readInt32();
            this.z = input.readInt32();
            break;
         case DataTypeEnum.Float32:
            this.x = input.readFloat();
            this.y = input.readFloat();
            this.z = input.readFloat();
            break;
         case DataTypeEnum.Float64:
            this.x = input.readDouble();
            this.y = input.readDouble();
            this.z = input.readDouble();
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
   public parse(value: string): Vector3 {
      var items = value.split(',')
      if (items.length == 3) {
         this.x = parseFloat(items[0]);
         this.y = parseFloat(items[1]);
         this.z = parseFloat(items[2]);
      } else {
         throw new Fatal(this, "Parse value failure. (value={1})", value);
      }
      AssertUtil.debugNumber(this.x, this.y, this.z);
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
      return x + ',' + y + ',' + z;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString() {
      return this.x + ',' + this.y + ',' + this.z;
   }

   /**
    * 克隆当前数据。
    *
    * @return 向量
    */
   public clone(): Vector3 {
      return new (this as any).constructor(this.x, this.y, this.z);
   }

   /**
    * 重置数据。
    *
    * @return 向量
    */
   public reset(): Vector3 {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      return this;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.x = null;
      this.y = null;
      this.z = null;
   }

   /**
    * 根据数据获得对象。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @param value3 数据3
    * @return 向量
    */
   public static from(value1?: any, value2?: any, value3?: any): Vector3 {
      var x = null;
      var y = null;
      var z = null;
      var count = arguments.length;
      if (count == 1) {
         var value = arguments[0];
         if (Array.isArray(value)) {
            x = value[0];
            y = value[1];
            z = value[2];
         } else {
            x = value.x;
            y = value.y;
            z = value.z;
         }
      } else if (count == 3) {
         x = arguments[0];
         y = arguments[1];
         z = arguments[2];
      }
      AssertUtil.debugNumber(x, y, z);
      return new Vector3(x, y, z);
   }

   /**
    * 从UVW维度构造三维向量。
    *
    * @param u U维度
    * @param x X分量
    * @param v V维度
    * @param y Y分量
    * @param w W维度
    * @param z Z分量
    * @return 向量
    */

   public static fromUvw(u: string, x: number, v: string, y: number, w: string, z: number): Vector3 {
      var value = new Vector3();
      value[u] = x;
      value[v] = y;
      value[w] = z;
      return value;
   }

   /**
    * 多个数据相加处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public static addVectors(value1: Vector3, value2: Vector3): Vector3 {
      var cx = value1.x + value2.x;
      var cy = value1.y + value2.y;
      var cz = value1.z + value2.z;
      return new Vector3(cx, cy, cz);
   }

   /**
    * 多个数据相减处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public static subVectors(value1: Vector3, value2: Vector3): Vector3 {
      var cx = value1.x - value2.x;
      var cy = value1.y - value2.y;
      var cz = value1.z - value2.z;
      return new Vector3(cx, cy, cz);
   }

   /**
    * 获得方向处理。
    *
    * @param point1 开始点
    * @param point2 结束点
    * @return 方向
    */
   public static direction(value1: Vector3, value2: Vector3): Vector3 {
      var cx = value2.x - value1.x;
      var cy = value2.y - value1.y;
      var cz = value2.z - value1.z;
      var direction = new Vector3(cx, cy, cz);
      direction.normalize();
      return direction;
   }

   /**
    * 计算差乘处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    */
   public static crossVectors(value1: Vector3, value2: Vector3): Vector3 {
      var direction = new Vector3();
      direction.crossVectors(value1, value2);
      return direction;
   }

   // @Prototype()
   // public applyEuler() {
   //    var quaternion;
   //    return function applyEuler(euler) {
   //       if (euler instanceof Euler === false) {
   //          console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
   //       }
   //       if (quaternion === undefined) quaternion = new Quaternion();
   //       this.applyQuaternion(quaternion.setFromEuler(euler));
   //       return this;
   //    };
   // }

   // @Prototype()
   // public applyAxisAngle() {
   //    var quaternion;
   //    return function applyAxisAngle(axis, angle) {
   //       if (quaternion === undefined) quaternion = new Quaternion();
   //       this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
   //       return this;
   //    };
   // }

   // public applyProjection(m) {
   //    var x = this.x, y = this.y, z = this.z;
   //    var e = m.elements;
   //    var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
   //    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
   //    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
   //    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
   //    return this;
   // }

   // public applyQuaternion(q) {
   //    var x = this.x;
   //    var y = this.y;
   //    var z = this.z;
   //    var qx = q.x;
   //    var qy = q.y;
   //    var qz = q.z;
   //    var qw = q.w;
   //    var ix = qw * x + qy * z - qz * y;
   //    var iy = qw * y + qz * x - qx * z;
   //    var iz = qw * z + qx * y - qy * x;
   //    var iw = - qx * x - qy * y - qz * z;
   //    this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
   //    this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
   //    this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;
   //    return this;
   // }

   // @Prototype()
   // public project() {
   //    var matrix;
   //    return function project(camera) {
   //       if (matrix === undefined) {
   //          matrix = new Matrix4();
   //       }
   //       matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
   //       return this.applyProjection(matrix);
   //    };
   // }

   // @Prototype()
   // public unproject() {
   //    var matrix;
   //    return function unproject(camera) {
   //       if (matrix === undefined) matrix = new Matrix4();
   //       matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
   //       return this.applyProjection(matrix);
   //    };
   // }

   // public transformDirection(m) {
   //    var x = this.x, y = this.y, z = this.z;
   //    var e = m.elements;
   //    this.x = e[0] * x + e[4] * y + e[8] * z;
   //    this.y = e[1] * x + e[5] * y + e[9] * z;
   //    this.z = e[2] * x + e[6] * y + e[10] * z;
   //    this.normalize();
   //    return this;
   // }


   // public clampLength(min, max) {
   //    var length = this.length();
   //    this.multiplyScalar(Math.max(min, Math.min(max, length)) / length);
   //    return this;
   // }

   // @Prototype()
   // public projectOnVector() {
   //    var v1, dot;
   //    return function projectOnVector(vector) {
   //       if (v1 === undefined) v1 = new Vector3();
   //       v1.copy(vector).normalize();
   //       dot = this.dot(v1);
   //       return this.copy(v1).multiplyScalar(dot);
   //    };
   // }

   // @Prototype()
   // public projectOnPlane() {
   //    var v1;
   //    return function projectOnPlane(planeNormal) {
   //       if (v1 === undefined) v1 = new Vector3();
   //       v1.copy(this).projectOnVector(planeNormal);
   //       return this.sub(v1);
   //    };
   // }

   // @Prototype()
   // public reflect() {
   //    var v1;
   //    return function reflect(normal) {
   //       if (v1 === undefined) v1 = new Vector3();
   //       return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
   //    };
   // }

   // public setFromSpherical(s) {
   //    var sinPhiRadius = Math.sin(s.phi) * s.radius;
   //    this.x = sinPhiRadius * Math.sin(s.theta);
   //    this.y = Math.cos(s.phi) * s.radius;
   //    this.z = sinPhiRadius * Math.cos(s.theta);
   //    return this;
   // }

   // public setFromMatrixPosition(m) {
   //    return this.setFromMatrixColumn(m, 3);
   // }

   // public setFromMatrixScale(m) {
   //    var sx = this.setFromMatrixColumn(m, 0).length();
   //    var sy = this.setFromMatrixColumn(m, 1).length();
   //    var sz = this.setFromMatrixColumn(m, 2).length();
   //    this.x = sx;
   //    this.y = sy;
   //    this.z = sz;
   //    return this;
   // }

   // public setFromMatrixColumn(m, index) {
   //    if (typeof m === 'number') {
   //       console.warn('THREE.Vector3: setFromMatrixColumn now expects ( matrix, index ).');
   //       m = arguments[1];
   //       index = arguments[0];
   //    }
   //    return this.fromArray(m.elements, index * 4);
   // }

   // public fromAttribute(attribute, index, offset) {
   //    if (offset == undefined) {
   //       offset = 0;
   //    }
   //    index = index * attribute.itemSize + offset;
   //    this.x = attribute.array[index];
   //    this.y = attribute.array[index + 1];
   //    this.z = attribute.array[index + 2];
   //    return this;
   // }
   // //==========================================================
   // // <T>设置最小数据。</T>
   // //==========================================================
   // public setMin() {
   //    this.x = this.y = this.z = Number.MIN_VALUE;
   // }
   // //==========================================================
   // // <T>设置最大数据。</T>
   // //==========================================================
   // public setMax() {
   //    this.x = this.y = this.z = Number.MAX_VALUE;
   // }
   // //==========================================================
   // // <T>增加数据内容。</T>
   // //
   // // @param value 内容
   // //==========================================================
   // public addValue3(value: Value3) {
   //    this.x += value.x;
   //    this.y += value.y;
   //    this.z += value.z;
   // }
   // //==========================================================
   // // <T>获得长度。</T>
   // //
   // // @return 绝对值
   // //==========================================================
   // public lengthTo(x, y, z) {
   //    var cx = this.x - x;
   //    var cy = this.y - y;
   //    var cz = this.z - z;
   //    return Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));
   // }
   // //==========================================================
   // // <T>获得长度。</T>
   // //
   // // @return 绝对值
   // //==========================================================
   // public lengthTo2(value) {
   //    var cx = this.x - value.x;
   //    var cy = this.y - value.y;
   //    var cz = this.z - value.z;
   //    return Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));
   // }
   // //==========================================================
   // // <T>获得绝对值。</T>
   // //
   // // @return 绝对值
   // //==========================================================
   // public absolute() {
   //    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
   // }
}
