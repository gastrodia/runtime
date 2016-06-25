import {MouseButtonEnum} from '../MouseButtonEnum';
import {Event} from './Event';

//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class MouseEvent extends Event {
   public sourceElement;
   public targetElement;
   public button;
   public mouseLeft;
   public mouseMiddle;
   public mouseRight;
   public altKey;
   public ctrlKey;
   public x = 0;
   public y = 0;
   public offsetX = 0;
   public offsetY = 0;
   public clientX = 0;
   public clientY = 0;
   public deltaX = 0;
   public deltaY = 0;
   public deltaZ = 0;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param event:HtmlEvent 页面事件
   //==========================================================
   public attachEvent(hEvent) {
      if (!hEvent) {
         hEvent = window.event;
      }
      this.sourceElement = hEvent.srcElement;
      this.targetElement = hEvent.currentTarget;
      //var hEvent = this.hSource = RHtml.eventSource(hEvent);
      //if (hEvent) {
      //this.source = hEvent.__linker;
      //}
      this.button = hEvent.button;
      this.mouseLeft = (hEvent.button == MouseButtonEnum.Left);
      this.mouseMiddle = (hEvent.button == MouseButtonEnum.Middle);
      this.mouseRight = (hEvent.button == MouseButtonEnum.Right);
      this.altKey = hEvent.altKey;
      this.ctrlKey = hEvent.ctrlKey;
      //if (MO.RBrowser.isBrowser(MO.EBrowser.FireFox)) {
      // this.x = hEvent.pageX;
      // this.y = hEvent.pageY;
      // this.offsetX = hEvent.layerX;
      // this.offsetY = hEvent.layerY;
      //} else {
      this.x = hEvent.x;
      this.y = hEvent.y;
      this.offsetX = hEvent.offsetX;
      this.offsetY = hEvent.offsetY;
      //}
      this.clientX = hEvent.clientX;
      this.clientY = hEvent.clientY;
      this.deltaX = hEvent.deltaX;
      this.deltaY = hEvent.deltaY;
      this.deltaZ = hEvent.deltaZ;
   }
}
