import {ObjectBase} from '../common/lang/ObjectBase';

/**
 * 页面元素钩子。
 */
export class EventHook extends ObjectBase {
   // 编号计数器
   public static IdCounter: number = 0;

   public static EVENT_TYPES = [
      "click", "dblclick", "drag", "hover",
      "mousedown", "mousemove", "mouseout", "mouseover", "mouseup",
      "touchcancel", "touchend", "touchmove", "touchstart"
   ];

   public id: number;

   public owner: any;

   public element: HTMLElement;

   public statusActive: boolean;

   public click: any;

   public mouseOver: any;

   public mouseOut: any;

   public mouseDown: any;

   public mouseMove: any;

   public mouseUp: any;

   public dragStart: any;

   public dragMove: any;

   public dragEnd: any;
   // 临时句柄
   protected _handleClick: any;
   protected _handleMouseOver: any;
   protected _handleMouseOut: any;
   protected _handleMouseDown: any;
   protected _handleMouseMove: any;
   protected _handleMouseUp: any;
   // 拖拽标志(拖拽中忽略一次点击)
   protected _dragMoved: boolean;

   /**
    * 构造处理。
    *
    * @param owner 拥有者
    * @param element 页面元素
    */
   public constructor(owner: any, element: any) {
      super();
      // 设置属性
      this.id = ++EventHook.IdCounter;
      this.statusActive = true;
      this.owner = owner;
      this.element = element;
   }

   /**
    * 配置处理。
    */
   public setup() {
      var self = this;
      var element = this.element;
      // 设置监听
      if (this.click) {
         var handle = this._handleClick = function (event) {
            self.onClick(event);
         };
         element.addEventListener('click', handle);
      }
      if (this.mouseOver) {
         var handle = this._handleMouseOver = function (event) {
            self.onMouseOver(event);
         };
         element.addEventListener('mouseover', handle);
      }
      if (this.mouseOut) {
         var handle = this._handleMouseOut = function (event) {
            self.onMouseOut(event);
         };
         element.addEventListener('mouseout', handle);
      }
      if (this.mouseDown) {
         var handle = this._handleMouseDown = function (event) {
            self.onMouseDown(event);
         };
         element.addEventListener('mousedown', handle);
      }
      if (this.mouseMove) {
         var handle = this._handleMouseMove = function (event) {
            self.onMouseMove(event);
         };
         element.addEventListener('mousemove', handle);
      }
      if (this.mouseUp) {
         var handle = this._handleMouseUp = function (event) {
            self.onMouseUp(event);
         };
         element.addEventListener('mouseup', handle);
      }
      // if (this.dragStart || this.dragMove || this.dragEnd) {
      //    element.drag(this.onDragMove, this.onDragStart, this.onDragEnd, this, this, this);
      // }
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
    * 鼠标进入事件处理。
    *
    * @param event 事件信息
    * @param x X坐标
    * @param y Y坐标
    */
   protected onClick(event: MouseEvent) {
      var invoker = this.click;
      if (invoker && this.statusActive) {
         invoker.call(this.owner, event, event.x, event.y);
      }
   }

   /**
    * 鼠标进入事件处理。
    *
    * @param event 事件信息
    * @param x X坐标
    * @param y Y坐标
    */
   protected onMouseOver(event: MouseEvent) {
      var invoker = this.mouseOver;
      if (invoker && this.statusActive) {
         invoker.call(this.owner, event, event.x, event.y);
      }
   }

   /**
    * 鼠标离开事件处理。
    *
    * @param event 事件信息
    * @param x X坐标
    * @param y Y坐标
    */
   protected onMouseOut(event: MouseEvent) {
      var invoker = this.mouseOut;
      if (invoker && this.statusActive) {
         invoker.call(this.owner, event, event.x, event.y);
      }
   }

   /**
    * 鼠标落下事件处理。
    *
    * @param event 事件信息
    * @param x X坐标
    * @param y Y坐标
    */
   protected onMouseDown(event: MouseEvent) {
      var invoker = this.mouseDown;
      if (invoker && this.statusActive) {
         invoker.call(this.owner, event, event.x, event.y);
      }
   }

   /**
    * 鼠标移动事件处理。
    *
    * @param event 事件信息
    * @param x X坐标
    * @param y Y坐标
    */
   protected onMouseMove(event: MouseEvent) {
      var invoker = this.mouseMove;
      if (invoker && this.statusActive) {
         invoker.call(this.owner, event, event.x, event.y);
      }
   }

   /**
    * 鼠标抬起事件处理。
    *
    * @param event 事件信息
    * @param x X坐标
    * @param y Y坐标
    */
   protected onMouseUp(event: MouseEvent) {
      var invoker = this.mouseUp;
      if (invoker && this.statusActive) {
         invoker.call(this.owner, event, event.x, event.y);
      }
   }

   /**
    * 鼠标拖拽开始处理。
    *
    * @param x X坐标
    * @param y Y坐标
    * @param event 事件信息
    */
   protected onDragStart(x: number, y: number, event: MouseEvent) {
      var invoker = this.dragStart;
      if (invoker && this.statusActive) {
         this._dragMoved = false;
         invoker.call(this.owner, event, x, y);
      }
   }

   /**
    * 鼠标拖拽处理。
    *
    * @param cx X距离
    * @param cy Y距离
    * @param x X坐标
    * @param y Y坐标
    * @param event 事件信息
    */
   protected onDragMove(cx: number, cy: number, x: number, y: number, event: MouseEvent) {
      var invoker = this.dragMove;
      if (invoker && this.statusActive) {
         if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
            this._dragMoved = true;
         }
         invoker.call(this.owner, event, cx, cy, x, y);
      }
   }

   /**
    * 鼠标拖拽结束处理。
    *
    * @param event 事件信息
    */
   protected onDragEnd(event: MouseEvent) {
      var invoker = this.dragEnd;
      if (invoker && this.statusActive) {
         invoker.call(this.owner, event);
      }
   }

   /**
    * 清空处理。
    */
   public clear() {
      var element = this.element;
      if (this.click) {
         element.removeEventListener('click', this._handleClick);
         this._handleClick = null;
      }
      if (this.mouseOver) {
         element.removeEventListener('mouseover', this._handleMouseOver);
         this._handleMouseOver = null;
      }
      if (this.mouseOut) {
         element.removeEventListener('mouseout', this._handleMouseOut);
         this._handleMouseOut = null;
      }
      if (this.mouseDown) {
         element.removeEventListener('mousedown', this._handleMouseDown);
         this._handleMouseDown = null;
      }
      if (this.mouseMove) {
         element.removeEventListener('mousemove', this._handleMouseMove);
         this._handleMouseMove = null;
      }
      if (this.mouseUp) {
         element.removeEventListener('mouseup', this._handleMouseUp);
         this._handleMouseUp = null;
      }
      if (this.dragStart || this.dragMove || this.dragEnd) {
         // element.undrag();
      }
   }

   /**
    * 释放当前实例。
    */
   public dispose(): void {
      this.clear();
      // 父处理
      super.dispose();
   }
}
