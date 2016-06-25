import {Annotation} from './Annotation';
import {AnnotationEnum} from './AnnotationEnum';

//============================================================
// <T>定义描述类。</T>
//
// @author maocy
// @version 160505
//============================================================
export class DefineAnnotation extends Annotation {
   // 数据名称
   public dataName: string;
   // 数据名称
   public dataValue: any;

   //============================================================
   // <T>构造处理。</T>
   //
   // @param name 名称
   //============================================================
   public constructor(name?: string, dataName?: string, dataValue?: any) {
      super(name);
      // 设置属性
      this._annotationCd = AnnotationEnum.Define;
      this._inherit = true;
      // 设置数据名称
      this.dataName = dataName;
      this.dataValue = dataValue;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @return String 代码
   //============================================================
   public get code(): string {
      return this.dataName;
   }
}
