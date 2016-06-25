import {Struct} from './Struct';

//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class Event extends Struct {
   // 代码
   public code: string;
   // 发送者
   public sender: any;
   // 取消
   public cancel: boolean;

   public constructor(sender?: any) {
      super();
      // 构造处理
      this.sender = sender;
   }
}
