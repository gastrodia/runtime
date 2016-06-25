import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {Dictionary} from '../../../runtime/common/lang/Dictionary';
import {LoggerUtil} from '../../../runtime/common/lang/LoggerUtil';
import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {AnnotationEnum} from '../../../runtime/common/reflect/AnnotationEnum';
import {ClassFactory} from '../../../runtime/common/reflect/ClassFactory';
import {ClassUtil} from '../../../runtime/common/reflect/ClassUtil';
import {FieldAnnotation} from '../../../runtime/common/reflect/FieldAnnotation';
import {UnitAreaEnum} from '../../ui/UnitAreaEnum';
import {UnitLengthEnum} from '../../ui/UnitLengthEnum';
import {Converter} from './Converter';
import {PersistentAnnotation} from './PersistentAnnotation';
import {PersistentClassAnnotation} from './PersistentClassAnnotation';
import {PersistentService} from './PersistentService';
import {Transfer} from './Transfer';

/**
 * 持久化工厂。
 */
export class PersistentFactory extends ObjectBase {
   // 持久化服务
   public service: PersistentService;
   // 当前版本
   public version: number;
   // 字段类名
   public fieldClassName: string;
   // 字段版本
   public fieldVersion: string;
   // 字段编号
   public fieldIdentity: string;
   // 字段存储编号
   public fieldStorageIdentity: string;
   // 存储长度单位
   public lengthUnitCd: UnitLengthEnum;
   // 存储面积单位
   public areaUnitCd: UnitAreaEnum;
   // 类工厂
   public factory: ClassFactory;
   // 传输器
   public transfer: Transfer;
   // 持久器
   public persistent: Converter;
   // 描述器集合
   public annotationss: Dictionary<Dictionary<PersistentAnnotation>>;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.fieldClassName = 'class';
      this.fieldVersion = 'version';
      this.fieldIdentity = 'id';
      this.fieldStorageIdentity = 'guid';
      this.lengthUnitCd = UnitLengthEnum.meter;
      this.areaUnitCd = UnitAreaEnum.meter;
      this.version = 1;
      this.factory = new ClassFactory();
      this.annotationss = new Dictionary<Dictionary<PersistentAnnotation>>();
   }

   /**
    * 加载设置信息。
    */
   public setup() {
      AssertUtil.debugNotNull(this.service);
      AssertUtil.debugNotNull(this.factory);
      AssertUtil.debugNotNull(this.persistent);
   }

   /**
    * 注册类对象。
    *
    * @param clazz 类对象
    * @param className 类名称
    */
   public registerClass(type: Function, className?: string) {
      AssertUtil.debugNotNull(type);
      var factory = this.factory;
      // 获得描述器
      var clazz = ClassUtil.get(type);
      AssertUtil.debugNotNull(clazz);
      if (className) {
         factory.register(className, type);
      } else {
         var annotation = clazz.getAnnotation(AnnotationEnum.PersistentClass) as PersistentClassAnnotation;
         factory.register(annotation.dataName, type);
      }
   }

   /**
    * 根据实例查找类名称。
    *
    * @param instance 实例
    * @return 类名称
    */
   public findClassName(instance: any): string {
      AssertUtil.debugNotNull(instance);
      var factory = this.factory;
      // 获得类型
      var type = factory.find(instance);
      if (type) {
         // 获得描述器
         var name = factory.findName(type);
         if (!name) {
            var clazz = ClassUtil.get(type);
            AssertUtil.debugNotNull(clazz);
            var annotation = clazz.getAnnotation(AnnotationEnum.PersistentClass) as PersistentClassAnnotation;
            name = annotation.dataName;
         }
         return name;
      } else {
         LoggerUtil.warn(this, 'Unknown factory class. (instance={1})', instance);
      }
      return null;
   }

   /**
    * 根据类名创建实例。
    *
    * @param className 类名称
    * @return 实例
    */
   public hasRegister(className: string): any {
      AssertUtil.debugNotNull(className);
      // 创建对象
      var result = this.factory.hasRegister(className);
      return result;
   }

   /**
    * 根据类名创建实例。
    *
    * @param className 类名称
    * @return 实例
    */
   public createInstance(className: string, context?: any, config?: any): any {
      AssertUtil.debugNotNull(className);
      // 创建对象
      var instance = this.factory.create(className);
      if (instance) {
         // 加载配置
         if (config) {
            this.load(context, instance, config);
         }
      }
      return instance;
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public findAnnotations(instance: any): Dictionary<PersistentAnnotation> {
      var service = this.service;
      AssertUtil.debugNotNull(instance);
      var clazz = instance.constructor;
      var className = ClassUtil.fullName(clazz);
      // 查找描述器集合
      var annotationss = this.annotationss;
      var annotations = annotationss.get(className);
      if (annotations) {
         return annotations;
      }
      annotations = new Dictionary<PersistentAnnotation>();
      // 根据描述器存储内容
      var instanceClass = ClassUtil.get(instance.constructor);
      var fieldAnnotations = instanceClass.findAnnotations(AnnotationEnum.Field);
      var persistenceAnnotations = instanceClass.findAnnotations(AnnotationEnum.Persistent);
      if (persistenceAnnotations) {
         var count = persistenceAnnotations.count();
         for (var i = 0; i < count; i++) {
            var annotation = new PersistentAnnotation();
            // 存储属性
            var persistenceAnnotation = persistenceAnnotations.at(i) as PersistentAnnotation;
            var code = persistenceAnnotation.code;
            annotation.assign(persistenceAnnotation);
            // 查找属性定义
            if (fieldAnnotations) {
               var fieldAnnotation = fieldAnnotations.get(code) as FieldAnnotation;
               if (fieldAnnotation) {
                  // 设置属性信息
                  if (!annotation.dataName) {
                     annotation.dataName = fieldAnnotation.dataName;
                  }
                  if (!annotation.dataCd) {
                     annotation.dataCd = fieldAnnotation.dataCd;
                  }
                  if (!annotation.dataClass) {
                     annotation.dataClass = fieldAnnotation.dataClass;
                  }
                  if (!annotation.dataDefault) {
                     annotation.dataDefault = fieldAnnotation.dataDefault;
                  }
               }
            }
            // 设置转换器
            var dataConverter = annotation.dataConverter;
            if (dataConverter) {
               if (!ClassUtil.isFunction(annotation.dataConverter)) {
                  annotation.converter = dataConverter as Converter;
               }
            }
            if (!annotation.converter) {
               annotation.converter = service.getConverter(annotation.dataCd, dataConverter as Function);
            }
            AssertUtil.debugNotNull(annotation.converter);
            // 存储描述器
            annotations.set(code, annotation);
         }
      }
      // 存储描述器集合
      annotationss.set(className, annotations);
      return annotations;
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public create(context: any, config: any): any {
      // 检查参数
      if (!config) {
         return null;
      }
      // 数组处理
      if (Array.isArray(config)) {
         // 创建数组
         var instances = new Array<any>();
         var count = config.length;
         for (var i = 0; i < count; i++) {
            var configItem = config[i];
            // 创建实例
            var className = configItem[this.fieldClassName];
            var storageIdentity = configItem[this.fieldStorageIdentity];
            var instance = this.createInstance(className);
            this.persistent.load(this, context, instance, configItem);
            AssertUtil.debugNotEmpty(storageIdentity);
            instances[storageIdentity] = instance;
         }
         return instances;
      } else {
         // 创建实例
         var className = config[this.fieldClassName];
         var instance = this.createInstance(className);
         this.persistent.load(this, context, instance, config);
         return instance;
      }
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public loadInstance(context: any, item: any, config: any): any {
      AssertUtil.debugNotNull(item);
      AssertUtil.debugNotNull(config);
      // 获得描述器集合
      return this.persistent.load(this, context, item, config);
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public load(context: any, item: any, config: any): any {
      return this.loadInstance(context, item, config);
   }

   /**
    * 存储设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public saveInstance(context: any, item: any, config?: any): any {
      AssertUtil.debugNotNull(item);
      config = config || new Object();
      // 设置类型
      config[this.fieldClassName] = this.findClassName(item);
      config[this.fieldVersion] = 1;
      // 获得描述器集合
      this.persistent.save(this, context, item, config);
      return config;
   }

   /**
    * 存储设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public save(context: any, item: any, config?: any): any {
      return this.saveInstance(context, item, config);
   }
}
