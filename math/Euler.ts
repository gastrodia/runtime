import {Prototype} from '../common/reflect/Prototype';
import {MathUtil} from './MathUtil';
import {Matrix4} from './Matrix4';
import {Quaternion} from './Quaternion';
import {Vector3} from './Vector3';

/**
 * 欧拉角。
 */
export class Euler {
   // 旋转顺序
   public static RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
   // 默认顺序
   public static DefaultOrder = 'XYZ';
   // X角度
   public x: number;
   // Y角度
   public y: number;
   // Z角度
   public z: number;
   // 顺序
   public order: string;

   /**
    * 构造处理。
    *
    * @param x X角度
    * @param y Y角度
    * @param z Z角度
    * @param order 顺序
    */
   public constructor(x: number = 0, y: number = 0, z: number = 0, order: string = Euler.DefaultOrder) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.order = order;
   }

   /**
    * 接收数据。
    *
    * @param value 欧拉角
    * @return 欧拉角
    */
   public assign(value: Euler): Euler {
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
      this.order = value.order;
      return this;
   }

   /**
    * 设置数据内容。
    *
    * @param x X角度
    * @param y Y角度
    * @param z Z角度
    * @param order 顺序
    * @return 颜色
    */
   public set(x: number, y, z, order) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.order = order || this.order;
      return this;
   }

   /**
    * 克隆当前数据。
    *
    * @return 颜色
    */
   public clone() {
      return new (this as any).constructor(this.x, this.y, this.z, this.order);
   }

   // public setFromRotationMatrix(m, order, update) {
   //    var clamp = MathUtil.clamp;
   //    var te = m.elements;
   //    var m11 = te[0], m12 = te[4], m13 = te[8];
   //    var m21 = te[1], m22 = te[5], m23 = te[9];
   //    var m31 = te[2], m32 = te[6], m33 = te[10];
   //    order = order || this.order;
   //    if (order === 'XYZ') {
   //       this.y = Math.asin(clamp(m13, - 1, 1));
   //       if (Math.abs(m13) < 0.99999) {
   //          this.x = Math.atan2(- m23, m33);
   //          this.z = Math.atan2(- m12, m11);
   //       } else {
   //          this.x = Math.atan2(m32, m22);
   //          this.z = 0;
   //       }
   //    } else if (order === 'YXZ') {
   //       this.x = Math.asin(- clamp(m23, - 1, 1));
   //       if (Math.abs(m23) < 0.99999) {
   //          this.y = Math.atan2(m13, m33);
   //          this.z = Math.atan2(m21, m22);
   //       } else {
   //          this.y = Math.atan2(- m31, m11);
   //          this.z = 0;
   //       }
   //    } else if (order === 'ZXY') {
   //       this.x = Math.asin(clamp(m32, - 1, 1));
   //       if (Math.abs(m32) < 0.99999) {
   //          this.y = Math.atan2(- m31, m33);
   //          this.z = Math.atan2(- m12, m22);
   //       } else {
   //          this.y = 0;
   //          this.z = Math.atan2(m21, m11);
   //       }
   //    } else if (order === 'ZYX') {
   //       this.y = Math.asin(- clamp(m31, - 1, 1));
   //       if (Math.abs(m31) < 0.99999) {
   //          this.x = Math.atan2(m32, m33);
   //          this.z = Math.atan2(m21, m11);
   //       } else {
   //          this.x = 0;
   //          this.z = Math.atan2(- m12, m22);
   //       }
   //    } else if (order === 'YZX') {
   //       this.z = Math.asin(clamp(m21, - 1, 1));
   //       if (Math.abs(m21) < 0.99999) {
   //          this.x = Math.atan2(- m23, m22);
   //          this.y = Math.atan2(- m31, m11);
   //       } else {
   //          this.x = 0;
   //          this.y = Math.atan2(m13, m33);
   //       }
   //    } else if (order === 'XZY') {
   //       this.z = Math.asin(- clamp(m12, - 1, 1));
   //       if (Math.abs(m12) < 0.99999) {
   //          this.x = Math.atan2(m32, m22);
   //          this.y = Math.atan2(m13, m11);
   //       } else {
   //          this.x = Math.atan2(- m23, m33);
   //          this.y = 0;
   //       }
   //    } else {
   //       console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order)
   //    }
   //    this.order = order;
   //    if (update !== false) this.onChangeCallback();
   //    return this;
   // }

   // @Prototype()
   // public setFromQuaternion() {
   //    var matrix;
   //    return function (q, order, update) {
   //       if (matrix === undefined) matrix = new Matrix4();
   //       matrix.makeRotationFromQuaternion(q);
   //       this.setFromRotationMatrix(matrix, order, update);
   //       return this;
   //    };
   // }

   // public setFromVector3(v, order) {
   //    return this.set(v.x, v.y, v.z, order || this.order);
   // }

   // @Prototype()
   // public reorder() {
   //    var q = new Quaternion();
   //    return function (newOrder) {
   //       q.setFromEuler(this);
   //       this.setFromQuaternion(q, newOrder);
   //    };
   // }

   // public equals(euler) {
   //    return (euler._x === this.x) && (euler._y === this.y) && (euler._z === this.z) && (euler._order === this.order);
   // }

   // public fromArray(array) {
   //    this.x = array[0];
   //    this.y = array[1];
   //    this.z = array[2];
   //    if (array[3] !== undefined) this.order = array[3];
   //    this.onChangeCallback();
   //    return this;
   // }

   // public toArray(array, offset) {
   //    if (array === undefined) array = [];
   //    if (offset === undefined) offset = 0;
   //    array[offset] = this.x;
   //    array[offset + 1] = this.y;
   //    array[offset + 2] = this.z;
   //    array[offset + 3] = this.order;
   //    return array;
   // }

   // public toVector3(optionalResult) {
   //    if (optionalResult) {
   //       return optionalResult.set(this.x, this.y, this.z);
   //    } else {
   //       return new Vector3(this.x, this.y, this.z);
   //    }
   // }
}
