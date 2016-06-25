import {UnitLengthEnum} from '../../../ui/UnitLengthEnum';
import {UnitUtil} from '../../../ui/util/UnitUtil';
import {Converter} from '../Converter';
import {PersistentAnnotation} from '../PersistentAnnotation';
import {PersistentFactory} from '../PersistentFactory';

/**
 * 长度单位转换器。
 */
export class UnitLengthConverter extends Converter {
   /** 单位类型 */
   public unitCd: UnitLengthEnum;

   /**
    * 构造处理。
    */
   public constructor(unitCd: UnitLengthEnum) {
      super();
      // 设置属性
      this.unitCd = unitCd;
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
      var name = annotation.name;
      var dataName = annotation.dataName;
      var value = config[dataName];
      var loadValue = null;
      if (value == null) {
         loadValue = annotation.dataDefault;
      } else {
         loadValue = UnitUtil.convert(factory.lengthUnitCd, this.unitCd, value);
      }
      item[name] = loadValue;
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
         config[dataName] = UnitUtil.convert(this.unitCd, factory.lengthUnitCd, value);
      }
   }
}
