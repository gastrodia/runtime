import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';
import {FieldConverter} from './FieldConverter';

/**
 * 整数转换器。
 */
export class IntegerConverter extends FieldConverter {
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
         var saveValue = parseInt(value);
         //if (saveValue != 0) {
         config[dataName] = saveValue;
         //}
      }
   }
}
