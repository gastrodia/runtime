import {Actor, ActorChildrenType} from './Actor';
import {Node} from './Node';

/**
 * 角色。
 *
 * @author maocy
 * @history 160503
 */
export class Layer extends Node {
   // 配置深度
   public optionDepth: boolean;
   // 激活状态
   public statusActive: boolean;
   // 父节点集合
   public parents: ActorChildrenType;
   // 子节点集合
   public children: ActorChildrenType;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.optionDepth = true;
   }

   /**
    * 激活处理。
    */
   public active() {
      this.statusActive = true;
   }

   /**
    * 取消激活处理。
    */
   public deactive() {
      this.statusActive = false;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      // 释放属性
      // 父处理
      super.dispose();
   }
}
