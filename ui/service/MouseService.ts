import {Listeners} from '../../common/lang/Listeners';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../../core/Service';
import {EventEnum} from '../EventEnum';
import {MouseEvent} from '../event/MouseEvent';
import {DeviceService} from './DeviceService';

/**
 * 鼠标服务。
 *
 * @author maocy
 * @version 150203
 */
export class MouseService extends Service {
   /** 鼠标事件 */
   protected _eventMouse: MouseEvent;
   /** 鼠标单击监听器 */
   protected _clickListeners: Listeners;
   /** 鼠标双击监听器 */
   protected _doubleClickListeners: Listeners;
   /** 鼠标落下监听器 */
   protected _mouseDownListeners: Listeners;
   /** 鼠标移动监听器 */
   protected _mouseMoveListeners: Listeners;
   /** 鼠标抬起监听器 */
   protected _mouseUpListeners: Listeners;
   /** 鼠标进入监听器 */
   protected _mouseEnterListeners: Listeners;
   /** 鼠标离开监听器 */
   protected _mouseLeaveListeners: Listeners;
   /** 鼠标滚动监听器 */
   protected _mouseWheelListeners: Listeners;
   /** 设备服务 */
   @Linker(DeviceService)
   protected _deviceConsole: DeviceService;

   //protected _activeCapture = null;
   //protected _captures = null;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Local;
      // 设置属性
      this._eventMouse = new MouseEvent();
      this._clickListeners = new Listeners();
      this._doubleClickListeners = new Listeners();
      this._mouseDownListeners = new Listeners();
      this._mouseMoveListeners = new Listeners();
      this._mouseUpListeners = new Listeners();
      this._mouseEnterListeners = new Listeners();
      this._mouseLeaveListeners = new Listeners();
      this._mouseWheelListeners = new Listeners();
      //o._captures = new TObjects();
      // 注册事件
      //RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      //RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      //RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }

   /**
    * 获得鼠标单击监听器。
    *
    * @return 监听器
    */
   public get clickListeners(): Listeners {
      return this._clickListeners;
   }

   /**
    * 获得鼠标双击监听器。
    *
    * @return 监听器
    */
   public get doubleClickListeners(): Listeners {
      return this._doubleClickListeners;
   }

   /**
    * 获得鼠标落下监听器。
    *
    * @return 监听器
    */
   public get mouseDownListeners(): Listeners {
      return this._mouseDownListeners;
   }

   /**
    * 获得鼠标移动监听器。
    *
    * @return 监听器
    */
   public get mouseMoveListeners(): Listeners {
      return this._mouseMoveListeners;
   }

   /**
    * 获得鼠标抬起监听器。
    *
    * @return 监听器
    */
   public get mouseUpListeners(): Listeners {
      return this._mouseUpListeners;
   }

   /**
    * 获得鼠标进入监听器。
    *
    * @return 监听器
    */
   public get mouseEnterListeners(): Listeners {
      return this._mouseEnterListeners;
   }

   /**
    * 获得鼠标离开监听器。
    *
    * @return 监听器
    */
   public get mouseLeaveListeners(): Listeners {
      return this._mouseLeaveListeners;
   }

   /**
    * 获得鼠标滚动监听器。
    *
    * @return 监听器
    */
   public get mouseWheelListeners(): Listeners {
      return this._mouseWheelListeners;
   }

   /**
    * 初始化处理。
    */
   public initialize() {
      var deviceConsole = this._deviceConsole;
      var hContainer = deviceConsole.htmlContainer;
      hContainer._mouseConsole = this;
      // 关联鼠标事件
      var supportHtml5 = deviceConsole.supportHtml5();
      if (supportHtml5) {
         hContainer.addEventListener('click', this.ohClick, true);
         hContainer.addEventListener('dblclick', this.ohDoubleClick, true);
         hContainer.addEventListener('mousedown', this.ohMouseDown, true);
         hContainer.addEventListener('mousemove', this.ohMouseMove, true);
         hContainer.addEventListener('mouseup', this.ohMouseUp, true);
         hContainer.addEventListener('mouseenter', this.ohMouseEnter, true);
         hContainer.addEventListener('mouseleave', this.ohMouseLeave, true);
         hContainer.addEventListener('mousewheel', this.ohMouseWheel, true);
      } else {
         hContainer.onclick = this.ohClick;
         hContainer.ondblclick = this.ohDoubleClick;
         hContainer.onmousedown = this.ohMouseDown;
         hContainer.onmousemove = this.ohMouseMove;
         hContainer.onmouseup = this.ohMouseUp;
         hContainer.onmouseenter = this.ohMouseEnter;
         hContainer.onmouseleave = this.ohMouseLeave;
         hContainer.onmousewheel = this.ohMouseWheel;
      }
   }

   /**
    * 鼠标单击处理。
    *
    * @param hEvent 事件
    */
   public ohClick(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.Click;
      event.attachEvent(hEvent);
      linker.onClick(linker, event);
   }

   /**
    * 鼠标双击处理。
    *
    * @param hEvent 事件
    */
   public ohDoubleClick(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.DoubleClick;
      event.attachEvent(hEvent);
      linker.onDoubleClick(linker, event);
   }

   /**
    * 鼠标按下处理。
    *
    * @param hEvent 事件
    */
   public ohMouseDown(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.MouseDown;
      event.attachEvent(hEvent);
      linker.onMouseDown(linker, event);
   }

   /**
    * 鼠标移动处理。
    *
    * @param hEvent 事件
    */
   public ohMouseMove(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.MouseMove;
      event.attachEvent(hEvent);
      linker.onMouseMove(linker, event);
   }

   /**
    * 鼠标抬起处理。
    *
    * @param hEvent 事件
    */
   public ohMouseUp(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.MouseUp;
      event.attachEvent(hEvent);
      linker.onMouseUp(linker, event);
   }

   /**
    * 鼠标进入处理。
    *
    * @param hEvent 事件
    */
   public ohMouseEnter(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.MouseEnter;
      event.attachEvent(hEvent);
      linker.onMouseEnter(linker, event);
   }

   /**
    * 鼠标离开处理。
    *
    * @param hEvent 事件
    */
   public ohMouseLeave(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.MouseLeave;
      event.attachEvent(hEvent);
      linker.onMouseLeave(linker, event);
   }

   /**
    * 鼠标滚动处理。
    *
    * @param hEvent 事件
    */
   public ohMouseWheel(hEvent) {
      var linker: MouseService = (this as any)._mouseConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventMouse;
      event.code = EventEnum.MouseWheel;
      event.attachEvent(hEvent);
      linker.onMouseWheel(linker, event);
   }

   /**
    * 鼠标单击处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onClick(sender: any, event: MouseEvent) {
      this._clickListeners.process(event);
   }

   /**
    * 鼠标双击处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onDoubleClick(sender: any, event: MouseEvent) {
      this._doubleClickListeners.process(event);
   }

   /**
    * 鼠标按下处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onMouseDown(sender: any, event: MouseEvent) {
      // 检查来源
      //var linker = RHtml.searchLinker(event.hSource, MO.MMouseCapture);
      //var linker = null;
      //if (!linker) {
      //   return;
      //}
      // 检查测试
      //if (!linker.testMouseCapture()) {
      //   return;
      //}
      // 捕捉开始处理
      //this._activeCapture = linker;
      //this.captureStart(event);
      // 处理事件
      this._mouseDownListeners.process(event);
   }

   /**
    * 鼠标移动处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onMouseMove(sender: any, event: MouseEvent) {
      // 检查拖拽处理
      //if (!this._activeCapture) {
      //   return;
      //}
      // 拖拽处理
      //this.capture(event);
      // 处理事件
      this._mouseMoveListeners.process(event);
   }

   /**
    * 鼠标抬起处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onMouseUp(sender: any, event: MouseEvent) {
      // 检查拖拽处理
      //if (!this._activeCapture) {
      //   return;
      //}
      // 捕捉结束处理
      //this.captureStop(event);
      // 处理事件
      this._mouseUpListeners.process(event);
   }

   /**
    * 鼠标进入处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onMouseEnter(sender: any, event: MouseEvent) {
      this._mouseEnterListeners.process(event);
   }

   /**
    * 鼠标离开处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onMouseLeave(sender: any, event: MouseEvent) {
      this._mouseLeaveListeners.process(event);
   }

   /**
    * 鼠标抬起处理。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public onMouseWheel(sender: any, event: MouseEvent) {
      // 检查拖拽处理
      // if (!this._activeCapture) {
      //    return;
      // }
      // 捕捉结束处理
      // this.captureStop(p);
      // 处理事件
      this._mouseWheelListeners.process(event);
   }

   /**
    * 禁止菜单处理。
    *
    * @param hEvent 事件信息
    */
   public onDisableContextMenu(hEvent: any) {
      var event = hEvent || window.event;
      event.cancelBubble = true;
      event.returnvalue = false;
      return false;
   }

   protected _contextMenuStatus: boolean = true;
   protected _contextMenu: any;

   /**
    * 设置环境菜单属性。
    *
    * @param sender 发送者
    * @param event 事件信息
    */
   public setContextMenuEnable(value: boolean) {
      if (this._contextMenuStatus == value) {
         if (value) {
            document.oncontextmenu = this._contextMenu;
            this._contextMenu = null;
         } else {
            this._contextMenu = document.oncontextmenu;
            document.oncontextmenu = this.onDisableContextMenu;
         }
      }
      this._contextMenuStatus = value;
   }

   // //==========================================================
   // // <T>捕捉开始处理。</T>
   // //
   // // @method
   // // @param p:event:htmlEvent 事件
   // //==========================================================
   // public captureStart(p) {
   //    var capture = this._activeCapture;
   //    if (capture) {
   //       // RWindow.setOptionSelect(false);
   //       capture.onMouseCaptureStart(p);
   //    }
   // }

   // //==========================================================
   // // <T>捕捉处理。</T>
   // //
   // // @method
   // // @param p:event:htmlEvent 事件
   // //==========================================================
   // public capture(p) {
   //    var capture = this._activeCapture;
   //    if (capture) {
   //       if (capture.testMouseCapture()) {
   //          capture.onMouseCapture(p);
   //       } else {
   //          this.captureStop(p)
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>捕捉结束处理。</T>
   // //
   // // @method
   // // @param p:event:htmlEvent 事件
   // //==========================================================
   // public captureStop(p) {
   //    var capture = this._activeCapture;
   //    if (capture) {
   //       capture.onMouseCaptureStop(p);
   //       this._activeCapture = null;
   //    }
   //    // RWindow.setOptionSelect(true);
   // }

   //==========================================================
   // <T>注册一个鼠标捕捉对象。</T>
   //
   // @method
   // @param p:capture:MMouseCapture 鼠标捕捉
   //==========================================================
   // public register(p) {
   //    //this._captures.push(p);
   // }

   // //==========================================================
   // // <T>注销一个鼠标捕捉对象。</T>
   // //
   // // @method
   // // @param p:capture:MMouseCapture 鼠标捕捉
   // //==========================================================
   // public unregister(p) {
   //    //this._captures.remove(p);
   // }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   // public clear() {
   //    //this._captures.clear();
   // }

   /**
    * 释放处理。
    */
   public dispose() {
      // 释放属性
      this._eventMouse = ObjectUtil.dispose(this._eventMouse);
      this._clickListeners = ObjectUtil.dispose(this._clickListeners);
      this._doubleClickListeners = ObjectUtil.dispose(this._doubleClickListeners);
      this._mouseDownListeners = ObjectUtil.dispose(this._mouseDownListeners);
      this._mouseMoveListeners = ObjectUtil.dispose(this._mouseMoveListeners);
      this._mouseUpListeners = ObjectUtil.dispose(this._mouseUpListeners);
      this._mouseEnterListeners = ObjectUtil.dispose(this._mouseEnterListeners);
      this._mouseLeaveListeners = ObjectUtil.dispose(this._mouseLeaveListeners);
      this._mouseWheelListeners = ObjectUtil.dispose(this._mouseWheelListeners);
      // 父处理
      super.dispose();
   }
}
