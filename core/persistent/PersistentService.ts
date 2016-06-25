import {AssertUtil} from '../../common/AssertUtil';
import {DataTypeEnum} from '../../common/lang/DataTypeEnum';
import {Dictionary} from '../../common/lang/Dictionary';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Service} from '../Service';
import {Converter} from './Converter';
import {PersistentFactory} from './PersistentFactory';
import {Transfer} from './Transfer';
import {ArrayConverter} from './converter/ArrayConverter';
import {BooleanConverter} from './converter/BooleanConverter';
import {ContainerConverter} from './converter/ContainerConverter';
import {FieldConverter} from './converter/FieldConverter';
import {FloatConverter} from './converter/FloatConverter';
import {IntegerConverter} from './converter/IntegerConverter';
import {MapConverter} from './converter/MapConverter';
import {ObjectConverter} from './converter/ObjectConverter';
import {SetConverter} from './converter/SetConverter';
import {StringConverter} from './converter/StringConverter';
import {JsonTransfer} from './transfer/JsonTransfer';

//==========================================================
// <T>持久化服务。</T>
//
// @console
// @author maocy
// @version 150606
//==========================================================
export class PersistentService extends Service {
   // 传输器集合
   protected _transfers: Dictionary<Transfer>;
   // 转换器集合
   protected _converters: Dictionary<Converter>;
   // 工厂集合
   protected _factories: Dictionary<PersistentFactory>;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Global;
      this._transfers = new Dictionary<Transfer>();
      this._converters = new Dictionary<Converter>();
      this._factories = new Dictionary<PersistentFactory>();
   }

   //==========================================================
   // <T>根据名称查找一个环境。</T>
   //
   // @param clazz 类对象
   // @return 传输器
   //==========================================================
   public getTransfer(clazz: Function): Transfer {
      AssertUtil.debugNotNull(clazz);
      var className = ClassUtil.fullName(clazz);
      var transfers = this._transfers;
      var transfer = transfers.get(className);
      if (!transfer) {
         transfer = ClassUtil.create(clazz);
         // persistent.service = this;
         transfers.set(className, transfer);
      }
      return transfer;
   }

   //==========================================================
   // <T>根据类对象查找转换器。</T>
   //
   // @param clazz 类对象
   // @return 转换器
   //==========================================================
   public getClassConverter(clazz: Function): Converter {
      AssertUtil.debugNotNull(clazz);
      var className = ClassUtil.fullName(clazz);
      var converter = this._converters;
      var persistent = converter.get(className);
      if (!persistent) {
         persistent = ClassUtil.create(clazz);
         persistent.service = this;
         converter.set(className, persistent);
      }
      return persistent;
   }

   //==========================================================
   // <T>根据类型查找转换器。</T>
   //
   // @param typeCd 数据类型
   // @param clazz 类对象
   // @return 转换器
   //==========================================================
   public getConverter(typeCd: DataTypeEnum, clazz?: Function): Converter {
      var converter = null;
      // 根据类对象获取转换器
      if (clazz) {
         converter = this.getClassConverter(clazz);
      }
      if (!converter) {
         // 根据类型获取转换器
         AssertUtil.debugNotNull(typeCd);
         switch (typeCd) {
            case DataTypeEnum.Boolean:
               converter = this.getClassConverter(BooleanConverter);
               break;
            case DataTypeEnum.Int8:
            case DataTypeEnum.Int16:
            case DataTypeEnum.Int32:
            case DataTypeEnum.Int64:
            case DataTypeEnum.Uint8:
            case DataTypeEnum.Uint16:
            case DataTypeEnum.Uint32:
            case DataTypeEnum.Uint64:
               converter = this.getClassConverter(IntegerConverter);
               break;
            case DataTypeEnum.Float16:
            case DataTypeEnum.Float32:
            case DataTypeEnum.Float64:
               converter = this.getClassConverter(FloatConverter);
               break;
            case DataTypeEnum.String:
               converter = this.getClassConverter(StringConverter);
               break;
            case DataTypeEnum.Object:
               converter = this.getClassConverter(ObjectConverter);
               break;
            case DataTypeEnum.Array:
               converter = this.getClassConverter(ArrayConverter);
               break;
            case DataTypeEnum.Set:
               converter = this.getClassConverter(SetConverter);
               break;
            case DataTypeEnum.Map:
               converter = this.getClassConverter(MapConverter);
               break;
            default:
               converter = this.getClassConverter(FieldConverter);
               break;
         }
      }
      return converter;
   }

   //==========================================================
   // <T>注册一个持久化工厂。</T>
   //
   // @param name 名称
   // @param transferClass 传输类
   // @param persistentClazz 持久类
   // @return 持久化工厂
   //==========================================================
   public register(name: string, factoryClass: Function = PersistentFactory, transferClass: Function = JsonTransfer, persistentClazz: Function = ContainerConverter): PersistentFactory {
      AssertUtil.debugNotNull(name);
      AssertUtil.debugNotNull(persistentClazz);
      var factories = this._factories;
      var factory = factories.get(name);
      // 创建工厂
      AssertUtil.debugNull(factory);
      factory = ClassUtil.create(factoryClass);
      factory.service = this;
      factory.transfer = this.getTransfer(transferClass);
      factory.persistent = this.getClassConverter(persistentClazz);
      factory.setup();
      factories.set(name, factory);
      return factory;
   }

   //==========================================================
   // <T>根据名称查找一个环境。</T>
   //
   // @param clazz 类对象
   // @return 持久化工厂
   //==========================================================
   public get(name: string): PersistentFactory {
      AssertUtil.debugNotEmpty(name);
      var factory = this._factories.get(name);
      AssertUtil.debugNotNull(factory);
      return factory;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放处理
      this._factories = ObjectUtil.dispose(this._factories);
      // 父处理
      super.dispose();
   }
}
