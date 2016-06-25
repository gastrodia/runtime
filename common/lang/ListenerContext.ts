import {Struct} from '../lang/Struct';

//==========================================================
// <T>监听环境。</T>
//
// @struct
// @author maocy
// @version 160306
//==========================================================
export class ListenerContext extends Struct {
   // 发送者
   public sender: any = null;
   // 拥有者
   public owner: any = null;
   // 属性集合
   public attributes: Array<any> = null;
   // 参数集合
   public parameters: Array<any> = null;
   // 回调函数
   public callback: Function = null;

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public process() {
      var data = [this];
      var parameters = this.parameters;
      if (parameters) {
         var count: number = parameters.length;
         for (var n: number = 0; n < count; n++) {
            data.push(parameters[n]);
         }
      }
      this.callback.apply(this.owner, data);
   }
}
