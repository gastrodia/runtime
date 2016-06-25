import {DataTypeEnum} from '../../../runtime/common/lang/DataTypeEnum';
import {Annotation} from '../../../runtime/common/reflect/Annotation';
import {AnnotationEnum} from '../../../runtime/common/reflect/AnnotationEnum';
import {Converter} from './Converter';

/**
 * 持久化描述类。
 *
 * @author maocy
 * @version 160426
 */
export class PersistentAnnotation extends Annotation {
   // 数据名称
   public dataName: string;
   // 数据类型
   public dataCd: DataTypeEnum;
   // 数据默认
   public dataDefault: any;
   // 容器对象
   public containerClass: Function;
   // 数据对象
   public dataClass: Function;
   // 数据转换器
   public dataConverter: Function | Converter;
   // 转换器
   public converter: Converter;

   /**
    * 构造处理。
    *
    * @param name 名称
    * @param dataConverter 数据转换器
    */
   public constructor(name?: string, dataConverter?: any, containerType?: any) {
      super(name);
      // 设置属性
      this._annotationCd = AnnotationEnum.Persistent;
      this._inherit = true;
      // 设置数据名称
      this.dataConverter = dataConverter;
      this.containerClass = containerType;
   }

   /**
    * 获得代码。
    *
    * @return 代码
    */
   public get code(): string {
      return this.name;
   }

   /**
    * 接收处理。
    *
    * @param annotation 描述器
    */
   public assign(annotation: PersistentAnnotation) {
      super.assign(annotation);
      this.dataName = annotation.dataName;
      this.dataCd = annotation.dataCd;
      this.dataDefault = annotation.dataDefault;
      this.dataClass = annotation.dataClass;
      this.dataConverter = annotation.dataConverter;
      this.containerClass = annotation.containerClass;
   }
}
