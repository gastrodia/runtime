import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Euler} from '../../math/Euler';
import {Matrix4} from '../../math/Matrix4';
import {Outline3d} from '../../math/Outline3d';
import {Quaternion} from '../../math/Quaternion';
import {Vector3} from '../../math/Vector3';
import {Context} from './Context';
import {Node} from './Node';
import {Raycaster} from './Raycaster';

/**
 * 角色对象集合。
 */
export type ActorChildrenType = {
   [key: string]: Actor
};

/**
 * 角色。
 *
 * @author maocy
 * @history 160421
 */
export class Actor extends Node {
   // 编号计数器
   public static IdCounter: number = 0;
   // 位置
   public position: Vector3;
   // 旋转
   public rotation: Euler;
   // 旋转
   public quaternion: Quaternion;
   // 缩放
   public scale: Vector3;
   // 轮廓
   public outline: Outline3d;
   // 自动更新矩阵标志
   public matrixAutoUpdate: boolean;
   // 局部矩阵
   public matrix: Matrix4;
   // 世界矩阵
   public matrixWorld: Matrix4;
   // 父对象集合
   public parents: ActorChildrenType;
   // 子节点集合
   public children: ActorChildrenType;
   // 世界矩阵更新标志
   protected _matrixWorldNeedsUpdate: boolean;
   // 可见性
   protected _visible: boolean;
   // 脏标志
   protected _dirty: boolean;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.id = ++Actor.IdCounter;
      this.position = new Vector3();
      this.rotation = new Euler();
      this.quaternion = new Quaternion();
      this.scale = new Vector3(1, 1, 1);
      this.outline = new Outline3d();
      this.matrix = new Matrix4();
      this.matrixWorld = new Matrix4();
      this._visible = true;
      this._dirty = true;
   }

   /**
    * 测试可见性。
    *
    * @return 可见性
    */
   public testVisible(): boolean {
      return this._visible;
   }

   /**
    * 测试脏状态。
    *
    * @return 脏状态
    */
   public testDirty(): boolean {
      return this._dirty;
   }

   /**
    * 计算轮廓大小。
    *
    * @return 轮廓
    */
   public calculateOutline(): Outline3d {
      return this.outline;
   }

   /**
    * 测试相交处理。
    *
    * @param raycaster 射线检测器
    */
   public raycast(raycaster: Raycaster, intersects) {
   }

   /**
    * 显示处理。
    *
    * @return 轮廓
    */
   public show() {
      this._visible = true;
   }

   /**
    * 隐藏处理。
    *
    * @return 轮廓
    */
   public hide() {
      this._visible = false;
   }

   /**
    * 更新模型矩阵。
    */
   public updateMatrix() {
      this.matrix.setTranslationQuaternionScale(this.position, this.quaternion, this.scale);
      this._matrixWorldNeedsUpdate = true;
   }

   /**
    * 更新世界矩阵。
    */
   public updateMatrixWorld(flag?: boolean) {
      // 更新矩阵
      if (flag || this._matrixWorldNeedsUpdate) {
         this.matrixWorld.assign(this.matrix);
         // 计算父数据
         var parents = this.parents;
         for (var id in parents) {
            var parent = parents[id];
            this.matrixWorld.append(parent.matrixWorld);
         }
         // 计算子节点
         var children = this.children;
         if (children) {
            for (var id in children) {
               var child = children[id];
               child.updateMatrixWorld(true);
            }
         }
         this._matrixWorldNeedsUpdate = false;
      }
   }

   /**
    * 更新处理。
    *
    * @param context 环境
    * @return 处理结果
    */
   public update(context: Context): boolean {
      // 更新矩阵
      // this.matrix.setTranslationQuaternionScale(this.position, this.quaternion, this.scale);
      this._dirty = false;
      return true;
   }

   /**
    * 脏处理。
    */
   public dirty() {
      this._dirty = true;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      // 释放属性
      this.position = ObjectUtil.dispose(this.position);
      this.rotation = ObjectUtil.dispose(this.rotation);
      this.scale = ObjectUtil.dispose(this.scale);
      this.outline = ObjectUtil.free(this.outline);
      this.matrix = ObjectUtil.dispose(this.matrix);
      this.matrixWorld = ObjectUtil.dispose(this.matrixWorld);
      // 父处理
      super.dispose();
   }

   // /**
   //  * 脏处理。
   //  *
   //  * @param flag 标志
   //  */
   // public update(flag?: boolean) {
   //    if (this._dirty || flag) {
   //       this.dispatchEvent(NodeEventEnum.Dirty);
   //       this._dirty = true;
   //    }
   // }

   // //==========================================================
   // // <T>计算轮廓大小。</T>
   // //
   // // @return 轮廓
   // //==========================================================
   // public calculateOutline(): Outline3d {
   //    var outline = this.outline;
   //    if (outline.isEmpty()) {
   //       outline.setMin();
   //       // 计算渲染集合的轮廓
   //       var renderables = this.renderables;
   //       if (renderables) {
   //          var count: number = renderables.count();
   //          for (var n: number = 0; n < count; n++) {
   //             var renderable: Renderable = renderables.at(n);
   //             var renderableOutline = renderable.calculateOutline()
   //             outline.mergeMax(renderableOutline);
   //          }
   //       }
   //    }
   //    return outline;
   // }

   // //==========================================================
   // // <T>更新处理。</T>
   // //
   // // @param region 区域
   // //==========================================================
   // public update(region: Region): boolean {
   //    return true;
   // }
}
