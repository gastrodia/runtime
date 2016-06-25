import {HtmlUtil} from '../util/HtmlUtil';
import {Event} from './Event';

//==========================================================
// <T>改变大小事件信息类。</T>
//
// @struct
// @author maocy
// @version 150213
//==========================================================
export class ResizeEvent extends Event {
   // @attribute
   public width = null;
   public height = null;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param p:event:HtmlEvent 页面事件
   //==========================================================
   public attachEvent(p) {
      var hs = this.hSource = HtmlUtil.eventSource(p);
      if(hs){
        this.source = hs.__linker;
      }
   }
}
