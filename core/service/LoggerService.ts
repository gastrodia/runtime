import {LoggerUtil} from '../../common/lang/LoggerUtil';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {BufferedSocket} from '../../common/net/BufferedSocket';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Linker} from '../../common/reflect/Linker';
import {Property} from '../../common/reflect/Property';
import {Service} from '../Service';
import {EnvironmentService} from './EnvironmentService';

//==========================================================
// <T>日志控制台。</T>
//
// @class
// @author maocy
// @version 150729
//==========================================================
//@ALinker('ASD')
export class LoggerService extends Service {

   @Linker(EnvironmentService)
   protected _environmentConsole: EnvironmentService;

   //@AProperty(EDataType.String)
   protected _code: string = null;

   protected _value: string = 'my';
   // 网络
   protected _socket = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public static instance() {
      var loggerConsole = new LoggerService();
      //var loggerConsole:FLoggerConsole = RClass.getInstance(FLoggerConsole);
      LoggerUtil.outputListeners.register(loggerConsole, loggerConsole.onOutput);
      return loggerConsole;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = ScopeEnum.Global;
      //RLogger.outputListeners.register(this, this.onOutput);
   }

   //==========================================================
   // <T>输出内容。</T>
   //
   // @method
   //==========================================================
   //@ALinker(FEnvironmentConsole)
   public onOutput(context, event) {
      var message = event.message;
      console.log(message);
      //this.output(message);
   }

   //==========================================================
   // <T>链接处理。</T>
   //
   // @method
   //==========================================================
   public connect(url) {
      var socket = this._socket = ClassUtil.create(BufferedSocket);
      socket.connect(url);
   }

   //==========================================================
   // <T>输出内容。</T>
   //
   // @method
   // @param message:String 消息内容
   //==========================================================
   public output(message) {
      var socket = this._socket;
      if (socket) {
         var url = window.location.toString();
         socket.push('[' + url + '] - ' + message);
         socket.process();
      }
   }

   //==========================================================
   // <T>断开处理。</T>
   //
   // @method
   //==========================================================
   public disconnect() {
      var socket = this._socket;
      if (socket) {
         socket.close();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._socket = ObjectUtil.dispose(this._socket);
      // 父处理
      super.dispose();
   }
}
