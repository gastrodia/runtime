import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {DataTypeEnum} from '../../../runtime/common/lang/DataTypeEnum';
import {Types} from '../../../runtime/common/lang/Types';
import {Converter} from './Converter';
import {PersistentFactory} from './PersistentFactory';
import {ArrayIdConverter} from './converter/ArrayIdConverter';
import {ArrayIdGuidConverter} from './converter/ArrayIdGuidConverter';
import {ObjectIdConverter} from './converter/ObjectIdConverter';

/**
 * 实体环境。
 */
export class PersistentGraphContext<T>{
   // 实体集合
   public nodes: Array<T>;

   /**
    * 构造处理。
    */
   public constructor() {
      this.nodes = new Array<T>();
   }

   /**
    * 根据编号判断是否存在。
    *
    * @param key 编号
    * @return 是否存在
    */
   public constains(key: string): boolean {
      return this.nodes[key] != null;
   }

   /**
    * 根据编号获得内容。
    *
    * @param key 编号
    * @return 内容
    */
   public get(key: string): T {
      AssertUtil.debugNotEmpty(key);
      var value = this.nodes[key];
      return value;
   }

   /**
    * 根据编号设置内容。
    *
    * @param key 编号
    * @param value 内容
    */
   public set(key: string, value: any): void {
      AssertUtil.debugNotEmpty(key);
      var oldValue = this.nodes[key];
      if (oldValue) {
         AssertUtil.debugNull(oldValue == value);
      } else {
         this.nodes[key] = value;
      }
   }
}

/**
 * 持久化工厂。
 */
export class PersistentGraphFactory extends PersistentFactory {
   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
   }

   /**
    * 存储设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   protected innerFilter(items: Types<any>, item: any) {
      // 检查当前对象
      if (item == null) {
         return;
      }
      if (items.indexOf(item) != -1) {
         return;
      }
      // 增加对象
      items.push(item);
      // 获得描述
      var annotations = this.findAnnotations(item);
      if (annotations) {
         var count = annotations.count();
         for (var j = 0; j < count; j++) {
            var annotation = annotations.at(j);
            var dataConverter = annotation.dataConverter as any;
            if (annotation.dataCd == DataTypeEnum.Object) {
               if (dataConverter == ObjectIdConverter) {
                  // 查找对象集合
                  var child = item[annotation.name];
                  if (child) {
                     this.innerFilter(items, child);
                  }
               }
            } else if (annotation.dataCd == DataTypeEnum.Array) {
               var children = item[annotation.name];
               if (dataConverter == ArrayIdConverter) {
                  // 查找数组集合
                  if (children) {
                     for (var id in children) {
                        var child = children[id];
                        this.innerFilter(items, child);
                     }
                  }
               } else if (dataConverter == ArrayIdGuidConverter) {
                  // 查找数组集合
                  if (children) {
                     for (var id in children) {
                        var child = children[id];
                        this.innerFilter(items, child);
                     }
                  }
                  // } else {
                  //    // 查找数组集合
                  //    if (Array.isArray(children)) {
                  //       var childCount = children.length;
                  //       for (var i = 0; i < childCount; i++) {
                  //          var child = children[i];
                  //          this.innerFilter(items, child);
                  //       }
                  //    } else {
                  //       for (var id in children) {
                  //          var child = children[id];
                  //          this.innerFilter(items, child);
                  //       }
                  //    }
               }
            }
         }
      }
   }

   /**
    * 加载设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public load(context: any, item: any, config: any): any {
      AssertUtil.debugNotNull(config);
      // 加载信息
      if (item && !Array.isArray(item)) {
         this.persistent.load(this, context, item, config);
      }
      // 加载集合信息
      var newItems = new Object();
      if (Array.isArray(config)) {
         var count = config.length as number;
         for (var i = 0; i < count; i++) {
            var itemConfig = config[i];
            var className = itemConfig[this.fieldClassName];
            AssertUtil.debugNotNull(className);
            var identity = itemConfig[this.fieldStorageIdentity];
            AssertUtil.debugNotNull(identity);
            // 创建实体
            var newItem = this.createInstance(className);
            context.set(identity, newItem);
            newItems[identity] = newItem;
         }
         // 加载实体信息
         for (var i = 0; i < count; i++) {
            var itemConfig = config[i];
            var identity = itemConfig[this.fieldStorageIdentity];
            var newItem = newItems[identity];
            if (newItem) {
               this.loadInstance(context, newItem, itemConfig);
            }
         }
      }
   }

   /**
    * 存储设置信息。
    *
    * @param item 对象
    * @param config 设置对象
    */
   public save(context: any, item: any, config?: any): any {
      // 加载信息
      if (!config) {
         config = new Object();
      }
      if (!Array.isArray(config)) {
         this.persistent.save(this, context, item, config);
      }
      // 过滤实体集合
      var items = new Types<any>();
      this.innerFilter(items, item);
      // 保存项目集合
      var count = items.length;
      for (var i = 0; i < count; i++) {
         var findItem = items[i];
         var className = this.findClassName(findItem);
         if (className) {
            var itemConfig = new Object() as any;
            itemConfig[this.fieldClassName] = className;
            itemConfig[this.fieldVersion] = this.version;
            this.saveInstance(context, findItem, itemConfig);
            config.push(itemConfig);
         }
      }
      return config;
   }
}
