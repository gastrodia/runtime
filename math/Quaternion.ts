import {Prototype} from '../common/reflect/Prototype';
import {Euler} from './Euler';
import {Vector3} from './Vector3';

export class Quaternion {

   public x:number;

   public y:number;

   public z:number;

   public w:number;

   public constructor(x?: any, y?: any, z?: any, w?: any) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = (w !== undefined) ? w : 1;
   }

   //============================================================
   // <T>单位化处理。</T>
   //
   // @method
   //============================================================
   public identity() {
      this.x = this.y = this.z = 0;
      this.w = 1;
      return this;
   }

   //============================================================
   // <T>乘法处理。</T>
   //
   // @method
   // @param value:SQuaternion 四元数
   //============================================================
   public mul(value) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var w = this.w;
      this.x = (w * value.x) + (x * value.w) + (y * value.z) - (z * value.y);
      this.y = (w * value.y) + (y * value.w) + (z * value.x) - (x * value.z);
      this.z = (w * value.z) + (z * value.w) + (x * value.y) - (y * value.x);
      this.w = (w * value.w) - (x * value.x) - (y * value.y) - (z * value.z);
   }

   //==========================================================
   // <T>用轴向量和旋转角创建一个四元组。</T>
   //
   // @method
   // @param axis:SVector3 方向轴
   // @param angle:Number 弧度
   //==========================================================
   public fromAxisAngle(axis, angle) {
      var r = angle * 0.5;
      var s = Math.sin(r);
      this.x = axis.x * s;
      this.y = axis.y * s;
      this.z = axis.z * s;
      this.w = Math.cos(r);
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @param output 数据流
   //==========================================================
   public serialize(output) {
      output.writeFloat(this.x);
      output.writeFloat(this.y);
      output.writeFloat(this.z);
      output.writeFloat(this.w);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @param input 数据流
   //==========================================================
   public unserialize(input) {
      this.x = input.readFloat();
      this.y = input.readFloat();
      this.z = input.readFloat();
      this.w = input.readFloat();
   }

   // public get x() {
   //    return this._x;
   // }

   // public set x(value) {
   //    this._x = value;
   //    this.onChangeCallback();
   // }

   // public get y() {
   //    return this._y;
   // }

   // public set y(value) {
   //    this._y = value;
   //    this.onChangeCallback();
   // }

   // public get z() {
   //    return this._z;
   // }

   // public set z(value) {
   //    this._z = value;
   //    this.onChangeCallback();
   // }

   // public get w() {
   //    return this._w;
   // }

   // public set w(value) {
   //    this._w = value;
   //    this.onChangeCallback();
   // }

   public set(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      this.onChangeCallback();
      return this;
   }

   public clone() {
      return new (this as any).constructor(this.x, this.y, this.z, this.w);
   }

   public copy(quaternion) {
      this.x = quaternion.x;
      this.y = quaternion.y;
      this.z = quaternion.z;
      this.w = quaternion.w;
      this.onChangeCallback();
      return this;
   }

   public setFromEuler(euler, update?: any) {
      if (euler instanceof Euler === false) {
         throw new Error('THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
      }
      var c1 = Math.cos(euler._x / 2);
      var c2 = Math.cos(euler._y / 2);
      var c3 = Math.cos(euler._z / 2);
      var s1 = Math.sin(euler._x / 2);
      var s2 = Math.sin(euler._y / 2);
      var s3 = Math.sin(euler._z / 2);
      var order = euler.order;
      if (order === 'XYZ') {
         this.x = s1 * c2 * c3 + c1 * s2 * s3;
         this.y = c1 * s2 * c3 - s1 * c2 * s3;
         this.z = c1 * c2 * s3 + s1 * s2 * c3;
         this.w = c1 * c2 * c3 - s1 * s2 * s3;
      } else if (order === 'YXZ') {
         this.x = s1 * c2 * c3 + c1 * s2 * s3;
         this.y = c1 * s2 * c3 - s1 * c2 * s3;
         this.z = c1 * c2 * s3 - s1 * s2 * c3;
         this.w = c1 * c2 * c3 + s1 * s2 * s3;
      } else if (order === 'ZXY') {
         this.x = s1 * c2 * c3 - c1 * s2 * s3;
         this.y = c1 * s2 * c3 + s1 * c2 * s3;
         this.z = c1 * c2 * s3 + s1 * s2 * c3;
         this.w = c1 * c2 * c3 - s1 * s2 * s3;
      } else if (order === 'ZYX') {
         this.x = s1 * c2 * c3 - c1 * s2 * s3;
         this.y = c1 * s2 * c3 + s1 * c2 * s3;
         this.z = c1 * c2 * s3 - s1 * s2 * c3;
         this.w = c1 * c2 * c3 + s1 * s2 * s3;
      } else if (order === 'YZX') {
         this.x = s1 * c2 * c3 + c1 * s2 * s3;
         this.y = c1 * s2 * c3 + s1 * c2 * s3;
         this.z = c1 * c2 * s3 - s1 * s2 * c3;
         this.w = c1 * c2 * c3 - s1 * s2 * s3;
      } else if (order === 'XZY') {
         this.x = s1 * c2 * c3 - c1 * s2 * s3;
         this.y = c1 * s2 * c3 - s1 * c2 * s3;
         this.z = c1 * c2 * s3 + s1 * s2 * c3;
         this.w = c1 * c2 * c3 + s1 * s2 * s3;
      }
      if (update !== false) this.onChangeCallback();
      return this;
   }

   public setFromAxisAngle(axis, angle) {
      var halfAngle = angle / 2, s = Math.sin(halfAngle);
      this.x = axis.x * s;
      this.y = axis.y * s;
      this.z = axis.z * s;
      this.w = Math.cos(halfAngle);
      this.onChangeCallback();
      return this;
   }

   public setFromRotationMatrix(m) {
      var te = m.elements,
         m11 = te[0], m12 = te[4], m13 = te[8],
         m21 = te[1], m22 = te[5], m23 = te[9],
         m31 = te[2], m32 = te[6], m33 = te[10],
         trace = m11 + m22 + m33,
         s;
      if (trace > 0) {
         s = 0.5 / Math.sqrt(trace + 1.0);
         this.w = 0.25 / s;
         this.x = (m32 - m23) * s;
         this.y = (m13 - m31) * s;
         this.z = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {
         s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
         this.w = (m32 - m23) / s;
         this.x = 0.25 * s;
         this.y = (m12 + m21) / s;
         this.z = (m13 + m31) / s;
      } else if (m22 > m33) {
         s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
         this.w = (m13 - m31) / s;
         this.x = (m12 + m21) / s;
         this.y = 0.25 * s;
         this.z = (m23 + m32) / s;
      } else {
         s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
         this.w = (m21 - m12) / s;
         this.x = (m13 + m31) / s;
         this.y = (m23 + m32) / s;
         this.z = 0.25 * s;
      }
      this.onChangeCallback();
      return this;
   }

   @Prototype()
   public setFromUnitVectors() {
      var v1, r;
      var EPS = 0.000001;
      return function(vFrom, vTo) {
         if (v1 === undefined) v1 = new Vector3();
         r = vFrom.dot(vTo) + 1;
         if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
               v1.set(- vFrom.y, vFrom.x, 0);
            } else {
               v1.set(0, - vFrom.z, vFrom.y);
            }
         } else {
            v1.crossVectors(vFrom, vTo);
         }
         this._x = v1.x;
         this._y = v1.y;
         this._z = v1.z;
         this._w = r;
         this.normalize();
         return this;
      };
   }

   public inverse() {
      this.conjugate().normalize();
      return this;
   }

   public conjugate() {
      this.x *= - 1;
      this.y *= - 1;
      this.z *= - 1;
      this.onChangeCallback();
      return this;
   }

   public dot(v) {
      return this.x * v._x + this.y * v._y + this.z * v._z + this.w * v._w;
   }

   public lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
   }

   public length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
   }

   public normalize() {
      var l = this.length();
      if (l === 0) {
         this.x = 0;
         this.y = 0;
         this.z = 0;
         this.w = 1;
      } else {
         l = 1 / l;
         this.x = this.x * l;
         this.y = this.y * l;
         this.z = this.z * l;
         this.w = this.w * l;
      }
      this.onChangeCallback();
      return this;
   }

   public multiply(q, p) {
      if (p !== undefined) {
         console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
         return this.multiplyQuaternions(q, p);
      }
      return this.multiplyQuaternions(this, q);
   }

   public multiplyQuaternions(a, b) {
      var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
      var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
      this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
      this.onChangeCallback();
      return this;
   }

   public slerp(qb, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(qb);
      var x = this.x, y = this.y, z = this.z, w = this.w;
      var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
      if (cosHalfTheta < 0) {
         this.w = - qb._w;
         this.x = - qb._x;
         this.y = - qb._y;
         this.z = - qb._z;
         cosHalfTheta = - cosHalfTheta;
      } else {
         this.copy(qb);
      }
      if (cosHalfTheta >= 1.0) {
         this.w = w;
         this.x = x;
         this.y = y;
         this.z = z;
         return this;
      }
      var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
      if (Math.abs(sinHalfTheta) < 0.001) {
         this.w = 0.5 * (w + this.w);
         this.x = 0.5 * (x + this.x);
         this.y = 0.5 * (y + this.y);
         this.z = 0.5 * (z + this.z);
         return this;
      }
      var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
      var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
         ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
      this.w = (w * ratioA + this.w * ratioB);
      this.x = (x * ratioA + this.x * ratioB);
      this.y = (y * ratioA + this.y * ratioB);
      this.z = (z * ratioA + this.z * ratioB);
      this.onChangeCallback();
      return this;
   }

   public equals(quaternion) {
      return (quaternion._x === this.x) && (quaternion._y === this.y) && (quaternion._z === this.z) && (quaternion._w === this.w);
   }

   public fromArray(array, offset) {
      if (offset === undefined) offset = 0;
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      this.w = array[offset + 3];
      this.onChangeCallback();
      return this;
   }

   public toArray(array, offset) {
      if (array === undefined) array = [];
      if (offset === undefined) offset = 0;
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      array[offset + 3] = this.w;
      return array;
   }

   public onChange(callback) {
      this.onChangeCallback = callback;
      return this;
   }

   public onChangeCallback() {

   }

   // Object.assign(THREE.Quaternion, {
   //    slerp: function(qa, qb, qm, t) {
   //       return qm.copy(qa).slerp(qb, t);
   //    },
   //    slerpFlat: function(
   //       dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
   //       // fuzz-free, array-based Quaternion SLERP operation
   //       var x0 = src0[srcOffset0 + 0],
   //          y0 = src0[srcOffset0 + 1],
   //          z0 = src0[srcOffset0 + 2],
   //          w0 = src0[srcOffset0 + 3],
   //          x1 = src1[srcOffset1 + 0],
   //          y1 = src1[srcOffset1 + 1],
   //          z1 = src1[srcOffset1 + 2],
   //          w1 = src1[srcOffset1 + 3];
   //       if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
   //          var s = 1 - t,
   //             cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
   //             dir = (cos >= 0 ? 1 : - 1),
   //             sqrSin = 1 - cos * cos;
   //          // Skip the Slerp for tiny steps to avoid numeric problems:
   //          if (sqrSin > Number.EPSILON) {
   //             var sin = Math.sqrt(sqrSin),
   //                len = Math.atan2(sin, cos * dir);
   //             s = Math.sin(s * len) / sin;
   //             t = Math.sin(t * len) / sin;
   //          }
   //          var tDir = t * dir;
   //          x0 = x0 * s + x1 * tDir;
   //          y0 = y0 * s + y1 * tDir;
   //          z0 = z0 * s + z1 * tDir;
   //          w0 = w0 * s + w1 * tDir;
   //          // Normalize in case we just did a lerp:
   //          if (s === 1 - t) {
   //             var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
   //             x0 *= f;
   //             y0 *= f;
   //             z0 *= f;
   //             w0 *= f;
   //          }
   //       }
   //       dst[dstOffset] = x0;
   //       dst[dstOffset + 1] = y0;
   //       dst[dstOffset + 2] = z0;
   //       dst[dstOffset + 3] = w0;
   //    }
   // });
}
