import {Prototype} from '../common/reflect/Prototype';
import {MathUtil} from './MathUtil';
import {Plane} from './Plane';
import {Sphere} from './Sphere';
import {Vector3} from './Vector3';

/**
 * 三维盒子。
 */
export class Box3 {
   // 最小点
   public min: Vector3;
   // 最大点
   public max: Vector3;

   /**
    * 构造处理。
    *
    * @param min 最小点
    * @param max 最大点
    */
   public constructor(min?: Vector3, max?: Vector3) {
      this.min = new Vector3(+Infinity, +Infinity, +Infinity);
      if (min) {
         this.min.assign(min);
      }
      this.max = new Vector3(-Infinity, -Infinity, -Infinity);
      if (max) {
         this.max.assign(max);
      }
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      var min = this.min;
      var max = this.max;
      return (max.x < min.x) || (max.y < min.y) || (max.z < min.z);
   }

   /**
    * 判断是否相等。
    *
    * @param box 盒子数据
    * @return 是否相等
    */
   public equals(box: Box3): boolean {
      return box.min.equals(this.min) && box.max.equals(this.max);
   }

   /**
    * 判断是否近似相等。
    *
    * @param box 盒子数据
    * @param tolerance 公差
    * @return 是否相等
    */
   public nearlyEquals(box: Box3, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
      return box.min.nearlyEquals(this.min) && box.max.nearlyEquals(this.max);
   }

   /**
    * 接收数据内容。
    *
    * @param value 数据
    * @return 向量
    */
   public assign(value: Box3): Box3 {
      this.min.assign(value.min);
      this.max.assign(value.max);
      return this;
   }

   /**
    * 设置数据。
    *
    * @param min 最小点
    * @param max 最大点
    * @return 盒子
    */
   public set(min: Vector3, max: Vector3): Box3 {
      this.min.assign(min);
      this.max.assign(max);
      return this;
   }

   /**
    * 从点集合中设置数据。
    *
    * @param points 点数据
    * @return 盒子
    */
   public setFromPoints(points: Array<Vector3>): Box3 {
      this.reset();
      var count = points.length;
      for (var i = 0; i < count; i++) {
         var point = points[i];
         this.expandByPoint(point);
      }
      return this;
   }

   /**
    * 根据中心和大小设置数据。
    *
    * @param center 中心点
    * @param size 尺寸
    * @return 盒子
    */
   public setFromCenterAndSize(center: Vector3, size: Vector3): Box3 {
      var halfSize = size.clone().multiplyScalar(0.5);
      this.min.assign(center).sub(halfSize);
      this.max.assign(center).add(halfSize);
      return this;
   }

   /**
    * 设置数组内容。
    *
    * @param center 中心点
    * @param size 尺寸
    * @return 盒子
    */
   public setFromArray(array: Array<number>) {
      this.reset();
      var minX = + Infinity;
      var minY = + Infinity;
      var minZ = + Infinity;
      var maxX = - Infinity;
      var maxY = - Infinity;
      var maxZ = - Infinity;
      var count = array.length;
      for (var i = 0; i < count; i += 3) {
         var x = array[i];
         var y = array[i + 1];
         var z = array[i + 2];
         if (x < minX) {
            minX = x;
         }
         if (y < minY) {
            minY = y;
         }
         if (z < minZ) {
            minZ = z;
         }
         if (x > maxX) {
            maxX = x;
         }
         if (y > maxY) {
            maxY = y;
         }
         if (z > maxZ) {
            maxZ = z;
         }
      }
      this.min.set(minX, minY, minZ);
      this.max.set(maxX, maxY, maxZ);
   }

   /**
    * 是否包含点。
    *
    * @param value 数据
    * @return 是否包含
    */
   public containsPoint(point: Vector3): boolean {
      var min = this.min;
      var max = this.max;
      if (point.x < min.x || point.x > max.x || point.y < min.y || point.y > max.y || point.z < min.z || point.z > max.z) {
         return false;
      }
      return true;
   }


   // /**
   //  * 是否近视包含点。
   //  *
   //  * @param value 数据
   //  * @return 是否包含
   //  */
   // public nearlyContainsPoint(point: Vector3): boolean {

   // }

   /**
    * 是否包含盒子。
    *
    * @param box 盒子数据
    * @return 是否包含
    */
   public containsBox(box: Box3): boolean {
      var min = this.min;
      var max = this.max;
      if ((min.x <= box.min.x) && (box.max.x <= max.x) && (min.y <= box.min.y) && (box.max.y <= max.y) && (min.z <= box.min.z) && (box.max.z <= max.z)) {
         return true;
      }
      return false;
   }


   /**
    * 是否近视包含盒子。
    *
    * @param box 盒子数据
    * @return 是否包含
    */
   public nearlyContainsBox(box: Box3): boolean {
      var step1 = MathUtil.nearlyGreaterEquals(box.min.x, this.min.x) && MathUtil.nearlyLessEquals(box.max.x, this.max.x);
      var step2 = MathUtil.nearlyGreaterEquals(box.min.y, this.min.y) && MathUtil.nearlyLessEquals(box.max.y, this.max.y);
      var step3 = MathUtil.nearlyGreaterEquals(box.min.z, this.min.z) && MathUtil.nearlyLessEquals(box.max.z, this.max.z);
      return step1 && step2 && step3;
   }

   /**
    * 获得中心点。
    *
    * @param value 数据
    * @return 中心点
    */
   public center(value: Vector3): Vector3 {
      var result = value;
      if (!value) {
         result = new Vector3()
      }
      result.addVectors(this.min, this.max);
      return result.multiplyScalar(0.5);
   }

   /**
    * 获得尺寸。
    *
    * @param value 数据
    * @return 中心点
    */
   public size(value?: Vector3): Vector3 {
      var result = value || new Vector3();
      return result.subVectors(this.max, this.min);
   }

   /**
    * 是否相交盒子。
    *
    * @param box 盒子数据
    * @return 是否相交
    */
   public intersectsBox(box: Box3): boolean {
      var min = this.min;
      var max = this.max;
      if (box.max.x < min.x || box.min.x > max.x || box.max.y < min.y || box.min.y > max.y || box.max.z < min.z || box.min.z > max.z) {
         return false;
      }
      return true;
   }

   /**
    * 是否相交平面。
    *
    * @param plane 平面数据
    * @return 是否相交
    */
   public intersectsPlane(plane: Plane): boolean {
      var min = null;
      var max = null;
      if (plane.normal.x > 0) {
         min = plane.normal.x * this.min.x;
         max = plane.normal.x * this.max.x;
      } else {
         min = plane.normal.x * this.max.x;
         max = plane.normal.x * this.min.x;
      }
      if (plane.normal.y > 0) {
         min += plane.normal.y * this.min.y;
         max += plane.normal.y * this.max.y;
      } else {
         min += plane.normal.y * this.max.y;
         max += plane.normal.y * this.min.y;
      }
      if (plane.normal.z > 0) {
         min += plane.normal.z * this.min.z;
         max += plane.normal.z * this.max.z;
      } else {
         min += plane.normal.z * this.max.z;
         max += plane.normal.z * this.min.z;
      }
      return (min <= plane.constant && max >= plane.constant);
   }

   /**
    * 计算相交盒子。
    *
    * @param box 盒子数据
    * @return 相交盒子
    */
   public intersect(box: Box3): Box3 {
      this.min.max(box.min);
      this.max.min(box.max);
      return this;
   }

   /**
    * 计算合并盒子。
    *
    * @param box 盒子数据
    * @return 合并盒子
    */
   public union(box: Box3): Box3 {
      this.min.min(box.min);
      this.max.max(box.max);
      return this;
   }

   /**
    * 移动盒子位置。
    *
    * @param offset 位置
    * @return 盒子
    */
   public translate(offset: Vector3): Box3 {
      this.min.add(offset);
      this.max.add(offset);
      return this;
   }

   /**
    * 扩展盒子点。
    *
    * @param point 点数据
    * @return 盒子
    */
   public expandByPoint(point: Vector3): Box3 {
      this.min.min(point);
      this.max.max(point);
      return this;
   }

   /**
    * 扩展盒子方向。
    *
    * @param vector 方向
    * @return 盒子
    */
   public expandByVector(vector: Vector3): Box3 {
      this.min.sub(vector);
      this.max.add(vector);
      return this;
   }

   /**
    * 扩展盒子缩放。
    *
    * @param scalar 缩放
    * @return 盒子
    */
   public expandByScalar(scalar: number): Box3 {
      this.min.addScalar(-scalar);
      this.max.addScalar(scalar);
      return this;
   }

   /**
    * 计算盒子和点之间距离。
    *
    * @param point 点数据
    * @return 距离
    */
   public distanceToPoint(point: Vector3): number {
      var clampedPoint = point.clone().clamp(this.min, this.max);
      return clampedPoint.sub(point).length();
   }

   /**
    * 将一个点计算到盒子内。
    *
    * @param point 点数据
    * @param value 数据
    * @return 点数据
    */
   public clampPoint(point: Vector3, value: Vector3): Vector3 {
      var result = value || new Vector3();
      return result.assign(point).clamp(this.min, this.max);
   }

   /**
    * 重置处理。
    */
   public reset() {
      var min = this.min;
      var max = this.max;
      min.x = min.y = min.z = +Infinity;
      max.x = max.y = max.z = -Infinity;
      return this;
   }

   /**
    * 克隆数据。
    *
    * @return 盒子
    */
   public clone() {
      return new (this as any).constructor().assign(this);
   }


   /**
    * 得到盒子的八个点。
    *
    * @return 点数组
   */
   public getPoints() {
      var res = new Array<Vector3>();
      if (this.min && this.max) {
         res.push(new Vector3(this.min.x, this.min.y, this.min.z));
         res.push(new Vector3(this.max.x, this.min.y, this.min.z));
         res.push(new Vector3(this.max.x, this.max.y, this.min.z));
         res.push(new Vector3(this.min.x, this.max.y, this.min.z));
         res.push(new Vector3(this.min.x, this.min.y, this.max.z));
         res.push(new Vector3(this.max.x, this.min.y, this.max.z));
         res.push(new Vector3(this.max.x, this.max.y, this.max.z));
         res.push(new Vector3(this.min.x, this.max.y, this.max.z));
      }
      return res;
   }

   /**
     * 两个盒子间是否有相同部分
     *
     * @return boolean
    */
   public hasSamePart(box: Box3) {
      var xbox = this.clone().intersect(box) as Box3;
      var res = false;
      if (xbox.min.x < xbox.max.x && xbox.min.y < xbox.max.y && xbox.min.z < xbox.max.z) {
         res = true;
      }
      return res;
   }

   /**
     * 两个盒子间是否有相同部分
     *
     * @return boolean
    */
   public nearlyHasSamePart(box: Box3) {
      var xbox: Box3 = this.clone().intersect(box);
      var res = false;
      if (MathUtil.nearlyLess(xbox.min.x, xbox.max.x) && MathUtil.nearlyLess(xbox.min.y, xbox.max.y) && MathUtil.nearlyLess(xbox.min.z, xbox.max.z)) {
         return !xbox.isNearlyZeroVolume();
      }
      return res;
   }


   public isNearlyZeroVolume() {
      return (
         MathUtil.nearlyEquals(this.size().x, 0) ||
         MathUtil.nearlyEquals(this.size().y, 0) ||
         MathUtil.nearlyEquals(this.size().z, 0)
      )
   }


   // @Prototype()
   // public setFromObject() {
   //    // Computes the world-axis-aligned bounding box of an object (including its children),
   //    // accounting for both the object's, and children's, world transforms
   //    var box;
   //    return function(object) {
   //       if (box === undefined) box = new Box3();
   //       var scope = this;
   //       this.makeEmpty();
   //       object.updateMatrixWorld(true);
   //       object.traverse(function(node) {
   //          var geometry = node.geometry;
   //          if (geometry !== undefined) {
   //             if (geometry.boundingBox === null) {
   //                geometry.computeBoundingBox();
   //             }
   //             if (geometry.boundingBox.isEmpty() === false) {
   //                box.copy(geometry.boundingBox);
   //                box.applyMatrix4(node.matrixWorld);
   //                scope.union(box);
   //             }
   //          }
   //       });
   //       return this;
   //    };
   // }

   // public getParameter(point, optionalTarget) {
   //    // This can potentially have a divide by zero if the box
   //    // has a size dimension of 0.
   //    var result = optionalTarget || new Vector3();
   //    return result.set(
   //       (point.x - this.min.x) / (this.max.x - this.min.x),
   //       (point.y - this.min.y) / (this.max.y - this.min.y),
   //       (point.z - this.min.z) / (this.max.z - this.min.z)
   //    );
   // }

   // public intersectsSphere() {
   //    var closestPoint;
   //    return function intersectsSphere(sphere) {
   //       if (closestPoint === undefined) closestPoint = new Vector3();
   //       // Find the point on the AABB closest to the sphere center.
   //       this.clampPoint(sphere.center, closestPoint);
   //       // If that point is inside the sphere, the AABB and sphere intersect.
   //       return closestPoint.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);
   //    };
   // }

   // @Prototype()
   // public getBoundingSphere() {
   //    var v1 = new Vector3();
   //    return function (optionalTarget) {
   //       var result = optionalTarget || new Sphere();
   //       result.center = this.center();
   //       result.radius = this.size(v1).length() * 0.5;
   //       return result;
   //    };
   // }

   // @Prototype()
   // public applyMatrix4() {
   //    var points = [
   //       new Vector3(),
   //       new Vector3(),
   //       new Vector3(),
   //       new Vector3(),
   //       new Vector3(),
   //       new Vector3(),
   //       new Vector3(),
   //       new Vector3()
   //    ];
   //    return function (matrix) {
   //       // NOTE: I am using a binary pattern to specify all 2^3 combinations below
   //       points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
   //       points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
   //       points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
   //       points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
   //       points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
   //       points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
   //       points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
   //       points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);	// 111
   //       this.makeEmpty();
   //       this.setFromPoints(points);
   //       return this;
   //    };
   // }
}
