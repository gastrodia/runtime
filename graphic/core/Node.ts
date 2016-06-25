import {Dispatcher} from '../../../runtime/common/lang/Dispatcher';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {AssertUtil} from '../../common/AssertUtil';
import {ListenerContext} from '../../common/lang/ListenerContext';
import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {Field} from '../../common/reflect/Field';
import {ServiceUtil} from '../../core/ServiceUtil';
import {Persistent} from '../../core/persistent/Persistent';
import {PersistentService} from '../../core/persistent/PersistentService';
import {NodeChildEvent} from '../../framework/brep/NodeChildEvent';
import {NodeContext} from '../../framework/brep/NodeContext';
import {NodeEventEnum} from '../../framework/brep/NodeEventEnum';
import {NodeFieldEvent} from '../../framework/brep/NodeFieldEvent';
import {MathUtil} from '../../math/MathUtil';

/**
 * 节点对象集合。
 */
type NodeChildrenType = {
   [key: string]: Node
};

/**
 * 节点。
 *
 * @author maocy
 * @history 160529
 */
export class Node extends Dispatcher {
   // 编号计数器
   public static IdCounter: number = 0;
   // 编号
   public id: number;
   // 唯一编码
   public guid: string;
   // 代码
   public name: string;
   // 标签
   public label: string;
   // 父对象
   public parent: Node;
   // 子节点集合
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
      this.children = new Object() as NodeChildrenType;
      this._disableFieldChanged = false;
   }

   /**
    * 配置处理。
    */
   public setup() {
   }
   /**
    * 字段变更处理。
    *
    * @param sender 发送者
    * @param event 事件
    */
   public onFieldChanged(sender: ListenerContext, event: NodeFieldEvent) {
      // event.content = this;
      this.dispatchEvent(NodeEventEnum.FieldChanged, event);
   }

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
         var parent = current.parent;
         if (!parent) {
            break;
         }
         current = parent;
      }
      return current;
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
    * 根据名称查找显示对象。
    *
    * @param name 名称
    * @return 子节点
    */
   public findByName(name: string): Node {
      var children = this.children;
      if (children) {
         for (var id in children) {
            var child = children[id];
            if (child.name == name) {
               return child;
            }
         }
      }
      return null
   }

   /**
    * 根据名称搜索子节点。
    *
    * @param name 名称
    * @return 子节点
    */
   public searchByName(name: string): Node {
      var children = this.children;
      if (children) {
         for (var id in children) {
            var child = children[id];
            // 判断当前节点
            if (child.name == name) {
               return child;
            }
            // 判断子节点集合
            var finded = child.searchByName(name);
            if (finded) {
               return finded;
            }
         }
      }
      return null;
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
      var parent = this.parent;
      if (parent) {
         parent.processParentListener(code, event);
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
         AssertUtil.debugTrue(node.parent == null);
         node.parent = this;
         this.children[entityId] = node;
         // 发送消息
         var event = new NodeChildEvent();
         event.parent = this;
         event.child = node;
         this.processParentListener(NodeEventEnum.ChildAdded, event);
         LoggerUtil.debug(this, 'Add child entity. (id={1}, entity={2})', node.id, node);
      }
   }

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
         AssertUtil.debugTrue(node.parent == this);
         node.parent = null;
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
         AssertUtil.debugTrue(entity.parent == this);
         entity.parent = null;
         delete this.children[entity.id];
         // 发送消息
         var event = new NodeChildEvent();
         event.parent = this;
         event.child = entity;
         this.processParentListener(NodeEventEnum.ChildRemoved, event);
         LoggerUtil.debug(this, 'Remove child entity self. (id={1}, entity={2})', entity.id, entity);
      }
   }

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
         var parent = this.parent;
         parent.dirtyParents(recursive);
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
      this.parent = null;
      this.children = ObjectUtil.dispose(this.children);
      // 父处理
      super.dispose();
   }
}
