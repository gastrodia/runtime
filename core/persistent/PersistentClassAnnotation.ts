import {Annotation} from '../../../runtime/common/reflect/Annotation';
import {AnnotationEnum} from '../../../runtime/common/reflect/AnnotationEnum';

/**
 * 持久化描述类。
 * 
 * @author maocy
 * @version 160426
 */
export class PersistentClassAnnotation extends Annotation {
   // 数据名称
   public dataName: string;

   /**
    * 构造处理。
    * 
    * @param name 名称
    */
   public constructor(dataName?: string) {
      super(dataName);
      // 设置属性
      this._annotationCd = AnnotationEnum.PersistentClass;
      // 设置数据名称
      this.dataName = dataName;
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
