import {EnumUtil} from '../../common/lang/EnumUtil';
import {KeyCodeEnum} from '../KeyCodeEnum';
import {Hotkey} from './Hotkey';
import {HotkeyContext} from './HotkeyContext';

/**
 * 触发热键。
 */
export class TriggerHotkey extends Hotkey {
   // Alt按键状态
   protected _altKey: boolean;
   // Shift按键状态
   protected _shiftKey: boolean;
   // Ctrl按键状态
   protected _ctrlKey: boolean;
   // 按键代码
   protected _keyCodes: Array<number>;
   // 按键字符串
   public key: string;
   // 回调处理
   public callback: Function;
   // 范围
   public scope: any;

   /**
    * 构造处理。
    *
    * @param key 按键
    * @param callback 回调
    * @param scope 范围
    */
   public constructor(key: string, callback: Function, scope?: any) {
      super();
      // 设置属性
      this._altKey = false;
      this._shiftKey = false;
      this._ctrlKey = false;
      this._keyCodes = new Array<number>();
      // 设置变量
      this.key = key;
      this.callback = callback;
      this.scope = scope;
   }

   /**
    * 配置处理。
    */
   public setup() {
      var items = this.key.split('+');
      var count = items.length;
      for (var i = 0; i < count; i++) {
         var item = items[i];
         if (item == 'alt') {
            this._altKey = true;
         } if (item == 'shift') {
            this._shiftKey = true;
         } else if (item == 'ctrl') {
            this._ctrlKey = true;
         } else {
            var keyCode = EnumUtil.encode(KeyCodeEnum, item.toLowerCase());
            this._keyCodes.push(keyCode);
         }
      }
   }

   /**
    * 匹配热键是否可以执行。
    *
    * @param context 环境
    * @return 是否匹配
    */
   public metch(context: HotkeyContext): boolean {
      if (this._altKey != context.altKey) {
         return false;
      }
      if (this._shiftKey != context.shiftKey) {
         return false;
      }
      if (this._ctrlKey != context.ctrlKey) {
         return false;
      }
      var keyCodes = this._keyCodes;
      var count = keyCodes.length;
      for (var i = 0; i < count; i++) {
         var keyCode = keyCodes[i];
         if (!context.isKeyPress(keyCode)) {
            return false;
         }
      }
      return true;
   }

   /**
    * 逻辑处理。
    */
   public process() {
      this.callback.call(this.scope);
   }
}
