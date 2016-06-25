import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {MathUtil} from '../../../../runtime/math/MathUtil';
import {Converter} from '../Converter';
import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';

/**
 * 对象持久化。
 */
export class ObjectConverter extends Converter {

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
      AssertUtil.debugNotNull(factory);
      AssertUtil.debugNotNull(item);
      AssertUtil.debugNotNull(config);
      AssertUtil.debugNotNull(annotation);
      var service = this.service;
      var name = annotation.name;
      var dataName = annotation.dataName;
      var value = item[name];
      var valueConfig = config[dataName];
      // 实例化内容
      if (valueConfig == null) {
         return;
      } else if (value == null) {
         var className = valueConfig[factory.fieldClassName];
         if (className) {
            value = item[name] = factory.createInstance(className);
         } else {
            return;
         }
      }
      AssertUtil.debugNotNull(value);
      AssertUtil.debugNotNull(valueConfig);
      // 设置识别
      if (context.set) {
         var identity = valueConfig[factory.fieldIdentity];
         if (!identity) {
            identity = MathUtil.makeGuid();
         }
         if (identity) {
            context.set(identity, value);
         }
      }
      // 获得描述器集合
      var annotations = factory.findAnnotations(value);
      if (annotations) {
         var count = annotations.count();
         for (var i = 0; i < count; i++) {
            // 加载属性
            var annotation = annotations.at(i);
            var converter = annotation.converter;
            converter.load(factory, context, value, valueConfig, annotation);
         }
      }
      // 执行加载函数
      if (value.loadConfig) {
         value.loadConfig(context, valueConfig);
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
      var name = annotation.name;
      var dataName = annotation.dataName;
      var value = item[name];
      // 设置类名
      var itemConfig = config[dataName] = new Object();
      itemConfig[factory.fieldClassName] = factory.findClassName(value);
      itemConfig[factory.fieldVersion] = factory.version;
      // 根据描述器存储内容
      var annotations = factory.findAnnotations(value);
      if (annotations) {
         var count = annotations.count();
         for (var i = 0; i < count; i++) {
            // 存储属性
            var annotation = annotations.at(i);
            var converter = annotation.converter;
            converter.save(factory, context, value, itemConfig, annotation);
         }
      }
      // 执行存储函数
      if (value.saveConfig) {
         value.saveConfig(context, itemConfig);
      }
   }
}
