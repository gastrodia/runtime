//==========================================================
// <T>浏览器环境信息。</T>
//
// @class
// @author maocy
// @history 150316
//==========================================================
export class BrowserCapability {
   //..........................................................
   // @attribute Boolean 支持进程
   public optionProcess: boolean = false;
   // @attribute Boolean 支持存储
   public optionStorage: boolean = false;
   // @attribute Boolean 支持画板缩放
   public canvasScale: boolean = true;
   // @attribute Boolean 支持声音确认
   public soundConfirm: boolean = false;
   // @attribute Boolean 支持声音完成检测
   public soundFinish: boolean = true;
   // @attribute Boolean 支持创建二进制
   public blobCreate: boolean = false;
   // @attribute Integer 像素比率
   public pixelRatio: number = 1;
}
