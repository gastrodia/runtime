import {KeyboardService} from './KeyboardService';

/**
 * 热键环境。
 */
export class HotkeyContext {
   // 按键服务
   public keyboardService: KeyboardService;
   // Alt按键状态
   public altKey: boolean;
   // Shift按键状态
   public shiftKey: boolean;
   // Ctrl按键状态
   public ctrlKey: boolean;
   // 按键代码
   public keyCode: number;

   /**
    * 测试按键是否被按下。
    *
    * @param keyCode 按键代码
    * @return 是否按下
    */
   public isKeyPress(keyCode: number) {
      return this.keyboardService.isKeyPress(keyCode);
   }
}
