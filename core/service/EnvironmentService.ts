import {AssertUtil} from '../../common/AssertUtil';
import {RuntimeUtil} from '../../common/RuntimeUtil';
import {Dictionary} from '../../common/lang/Dictionary';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {StringUtil} from '../../common/lang/StringUtil';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Service} from '../Service';
import {Environment} from './Environment';

//==========================================================
// <T>环境控制台。</T>
//
// @console
// @author maocy
// @version 150606
//==========================================================
export class EnvironmentService extends Service {
   // 范围类型
   protected _scopeCd = ScopeEnum.Local;
   // 环境变量
   protected _environments: Dictionary<Environment> = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this._environments = new Dictionary<Environment>();
   }

   //==========================================================
   // <T>注册一个环境。</T>
   //
   // @method
   // @param environment:FEnvironment 环境
   //==========================================================
   public register(environment:Environment) {
      var name = environment.name;
      AssertUtil.debugNotEmpty(name);
      this._environments.set(name, environment);
   }

   //==========================================================
   // <T>注册一个环境内容。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   // @return FEnvironment 环境
   //==========================================================
   public registerValue(name:string, value:any) {
      AssertUtil.debugNotEmpty(name);
      var environment = ClassUtil.create(Environment);
      environment.set(name, value);
      this._environments.set(name, environment);
      return environment;
   }

   //==========================================================
   // <T>根据名称查找一个环境。</T>
   //
   // @method
   // @param name:String 名称
   // @return FEnvironment 环境
   //==========================================================
   public find(name) {
      return this._environments.get(name);
   }

   //==========================================================
   // <T>根据名称查找一个环境内容。</T>
   //
   // @method
   // @param name:String 名称
   // @return String 环境内容
   //==========================================================
   public findValue(name) {
      var value = null;
      var environment:Environment = this._environments.get(name);
      if (environment) {
         value = environment.value;
      }
      return value;
   }

   //==========================================================
   // <T>解析内容。</T>
   //
   // @method
   // @param value:String 内容
   // @return String 解析内容
   //==========================================================
   public parse(value) {
      AssertUtil.debugNotEmpty(value);
      var result = value;
      var environments = this._environments;
      var count = environments.count();
      for (var i = 0; i < count; i++) {
         var environment = environments.at(i);
         result = StringUtil.replace(result, '\\${' + environment.name + '}', environment.value);
      }
      return result;
   }

   //==========================================================
   // <T>解析网络内容。</T>
   //
   // @method
   // @param value:String 内容
   // @return String 解析内容
   //==========================================================
   public parseUrl(value) {
      var result = null;
      var version = RuntimeUtil.version;
      var url = this.parse(value);
      if (url.indexOf('?') != -1) {
         result = url + '&' + version;
      } else {
         result = url + '?' + version;
      }
      return result;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      // 释放处理
      this._environments = ObjectUtil.dispose(this._environments);
      // 父处理
      super.dispose();
   }
}
