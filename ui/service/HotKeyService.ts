import {ListenerContext} from '../../common/lang/ListenerContext';
import {Objects} from '../../common/lang/Objects';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../../core/Service';
import {KeyboardEvent} from '../event/KeyboardEvent';
import {Hotkey} from './Hotkey';
import {HotkeyContext} from './HotkeyContext';
import {KeyboardService} from './KeyboardService';

/**
 * 热键服务。
 */
export class HotkeyService extends Service {
   // 热键集合
   public hotkeys: Objects<Hotkey>;
   // 环境
   protected _context: HotkeyContext;
   // 热键服务
   @Linker(KeyboardService)
   protected _keyboardService: KeyboardService;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      var context = this._context = new HotkeyContext();
      this.hotkeys = new Objects<Hotkey>();
      // 注册键盘事件
      var keyboardService = this._keyboardService;
      keyboardService.keyDownListeners.register(this, this.onKeyDown);
      context.keyboardService = keyboardService;
   }

   /**
    * 注册一个热键。
    *
    * @param hotkey 热键
    */
   public register(hotkey: Hotkey) {
      hotkey.setup();
      this.hotkeys.push(hotkey);
   }

   /**
    * 注销一个热键。
    *
    * @param hotkey 热键
    */
   public unregister(hotkey: Hotkey) {
      this.hotkeys.remove(hotkey);
   }

   /**
    * 按键点击处理。
    *
    * @param sender 发送者
    * @param event 事件
    */
   public onKeyDown(sender: ListenerContext, event: KeyboardEvent) {
      // 设置环境
      var context = this._context;
      context.altKey = event.altKey;
      context.shiftKey = event.shiftKey;
      context.ctrlKey = event.ctrlKey;
      context.keyCode = event.keyCode;
      // 热键处理
      var hotkeys = this.hotkeys;
      var count = hotkeys.count();
      for (let i = 0; i < count; i++) {
         var hotkey = hotkeys.at(i);
         if (hotkey.metch(context)) {
            hotkey.process();
         }
      }
   }
}
