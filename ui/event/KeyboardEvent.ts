import {Event} from './Event';

//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class KeyboardEvent extends Event {
   //..........................................................
   // @attribute
   public altKey = false;
   public shiftKey = false;
   public ctrlKey = false;
   public keyCode = 0;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param p:event:HtmlEvent 页面事件
   //==========================================================
   public attachEvent(p) {
      this.altKey = p.altKey;
      this.shiftKey = p.shiftKey;
      this.ctrlKey = p.ctrlKey;
      this.keyCode = p.keyCode;
   }

   //==========================================================
   // <T>取消处理。</T>
   //
   // @method
   //==========================================================
   public cancelKeyCode() {
      this.hEvent.returnValue = false;
   }
}
