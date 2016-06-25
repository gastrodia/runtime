import {Event} from './Event';

//==========================================================
// <T>访问事件。</T>
//
// @author maocy
// @version 150113
//==========================================================
export class AccessEvent extends Event {
   // 字段
   public name: string;
   // 旧值
   public oldValue: any;
   // 内容
   public newValue: any;
   // 结果
   public result: boolean;
}
