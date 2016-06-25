import {AssertUtil} from '../../../../runtime/common/AssertUtil';
import {PersistentAccessEnum} from '../PersistentAccessEnum';
import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';
import {FieldConverter} from './FieldConverter';

/**
 * 对象编号转换器。
 *
 * @param item 内容
 * @param config 设置
 * @param annotation 描述器
 */
export class ObjectIdConverter extends FieldConverter {

   /**
    * 构造处理。
    */
   public constructor(accessCd: PersistentAccessEnum = PersistentAccessEnum.GetSet) {
      super(accessCd);
   }

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
         var name = annotation.name;
         item[name] = context.get(value);
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
      var value = item[name];
      if (value) {
         var identity = value[factory.fieldStorageIdentity];
         AssertUtil.debugNotNull(identity);
         config[dataName] = identity;
      }
   }
}
