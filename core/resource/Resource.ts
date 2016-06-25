import {ResourceObject} from './ResourceObject';

//==========================================================
// <T>资源对象。</T>
//
// @class
// @author maocy
// @version 150721
//==========================================================
export class Resource extends ResourceObject {
   // 类型代码
   public typeCode: string;
   // 版本号
   public version: number;
   // 准备好
   public ready: boolean;

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   public testReady() {
      return this.ready;
   }

   //==========================================================
   // <T>加载内容。</T>
   //
   // @param content 内容
   //==========================================================
   public loadContent(content: any): void {
   }
}
