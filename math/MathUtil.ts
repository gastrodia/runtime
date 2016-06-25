import {StringUtil} from '../common/lang/StringUtil';

/**
* 数学工具类。
*/
export class MathUtil {
   // 基础定义
   public static PI_2 = Math.PI / 2;
   public static PI = Math.PI;
   public static PI2 = Math.PI * 2;
   public static PI_2_P = 1 / (Math.PI / 2);
   // 最小值
   public static EPSILON = Math.pow(2, - 52);
   // 角度转换
   public static RADIAN_RATE = 180 / Math.PI;
   public static DEGREE_RATE = Math.PI / 180;
   // 缺省精度
   public static DEFAULT_PRECISION: number = 6;
   // 缺省公差
   public static DEFAULT_TOLERANCE: number = Math.pow(0.1, MathUtil.DEFAULT_PRECISION);
   // 临时数组
   public static VALUE_4: Array<number> = new Array<number>(4);
   public static VALUE_9: Array<number> = new Array<number>(9);
   public static VALUE_16: Array<number> = new Array<number>(16);
   // 唯一编号
   private static _guidChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
   private static _guidBuffer = new Array(36);

   /**
    * 判断内容是否为零。
    *
    * @param value 内容
    * @param tolerance 公差
    * @return 是否为零
    */
   public static isZero(value: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEquals(value, 0, tolerance);
   }

   /**
    * 判断内容是否近似相等。
    *
    * @param value1 内容1
    * @param value2 内容2
    * @param tolerance 公差
    * @return 是否为零
    */
   public static nearlyEquals(value1: number, value2: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return Math.abs(value1 - value2) <= tolerance;
   }

   /**
 * 判断内容是否近似大于等于
 *
 * @param value1 内容1
 * @param value2 内容2
 * @param tolerance 公差
 * @return 是否为零
 */
   public static nearlyGreaterEquals(value1: number, value2: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEquals(value1, value2, tolerance) || value1 > value2;
   }

   /**
    * 判断内容是否近似小于等于
    *
    * @param value1 内容1
    * @param value2 内容2
    * @param tolerance 公差
    * @return 是否为零
    */
   public static nearlyLessEquals(value1: number, value2: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEquals(value1, value2, tolerance) || value1 < value2;
   }

   /**
    * 判断内容是否近似小于。
    *
    * @param value1 内容1
    * @param value2 内容2
    * @param tolerance 公差
    * @return 是否小于
    */
   public static nearlyLess(value1: number, value2: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEquals(value1, value2, tolerance) || value1 < value2;
   }

   /**
    * 判断内容是否近似大于。
    *
    * @param value1 内容1
    * @param value2 内容2
    * @param tolerance 公差
    * @return 是否大于
    */
   public static nearlyGreater(value1: number, value2: number, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return this.nearlyEquals(value1, value2, tolerance) || value1 > value2;
   }

   /**
    * 转换角度为弧度。
    *
    * @param angle 角度
    * @return 弧度
    */
   public static toRadians(angle: number): number {
      return angle * this.DEGREE_RATE;
   }

   /**
    * 转换弧度为角度。
    *
    * @param rad 弧度
    * @return 角度
    */
   public static toDegrees(rad: number): number {
      return rad * this.RADIAN_RATE;
   }

   /**
    * 计算两个数字的插值。
    */
   public static lerp(a: number, b: number, rate: number) {
      return a + rate * (b - a);
   }

   /**
    * 计算在范围间的有效数字。
    *
    * @param value 内容
    * @param min 最小值
    * @param max 最大值
    */
   public static clamp(value: number, min: number, max: number): number {
      return Math.max(min, Math.min(max, value));
   }

   /**
    * 产生一个唯一编号。
    *
    * @return 唯一编号
    */
   public static makeGuid() {
      var value: number = 0;
      var buffer = this._guidBuffer
      var chars = this._guidChars;
      for (var i: number = 0; i < 36; i++) {
         if (i === 8 || i === 13 || i === 18 || i === 23) {
            buffer[i] = '-';
         } else if (i === 14) {
            buffer[i] = '4';
         } else {
            if (value <= 0x02) value = 0x2000000 + (Math.random() * 0x1000000) | 0;
            var index = value & 0xf;
            value = value >> 4;
            buffer[i] = chars[(i === 19) ? (index & 0x3) | 0x8 : index];
         }
      }
      return buffer.join('');
   }

   /**
    * 产生一个唯一编号。
    *
    * @return 唯一编号
    */
   public static makeUuid() {
      var value = this.makeGuid();
      return StringUtil.removeChars(value, '-');
   }





   public static euclideanModulo(n, m) {
      return ((n % m) + m) % m;
   }

   public static mapLinear(x, a1, a2, b1, b2) {
      return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
   }

   public static smoothstep(x, min, max) {
      if (x <= min) return 0;
      if (x >= max) return 1;
      x = (x - min) / (max - min);
      return x * x * (3 - 2 * x);
   }

   public static smootherstep(x, min, max) {
      if (x <= min) return 0;
      if (x >= max) return 1;
      x = (x - min) / (max - min);
      return x * x * x * (x * (x * 6 - 15) + 10);
   }

   public static random16() {
      console.warn('THREE.Math.random16() has been deprecated. Use Math.random() instead.');
      return Math.random();
   }

   public static randInt(low, high) {
      return low + Math.floor(Math.random() * (high - low + 1));
   }

   public static randFloat(low, high) {
      return low + Math.random() * (high - low);
   }

   public static randFloatSpread(range) {
      return range * (0.5 - Math.random());
   }

   public static degreeToRadiansFactor = Math.PI / 180;

   public static degToRad(degrees) {
      return degrees * this.degreeToRadiansFactor;
   }

   public static radianToDegreesFactor = 180 / Math.PI;

   public static radToDeg(radians) {
      return radians * this.radianToDegreesFactor;
   }

   public static isPowerOfTwo(value) {
      return (value & (value - 1)) === 0 && value !== 0;
   }

   public static nearestPowerOfTwo(value) {
      return Math.pow(2, Math.round(Math.log(value) / Math.LN2));
   }

   public static nextPowerOfTwo(value) {
      value--;
      value |= value >> 1;
      value |= value >> 2;
      value |= value >> 4;
      value |= value >> 8;
      value |= value >> 16;
      value++;
      return value;
   }
}
