import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';
import {FieldConverter} from './FieldConverter';

/**
 * 数组字段转换器。
 *
 * @param item 内容
 * @param config 设置
 * @param annotation 描述器
 */
export class MapConverter extends FieldConverter {
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
      // 获得数组
      var name = annotation.name;
      var array = item[name] as Array<any>;
      if (!array) {
         array = item[name] = new Array<any>();
      } else {
         AssertUtil.debugTrue(array instanceof Array);
      }
      // 获得定义
      var dataName = annotation.dataName;
      var values = config[dataName];
      // 加载数据
      if (values) {
         AssertUtil.debugTrue(values instanceof Array);
         var count = values.length;
         for (var i = 0; i < count; i++) {
            var value = values[i];
            var instance = factory.create(context, value);
            array.push(instance);
         }
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
      // 获得数组
      var name = annotation.name;
      var array = item[name] as Array<any>;
      // 获得定义
      var dataName = annotation.dataName;
      var values = new Array<any>();
      // 加载数据
      if (array) {
         AssertUtil.debugTrue(array instanceof Array);
         var count = array.length;
         for (var i = 0; i < count; i++) {
            var item = array[i];
            var value = factory.save(context, item);
            values.push(value);
         }
      }
      config[dataName] = values;
   }
}
