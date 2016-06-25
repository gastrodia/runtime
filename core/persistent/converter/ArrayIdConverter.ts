import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';
import {FieldConverter} from './FieldConverter';

/**
 * 数组编号转换器。
 *
 * @param item 内容
 * @param config 设置
 * @param annotation 描述器
 */
export class ArrayIdConverter extends FieldConverter {
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
      var dataName = annotation.dataName;
      var value = config[dataName];
      if (value) {
         AssertUtil.debugTrue(value instanceof Array);
         var name = annotation.name;
         var data = null;
         if (annotation.containerClass) {
            data = new (annotation as any).containerClass();
         } else {
            data = new Array<any>();
         }
         var count = value.length;
         for (var i = 0; i < count; i++) {
            var id = value[i];
            var idValue = context.get(id);
            if (idValue) {
               data[idValue.id] = idValue;
            }
         }
         item[name] = data;
      }
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
      var array = item[name];
      var fieldStorageIdentity = factory.fieldStorageIdentity;
      var data = null;
      for (var id in array) {
         // 创建数组
         if (!data) {
            data = new Array();
         }
         // 存储数据
         var value = array[id];
         if (value) {
            var identity = value[fieldStorageIdentity];
            AssertUtil.debugNotNull(identity);
            data.push(identity);
         }
      }
      if (data) {
         config[dataName] = data;
      }
   }
}
