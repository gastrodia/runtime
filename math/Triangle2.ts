import {Prototype} from '../common/reflect/Prototype';
import {Plane} from './Plane';
import {Vector2} from './Vector2';

/**
 * 二维三角形。
 */
export class Triangle2 {
   // A点
   public a: Vector2;
   // B点
   public b: Vector2;
   // C点
   public c: Vector2;

   /**
    * 构造处理。
    *
    * @param a A点
    * @param b B点
    * @param c C点
    */
   public constructor(a: Vector2, b: Vector2, c: Vector2) {
      this.a = new Vector2();
      if (a) {
         this.a.assign(a);
      }
      this.b = new Vector2();
      if (b) {
         this.b.assign(b);
      }
      this.c = new Vector2();
      if (c) {
         this.c.assign(c);
      }
   }

   // @Prototype()
   // public static normal(a, b, c, optionalTarget) {
   //    var v0 = new Vector3();
   //    return function (a, b, c, optionalTarget) {
   //       var result = optionalTarget || new Vector3();
   //       result.subVectors(c, b);
   //       v0.subVectors(a, b);
   //       result.cross(v0);
   //       var resultLengthSq = result.lengthSq();
   //       if (resultLengthSq > 0) {
   //          return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));
   //       }
   //       return result.set(0, 0, 0);
   //    };
   // }

   // @Prototype()
   // public static barycoordFromPoint(point, a, b, c, optionalTarget) {
   //    var v0 = new Vector3();
   //    var v1 = new Vector3();
   //    var v2 = new Vector3();
   //    return function (point, a, b, c, optionalTarget) {
   //       v0.subVectors(c, a);
   //       v1.subVectors(b, a);
   //       v2.subVectors(point, a);
   //       var dot00 = v0.dot(v0);
   //       var dot01 = v0.dot(v1);
   //       var dot02 = v0.dot(v2);
   //       var dot11 = v1.dot(v1);
   //       var dot12 = v1.dot(v2);
   //       var denom = (dot00 * dot11 - dot01 * dot01);
   //       var result = optionalTarget || new Vector3();
   //       if (denom === 0) {
   //          return result.set(- 2, - 1, - 1);
   //       }
   //       var invDenom = 1 / denom;
   //       var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
   //       var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
   //       return result.set(1 - u - v, v, u);
   //    };
   // }

   // @Prototype()
   // public static containsPoint(point, a, b, c) {
   //    var v1 = new Vector3();
   //    return function (point, a, b, c) {
   //       var result = this.barycoordFromPoint(point, a, b, c, v1);
   //       return (result.x >= 0) && (result.y >= 0) && ((result.x + result.y) <= 1);
   //    };
   // }

   // public set(a, b, c) {
   //    this.a.copy(a);
   //    this.b.copy(b);
   //    this.c.copy(c);
   //    return this;
   // }

   // public setFromPointsAndIndices(points, i0, i1, i2) {
   //    this.a.copy(points[i0]);
   //    this.b.copy(points[i1]);
   //    this.c.copy(points[i2]);
   //    return this;
   // }

   // public clone() {
   //    return new (this as any).constructor().copy(this);
   // }

   // public copy(triangle) {
   //    this.a.copy(triangle.a);
   //    this.b.copy(triangle.b);
   //    this.c.copy(triangle.c);
   //    return this;
   // }

   // @Prototype()
   // public area() {
   //    var v0 = new Vector3();
   //    var v1 = new Vector3();
   //    return function () {
   //       v0.subVectors(this.c, this.b);
   //       v1.subVectors(this.a, this.b);
   //       return v0.cross(v1).length() * 0.5;
   //    };
   // }

   // public midpoint(optionalTarget) {
   //    var result = optionalTarget || new Vector3();
   //    return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
   // }

   // public normal(optionalTarget) {
   //    return Triangle.normal(this.a, this.b, this.c, optionalTarget);
   // }

   // public plane(optionalTarget) {
   //    var result = optionalTarget || new Plane();
   //    return result.setFromCoplanarPoints(this.a, this.b, this.c);
   // }

   // public barycoordFromPoint(point, optionalTarget) {
   //    return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);
   // }

   // public containsPoint(point) {
   //    return Triangle.containsPoint(point, this.a, this.b, this.c);
   // }

   // public equals(triangle) {
   //    return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
   // }
}
