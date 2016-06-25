import {Prototype} from '../common/reflect/Prototype';
import {Box3} from './Box3';
import {Matrix4} from './Matrix4';
import {Vector3} from './Vector3';

/**
 * 球体。
 */
export class Sphere {
   // 中心点
   public center: Vector3;
   // 半径
   public radius: number;

   /**
    * 构造处理。
    *
    * @param center 中心点
    * @param radius 半径
    */
   public constructor(center?: Vector3, radius: number = 0) {
      this.center = new Vector3();
      if (center) {
         this.center.assign(center);
      }
      this.radius = radius;
   }

   /**
    * 接收数据内容。
    *
    * @param value 数据
    * @return 球体
    */
   public assign(sphere: Sphere): Sphere {
      this.center.assign(sphere.center);
      this.radius = sphere.radius;
      return this;
   }

   /**
    * 构造处理。
    *
    * @param center 中心点
    * @param radius 半径
    * @return 球体
    */
   public set(center: Vector3, radius: number): Sphere {
      this.center.assign(center);
      this.radius = radius;
      return this;
   }

   /**
    * 矩阵变换处理。
    *
    * @param matrix 矩阵
    * @return 球体
    */
   public applyMatrix4(matrix: Matrix4): Sphere {
      this.center.applyMatrix4(matrix);
      // this.radius *= matrix.getMaxScaleOnAxis();
      return this;
   }

   /**
    * 重置处理。
    *
    * @return 球体
    */
   public reset() {
      this.center.set(0, 0, 0);
      this.radius = 0;
      return this;
   }

   /**
    * 克隆数据。
    *
    * @return 球体
    */
   public clone() {
      return new (this as any).constructor().assign(this);
   }

   // @Prototype()
   // public setFromPoints() {
   //    var box = new Box3();
   //    return function(points, optionalCenter) {
   //       var center = this.center;
   //       if (optionalCenter !== undefined) {
   //          center.copy(optionalCenter);
   //       } else {
   //          box.setFromPoints(points).center(center);
   //       }
   //       var maxRadiusSq = 0;
   //       for (var i = 0, il = points.length; i < il; i++) {
   //          maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
   //       }
   //       this.radius = Math.sqrt(maxRadiusSq);
   //       return this;
   //    };
   // }

   // public empty() {
   //    return (this.radius <= 0);
   // }

   // public containsPoint(point) {
   //    return (point.distanceToSquared(this.center) <= (this.radius * this.radius));
   // }

   // public distanceToPoint(point) {
   //    return (point.distanceTo(this.center) - this.radius);
   // }

   // public intersectsSphere(sphere) {
   //    var radiusSum = this.radius + sphere.radius;
   //    return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);
   // }

   // public intersectsBox(box) {
   //    return box.intersectsSphere(this);
   // }

   // public intersectsPlane(plane) {
   //    return Math.abs(this.center.dot(plane.normal) - plane.constant) <= this.radius;
   // }

   // public clampPoint(point, optionalTarget) {
   //    var deltaLengthSq = this.center.distanceToSquared(point);
   //    var result = optionalTarget || new Vector3();
   //    result.copy(point);
   //    if (deltaLengthSq > (this.radius * this.radius)) {
   //       result.sub(this.center).normalize();
   //       result.multiplyScalar(this.radius).add(this.center);
   //    }
   //    return result;
   // }

   // public getBoundingBox(optionalTarget) {
   //    var box = optionalTarget || new Box3();
   //    box.set(this.center, this.center);
   //    box.expandByScalar(this.radius);
   //    return box;
   // }

   // public translate(offset) {
   //    this.center.add(offset);
   //    return this;
   // }

   // public equals(sphere) {
   //    return sphere.center.equals(this.center) && (sphere.radius === this.radius);
   // }
}
