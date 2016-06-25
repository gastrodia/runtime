import {FrustumPlaneEnum} from './FrustumPlaneEnum';
import {PlaneSurface} from './PlaneSurface';

//==========================================================
// <T>空间视截体。</T>
//
// @struct
// @author maocy
// @version 150116
//==========================================================
export class FrustumPlanes {
   // 面集合
   public PlaneSurfaces: Array<PlaneSurface>;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   //============================================================
   public constructor() {
      var PlaneSurfaces = this.PlaneSurfaces = new Array<PlaneSurface>();
      for (var i = 0; i < FrustumPlaneEnum.Count; i++) {
         PlaneSurfaces.push(new PlaneSurface());
      }
   }

   //============================================================
   // <T>检查点是否在视截体内。</T>
   //
   // @param x 坐标X
   // @param y 坐标Y
   // @param z 坐标Z
   //============================================================
   public containsPoint(x, y, z) {
      var PlaneSurfaces = this.PlaneSurfaces;
      for (var i = 0; i < FrustumPlaneEnum.Count; i++) {
         if (PlaneSurfaces[i].dot(x, y, z) < 0) {
            return false;
         }
      }
      return true;
   }

   //============================================================
   // <T>检查立方体是否在视截体内。</T>
   //
   // @param centerX 中心点X坐标
   // @param centerY 中心点Y坐标
   // @param centerZ 中心点Z坐标
   // @param size 大小
   // @return 是否包含
   //============================================================
   public containsCube(cx: number, cy: number, cz: number, size: number) {
      var PlaneSurfaces = this.PlaneSurfaces;
      for (var i = 0; i < FrustumPlaneEnum.Count; i++) {
         var p = PlaneSurfaces[i];
         if (p.dot(cx - size, cy - size, cz - size) >= 0) {
            continue;
         }
         if (p.dot(cx + size, cy - size, cz - size) >= 0) {
            continue;
         }
         if (p.dot(cx - size, cy + size, cz - size) >= 0) {
            continue;
         }
         if (p.dot(cx + size, cy + size, cz - size) >= 0) {
            continue;
         }
         if (p.dot(cx - size, cy - size, cz + size) >= 0) {
            continue;
         }
         if (p.dot(cx + size, cy - size, cz + size) >= 0) {
            continue;
         }
         if (p.dot(cx - size, cy + size, cz + size) >= 0) {
            continue;
         }
         if (p.dot(cx + size, cy + size, cz + size) >= 0) {
            continue;
         }
         return false;
      }
      return true;
   }

   //============================================================
   // <T>检查长方体是否在视截体内。</T>
   //
   // @param cx:centerX 中心点X坐标
   // @param cy:centerY 中心点Y坐标
   // @param cz:centerZ 中心点Z坐标
   // @param sx:sizeX X大小
   // @param sy:sizeY Y大小
   // @param sz:sizeZ Z大小
   // @return 是否包含
   //============================================================
   public containsRectangle(cx: number, cy: number, cz: number, sx: number, sy: number, sz: number) {
      var PlaneSurfaces = this.PlaneSurfaces;
      for (var i = 0; i < FrustumPlaneEnum.Count; i++) {
         var p = PlaneSurfaces[i];
         if (p.dot(cx - sx, cy - sy, cz - sz) >= 0) {
            continue;
         }
         if (p.dot(cx + sx, cy - sy, cz - sz) >= 0) {
            continue;
         }
         if (p.dot(cx - sx, cy + sy, cz - sz) >= 0) {
            continue;
         }
         if (p.dot(cx + sx, cy + sy, cz - sz) >= 0) {
            continue;
         }
         if (p.dot(cx - sx, cy - sy, cz + sz) >= 0) {
            continue;
         }
         if (p.dot(cx + sx, cy - sy, cz + sz) >= 0) {
            continue;
         }
         if (p.dot(cx - sx, cy + sy, cz + sz) >= 0) {
            continue;
         }
         if (p.dot(cx + sx, cy + sy, cz + sz) >= 0) {
            continue;
         }
         return false;
      }
      return true;
   }

   //============================================================
   // <T>检查长方体是否在视截体内。</T>
   //
   // @param p:corners:Array 顶点集合
   // @return 是否包含
   //============================================================
   public containsCorners(p) {
      var PlaneSurfaces = this.PlaneSurfaces;
      for (var i = FrustumPlaneEnum.Count - 1; i >= 0; i--) {
         var l = PlaneSurfaces[i];
         if (l.dot(p[0], p[1], p[2]) >= 0) {
            continue;
         }
         if (l.dot(p[3], p[4], p[5]) >= 0) {
            continue;
         }
         if (l.dot(p[6], p[7], p[8]) >= 0) {
            continue;
         }
         if (l.dot(p[9], p[10], p[11]) >= 0) {
            continue;
         }
         if (l.dot(p[12], p[13], p[14]) >= 0) {
            continue;
         }
         if (l.dot(p[15], p[16], p[17]) >= 0) {
            continue;
         }
         if (l.dot(p[18], p[19], p[20]) >= 0) {
            continue;
         }
         if (l.dot(p[21], p[22], p[23]) >= 0) {
            continue;
         }
         return false;
      }
      return true;
   }

   //============================================================
   // <T>检查球体是否在视截体内。</T>
   //
   // @param px:centerX 中心点X坐标
   // @param py:centerY 中心点Y坐标
   // @param pz:centerZ 中心点Z坐标
   // @param pr:radius 半径
   // @return 是否包含
   //============================================================
   public containsSphere(px: number, py: number, pz: number, pr: number): boolean {
      var PlaneSurfaces = this.PlaneSurfaces;
      for (var i = 0; i < FrustumPlaneEnum.Count; i++) {
         if (PlaneSurfaces[i].dot(px, py, pz) < -pr) {
            return false;
         }
      }
      return true;
   }

   //============================================================
   // <T>更新可视范围信息。</T>
   //
   // @param p 矩阵数据
   //============================================================
   public updateVision(p) {
      var PlaneSurfaces = this.PlaneSurfaces;
      // 计算视截体的近平面
      var pn = PlaneSurfaces[FrustumPlaneEnum.Near];
      pn.a = p[0 + 3] + p[0 + 2];
      pn.b = p[4 + 3] + p[4 + 2];
      pn.c = p[8 + 3] + p[8 + 2];
      pn.d = p[12 + 3] + p[12 + 2];
      pn.normalize();
      // 计算视截体的远平面
      var pf = PlaneSurfaces[FrustumPlaneEnum.Far];
      pf.a = p[0 + 3] - p[0 + 2];
      pf.b = p[4 + 3] - p[4 + 2];
      pf.c = p[8 + 3] - p[8 + 2];
      pf.d = p[12 + 3] - p[12 + 2];
      pf.normalize();
      // 计算视截体的左平面
      var pl = PlaneSurfaces[FrustumPlaneEnum.Left];
      pl.a = p[0 + 3] - p[0 + 0];
      pl.b = p[4 + 3] - p[4 + 0];
      pl.c = p[8 + 3] - p[8 + 0];
      pl.d = p[12 + 3] - p[12 + 0];
      pl.normalize();
      // 计算视截体的右平面
      var pr = PlaneSurfaces[FrustumPlaneEnum.Right];
      pr.a = p[0 + 3] + p[0 + 0];
      pr.b = p[4 + 3] + p[4 + 0];
      pr.c = p[8 + 3] + p[8 + 0];
      pr.d = p[12 + 3] + p[12 + 0];
      pr.normalize();
      // 计算视截体的顶平面
      var pt = PlaneSurfaces[FrustumPlaneEnum.Top];
      pt.a = p[0 + 3] - p[0 + 1];
      pt.b = p[4 + 3] - p[4 + 1];
      pt.c = p[8 + 3] - p[8 + 1];
      pt.d = p[12 + 3] - p[12 + 1];
      pt.normalize();
      // 计算视截体的底平面
      var pb = PlaneSurfaces[FrustumPlaneEnum.Bottom];
      pb.a = p[0 + 3] + p[0 + 1];
      pb.b = p[4 + 3] + p[4 + 1];
      pb.c = p[8 + 3] + p[8 + 1];
      pb.d = p[12 + 3] + p[12 + 1];
      pb.normalize();
   }
}
