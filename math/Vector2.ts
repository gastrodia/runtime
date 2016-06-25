import {AssertUtil} from '../common/AssertUtil';
import {DataStream} from '../common/io/DataStream';
import {DataTypeEnum} from '../common/lang/DataTypeEnum';
import {Fatal} from '../common/lang/Fatal';
import {FloatUtil} from '../common/lang/FloatUtil';
import {IValue2} from './IValue2';
import {MathUtil} from './MathUtil';

/**
 * 二维向量。
 */
export class Vector2 implements IValue2 {
   // X分量
   public x: number;
   // Y分量
   public y: number;

   /**
    * 构造处理。
    *
    * @param x X分量
    * @param y Y分量
    */
   public constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
   }

   /**
    * 判断是否有效。
    *
    * @return 有效
    */
   public isValid(): boolean {
      return !isNaN(this.x) && !isNaN(this.y) && isFinite(this.x) && isFinite(this.y);
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty() {
      return (this.x == 0) && (this.y == 0);
   }

   /**
    * 判断是否相等。
    *
    * @param value 数据
    * @return 是否相等
    */
   public equals(value: IValue2): boolean {
      var ex = this.x == value.x;
      var ey = this.y == value.y;
      return ex && ey;
   }

   /**
    * 判断是否相等。
    *
    * @param x X分量
    * @param y Y分量
    * @return 是否相等
    */
   public equalsValue(x: number, y: number): boolean {
      return (this.x == x) && (this.y == y);
   }

   /**
    * 判断是否近似相等。
    *
    * @param value 数据
    * @param tolerance 公差
    * @return 是否相等
    */
   public nearlyEquals(value: IValue2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEqualsValue(value.x, value.y, tolerance);
   }

   /**
    * 判断是否近似相等。
    *
    * @param x X分量
    * @param y Y分量
    * @param tolerance 公差
    * @return 是否相等
    */
   public nearlyEqualsValue(x: number, y: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      var ex = MathUtil.nearlyEquals(this.x, x, tolerance);
      var ey = MathUtil.nearlyEquals(this.y, y, tolerance);
      return ex && ey;
   }

   /**
    * 设置X分量。
    *
    * @param x X分量
    * @return 向量
    */
   public setX(x: number): Vector2 {
      this.x = x;
      return this;
   }

   /**
    * 设置Y分量。
    *
    * @param y Y分量
    * @return 向量
    */
   public setY(y: number): Vector2 {
      this.y = y;
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
   public set(x: number, y: number): Vector2 {
      this.x = x;
      this.y = y;
      return this;
   }

   /**
    * 设置数据。
    *
    * @param value 数据
    * @return 向量
    */
   public setScalar(value: number): Vector2 {
      this.x = value;
      this.y = value;
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
   public assign(value: IValue2): Vector2 {
      this.x = value.x;
      this.y = value.y;
      return this;
   }

   /**
    * 数据相加处理。
    *
    * @param value 数据
    * @return 向量
    */
   public addScalar(value: number): Vector2 {
      this.x += value;
      this.y += value;
      return this;
   }

   /**
    * 单个数据相加处理。
    *
    * @param value 数据
    * @return 向量
    */
   public add(value: IValue2): Vector2 {
      this.x += value.x;
      this.y += value.y;
      return this;
   }

   /**
    * 分量数据相加处理。
    *
    * @param x X分量
    * @param y Y分量
    * @return 向量
    */
   public addValue(x: number, y: number): Vector2 {
      this.x += x;
      this.y += y;
      return this;
   }

   /**
    * 比率数据相加处理。
    *
    * @param value 数据
    * @param scale 比率
    * @return 向量
    */
   public addScaledVector(value: IValue2, scale: number): Vector2 {
      this.x += value.x * scale;
      this.y += value.y * scale;
      return this;
   }

   /**
    * 多个数据相加处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public addVectors(value1: IValue2, value2: IValue2): Vector2 {
      this.x = value1.x + value2.x;
      this.y = value1.y + value2.y;
      return this;
   }

   /**
    * 数据相减处理。
    *
    * @param value 数据
    * @return 向量
    */
   public subScalar(value: number): Vector2 {
      this.x -= value;
      this.y -= value;
      return this;
   }

   /**
    * 单个数据相减处理。
    *
    * @param value 数据
    * @return 向量
    */
   public sub(value: IValue2): Vector2 {
      this.x -= value.x;
      this.y -= value.y;
      return this;
   }

   /**
    * 分量数据相减处理。
    *
    * @param x X分量
    * @param y Y分量
    * @return 向量
    */
   public subValue(x: number, y: number): Vector2 {
      this.x -= x;
      this.y -= y;
      return this;
   }

   /**
    * 多个数据相减处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public subVectors(value1: IValue2, value2: IValue2): Vector2 {
      this.x = value1.x - value2.x;
      this.y = value1.y - value2.y;
      return this;
   }

   /**
    * 数据相乘处理。
    *
    * @param value 数据
    * @return 向量
    */
   public multiplyScalar(value: number): Vector2 {
      this.x *= value;
      this.y *= value;
      return this;
   }

   /**
    * 单个数据相乘处理。
    *
    * @param value 数据
    * @return 向量
    */
   public multiply(value: IValue2): Vector2 {
      this.x *= value.x;
      this.y *= value.y;
      return this;
   }

   /**
    * 分量数据相乘处理。
    *
    * @param x X分量
    * @param y Y分量
    * @return 向量
    */
   public multiplyValue(x: number, y: number): Vector2 {
      this.x *= x;
      this.y *= y;
      return this;
   }

   /**
    * 多个数据相乘处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public multiplyVectors(value1: IValue2, value2: IValue2): Vector2 {
      this.x = value1.x * value2.x;
      this.y = value1.y * value2.y;
      return this;
   }

   /**
    * 数据相除处理。
    *
    * @param value 数据
    * @return 向量
    */
   public divideScalar(value: number): Vector2 {
      return this.multiplyScalar(1 / value);
   }

   /**
    * 单个数据相除处理。
    *
    * @param value 数据
    * @return 向量
    */
   public divide(value: IValue2): Vector2 {
      this.x /= value.x;
      this.y /= value.y;
      return this;
   }

   /**
    * 分量数据相除处理。
    *
    * @param x X分量
    * @param y Y分量
    * @return 向量
    */
   public divideValue(x: number, y: number): Vector2 {
      this.x /= x;
      this.y /= y;
      return this;
   }

   /**
    * 获得角度。
    *
    * @return 角度
    */
   public angle(): number {
      var angle = Math.atan2(this.y, this.x);
      if (angle < 0) {
         angle += Math.PI * 2;
      }
      return angle;
   }

   /**
    * 获得长度。
    *
    * @return 长度
    */
   public length(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
   }

   /**
    * 获得平方长度。
    *
    * @return 长度
    */
   public lengthSquared(): number {
      return this.x * this.x + this.y * this.y;
   }

   /**
    * 获得模长度。
    *
    * @return 长度
    */
   public lengthManhattan(): number {
      return Math.abs(this.x) + Math.abs(this.y);
   }

   /**
    * 设置长度。
    *
    * @param length 长度
    * @return 向量
    */
   public setLength(length: number): Vector2 {
      var currentLength = this.length();
      var rate = length / currentLength;
      return this.multiplyScalar(rate);
   }

   /**
    * 获得到指定点的长度。
    *
    * @param value 数据
    * @return 长度
    */
   public distanceTo(value: Vector2): number {
      return Math.sqrt(this.distanceToSquared(value));
   }

   /**
    * 获得到指定点的平放长度。
    *
    * @param value 数据
    * @return 长度
    */
   public distanceToSquared(value: IValue2): number {
      var dx = this.x - value.x;
      var dy = this.y - value.y;
      return dx * dx + dy * dy;
   }

   /**
    * 单位化处理。
    *
    * @return 向量
    */
   public normalize(): Vector2 {
      var length = this.length();
      if (Math.abs(length) <= MathUtil.EPSILON) {
         return this.set(0, 0);
      }
      return this.divideScalar(length);
   }

   /**
    * 计算取反的数据。
    *
    * @return 向量
    */
   public negate(): Vector2 {
      this.x = - this.x;
      this.y = - this.y;
      return this;
   }

   /**
    * 计算向下取整的数据。
    *
    * @return 向量
    */
   public floor(): Vector2 {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
   }

   /**
    * 计算向上取整的数据。
    *
    * @return 向量
    */
   public ceil(): Vector2 {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
   }

   /**
    * 计算4舍5入的数据。
    *
    * @return 向量
    */
   public round(): Vector2 {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
   }

   /**
    * 计算向0取整的数据。
    *
    * @return 向量
    */
   public roundToZero(): Vector2 {
      this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
      return this;
   }

   /**
    * 计算最小数据。
    *
    * @param value 数据
    * @return 向量
    */
   public min(value: IValue2): Vector2 {
      this.x = Math.min(this.x, value.x);
      this.y = Math.min(this.y, value.y);
      return this;
   }

   /**
    * 计算最大数据。
    *
    * @param value 数据
    * @return 向量
    */
   public max(value: IValue2): Vector2 {
      this.x = Math.max(this.x, value.x);
      this.y = Math.max(this.y, value.y);
      return this;
   }

   /**
    * 计算最小和最大之间数据。
    *
    * @param min 最小数据
    * @param max 最大数据
    * @return 向量
    */
   public clamp(min: IValue2, max: IValue2): Vector2 {
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      return this;
   }

   /**
    * 计算最小和最大之间数据。
    *
    * @param min 最小数据
    * @param max 最大数据
    * @return 向量
    */
   public clampScalar(min: number, max: number): Vector2 {
      this.x = Math.max(min, Math.min(max, this.x));
      this.y = Math.max(min, Math.min(max, this.y));
      return this;
   }

   /**
    * 计算最小和最大之间长度。
    *
    * @param min 最小数据
    * @param max 最大数据
    * @return 向量
    */
   public clampLength(min: number, max: number): Vector2 {
      var length = this.length();
      var rate = Math.max(min, Math.min(max, length)) / length;
      this.multiplyScalar(rate);
      return this;
   }

   /**
    * 计算点积处理。
    *
    * @param value 数据
    * @return 数据
    */
   public dot(value: IValue2): number {
      return this.x * value.x + this.y * value.y;
   }

   /**
    * 计算插值处理。
    *
    * @param value 数据
    * @param rate 比率
    * @return 向量
    */
   public lerp(value: IValue2, rate: number): Vector2 {
      this.x += (value.x - this.x) * rate;
      this.y += (value.y - this.y) * rate;
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
   public lerpVectors(value1: Vector2, value2: Vector2, rate: number): Vector2 {
      this.subVectors(value2, value1).multiplyScalar(rate).add(value1);
      return this;
   }

   /**
    * 旋转角度。
    *
    * @param angle 角度
    * @return 向量
    */
   public rotate(angle: number): Vector2 {
      var ac = Math.cos(angle);
      var as = Math.sin(angle);
      var cx = this.x * ac - this.y * as;
      var cy = this.y * ac + this.x * as;
      this.x = cx;
      this.y = cy;
      return this;
   }

   /**
    * 绕指定中心点旋转角度。
    *
    * @param center 中心
    * @param angle 角度
    * @return 向量
    */
   public rotateAround(center: IValue2, angle: number): Vector2 {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var x = this.x - center.x;
      var y = this.y - center.y;
      this.x = x * c - y * s + center.x;
      this.y = x * s + y * c + center.y;
      return this;
   }

   /**
    * 根据数据获得对象。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public from(value1?: any, value2?: any): Vector2 {
      var x = null;
      var y = null;
      var count = arguments.length;
      if (count == 1) {
         var value = arguments[0];
         if (Array.isArray(value)) {
            x = value[0];
            y = value[1];
         } else {
            x = value.x;
            y = value.y;
         }
      } else if (count == 2) {
         x = arguments[0];
         y = arguments[1];
      }
      AssertUtil.debugNumber(x);
      AssertUtil.debugNumber(y);
      this.x = x;
      this.y = y;
      return this;
   }

   /**
    * 从数组中获得数据。
    *
    * @param array 数组
    * @param offset 位置
    * @return 向量
    */
   public fromArray(array: Array<number>, offset: number = 0): Vector2 {
      this.x = array[offset];
      this.y = array[offset + 1];
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
            break;
         case DataTypeEnum.Float32:
            output.writeFloat(this.x);
            output.writeFloat(this.y);
            break;
         case DataTypeEnum.Float64:
            output.writeDouble(this.x);
            output.writeDouble(this.y);
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
            break;
         case DataTypeEnum.Float32:
            this.x = input.readFloat();
            this.y = input.readFloat();
            break;
         case DataTypeEnum.Float64:
            this.x = input.readDouble();
            this.y = input.readDouble();
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
   public parse(source: string): Vector2 {
      var items = source.split(',')
      if (items.length == 2) {
         this.x = parseFloat(items[0]);
         this.y = parseFloat(items[1]);
      } else {
         throw new Fatal(this, "Parse value failure. (source={1})", source);
      }
      AssertUtil.debugNumber(this.x, this.y);
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
      return x + ',' + y;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString() {
      return this.x + ',' + this.y;
   }

   /**
    * 重置数据。
    *
    * @return 向量
    */
   public reset(): Vector2 {
      return this.set(0, 0);
   }

   /**
    * 克隆当前数据。
    *
    * @return 向量
    */
   public clone(): Vector2 {
      return new (this as any).constructor(this.x, this.y);
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.x = null;
      this.y = null;
   }

   /** 原点 */
   public static Origin = new Vector2(0, 0);

   /**
    * 根据数据获得对象。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   protected static innerFrom(result: IValue2, value1?: any, value2?: any): Vector2 {
      var x = null;
      var y = null;
      var count = arguments.length;
      if (count == 1) {
         var value = arguments[0];
         if (Array.isArray(value)) {
            x = value[0];
            y = value[1];
         } else {
            x = value.x;
            y = value.y;
         }
      } else if (count == 2) {
         x = arguments[0];
         y = arguments[1];
      }
      AssertUtil.debugNumber(x);
      AssertUtil.debugNumber(y);
      return new Vector2(x, y);
   }

   /**
    * 根据数据获得对象。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public static from(value1?: any, value2?: any): Vector2 {
      var x = null;
      var y = null;
      var count = arguments.length;
      if (count == 1) {
         var value = arguments[0];
         if (Array.isArray(value)) {
            x = value[0];
            y = value[1];
         } else {
            x = value.x;
            y = value.y;
         }
      } else if (count == 2) {
         x = arguments[0];
         y = arguments[1];
      }
      AssertUtil.debugNumber(x, y);
      return new Vector2(x, y)
   }

   /**
    * 从UVW维度构造二维向量。
    *
    * @param u U维度
    * @param x X分量
    * @param v V维度
    * @param y Y分量
    * @return 向量
    */
   public static fromUv(u: string, x: number, v: string, y: number): Vector2 {
      var value = new Vector2();
      value[u] = x;
      value[v] = y;
      return value;
   }

   /**
    * 多个数据相加处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public static addVectors(value1: IValue2, value2: IValue2): Vector2 {
      var x = value1.x + value2.x;
      var y = value1.y + value2.y;
      return new Vector2(x, y);
   }

   /**
    * 多个数据相减处理。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 向量
    */
   public static subVectors(value1: IValue2, value2: IValue2): Vector2 {
      var x = value1.x - value2.x;
      var y = value1.y - value2.y;
      return new Vector2(x, y);
   }

   /**
    * 获得两点之间点积。
    *
    * @param value1 数据1
    * @param value2 数据2
    * @return 点积
    */
   public static dot(value1: IValue2, value2: IValue2): number {
      return value1.x * value2.x + value1.y * value2.y;
   }

   /**
    * 获得两点之间点积。
    *
    * @param x1 数据1的X分量
    * @param y1 数据1的Y分量
    * @param x2 数据2的X分量
    * @param y2 数据2的Y分量
    * @return 点积
    */
   public static dotValue(x1: number, y1: number, x2: number, y2: number): number {
      return x1 * x2 + y1 * y2;
   }

   /**
    * 获得两点之间距离。
    *
    * @param point1 开始点
    * @param point2 结束点
    * @return 距离
    */
   public static distance(point1: IValue2, point2: IValue2): number {
      var cx = point2.x - point1.x;
      var cy = point2.y - point1.y;
      return Math.sqrt(cx * cx + cy * cy)
   }

   /**
    * 获得方向。
    *
    * @param point1 开始点
    * @param point2 结束点
    * @return 方向
    */
   public static direction(point1: IValue2, point2: IValue2): Vector2 {
      var x = point2.x - point1.x;
      var y = point2.y - point1.y;
      var direction = new Vector2(x, y);
      direction.normalize();
      return direction;
   }

   /**
    * 获得平方长度。
    *
    * @return 长度
    */
   public static lengthSquared(x, y): number {
      return x * x + y * y;
   }

   /**
    * 计算插值处理。
    *
    * @param value 数据
    * @param rate 比率
    * @return 向量
    */
   public static lerp(value1: IValue2, value2: IValue2, rate: number): Vector2 {
      var x = MathUtil.lerp(value1.x, value2.x, rate);
      var y = MathUtil.lerp(value1.y, value2.y, rate);
      return new Vector2(x, y);
   }

   /**
    * 绕指定点旋转角度。
    *
    * @param center 中心
    * @param angle 角度
    * @return 向量
    */
   public static rotate(point: Vector2, angle: number): Vector2 {
      var vcos = Math.cos(angle);
      var vsin = Math.sin(angle);
      var x = point.x * vcos - point.y * vsin;
      var y = point.y * vcos + point.x * vsin;
      point.x = x;
      point.y = y;
      return point;
   }

   /**
    * 绕指定点旋转角度。
    *
    * @param center 中心
    * @param angle 角度
    * @return 向量
    */
   public static rotateAroundPoint(point: Vector2, target: Vector2, angle: number): Vector2 {
      return point.clone().sub(target).rotate(angle).add(target);
   }

   // public subtract(a) {
   //    this.x -= a.x;
   //    this.y -= a.y;
   //    return this
   // }
   // goog.math.Vec2.randomUnit = function() {
   //     var a = Math.random() * Math.PI * 2;
   //     return new goog.math.Vec2(Math.cos(a),Math.sin(a))
   // }
   // ;
   // goog.math.Vec2.random = function() {
   //     var a = Math.sqrt(Math.random())
   //       , b = Math.random() * Math.PI * 2;
   //     return new goog.math.Vec2(Math.cos(b) * a,Math.sin(b) * a)
   // }
   //    public get width() {
   //       return this.x;
   //    }
   //    public set width(value) {
   //       this.x = value;
   //    }
   //    public get height() {
   //       return this.y;
   //    }
   //    public set height(value) {
   //       this.y = value;
   //    }
   //    public fromAttribute(attribute, index, offset) {
   //       if (offset === undefined) offset = 0;
   //       index = index * attribute.itemSize + offset;
   //       this.x = attribute.array[index];
   //       this.y = attribute.array[index + 1];
   //       return this;
   //    }
   //    public static fromCoordinate(value) {
   //       return new Vector2(value.x, value.y)
   //    }
   // public static distance(a, b) {
   //    var c = a.x - b.x, d = a.y - b.y;
   //    return Math.sqrt(c * c + d * d)
   // }
   // goog.math.Coordinate.prototype.clone = function() {
   //    return new goog.math.Coordinate(this.x, this.y)
   // }
   // goog.math.Coordinate.azimuth = function(a) {
   //    return goog.math.angle(0, 0, a.x, a.y)
   // }
   // ;
   // goog.math.Coordinate.squaredDistance = function(a, b) {
   //    var c = a.x - b.x
   //       , d = a.y - b.y;
   //    return c * c + d * d
   // }
   // ;
   // goog.math.Coordinate.difference = function(a, b) {
   //    return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
   // }
   // ;
   // goog.math.Coordinate.sum = function(a, b) {
   //    return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
   // }
   // goog.math.Coordinate.prototype.translate = function(a, b) {
   //    a instanceof goog.math.Coordinate ? (this.x += a.x,
   //       this.y += a.y) : (this.x += a,
   //          goog.isNumber(b) && (this.y += b));
   //    return this
   // }
   // ;
   // goog.math.Coordinate.prototype.scale = function(a, b) {
   //    var c = goog.isNumber(b) ? b : a;
   //    this.x *= a;
   //    this.y *= c;
   //    return this
   // }
   // ;
   // goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
   //    var c = b || new goog.math.Coordinate(0, 0)
   //       , d = this.x
   //       , e = this.y
   //       , f = Math.cos(a)
   //       , g = Math.sin(a);
   //    this.x = (d - c.x) * f - (e - c.y) * g + c.x;
   //    this.y = (d - c.x) * g + (e - c.y) * f + c.y
   // }
   // ;
   // goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
   //    this.rotateRadians(goog.math.toRadians(a), b)
   // }
   // get width() {
   // 	return this.x;
   // },
   // set width( value ) {
   // 	this.x = value;
   // },
   // get height() {
   // 	return this.y;
   // },
   // set height( value ) {
   // 	this.y = value;
   // },
   // fromAttribute: function ( attribute, index, offset ) {
   // 	if ( offset === undefined ) offset = 0;
   // 	index = index * attribute.itemSize + offset;
   // 	this.x = attribute.array[ index ];
   // 	this.y = attribute.array[ index + 1 ];
   // 	return this;
   // },


   // //==========================================================
   // // <T>设置最小数据。</T>
   // //==========================================================
   // public setMin() {
   //    this.x = Number.MIN_VALUE;
   //    this.y = Number.MIN_VALUE;
   // }
   // //==========================================================
   // // <T>设置最大数据。</T>
   // //==========================================================
   // public setMax() {
   //    this.x = Number.MAX_VALUE;
   //    this.y = Number.MAX_VALUE;
   // }
   // //============================================================
   // // <T>合并最小值。</T>
   // //
   // // @param value 二维数据
   // //============================================================
   // public mergeMin(value) {
   //    this.x = Math.min(this.x, value.x);
   //    this.y = Math.min(this.y, value.y);
   // }
   // //============================================================
   // // <T>合并最小值。</T>
   // //
   // // @param x X坐标
   // // @param y Y坐标
   // //============================================================
   // public mergeMin2(x, y) {
   //    this.x = Math.min(this.x, x);
   //    this.y = Math.min(this.y, y);
   // }
   // //============================================================
   // // <T>合并最大值。</T>
   // //
   // // @method
   // // @param value:SValue2 二维数据
   // //============================================================
   // public mergeMax(value) {
   //    this.x = Math.max(this.x, value.x);
   //    this.y = Math.max(this.y, value.y);
   // }
   // //============================================================
   // // <T>合并最大值。</T>
   // //
   // // @method
   // // @param x:Number X坐标
   // // @param y:Number Y坐标
   // //============================================================
   // public mergeMax2(x, y) {
   //    this.x = Math.max(this.x, x);
   //    this.y = Math.max(this.y, y);
   // }
   // //==========================================================
   // // <T>获得长度。</T>
   // //
   // // @method
   // // @return Number 长度
   // //==========================================================
   // public length(value) {
   //    var cx = this.x - value.x;
   //    var cy = this.y - value.y;
   //    return Math.sqrt(cx * cx + cy * cy);
   // }
   // //==========================================================
   // // <T>获得长度。</T>
   // //
   // // @method
   // // @return Number 长度
   // //==========================================================
   // public length2(x, y) {
   //    var cx = this.x - x;
   //    var cy = this.y - y;
   //    return Math.sqrt(cx * cx + cy * cy);
   // }
}
