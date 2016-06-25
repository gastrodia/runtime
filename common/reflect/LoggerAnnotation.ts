import {Annotation} from './Annotation';
import {AnnotationEnum} from './AnnotationEnum';

//============================================================
// <T>日志描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @author maocy
// @version 141231
//============================================================
export class LoggerAnnotation extends Annotation {
   // 数据名称
   protected _count: number;
   // 数据名称
   protected _successCount: number;
   // 回调处理
   protected _callback: Function;

   //============================================================
   // <T>构造处理。</T>
   //
   // @param name 名称
   //============================================================
   public constructor(name: string, callback: Function) {
      super(name);
      // 设置选项
      this._count = 0;
      this._successCount = 0;
      this._annotationCd = AnnotationEnum.Logger;
      this._callback = callback;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @return String 代码
   //============================================================
   public invoke(instance: any, parameters: Array<any>): void {
      var result: any = null;
      this._count++;
      // 日志前处理
      console.log('Call ' + name + ' being.');
      // 调用处理
      result = this._callback.apply(instance, parameters);
      // 日志后处理
      console.log('Call ' + name + ' end.');
      this._successCount++;
      return result;
   }
}
