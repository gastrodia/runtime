import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {PersistentAccessEnum} from './PersistentAccessEnum';
import {PersistentAnnotation} from './PersistentAnnotation';
import {PersistentFactory} from './PersistentFactory';
import {PersistentService} from './PersistentService';

/**
 * 持久化器。
 */
export class Converter extends ObjectBase {
   // 服务
   public service: PersistentService;
   // 权限类型
   public accessCd: PersistentAccessEnum;

   /**
    * 构造处理。
    */
   public constructor(accessCd: PersistentAccessEnum = PersistentAccessEnum.GetSet) {
      super();
      // 设置属性
      this.accessCd = accessCd;
   }

   /**
    * 是否可以获取数据。
    *
    * @return 是否可以
    */
   public isGetter(): boolean {
      return this.accessCd == PersistentAccessEnum.Getter || this.accessCd == PersistentAccessEnum.GetSet;
   }

   /**
    * 是否设置获取数据。
    *
    * @return 是否可以
    */
   public isSetter(): boolean {
      return this.accessCd == PersistentAccessEnum.Setter || this.accessCd == PersistentAccessEnum.GetSet;
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
   }
}
