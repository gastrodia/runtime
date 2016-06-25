import {ArrayUtil} from '../common/lang/ArrayUtil';
import {Matrix4} from './Matrix4';

//==========================================================
// <T>矩阵函数管理类</T>
//
// @author maocy
// @version 141231
//==========================================================
export class MatrixUtil {
   // 单位三维矩阵
   public static identity3x3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
   // 单位四维矩阵
   public static identity4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   // 临时内容16数组
   public static Value16: Array<number> = new Array<number>(16);

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   // public static tempMatrix = function() {
   //    var matrix = new Matrix4();
   //    return function ():Matrix4{
   //       return matrix;
   //    }
   // }();

   //==========================================================
   // <T>计算左手矩阵。</T>
   //
   // @param matrix 矩阵
   // @param width 宽度
   // @param height 高度
   // @param znear 近平面
   // @param zfar 远平面
   //==========================================================
   public static perspectiveLH(matrix: Matrix4, width: number, height: number, znear: number, zfar: number) {
      var data = matrix.elements;
      // 填充行1数据
      data[0] = 2 * znear / width;
      data[1] = 0;
      data[2] = 0;
      data[3] = 0;
      // 填充行2数据
      data[4] = 0;
      data[5] = 2 * znear / height;
      data[6] = 0;
      data[7] = 0;
      // 填充行3数据
      data[8] = 0;
      data[9] = 0;
      data[10] = zfar / (zfar - znear);
      data[11] = 1;
      // 填充行4数据
      data[12] = 0;
      data[13] = 0;
      data[14] = (znear * zfar) / (znear - zfar);
      data[15] = 0;
   }

   //==========================================================
   // <T>计算右手矩阵。</T>
   //
   // @param matrix 矩阵
   // @param width 宽度
   // @param width 高度
   // @param znear 近平面
   // @param zfar 远平面
   //==========================================================
   public static perspectiveRH(matrix: Matrix4, width: number, height: number, znear: number, zfar: number) {
      var data = matrix.elements;
      // 填充行1数据
      data[0] = 2 * znear / width;
      data[1] = 0;
      data[2] = 0;
      data[3] = 0;
      // 填充行2数据
      data[4] = 0;
      data[5] = 2 * znear / height;
      data[6] = 0;
      data[7] = 0;
      // 填充行3数据
      data[8] = 0;
      data[9] = 0;
      data[10] = zfar / (znear - zfar);
      data[11] = 1;
      // 填充行4数据
      data[12] = 0;
      data[13] = 0;
      data[14] = (znear * zfar) / (znear - zfar);
      data[15] = 0;
   }

   //==========================================================
   // <T>根据FOV计算左手矩阵。</T>
   //
   // @param matrix 矩阵
   // @param fieldOfView 夹角
   // @param aspectRatio 高宽比率
   // @param znear 近平面
   // @param zfar 远平面
   //==========================================================
   public static perspectiveFieldOfViewLH(matrix: Matrix4, fieldOfView: number, aspectRatio: number, znear: number, zfar: number) {
      var data = matrix.elements;
      var sy = 1 / Math.tan(fieldOfView * 0.5);
      var sx = sy / aspectRatio;
      // 填充行1数据
      data[0] = sx;
      data[1] = 0;
      data[2] = 0;
      data[3] = 0;
      // 填充行2数据
      data[4] = 0;
      data[5] = sy;
      data[6] = 0;
      data[7] = 0;
      // 填充行3数据
      data[8] = 0;
      data[9] = 0;
      data[10] = zfar / (zfar - znear);
      data[11] = 1;
      // 填充行4数据
      data[12] = 0;
      data[13] = 0;
      data[14] = (znear * zfar) / (znear - zfar);
      data[15] = 0;
   }

   //==========================================================
   // <T>根据FOV计算右手矩阵。</T>
   //
   // @param matrix 矩阵
   // @param fieldOfView 夹角
   // @param aspectRatio 高宽比率
   // @param znear 近平面
   // @param zfar 远平面
   //==========================================================
   public static perspectiveFieldOfViewRH(matrix: Matrix4, fieldOfView: number, aspectRatio: number, znear: number, zfar: number) {
      var data = matrix.elements;
      var sy = 1 / Math.tan(fieldOfView * 0.5);
      var sx = sy / aspectRatio;
      // 填充行1数据
      data[0] = sx;
      data[1] = 0;
      data[2] = 0;
      data[3] = 0;
      // 填充行2数据
      data[4] = 0;
      data[5] = sy;
      data[6] = 0;
      data[7] = 0;
      // 填充行3数据
      data[8] = 0;
      data[9] = 0;
      data[10] = zfar / (znear - zfar);
      data[11] = 1;
      // 填充行4数据
      data[12] = 0;
      data[13] = 0;
      data[14] = (znear * zfar) / (zfar - znear);
      data[15] = 0;
   }

   //==========================================================
   // <T>计算正交投影矩阵。</T>
   //
   // @param matrix 矩阵
   // @param left 左位置
   // @param top 上位置
   // @param width 宽度
   // @param height 高度
   // @param znear 近平面
   // @param zfar 远平面
   //==========================================================
   public static orthoLH(matrix: Matrix4, left: number, top: number, width: number, height: number, znear: number, zfar: number) {
      // 计算变量
      var right = left + width;
      var bottom = top + height;
      var distance = zfar - znear;
      var x = (left + right) / width;
      var y = (top + bottom) / height;
      var z = znear / distance;
      // 设置数据
      var data = ArrayUtil.copy(this.identity4x4, 0, 16, matrix.elements as any, 0);
      data[0] = 2 / width;
      data[5] = 2 / height;
      data[10] = 1 / distance;
      data[12] = -x;
      data[13] = -y;
      data[14] = -z;
   }

   //==========================================================
   // <T>计算正交投影矩阵。</T>
   //
   // @param matrix 矩阵
   // @param left 左位置
   // @param top 上位置
   // @param width 宽度
   // @param height 高度
   // @param znear 近平面
   // @param zfar 远平面
   //==========================================================
   public static orthoRH(matrix: Matrix4, left: number, top: number, width: number, height: number, znear: number, zfar: number) {
      // 计算变量
      var right = left + width;
      var bottom = top + height;
      var distance = zfar - znear;
      var x = (left + right) / width;
      var y = (top + bottom) / height;
      var z = (znear + zfar) / distance;
      // 设置数据
      var data = ArrayUtil.copy(this.identity4x4, 0, 16, matrix.elements as any, 0);
      data[0] = 2 / width;
      data[5] = 2 / height;
      data[10] = -2 / distance;
      data[12] = -x;
      data[13] = -y;
      data[14] = -z;
   }
}
