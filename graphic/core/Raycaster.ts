import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {Ray3} from '../../math/Ray3';
import {Vector2} from '../../math/Vector2';
import {Vector3} from '../../math/Vector3';
import {Camera} from '../camera/Camera';
import {OrthographicCamera} from '../camera/OrthographicCamera';
import {PerspectiveCamera} from '../camera/PerspectiveCamera';
import {Actor} from './Actor';

/**
 * 射线检测器。
 */
export class Raycaster extends ObjectBase {
   // 射线
   public ray: Ray3;
   // 近距离
   public near: number;
   // 远距离
   public far: number;
   // 参数
   // public params;
   // 精度
   // public linePrecision = 1;

   /**
    * 构造处理。
    *
    * @param origin 开始点
    * @param direction 方向
    * @param near 近距离
    * @param far 远距离
    */
   public constructor(origin?: Vector3, direction?: Vector3, near: number = 0, far: number = Infinity) {
      super();
      // 设置参数
      this.ray = new Ray3(origin, direction);
      this.near = near;
      this.far = far;
      // this.params = {
      //    Mesh: {},
      //    Line: {},
      //    LOD: {},
      //    Points: { threshold: 1 },
      //    Sprite: {}
      // };
      // Object.defineProperties(this.params, {
      //    PointCloud: {
      //       get: function () {
      //          console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');
      //          return this.Points;
      //       }
      //    }
      // });
   }

   /**
    * 设置数据。
    *
    * @param origin 开始点
    * @param direction 方向
    */
   public set(origin: Vector3, direction: Vector3) {
      this.ray.set(origin, direction);
   }

   /**
    * 设置数据。
    *
    * @param origin 开始点
    * @param direction 方向
    */
   public setFromCamera(coords: Vector2, camera: Camera) {
      // if (camera instanceof PerspectiveCamera) {
      //    this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
      //    this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();
      // } else if (camera instanceof OrthographicCamera) {
      //    this.ray.origin.set(coords.x, coords.y, - 1).unproject(camera);
      //    this.ray.direction.set(0, 0, - 1).transformDirection(camera.matrixWorld);
      // } else {
      //    throw new Fatal('Unsupported camera type.');
      // }
   }

   /**
    * 结果排序。
    *
    * @param value1 内容1
    * @param value2 内容2
    * @return 比较结果
    */
   protected static intersectsSort(value1: any, value2: any): number {
      return value1.distance - value2.distance;
   }

   /**
    * 测试相交处理。
    *
    * @param actor 角色
    * @param intersects 测试结果
    * @param recursive 递归子处理
    */
   protected innerIntersectObject(actor: Actor, intersects, recursive: boolean) {
      if (actor.testVisible()) {
         actor.raycast(this, intersects);
         if (recursive) {
            var children = actor.children;
            if (children) {
               for (var id in children) {
                  var child = children[id];
                  this.innerIntersectObject(child, intersects, true);
               }
            }
         }
      }
   }

   /**
    * 测试对象相交处理。
    *
    * @param actor 角色
    * @param intersects 测试结果
    * @param recursive 递归子处理
    */
   public intersectObject(actor: Actor, recursive: boolean): any {
      var intersects = [];
      this.innerIntersectObject(actor, intersects, recursive);
      intersects.sort(Raycaster.intersectsSort);
      return intersects;
   }

   /**
    * 测试对象相交处理。
    *
    * @param actors 角色集合
    * @param intersects 测试结果
    * @param recursive 递归子处理
    */
   public intersectObjects(actors: Array<Actor>, recursive: boolean): any {
      AssertUtil.debugTrue(Array.isArray(actors));
      var intersects = [];
      var count = actors.length;
      for (var i = 0; i < count; i++) {
         this.innerIntersectObject(actors[i], intersects, recursive);
      }
      intersects.sort(Raycaster.intersectsSort);
      return intersects;
   }
}
