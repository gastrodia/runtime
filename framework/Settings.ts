import {Size2} from '../math/Size2';

//==========================================================
// <T>设置信息。</T>
//==========================================================
export class Settings {
   // 窗口
   public hWindow: Window;
   // 文档
   public hDocument: HTMLDocument;
   // 面板
   public hPanel: HTMLBodyElement;
   // 尺寸
   public size: Size2 = new Size2();
}
