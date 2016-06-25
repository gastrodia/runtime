import {Layer} from './Layer';
import {Node} from './Node';

/**
 * 角色对象集合。
 */
export type LayerChildrenType = {
   [key: string]: Layer
};

/**
 * 场景。
 *
 * @author maocy
 * @history 160503
 */
export class Scene extends Node {
   // 背景颜色
   public backgroundColor: number;
   // 子节点集合
   public children: LayerChildrenType;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.backgroundColor = 0xFFFFFFFF;
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
