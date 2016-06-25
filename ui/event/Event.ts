import {Event as BaseEvent} from '../../common/lang/Event';

//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class Event extends BaseEvent {
   // 句柄
   public handle: string;
   // 来源
   public source: any;
   // 页面事件
   public hEvent: any;
   // 页面来源
   public hSource: any;
   //..........................................................
   // @attribute
   // // @attribute
   // public annotation = null;
   // // @attribute
   // public listener = null;
   // // @attribute
   // public hSender = null;
   // //..........................................................
   // // @method
   // public ohProcess = null;
   // public onProcess = null;
   // // @method
   // public process = null;
}
