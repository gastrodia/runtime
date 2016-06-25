import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {AssertUtil} from '../../common/AssertUtil';
import {DataTypeEnum} from '../../common/lang/DataTypeEnum';
import {Dispatcher} from '../../common/lang/Dispatcher';
import {ListenerContext} from '../../common/lang/ListenerContext';
import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {Field} from '../../common/reflect/Field';
import {Property} from '../../common/reflect/Property';
import {ServiceUtil} from '../../core/ServiceUtil';
import {Persistent} from '../../core/persistent/Persistent';
import {PersistentService} from '../../core/persistent/PersistentService';
import {ArrayIdGuidConverter} from '../../core/persistent/converter/ArrayIdGuidConverter';
import {FieldIdConverter} from '../../core/persistent/converter/FieldIdConverter';
import {MathUtil} from '../../math/MathUtil';
import {NodeChildEvent} from './NodeChildEvent';
import {NodeContext} from './NodeContext';
import {NodeEventEnum} from './NodeEventEnum';
import {NodeFieldEvent} from './NodeFieldEvent';

/**
 * 子对象集合。
 */
export type NodeChildrenType = {
   [key: string]: Node
};

/**
 * 节点。
 */
export class Node extends Dispatcher {
   // 编号
   @Field('id', DataTypeEnum.Int32, Number, null)
   @Property()
   @Persistent(FieldIdConverter)
   public id: number;
   // 唯一编号
   @Field('guid', DataTypeEnum.String, String, 0)
   @Property()
   @Persistent()
   public guid: string;
   // 父集合
   @Field('parents', DataTypeEnum.Array, Node, null)
   @Persistent(ArrayIdGuidConverter, Object)
   public parents: NodeChildrenType;
   // 子集合
   @Field('children', DataTypeEnum.Array, Node, null)
   @Persistent(ArrayIdGuidConverter, Object)
   public children: NodeChildrenType;
   // 序列化类型
   protected _persistentCd: string;
   // 字段变更标志
   protected _disableFieldChanged: boolean;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.guid = MathUtil.makeUuid();
      this.parents = new Object() as NodeChildrenType;
      this.children = new Object() as NodeChildrenType;
      this._disableFieldChanged = false;
   }

   /**
    * 配置处理。
    */
   public setup() {
   }

   //    /**
   //     * 同步执行前置消息处理。
   //     *
   //     * @param child 子对象
   //     */
   //    protected processEventBefore(code: string, event: Event, bubble: boolean): void {
   //       // 向父节点传送消息
   //       var parent = this.parent;
   //       if (parent && bubble) {
   //          parent.processEventBefore(code, event, bubble);
   //       }
   //       // 分发消息处理
   //       if (!event.cancel) {
   //          this.dispatchEvent(code, event);
   //       }
   //    }

   //    /**
   //     * 异步执行后置消息处理。
   //     *
   //     * @param child 子对象
   //     */
   //    protected processEventAfter(code: string, event: Event, bubble: boolean): void {
   //       if (!event.cancel) {
   //          // 分发消息处理
   //          this.dispatchEvent(code, event);
   //          // 向父节点传送消息
   //          var parent = this.parent;
   //          if (parent && bubble) {
   //             parent.processEventAfter(code, event, bubble);
   //          }
   //       }
   //    }

   /**
    * 字段变更处理。
    *
    * @param sender 发送者
    * @param event 事件
    */
   public onFieldChanged(sender: ListenerContext, event: NodeFieldEvent) {
      event.content = this;
      this.dispatchEvent(NodeEventEnum.FieldChanged, event);
   }

   //    /**
   //     * 字段变更处理。
   //     *
   //     * @param sender 发送者
   //     * @param event 事件
   //     */
   //    public onFieldChanged(sender: ListenerContext, event: AccessEvent) {
   //       // 发送前置消息
   //       var fieldEvent = MemoryUtil.alloc(NodeFieldEvent) as NodeFieldEvent;
   //       fieldEvent.valid = true;
   //       fieldEvent.fieldName = event.name;
   //       fieldEvent.oldValue = event.oldValue;
   //       fieldEvent.newValue = event.newValue;
   //       this.processEventBefore(NodeEventEnum.FieldChanged, fieldEvent, true);
   //       // 修改内容
   //       event.result = fieldEvent.valid;
   //       // 发送后置消息
   //       if (fieldEvent.valid) {
   //          this.processEventAfter(NodeEventEnum.FieldChanged, fieldEvent, true);
   //       }
   //    }

   /**
    * 判断是否相等处理。
   *
   * @param value 实体
   * @return 是否相等
   */
   public equals(value: Node) {
      return true;
   }

   /**
    * 得到最顶级的节点
    */
   public getTopNode(): Node {
      var current = this as any;
      while (current) {
         if (!current.getParent()) {
            break;
         }
         current = current.getParent();
      }
      return current;
   }

   /**
    * 是否含有指定父节点。
    *
    * @param node 节点
    * @return 是否含有
    */
   public hasParent(node: Node): boolean {
      var id = node.id;
      return (this.parents[id] != null);
   }

   /**
    * 获得父总数。
    *
    * @return 父总数
    */
   public get parentCount(): number {
      var count = 0;
      var parents = this.parents;
      for (var id in parents) {
         if (parents[id]) {
            count++;
         }
      }
      return count;
   }

   /**
    * 获得父实体。
    *
    * @return 父实体
    */
   public getParent(): Node {
      var parents = this.parents;
      for (var id in parents) {
         var parent = parents[id];
         if (parent) {
            return parent;
         }
      }
      return null;
   }

   /**
    * 获得唯一父实体。
    *
    * @return 父实体
    */
   public getUniqueParent(): Node {
      var count = 0;
      var parent = null;
      var parents = this.parents;
      for (var id in parents) {
         parent = parents[id];
         count++;
      }
      AssertUtil.debugTrue(count == 1);
      return parent;
   }

   /**
    * 是否含有指定子节点。
    *
    * @param node 节点
    * @return 是否含有
    */
   public hasChild(node: Node): boolean {
      var id = node.id;
      return (this.children[id] != null);
   }

   /**
    * 获得子总数。
    *
    * @return 子总数
    */
   public get childCount(): number {
      var count = 0;
      var children = this.children;
      for (var id in children) {
         if (children[id]) {
            count++;
         }
      }
      return count;
   }

   /**
    * 分发消息给父节点。
    *
    * @param code 标志代码
    */
   public processParentListener(code: any, event: any) {
      // 当前层执行
      this.dispatchEvent(code, event);
      // 分发所有事件到父对象
      var parents = this.parents;
      if (parents) {
         for (var id in parents) {
            var entity = parents[id];
            entity.processParentListener(code, event);
         }
      }
   }

   /**
    * 增加一个子节点。
    *
    * @param entity 实体
    * @param dispatch 是否分发消息
    */
   public addChild(node: Node, dispatch: boolean = true) {
      AssertUtil.debugTrue(node instanceof Node);
      var entityId = node.id;
      // 检查子存在
      if (!this.children[entityId]) {
         // 设置父子关系
         AssertUtil.debugTrue(node.parents[this.id] == null);
         node.parents[this.id] = this;
         this.children[entityId] = node;
         // 发送消息
         var event = new NodeChildEvent();
         event.parent = this;
         event.child = node;
         this.processParentListener(NodeEventEnum.ChildAdded, event);
         LoggerUtil.debug(this, 'Add child entity. (id={1}, entity={2})', node.id, node);
      }
   }

   // /**
   //  * 增加一个或多个子对象。
   //  *
   //  * @param child 子对象
   //  */
   // public appendChild(child: Node): void {
   //    // 建立子对象集合
   //    var children = this.children;
   //    if (!children) {
   //       children = this.children = new Objects<Node>();
   //    }
   //    // 增加子对象集合
   //    var count = arguments.length;
   //    for (var i = 0; i < count; i++) {
   //       var child = arguments[i] as Node;
   //       if (!children.contains(child)) {
   //          // 发送前置消息
   //          var event = MemoryUtil.alloc(NodeChildEvent) as NodeChildEvent;
   //          event.valid = true;
   //          event.parent = this;
   //          event.child = child;
   //          this.processEventBefore(NodeEventEnum.ChildAppend, event, true);
   //          // 增加处理
   //          if (event.valid) {
   //             child.parent = this;
   //             children.push(child);
   //             LoggerUtil.debug(this, 'Add child node. (parent={1}, child={2})', this, child);
   //             // 发送后置消息
   //             this.processEventAfter(NodeEventEnum.ChildAppend, event, true);
   //          }
   //       }
   //    }
   // }

   /**
    * 更换父节点。
    *
    * @param parent1 旧父节点
    * @param parent2 新父节点
    * @param dispatch 是否分发消息
    */
   public replaceParent(oldParent: Node, newParent: Node, dispatch: boolean = true) {
      // 更换对象
      if (oldParent != newParent) {
         oldParent.removeChildDeep(this, dispatch);
         newParent.addChild(this, dispatch);
      }
      // 发送变更消息
      if (dispatch) {
         var event = new NodeChildEvent();
         event.oldParent = oldParent;
         event.parent = newParent;
         event.child = this;
         this.dispatchEvent(NodeEventEnum.ParentReplaced, event);
      }
      return newParent;
   }

   /**
    * 更换子节点。
    *
    * @param oldChild 旧子节点
    * @param newChild 新子节点
    * @param dispatch 是否分发消息
    */
   public replaceChild(oldChild: Node, newChild: Node, dispatch: boolean = true) {
      // 更换对象
      if (oldChild != newChild) {
         this.removeChildDeep(oldChild, true);
         this.addChild(newChild, true);
      }
      // 发送变更消息
      if (dispatch) {
         var event = new NodeChildEvent();
         event.parent = this;
         event.oldChild = oldChild;
         event.child = newChild;
         this.dispatchEvent(NodeEventEnum.ChildReplaced, event);
      }
      return newChild;
   }

   /**
    * 移除指定子节点，同时移除子节点全部子节点。
    *
    * @param node 节点
    * @param dispatch 是否分发消息
    */
   public removeChildDeep(node: Node, dispatch: boolean = true) {
      AssertUtil.debugTrue(node instanceof Node);
      if (this.children[node.id]) {
         node.removeChildrenDeep(dispatch);
         // 删除父子关系
         AssertUtil.debugTrue(node.parents[this.id] == this);
         delete node.parents[this.id];
         delete this.children[node.id];
         // 发送消息
         var event = new NodeChildEvent();
         event.parent = this;
         event.child = node;
         this.processParentListener(NodeEventEnum.ChildRemoved, event);
         LoggerUtil.debug(this, 'Remove child entity. (id={1}, entity={2})', node.id, node);
      }
   }

   /**
    * 移除全部子节点，同时移除子节点全部子节点。
    *
    * @param dispatch 是否分发消息
    */
   public removeChildrenDeep(dispatch: boolean = true) {
      var children = this.children;
      for (var id in children) {
         var child = children[id];
         child.removeChildrenDeep(dispatch);
         this.removeChildDeep(child, dispatch);
      }
   }

   /**
    * 移除指定子节点，不移除子节点的子节点。
    *
    * @param entity 实体
    * @param dispatch 是否分发消息
    */
   public removeChild(entity: Node, dispatch: boolean = true) {
      AssertUtil.debugTrue(entity instanceof Node);
      if (this.children[entity.id]) {
         // 删除父子关系
         AssertUtil.debugTrue(entity.parents[this.id] == this);
         delete entity.parents[this.id];
         delete this.children[entity.id];
         // 发送消息
         var event = new NodeChildEvent();
         event.parent = this;
         event.child = entity;
         this.processParentListener(NodeEventEnum.ChildRemoved, event);
         LoggerUtil.debug(this, 'Remove child entity self. (id={1}, entity={2})', entity.id, entity);
      }
   }

   // /**
   //  * 移除一个或多个子对象。
   //  *
   //  * @param child 子对象
   //  */
   // public removeChild(child: Node): void {
   //    var children = this.children;
   //    if (children) {
   //       // 移除子对象集合
   //       var count = arguments.length;
   //       for (var i = 0; i < count; i++) {
   //          var child = arguments[i] as Node;
   //          if (children.contains(child)) {
   //             // 发送前置消息
   //             var event = MemoryUtil.alloc(NodeChildEvent) as NodeChildEvent;
   //             event.valid = true;
   //             event.parent = this;
   //             event.child = child;
   //             this.processEventBefore(NodeEventEnum.ChildRemove, event, true);
   //             // 移除处理
   //             if (event.valid) {
   //                child.parent = null;
   //                children.remove(child);
   //                LoggerUtil.debug(this, 'Remove child node. (parent={1}, child={2})', this, child);
   //                // 发送后置消息
   //                this.processEventAfter(NodeEventEnum.ChildRemove, event, true);
   //             }
   //          }
   //       }
   //    }
   // }

   /**
    * 移除全部子节点，不移除子节点的子节点。
    *
    * @param dispatch 是否分发消息
    */
   public removeChildren(dispatch: boolean = true) {
      var children = this.children;
      for (var id in children) {
         var child = children[id];
         this.removeChild(child, dispatch);
      }
   }

   /**
    * 脏处理。
    *
    * @param recursive 递归处理
    */
   public dirty(recursive: boolean = true) {
      // 发送消息
      this.dispatchEvent(NodeEventEnum.NodeDirty, null);
      // 递归处理
      if (recursive) {
         var children = this.children;
         for (var index in children) {
            var child = children[index];
            child.dirty(recursive);
         }
      }
   }

   /**
    * 当前结点和所有父节点脏处理。
    */
   public dirtyParents(recursive: boolean = true) {
      // 发送消息
      this.dispatchEvent(NodeEventEnum.NodeDirty, null);
      // 递归处理
      if (recursive) {
         for (var id in this.parents) {
            var parent = this.parents[id];
            parent.dirtyParents(recursive);
         }
      }
   }



   /**
    * 开始更新处理。
    */
   public beginUpdate() {
      this._disableFieldChanged = true;
   }

   /**
    * 结束更新处理。
    */
   public endUpdate() {
      this._disableFieldChanged = false;
      this.dirty();
   }

   /**
    * 加载设置信息。
    *
    * @param context 环境
    * @param entity 实体
    */
   public loadConfig(context: NodeContext, config: any) {
   }

   /**
    * 保存设置信息。
    *
    * @param context 环境
    * @param config 设置对象
    * @return 信息对象
    */
   public saveConfig(context: NodeContext, config: any): any {
   }

   /**
    * 加载节点的配置信息。
    *
    * @param config 设置
    * @param context 环境
    */
   public load(config: any, context?: NodeContext) {
      // 更新开始
      this.beginUpdate();
      // 加载数据
      var persistentService = ServiceUtil.find(PersistentService) as PersistentService;
      var persistentFactory = persistentService.get(this._persistentCd);
      var result = persistentFactory.loadInstance(context, this, config);
      // 更新完成
      this.endUpdate();
      return result;
   }

   /**
    * 保存节点为配置信息。
    *
    * @param config 设置
    * @param context 环境
    * @return 信息对象
    */
   public save(config?: any, context?: NodeContext): any {
      if (!config) {
         config = new Object();
      }
      var persistentService = ServiceUtil.find(PersistentService) as PersistentService;
      var persistentFactory = persistentService.get(this._persistentCd);
      var result = persistentFactory.saveInstance(context, this, config);
      return result;
   }

   /**
    * 克隆当前对象。
    *
    * @return 对象
    */
   public clone() {
      var entity = new (this as any).constructor();
      var config = this.save();
      entity.load(config);
      return entity;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      // 释放属性
      this.parents = ObjectUtil.dispose(this.parents, true);
      this.children = ObjectUtil.dispose(this.children, true);
      // 父处理
      super.dispose();
   }
}
