import {Rectangle} from './Rectangle';
import {Vector3} from './Vector3';

//==========================================================
// <T>数学函数管理类</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
export class MathUtil2 {
   // @const
   public static PI_2 = Math.PI / 2;
   public static PI = Math.PI;
   public static PI2 = Math.PI * 2;
   // @attribute
   public static PI_2_P = 1 / (Math.PI / 2);
   // @const
   public static RADIAN_RATE = 180 / Math.PI;
   public static DEGREE_RATE = Math.PI / 180;
   public static EPSILON = Math.pow(2, - 52);
   // @attribute
   public static value1: Array<number> = new Array<number>(1);
   public static value2: Array<number> = new Array<number>(2);
   public static value3: Array<number> = new Array<number>(3);
   public static value4: Array<number> = new Array<number>(4);
   public static value9: Array<number> = new Array<number>(9);
   public static value12: Array<number> = new Array<number>(12);
   public static value16: Array<number> = new Array<number>(16);
   // @attribute
   public static vectorAxisX = null;
   public static vectorAxisY = null;
   public static vectorAxisZ = null;
   public static vectorScale = null;
   public static vectorForward = null;
   public static vectorBackward = null;
   // @attribute
   public static vector3 = null;
   public static rectangle = null;
   // @attribute
   public static identity3x3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
   public static identity4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   public static faceCenterPositions = [-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0];

   //==========================================================
   // <T>判断数组内所有内容是否全部相同。</T>
   //
   // @param source 源数组
   // @param target 目标数组
   // @return Boolean
   //    <L value='true'>相等</L>
   //    <L value='false'>不相等</L>
   //==========================================================
   public static initialize() {
      // 初始化属性
      this.vectorAxisX = new Vector3(1, 0, 0);
      this.vectorAxisY = new Vector3(0, 1, 0);
      this.vectorAxisZ = new Vector3(0, 0, 1);
      this.vectorScale = new Vector3(1, 1, 1);
      this.vectorForward = new Vector3(0, 0, 1);
      this.vectorBackward = new Vector3(0, 0, -1);
      // 初始化属性
      this.vector3 = new Vector3();
      this.rectangle = new Rectangle();
   }

   //==========================================================
   // <T>计算参数中的最小值。</T>
   //
   // @param arguments 数组
   // @return 最小值
   //==========================================================
   public static min() {
      var result = 0;
      var count = arguments.length;
      if (count > 1) {
         result = Number.MAX_VALUE;
         for (var i = 0; i < count; i++) {
            var value = arguments[i];
            if (value < result) {
               result = value;
            }
         }
      }
      return result;
   }

   //==========================================================
   // <T>计算参数中的最大值。</T>
   //
   // @param arguments 数组
   // @return Number 最大值
   //==========================================================
   public static max() {
      var result = 0;
      var count = arguments.length;
      if (count > 1) {
         result = Number.MIN_VALUE;
         for (var i = 0; i < count; i++) {
            var value = arguments[i];
            if (value > result) {
               result = value;
            }
         }
      }
      return result;
   }

   //==========================================================
   // <T>计算数值的符号位。</T>
   //
   // @param value 数值
   // @return 符号
   //==========================================================
   public static sign(value) {
      if (value > 0) {
         return 1;
      } else if (value < 0) {
         return -1;
      }
      return 0;
   }
}

//==========================================================
// 初始化数据
//==========================================================
MathUtil2.initialize();
