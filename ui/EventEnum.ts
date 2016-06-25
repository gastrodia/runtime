//==========================================================
// <T>事件枚举。</T>
//
// @enum(Integer)
// @author maocy
// @version 150130
//==========================================================
export class EventEnum {
   // @attribute 未知
   public static Unknown = 'Unknown';
   // @attribute 加载
   public static Load = 'Load';
   // @attribute 加载完成
   public static Loaded = 'Loaded';
   // @attribute 处理
   public static Process = 'Process';
   // @attribute 完成
   public static Complete = 'Complete';
   // @attribute 改变
   public static Change = 'Change';
   // @attribute 进入帧
   public static EnterFrame = 'EnterFrame';
   // @attribute 离开帧
   public static LeaveFrame = 'LeaveFrame';
   // @attribute 获得热点
   public static Enter = 'Enter';
   // @attribute 失去热点
   public static Leave = 'Leave';
   // @attribute 改变大小
   public static Resize = 'Reisze';
   // @attribute 获得焦点
   public static Focus = 'Focus';
   // @attribute 失去焦点
   public static Blur = 'Blur';
   // @attribute 鼠标落下
   public static MouseDown = 'MouseDown';
   // @attribute 鼠标移动
   public static MouseMove = 'MouseMove';
   // @attribute 鼠标抬起
   public static MouseUp = 'MouseUp';
   // @attribute 鼠标进入
   public static MouseEnter = 'MouseEnter';
   // @attribute 鼠标离开
   public static MouseLeave = 'MouseLeave';
   // @attribute 鼠标卷动
   public static MouseWheel = 'MouseWheel';
   // @attribute 按键落下
   public static KeyDown = 'KeyDown';
   // @attribute 按键点击
   public static KeyPress = 'KeyPress';
   // @attribute 按键落下
   public static KeyUp = 'KeyUp';
   // @attribute 点击
   public static Click = 'Click';
   // @attribute 双击
   public static DoubleClick = 'DoubleClick';
   // @attribute 节点点击
   public static NodeClick = 'NodeClick';
   // @attribute 项目点击
   public static ItemClick = 'ItemClick';
   // @attribute 选择
   public static Selected = 'Selected';
   // @attribute 数据改变
   public static DataChanged = 'DataChanged';
   // @attribute 结果确认
   public static Result = 'Result';
   // @attribute 触摸缩放
   public static TouchZoom = 'TouchZoom';
   // @attribute 可见性
   public static Visibility = 'Visibility';
   // @attribute 屏幕缩放
   public static Orientation = 'Orientation';
   // @attribute 操作落下
   public static OperationDown = 'OperationDown';
   // @attribute 操作移动
   public static OperationMove = 'OperationMove';
   // @attribute 操作抬起
   public static OperationUp = 'OperationUp';
   // @attribute 动画开始
   public static ActionStart = 'ActionStart';
   // @attribute 动画停止
   public static ActionStop = 'ActionStop';
   // @attribute 动画停止
   public static SectionStop = 'SectionStop';
}
