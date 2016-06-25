import {MathUtil} from './MathUtil';
import {MatrixUtil} from './MatrixUtil';
import {Point3} from './Point3';

//==========================================================
// <T>空间视截体。</T>
//
// @struct
// @author maocy
// @version 150116
//==========================================================
export class SFrustum {
   // //..........................................................
   // // 中心点
   // public center = new Point3();
   // // 半径
   // public radius = null;
   // // 最小X坐标
   // public minX = null;
   // // 最大X坐标
   // public maxX = null;
   // // 最小Y坐标
   // public minY = null;
   // // 最大Y坐标
   // public maxY = null;
   // // 最小Z坐标
   // public minZ = null;
   // // 最大Z坐标
   // public maxZ = null;
   // // 顶点集合
   // public points = new Array(24);
   // public coners = new Array(24);

   // //============================================================
   // // <T>更新中心</T>
   // //
   // // @method
   // //============================================================
   // public updateCenter() {
   //    // 计算空间内位置
   //    var cs = this.coners;
   //    this.minX = this.minY = this.minZ = Number.MAX_VALUE;
   //    this.maxX = this.maxY = this.maxZ = -Number.MAX_VALUE;
   //    var i = 0;
   //    while (i < 24) {
   //       var x = cs[i++];
   //       if (x < this.minX) {
   //          this.minX = x;
   //       }
   //       if (x > this.maxX) {
   //          this.maxX = x;
   //       }
   //       var y = cs[i++];
   //       if (y < this.minY) {
   //          this.minY = y;
   //       }
   //       if (y > this.maxY) {
   //          this.maxY = y;
   //       }
   //       var z = cs[i++];
   //       if (z < this.minZ) {
   //          this.minZ = z;
   //       }
   //       if (z > this.maxZ) {
   //          this.maxZ = z;
   //       }
   //    }
   //    // 计算中心位置
   //    this.center.x = (this.minX + this.maxX) * 0.5;
   //    this.center.y = (this.minY + this.maxY) * 0.5;
   //    this.center.z = (this.minZ + this.maxZ) * 0.5;
   //    // 计算半径
   //    var cx = this.maxX - this.minX;
   //    var cy = this.maxY - this.minY;
   //    var cz = this.maxZ - this.minZ;
   //    this.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
   // }

   // //============================================================
   // // <T>更新处理</T>
   // //
   // // @param pva:viewportAngle 视角角度
   // // @param pvw:viewportWidth 视角宽度
   // // @param pvh:viewportHeight 视角高度
   // // @param pvn:viewportNear 视角近平面
   // // @param pvf:viewportFar 视角远平面
   // // @param pfr:frontRate 前平面比率
   // // @param pbr:backRate 后平面比率
   // // @param pm:matrix:SMatrix4x4 矩阵
   // //============================================================
   // public update(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm) {
   //    // 计算视角信息
   //    var aspect = pvw / pvh;
   //    //var znear = -pvf * pbr;
   //    var znear = pvn;
   //    //var zfar = pvf * pfr;
   //    var zfar = pvf;
   //    var fov = Math.tan(MathUtil.DEGREE_RATE * pva * 0.5);
   //    var nearY = znear * fov;
   //    var nearX = nearY * aspect;
   //    var farY = zfar * fov;
   //    var farX = farY * aspect;
   //    // 设置空间坐标
   //    var ps = this.points;
   //    ps[0] = -nearX;
   //    ps[1] = nearY;
   //    ps[2] = znear;
   //    ps[3] = nearX;
   //    ps[4] = nearY;
   //    ps[5] = znear;
   //    ps[6] = nearX;
   //    ps[7] = -nearY;
   //    ps[8] = znear;
   //    ps[9] = -nearX;
   //    ps[10] = -nearY;
   //    ps[11] = znear;
   //    ps[12] = -farX;
   //    ps[13] = farY;
   //    ps[14] = zfar;
   //    ps[15] = farX;
   //    ps[16] = farY;
   //    ps[17] = zfar;
   //    ps[18] = farX;
   //    ps[19] = -farY;
   //    ps[20] = zfar;
   //    ps[21] = -farX;
   //    ps[22] = -farY;
   //    ps[23] = zfar;
   //    // 设置转换矩阵
   //    var matrix = MatrixUtil.matrix;
   //    matrix.assign(pm);
   //    matrix.invert();
   //    // matrix.transform(this.coners, ps, 8);
   //    // 计算空间内位置
   //    this.updateCenter();
   // }

   // //============================================================
   // // <T>更新处理</T>
   // //
   // // @param pva:viewportAngle 视角角度
   // // @param pvw:viewportWidth 视角宽度
   // // @param pvh:viewportHeight 视角高度
   // // @param pvn:viewportNear 视角近平面
   // // @param pvf:viewportFar 视角远平面
   // // @param pfr:frontRate 前平面比率
   // // @param pbr:backRate 后平面比率
   // // @param pm:matrix:SMatrix4x4 矩阵
   // //============================================================
   // public updateFlat(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm) {
   //    // 计算视角信息
   //    var aspect = pvw / pvh;
   //    var znear = pvn * pbr;
   //    //var znear = pvn;
   //    var zfar = pvf * pfr;
   //    //var zfar = pvf;
   //    var fov = Math.tan(MathUtil.DEGREE_RATE * pva * 0.5);
   //    var nearY = znear * fov;
   //    var nearX = nearY * aspect;
   //    var farY = zfar * fov;
   //    var farX = farY * aspect;
   //    // 设置空间坐标
   //    var ps = this.points;
   //    ps[0] = -nearX;
   //    ps[1] = nearY;
   //    ps[2] = znear;
   //    ps[3] = nearX;
   //    ps[4] = nearY;
   //    ps[5] = znear;
   //    ps[6] = nearX;
   //    ps[7] = -nearY;
   //    ps[8] = znear;
   //    ps[9] = -nearX;
   //    ps[10] = -nearY;
   //    ps[11] = znear;
   //    ps[12] = -farX;
   //    ps[13] = farY;
   //    ps[14] = zfar;
   //    ps[15] = farX;
   //    ps[16] = farY;
   //    ps[17] = zfar;
   //    ps[18] = farX;
   //    ps[19] = -farY;
   //    ps[20] = zfar;
   //    ps[21] = -farX;
   //    ps[22] = -farY;
   //    ps[23] = zfar;
   //    // 设置转换矩阵
   //    var m = MatrixUtil.matrix;
   //    m.assign(pm);
   //    m.invert();
   //    // m.transform(this.coners, 0, ps, 0, 8);
   //    this.coners[1] = 0.0;
   //    this.coners[4] = 0.0;
   //    this.coners[7] = 0.0;
   //    this.coners[10] = 0.0;
   //    this.coners[13] = 0.0;
   //    this.coners[16] = 0.0;
   //    this.coners[19] = 0.0;
   //    this.coners[22] = 0.0;
   //    // 计算空间内位置
   //    this.updateCenter();
   // }
}
