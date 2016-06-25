import {AssertUtil} from '../../common/AssertUtil';
import {Node} from './Node';

/**
 * 节点环境。
 */
export class NodeContext {
   // 节点集合
   public nodes: Array<Node>;

   /**
    * 构造处理。
    */
   public constructor() {
      this.nodes = new Array<Node>();
   }

   /**
    * 根据编号获得节点。
    *
    * @param id 编号
    * @return 节点
    */
   public get(id: string): any {
      AssertUtil.debugNotEmpty(id);
      var value = this.nodes[id];
      AssertUtil.debugNotNull(value);
      return value;
   }
}
