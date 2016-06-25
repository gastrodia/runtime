import {DataTypeEnum} from '../../../../runtime/common/lang/DataTypeEnum';
import {FloatUtil} from '../../../../runtime/common/lang/FloatUtil';
import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';
import {FieldConverter} from './FieldConverter';

/**
 * 浮点数转换器。
 */
export class FloatConverter extends FieldConverter {
   /**
    * 加载设置信息。
    *
    * @param factory 工厂
    * @param context 环境
    * @param item 内容
    * @param config 设置
    * @param annotation 描述器
    */
   public load(factory: PersistentFactory, context: any, item: any, config: any, annotation?: PersistentAnnotation) {
      var name = annotation.name;
      var dataName = annotation.dataName;
      var value = config[dataName];
      if (value == null) {
         value = annotation.dataDefault;
         if (value == null) {
            value = 0;
         }
      }
      item[name] = value;
   }

   /**
    * 存储设置信息。
    *
    * @param factory 工厂
    * @param context 环境
    * @param item 内容
    * @param config 设置
    * @param annotation 描述器
    */
   public save(factory: PersistentFactory, context: any, item: any, config: any, annotation?: PersistentAnnotation) {
      var name = annotation.name;
      var dataName = annotation.dataName;
      var value = item[name];
      if (value != null) {
         var saveValue = parseFloat(value);
         switch (annotation.dataCd) {
            case DataTypeEnum.Float16:
               saveValue = FloatUtil.round(saveValue, 4);
               break;
            case DataTypeEnum.Float32:
               saveValue = FloatUtil.round(saveValue, 6);
               break;
            case DataTypeEnum.Float64:
               saveValue = FloatUtil.round(saveValue, 12);
               break;
         }
         // if (saveValue != 0) {
         config[dataName] = saveValue;
         // }
      }
   }
}
