import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {Converter} from '../Converter';
import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';

/**
 * JSON属性持久化。
 */
export class ContainerConverter extends Converter {
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
      AssertUtil.debugNotNull(item);
      AssertUtil.debugNotNull(config);
      var service = this.service;
      // 获得描述器集合
      var annotations = factory.findAnnotations(item);
      if (annotations) {
         var count = annotations.count();
         for (var i = 0; i < count; i++) {
            // 加载属性
            var annotation = annotations.at(i);
            var converter = annotation.converter;
            if (converter.isGetter()) {
               converter.load(factory, context, item, config, annotation);
            }
         }
      }
      // 执行加载函数
      if (item.loadConfig) {
         item.loadConfig(context, config);
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
      AssertUtil.debugNotNull(config);
      var service = this.service;
      // 根据描述器存储内容
      var annotations = factory.findAnnotations(item);
      if (annotations) {
         var count = annotations.count();
         for (var i = 0; i < count; i++) {
            // 存储属性
            var annotation = annotations.at(i);
            var converter = annotation.converter;
            if (converter.isSetter()) {
               converter.save(factory, context, item, config, annotation);
            }
         }
      }
      // 执行存储函数
      if (item.saveConfig) {
         item.saveConfig(context, config);
      }
   }
}
