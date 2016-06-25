import {AccessEvent} from '../../common/lang/AccessEvent';
import {Node} from './Node';

/**
 * 字段变更事件。
 */
export class NodeFieldEvent extends AccessEvent {
   // 内容节点
   public content: Node;
   // 信息
   public tag: any;

   /**
    * 构造处理。
    */
   public constructor(owner?: any) {
      super();
      // 设置属性
      this.content = owner;
   }
}
