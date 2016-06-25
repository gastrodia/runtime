import {Prototype} from '../common/reflect/Prototype';
import {Vector3} from './Vector3';

/**
 * 三维射线。
 */
export class Ray3 {
   // 开始点
   public origin: Vector3;
   // 方向
   public direction: Vector3;

   /**
    * 构造处理。
    *
    * @param origin 开始点
    * @param direction 方向
    */
   public constructor(origin?: Vector3, direction?: Vector3) {
      this.origin = new Vector3();
      this.direction = new Vector3();
      if (origin) {
         this.origin.assign(origin);
      }
      if (direction) {
         this.direction.assign(direction);
      }
   }

   /**
    * 设置数据。
    *
    * @param origin 开始点
    * @param direction 方向
    */
   public set(origin: Vector3, direction: Vector3): Ray3 {
      this.origin.assign(origin);
      this.direction.assign(direction);
      return this;
   }

   /**
    * 接收数据内容。
    *
    * @param value 数据
    * @return 向量
    */
   public assign(value: Ray3): Ray3 {
      this.origin.assign(value.origin);
      this.direction.assign(value.direction);
      return this;
   }

   /**
    * 获得原点到指定点的距离平方。
    *
    * @param point 点坐标
    * @return 距离平方
    */
   private __tempPoint1: Vector3;
   public distanceSqToPoint(point: Vector3): number {
      var temp = this.__tempPoint1;
      if (!temp) {
         temp = this.__tempPoint1 = new Vector3();
      }
      var directionDistance = temp.subVectors(point, this.origin).dot(this.direction);
      if (directionDistance < 0) {
         return this.origin.distanceToSquared(point);
      }
      temp.assign(this.direction).multiplyScalar(directionDistance).add(this.origin);
      return temp.distanceToSquared(point);
   }

   /**
    * 获得原点到指定点的距离。
    *
    * @param point 点坐标
    * @return 距离平方
    */
   public distanceToPoint(point: Vector3) {
      return Math.sqrt(this.distanceSqToPoint(point));
   }

   public intersectsSphere(sphere) {
      return this.distanceToPoint(sphere.center) <= sphere.radius;
   }

   public at(t, optionalTarget) {
      var result = optionalTarget || new Vector3();
      return result.copy(this.direction).multiplyScalar(t).add(this.origin);
   }


   /**
    * 检测是否与三角形相交。
    *
    * @param point 点坐标
    * @return 相交点
    */
   @Prototype()
   public intersectSphere() {
      var v1 = new Vector3();
      return function (sphere, optionalTarget) {
         v1.subVectors(sphere.center, this.origin);
         var tca = v1.dot(this.direction);
         var d2 = v1.dot(v1) - tca * tca;
         var radius2 = sphere.radius * sphere.radius;
         if (d2 > radius2) {

         }
         var thc = Math.sqrt(radius2 - d2);
         // t0 = first intersect point - entrance on front of sphere
         var t0 = tca - thc;
         // t1 = second intersect point - exit point on back of sphere
         var t1 = tca + thc;
         // test to see if both t0 and t1 are behind the ray - if so, return null
         if (t0 < 0 && t1 < 0) return null;
         // test to see if t0 is behind the ray:
         // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
         // in order to always return an intersect point that is in front of the ray.
         if (t0 < 0) {
            return this.at(t1, optionalTarget);
         }
         // else t0 is in front of the ray, so return the first collision point scaled by t0
         return this.at(t0, optionalTarget);
      }
   }

   /**
    * 计算射线与三角形的相交点。
    *
    * @param a 三角形点1
    * @param b 三角形点2
    * @param c 三角形点3
    * @param point 点坐标
    * @param point 点坐标
    * @param point 点坐标
    * @return 相交点
    */
   @Prototype()
   public intersectTriangle() {
      var diff = new Vector3();
      var edge1 = new Vector3();
      var edge2 = new Vector3();
      var normal = new Vector3();
      return function (a: Vector3, b: Vector3, c: Vector3, backfaceCulling, optionalTarget): Vector3 {
         edge1.subVectors(b, a);
         edge2.subVectors(c, a);
         normal.crossVectors(edge1, edge2);
         // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
         // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
         //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
         //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
         //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
         var vDdN = this.direction.dot(normal);
         var sign = null;
         if (vDdN > 0) {
            if (backfaceCulling) {
               return null;
            }
            sign = 1;
         } else if (vDdN < 0) {
            sign = - 1;
            vDdN = - vDdN;
         } else {
            return null;
         }
         diff.subVectors(this.origin, a);
         var vDdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));
         // b1 < 0, no intersection
         if (vDdQxE2 < 0) {
            return null;
         }
         var vDdE1xQ = sign * this.direction.dot(edge1.cross(diff));
         // b2 < 0, no intersection
         if (vDdE1xQ < 0) {
            return null;
         }
         // b1+b2 > 1, no intersection
         if (vDdQxE2 + vDdE1xQ > vDdN) {
            return null;
         }
         // Line intersects triangle, check if ray does.
         var vQdN = - sign * diff.dot(normal);
         // t < 0, no intersection
         if (vQdN < 0) {
            return null;
         }
         // Ray intersects triangle.
         return this.at(vQdN / vDdN, optionalTarget);
      }
   }

   /**
    * 克隆当前数据。
    *
    * @return 向量
    */
   public clone() {
      return new (this as any).constructor().assign(this);
   }



   // public lookAt(v) {
   //    this.direction.copy(v).sub(this.origin).normalize();
   // }

   // @Prototype()
   // public recast() {
   //    var v1 = new Vector3();
   //    return function (t) {
   //       this.origin.copy(this.at(t, v1));
   //       return this;
   //    };
   // };

   // public closestPointToPoint(point, optionalTarget) {
   //    var result = optionalTarget || new Vector3();
   //    result.subVectors(point, this.origin);
   //    var directionDistance = result.dot(this.direction);
   //    if (directionDistance < 0) {
   //       return result.copy(this.origin);
   //    }
   //    return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
   // }

   // @Prototype()
   // public distanceSqToSegment() {
   //    var segCenter = new Vector3();
   //    var segDir = new Vector3();
   //    var diff = new Vector3();
   //    return function (v0, v1, optionalPointOnRay, optionalPointOnSegment) {
   //       segCenter.assign(v0).add(v1).multiplyScalar(0.5);
   //       segDir.assign(v1).sub(v0).normalize();
   //       diff.assign(this.origin).sub(segCenter);
   //       var segExtent = v0.distanceTo(v1) * 0.5;
   //       var a01 = - this.direction.dot(segDir);
   //       var b0 = diff.dot(this.direction);
   //       var b1 = - diff.dot(segDir);
   //       var c = diff.lengthSquared();
   //       var det = Math.abs(1 - a01 * a01);
   //       var s0, s1, sqrDist, extDet;
   //       if (det > 0) {
   //          // The ray and segment are not parallel.
   //          s0 = a01 * b1 - b0;
   //          s1 = a01 * b0 - b1;
   //          extDet = segExtent * det;
   //          if (s0 >= 0) {
   //             if (s1 >= - extDet) {
   //                if (s1 <= extDet) {
   //                   // region 0
   //                   // Minimum at interior points of ray and segment.
   //                   var invDet = 1 / det;
   //                   s0 *= invDet;
   //                   s1 *= invDet;
   //                   sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
   //                } else {
   //                   // region 1
   //                   s1 = segExtent;
   //                   s0 = Math.max(0, - (a01 * s1 + b0));
   //                   sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;
   //                }
   //             } else {
   //                // region 5
   //                s1 = - segExtent;
   //                s0 = Math.max(0, - (a01 * s1 + b0));
   //                sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;
   //             }
   //          } else {
   //             if (s1 <= - extDet) {
   //                // region 4
   //                s0 = Math.max(0, - (- a01 * segExtent + b0));
   //                s1 = (s0 > 0) ? - segExtent : Math.min(Math.max(- segExtent, - b1), segExtent);
   //                sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;
   //             } else if (s1 <= extDet) {
   //                // region 3
   //                s0 = 0;
   //                s1 = Math.min(Math.max(- segExtent, - b1), segExtent);
   //                sqrDist = s1 * (s1 + 2 * b1) + c;
   //             } else {
   //                // region 2
   //                s0 = Math.max(0, - (a01 * segExtent + b0));
   //                s1 = (s0 > 0) ? segExtent : Math.min(Math.max(- segExtent, - b1), segExtent);
   //                sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;
   //             }
   //          }
   //       } else {
   //          // Ray and segment are parallel.
   //          s1 = (a01 > 0) ? - segExtent : segExtent;
   //          s0 = Math.max(0, - (a01 * s1 + b0));
   //          sqrDist = - s0 * s0 + s1 * (s1 + 2 * b1) + c;
   //       }
   //       if (optionalPointOnRay) {
   //          optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
   //       }
   //       if (optionalPointOnSegment) {
   //          optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);
   //       }
   //       return sqrDist;
   //    };
   // }

   // public distanceToPlane(plane) {
   //    var denominator = plane.normal.dot(this.direction);
   //    if (denominator === 0) {
   //       if (plane.distanceToPoint(this.origin) === 0) {
   //          return 0;
   //       }
   //       return null;
   //    }
   //    var t = - (this.origin.dot(plane.normal) + plane.constant) / denominator;
   //    return t >= 0 ? t : null;
   // }

   // public intersectPlane(plane, optionalTarget) {
   //    var t = this.distanceToPlane(plane);
   //    if (t === null) {
   //       return null;
   //    }
   //    return this.at(t, optionalTarget);
   // }

   // public intersectsPlane(plane) {
   //    var distToPoint = plane.distanceToPoint(this.origin);
   //    if (distToPoint === 0) {
   //       return true;
   //    }
   //    var denominator = plane.normal.dot(this.direction);
   //    if (denominator * distToPoint < 0) {
   //       return true;
   //    }
   //    return false;
   // }

   // public intersectBox(box, optionalTarget) {
   //    var tmin, tmax, tymin, tymax, tzmin, tzmax;
   //    var invdirx = 1 / this.direction.x,
   //       invdiry = 1 / this.direction.y,
   //       invdirz = 1 / this.direction.z;
   //    var origin = this.origin;
   //    if (invdirx >= 0) {
   //       tmin = (box.min.x - origin.x) * invdirx;
   //       tmax = (box.max.x - origin.x) * invdirx;
   //    } else {
   //       tmin = (box.max.x - origin.x) * invdirx;
   //       tmax = (box.min.x - origin.x) * invdirx;
   //    }
   //    if (invdiry >= 0) {
   //       tymin = (box.min.y - origin.y) * invdiry;
   //       tymax = (box.max.y - origin.y) * invdiry;
   //    } else {
   //       tymin = (box.max.y - origin.y) * invdiry;
   //       tymax = (box.min.y - origin.y) * invdiry;
   //    }
   //    if ((tmin > tymax) || (tymin > tmax)) return null;
   //    if (tymin > tmin || tmin !== tmin) tmin = tymin;
   //    if (tymax < tmax || tmax !== tmax) tmax = tymax;
   //    if (invdirz >= 0) {
   //       tzmin = (box.min.z - origin.z) * invdirz;
   //       tzmax = (box.max.z - origin.z) * invdirz;
   //    } else {
   //       tzmin = (box.max.z - origin.z) * invdirz;
   //       tzmax = (box.min.z - origin.z) * invdirz;
   //    }
   //    if ((tmin > tzmax) || (tzmin > tmax)) return null;
   //    if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
   //    if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
   //    if (tmax < 0) return null;
   //    return this.at(tmin >= 0 ? tmin : tmax, optionalTarget);
   // }

   // @Prototype()
   // public intersectsBox() {
   //    var v = new Vector3();
   //    return function (box) {
   //       return this.intersectBox(box, v) !== null;
   //    };
   // }

   // public applyMatrix4(matrix4) {
   //    this.direction.add(this.origin).applyMatrix4(matrix4);
   //    this.origin.applyMatrix4(matrix4);
   //    this.direction.sub(this.origin);
   //    this.direction.normalize();
   //    return this;
   // }

   // public equals(ray) {
   //    return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
   // }
}
