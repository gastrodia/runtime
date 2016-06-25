import {AssertUtil} from '../common/AssertUtil';
import {Dictionary} from '../common/lang/Dictionary';
import {LoggerUtil} from '../common/lang/LoggerUtil';
import {Objects} from '../common/lang/Objects';
import {StringUtil} from '../common/lang/StringUtil';
import {ClassUtil} from '../common/reflect/ClassUtil';
import {Service} from './Service';

//==========================================================
// <T>控制台对象的管理类。</T>
//
// @reference
// @author maocy
// @version 141230
//==========================================================
export class ServiceUtil {
   //..........................................................
   // @attribute 注册类型集合
   protected static _registers = new Objects();
   // @attribute 控制台集合
   protected static _consoles = new Dictionary<Service>();

   //==========================================================
   // <T>初始化控制台管理器。</T>
   //
   // @method
   //==========================================================
   public static initialize() {
      var registers = this._registers;
      var count: number = registers.count();
      for (var n: number = 0; n < count; n++) {
         var register: any = registers.get(n);
         if (register.force) {
            this.find(register.clazz);
         }
      }
   }

   //==========================================================
   // <T>注册一个控制台。</T>
   //
   // @method
   // @param console:FConsole 类名称
   //==========================================================
   public static register(console) {
      this._registers.push(console);
   }

   //==========================================================
   // <T>根据类名称创建一个控制台实例。</T>
   // <P>如果实例中有属性用'lnk'开始，并且内容以'&开始的话，可以自动和其他对象关联。</P>
   //
   // @method
   // @param n:name:String 类名称
   // @return Object 控制台实例
   //==========================================================
   public static create(n) {
      var r = null;
      if (n) {
         // 创建对象实例
         r = ClassUtil.create(n);
         // 关联对象属性
         var o = this;
         for (var rn in r) {
            if (StringUtil.startsWith(rn, 'lnk')) {
               var v = r[rn];
               if ('string' == typeof (v) && StringUtil.startsWith(v, '&')) {
                  var c = o.find(v.substr(1));
                  if (!c) {
                     //return sk.RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
                  }
                  r[rn] = c;
               }
            }
         }
      }
      return r;
   }

   //==========================================================
   // <T>根据名称创建对象。</T>
   //
   // @method
   // @param name:string 类名称
   // @return Object 控制台实例
   //==========================================================
   // public static createByName(name) {
   //    var r = null;
   //    if (name) {
   //       // 创建对象实例
   //       r = RClass.createByName(name);
   //       // 关联对象属性
   //       var o = this;
   //       for (var rn in r) {
   //          if (RString.startsWith(rn, 'lnk')) {
   //             var v = r[rn];
   //             if ('string' == typeof (v) && RString.startsWith(v, '&')) {
   //                var c = o.find(v.substr(1));
   //                if (!c) {
   //                   //return MO.Message.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
   //                }
   //                r[rn] = c;
   //             }
   //          }
   //       }
   //    }
   //    return r;
   // }

   //==========================================================
   // <T>根据类函数获得一个控制台实例。</T>
   //
   // @method
   // @param v:value:Object 类名称/类函数
   // @return Object 控制台实例
   //==========================================================
   public static get(v) {
      var o = this;
      // 获得名称
      var n = ClassUtil.shortName(v);
      // 查找本地控制台
      var r = o._consoles.get(n);
      return r;
   }

   //==========================================================
   // <T>根据类函数查找一个控制台实例。</T>
   //
   // @method
   // @param value 类函数
   // @return Object 控制台实例
   //==========================================================
   public static find(value: any): any {
      AssertUtil.debugNotNull(value);
      // 获得名称
      var name = null;
      if (value.constructor == String) {
         name = value;
      } else if (value.constructor == Function) {
         name = ClassUtil.shortName(value);
      } else {
         return LoggerUtil.fatal(this, null, 'Parameter type is invalid. (console={1})', value);
      }
      // 查找全局控制台
      //var console = MO.Global.get(o.ConsolePreFix + name);
      //if (console) {
      //   return console;
      //}
      // 查找本地控制台
      // var consoles: Dictionary<Service> = this._consoles;
      // var console = consoles.get(name);
      // if (console) {
      //    return console;
      // }
      //console = new value();
      var console = ClassUtil.getInstance(value);
      // consoles.set(name, console);
      // 创建控制台实例
      //var template = RClass.forName(name);
      //var scopeCd = template._instance.scopeCd();
      //switch (scopeCd) {
      //case EScope.Global:
      // 从顶层对象重新创建
      //console = top.MO.Console.createByName(name);
      //MO.Global.set(o.ConsolePreFix + name, console);
      // 在本地保存当前对象
      //consoles.set(name, console);
      //break;
      //case EScope.Local:
      // 在本地保存当前对象
      //console = this.createByName(name);
      //console = new value.constructor();
      //consoles.set(name, console);
      //  break;
      // default:
      //      return RLogger.fatal(this, 'Unknown scope code. (name={1})', name);
      //}
      //RLogger.debug(this, 'Create console. (name={1}, scope={2})', name, MO.EScope.toDisplay(scopeCd));
      return console;
   }

   //==========================================================
   // <T>释放当前页面内的所有控制台。</T>
   //
   // @method
   // @param n:name:Object 类名称，类函数
   // @return Object 控制台实例
   //==========================================================
   public static dispose() {
      // 释放注册信息
      if (this._registers) {
         this._registers.dispose();
         this._registers = null;
      }
      // 释放本地所有控制台
      //var cs = o._localConsoles;
      //if (cs) {
      //   var c = cs.count();
      //   for (var n = 0; n < c; n++) {
      //      cs.value(n).dispose();
      //   }
      //   cs.dispose();
      //}
      //o._localConsoles = null;
      // 释放属性
      if (this._consoles) {
         this._consoles.dispose();
      }
      this._consoles = null;
   }
}
