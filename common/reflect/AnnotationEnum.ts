//===========================================================
// <T>描述器类型枚举。<T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
export class AnnotationEnum {
   // @attribute 定义
   public static Define = 'define';
   // @attribute 构造
   public static Constructor = 'constructor';
   // @attribute 释放
   public static Dispose = 'dispose';
   // @attribute 代码
   public static Source = 'source';
   // @attribute 字段
   public static Field = 'field';
   // @attribute 属性
   public static Property = 'property';
   // @attribute 持久化类
   public static PersistentClass = 'persistent.class';
   // @attribute 持久化
   public static Persistent = 'persistent';
   // @attribute 日志
   public static Logger = 'logger';
   // @attribute 插件
   public static Plugin = 'plugin';
   // @attribute 枚举v
   public static Enum = 'enum';
   // @attribute 事件
   public static Event = 'event';
   // @attribute 关联对象
   public static Linker = 'linker';
   // @attribute 式
   public static Style = 'style';
   // @attribute 式图标
   public static StyleIcon = 'icon';
}
