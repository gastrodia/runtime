/**
 * 实体事件枚举。
 */
export class NodeEventEnum {
   // public static ChildAdded: string = 'node.child.added';
   // public static ChildRemoved: string = 'node.child.removed';
   // public static ChildReplaced: string = 'node.child.replaced';
   // public static ParentReplaced: string = 'node.parent.replaced';
   // public static FlagChanged: string = 'node.flag.changed';
   // public static FieldChanged: string = 'node.field.changed';
   // public static NodeDirty: string = 'node.dirty';
   // TODO: 数据未统一，上层监听问题
   public static ChildAdded: string = 'entity.child.added';
   public static ChildRemoved: string = 'entity.child.removed';
   public static ChildReplaced: string = 'entity.child.replaced';
   public static ParentReplaced: string = 'entity.parent.replaced';
   public static FlagChanged: string = 'entity.flag.changed';
   public static FieldChanged: string = 'entity.field.changed';
   public static EntityDirty: string = 'entity.dirty';
   public static NodeDirty: string = 'entity.dirty';
}
