import {DataTypeEnum} from '../lang/DataTypeEnum';
import {StringUtil} from '../lang/StringUtil';
import {Annotation} from './Annotation';
import {AnnotationEnum} from './AnnotationEnum';

//============================================================
// <T>字段描述类。</T>
//
// @author maocy
// @version 160426
//============================================================
export class FieldAnnotation extends Annotation {
   // 数据名称
   public dataName: string;
   // 数据类型
   public dataCd: DataTypeEnum;
   // 数据对象
   public dataClass: Function;
   // 数据默认
   public dataDefault: any;

   //============================================================
   // <T>构造处理。</T>
   //
   // @param name 名称
   //============================================================
   public constructor(name?: string, dataName?: String, dataCd?: DataTypeEnum, dataClass?: any, dataDefault?: any) {
      super(name);
      // 设置属性
      this._annotationCd = AnnotationEnum.Field;
      this._inherit = true;
      // 设置数据名称
      var code = null;
      if (dataName == null) {
         if (StringUtil.startsWith(name, '_')) {
            code = name.substring(1);
         } else {
            code = name;
         }
         code = StringUtil.toUnderline(code);
      } else {
         code = dataName;
      }
      this.dataName = code;
      this.dataCd = dataCd;
      this.dataClass = dataClass;
      this.dataDefault = dataDefault;
   }

   //============================================================
   // <T>获得代码。</T>
   //
   // @return String 代码
   //============================================================
   public get code(): string {
      return this.name;
   }
}
