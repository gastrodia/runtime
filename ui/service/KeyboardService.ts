import {Listeners} from '../../common/lang/Listeners';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../../core/Service';
import {EventEnum} from '../EventEnum';
import {KeyStatusEnum} from '../KeyStatusEnum';
import {KeyboardEvent} from '../event/KeyboardEvent';
import {DeviceService} from './DeviceService';

//===========================================================
// <T>键盘管理器。</T>
//===========================================================
export class KeyboardService extends Service {
   // 状态集合
   protected _status: Array<KeyStatusEnum>;
   // 监听器集合
   protected _eventKey: KeyboardEvent;
   protected _keyDownListeners: Listeners;
   protected _keyUpListeners: Listeners;
   protected _keyPressListeners: Listeners;
   // 设备控制台
   @Linker(DeviceService)
   protected _deviceConsole: DeviceService;

   //===========================================================
   // <T>构造处理。</T>
   //
   // @enum
   // @author maocy
   // @version 150203
   //===========================================================
   public constructor() {
      super();
      // 设置属性
      this._status = new Array<KeyStatusEnum>();
      this._eventKey = new KeyboardEvent();
      this._keyDownListeners = new Listeners();
      this._keyUpListeners = new Listeners();
      this._keyPressListeners = new Listeners();
      // 设置状态
      var status = this._status = new Array();
      for (var i: number = 0; i < 256; i++) {
         status[i] = KeyStatusEnum.Normal;
      }
   }

   //===========================================================
   // <T>获得按键落下监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get keyDownListeners(): Listeners {
      return this._keyDownListeners;
   }

   //===========================================================
   // <T>获得按键抬起监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get keyUpListeners(): Listeners {
      return this._keyUpListeners;
   }

   //===========================================================
   // <T>获得按键监听器。</T>
   //
   // @return 监听器
   //===========================================================
   public get keyPressListeners(): Listeners {
      return this._keyPressListeners;
   }

   //==========================================================
   // <T>初始化处理。</T>
   //==========================================================
   public initialize() {
      var deviceConsole = this._deviceConsole;
      var hContainer = deviceConsole.htmlContainer;
      hContainer._keyboardConsole = this;
      // 关联键盘事件
      var supportHtml5 = deviceConsole.supportHtml5();
      if (supportHtml5) {
         hContainer.addEventListener('keydown', this.ohKeyDown, true);
         hContainer.addEventListener('keyup', this.ohKeyUp, true);
         hContainer.addEventListener('keypress', this.ohKeyPress, true);
      } else {
         hContainer.onkeydown = this.ohKeyDown;
         hContainer.onkeyup = this.ohKeyUp;
         hContainer.onkeypress = this.ohKeyPress;
      }
   }

   //==========================================================
   // <T>键盘按下处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohKeyDown(hEvent) {
      var linker: KeyboardService = (this as any)._keyboardConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventKey;
      event.code = EventEnum.KeyDown;
      event.attachEvent(hEvent);
      linker.onKeyDown(linker, event);
   }

   //==========================================================
   // <T>键盘抬起处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohKeyUp(hEvent) {
      var linker: KeyboardService = (this as any)._keyboardConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventKey;
      event.code = EventEnum.KeyUp;
      event.attachEvent(hEvent);
      linker.onKeyUp(linker, event);
   }

   //==========================================================
   // <T>键盘点击处理。</T>
   //
   // @param hEvent 事件
   //==========================================================
   public ohKeyPress(hEvent) {
      var linker: KeyboardService = (this as any)._keyboardConsole;
      // 获得事件
      var hFindEvent = null;
      if (!hEvent) {
         hFindEvent = linker._deviceConsole.findEvent(hEvent);
      } else {
         hFindEvent = hEvent;
      }
      // 事件处理
      var event = linker._eventKey;
      event.code = EventEnum.KeyPress;
      event.attachEvent(hEvent);
      linker.onKeyPress(linker, event);
   }

   //===========================================================
   // <T>按键落下处理。</T>
   //
   // @param event 事件
   //===========================================================
   public onKeyDown(sender, event) {
      // 设置状态
      var keyCode = event.keyCode;
      this._status[keyCode] = KeyStatusEnum.Press;
      // 处理事件
      this._keyDownListeners.process(event);
   }

   //===========================================================
   // <T>按键抬起处理。</T>
   //
   // @param event 事件
   //===========================================================
   public onKeyUp(sender, event) {
      // 设置状态
      var keyCode = event.keyCode;
      this._status[keyCode] = KeyStatusEnum.Normal;
      // 处理事件
      this._keyUpListeners.process(event);
   }

   //===========================================================
   // <T>按键抬起处理。</T>
   //
   // @param event 事件
   //===========================================================
   public onKeyPress(sender, event) {
      // 处理事件
      this._keyPressListeners.process(event);
   }

   //===========================================================
   // <T>判断按键是否按下。</T>
   //
   // @method
   // @param keyCode:Integer 按键代码
   // @return Boolean 是否按下
   //===========================================================
   public isKeyPress(keyCode:number): boolean {
      var status = this._status[keyCode];
      return status == KeyStatusEnum.Press;
   }

   // //===========================================================
   // // <T>判断按键是否控制键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isControlKey(p) {
   //    var s = EKeyCode.ControlKeys;
   //    for (var i = s.length - 1; i >= 0; i--) {
   //       if (s[i] == p) {
   //          return true;
   //       }
   //    }
   //    return false;
   // }

   // //===========================================================
   // // <T>判断按键是否整数键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isIntegerKey(c) {
   //    return EKeyCode.integerCodes[c];
   // }

   // //===========================================================
   // // <T>判断按键是否浮点数键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isFloatKey(c) {
   //    return EKeyCode.floatCodes[c];
   // }

   // //===========================================================
   // // <T>判断按键是否数字键。</T>
   // //
   // // @method
   // // @param p:keyCode:Integer 按键代码
   // // @return Boolean 是否
   // //===========================================================
   // public isNumKey(c) {
   //    if (p >= 96 && p <= 105) {
   //       return true;
   //    }
   //    return false;
   // }

   // //===========================================================
   // // <T>修正按键字符大小写。</T>
   // //
   // // @method
   // // @param e:event:SEvent 事件
   // // @param c:case:ECharCase 大小写类型
   // // @return String 修正后的字符
   // //===========================================================
   // public fixCase(e, c) {
   //    if (e && c) {
   //       var k = e.keyCode;
   //       if (ECase.Upper == c) {
   //          k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
   //       } else if (ECase.Lower == c) {
   //          k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
   //       }
   //       e.keyCode = k;
   //    }
   // }

   // //===========================================================
   // // <T>修正按键字符在样式内。</T>
   // //
   // // @method
   // // @param e:event:SEvent 事件
   // // @param c:case:ECharCase 大小写类型
   // // @return String 修正后的字符
   // //===========================================================
   // public fixPattern(e, p) {
   //    if (p) {
   //       var k = e.keyCode;
   //       if (!this.isControlKeyPress(k)) {
   //          if (!MO.Lang.String.isPattern(String.fromCharCode(k), p)) {
   //             e.keyCode = 0;
   //             return false;
   //          }
   //       }
   //    }
   //    return true;
   // }

   // //===========================================================
   // // <T>修正按键字符在样式内。</T>
   // //
   // // @method
   // // @param e:event:SEvent 事件
   // // @param c:case:ECharCase 大小写类型
   // // @return String 修正后的字符
   // //===========================================================
   // public fixChars(e, p) {
   //    if (p) {
   //       var k = e.keyCode;
   //       if (this.isNumKey(k)) {
   //          k = e.keyCode = e.keyCode - 48;
   //       }
   //       if (!this.isControlKeyPress(k)) {
   //          if (!MO.Lang.String.inChars(String.fromCharCode(k), p)) {
   //             e.keyCode = 0;
   //             e.returnValue = false;
   //             return false;
   //          }
   //       }
   //    }
   //    return true;
   // }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放属性
      this._keyDownListeners = ObjectUtil.dispose(this._keyDownListeners);
      this._keyUpListeners = ObjectUtil.dispose(this._keyUpListeners);
      this._keyPressListeners = ObjectUtil.dispose(this._keyPressListeners);
      // 父处理
      super.dispose();
   }
}
