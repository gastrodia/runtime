import {Objects} from '../../../common/lang/Objects';
import {ScopeEnum} from '../../../common/lang/ScopeEnum';
import {ClassUtil} from '../../../common/reflect/ClassUtil';
import {Service} from '../../Service';
import {FResourceThreadPipeline} from './FResourceThreadPipeline';

//==========================================================
// <T>资源控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
export class FResourceDataConsole extends Service {
   // @attribute
   protected _scopeCd = ScopeEnum.Global;
   // @attribute
   protected _loadDatas = null;
   protected _processDatas = null;
   protected _pipeline = null;
   protected _pipelinePool = null;
   // @attribute
   protected _thread = null;
   protected _processLimit = 4;
   protected _interval = 200;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._loadDatas = new Objects();
      this._processDatas = new Objects();
      //this._pipelinePool = common.reflect.RClass.create(FObjectPool);
      // 是否支持多线程
      //var capability = MO.Window.Browser.capability();
      //if (!capability.optionProcess) {
      //   var pipeline = o._pipeline = MO.Class.create(MO.FResourceSinglePipeline);
      //   pipeline.setConsole(o);
      //}
      // 创建线程
      //var thread = this._thread = RClass.create(console.FThread);
      //thread.setInterval(o._interval);
      //thread.addProcessListener(o, o.onProcess);
      //MO.Console.find(MO.FThreadConsole).start(thread);
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param pipeline:FResourcePipeline 资源处理管道
   // @param data:FResourceData 资源数据
   //==========================================================
   public onPipelineComplete(pipeline, data) {
      var o = this;
      // 释放管道
      if (pipeline) {
         //o.freePipeline(pipeline);
      }
      // 移除处理数据
      o._processDatas.remove(data);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   public onProcess() {
      var o = this;
      // 检查待处理数据
      var loadDatas = o._loadDatas;
      var loadCount = loadDatas.count();
      if (loadCount == 0) {
         return;
      }
      //..........................................................
      // 管道处理
      var pipeline = o._pipeline;
      if (pipeline) {
         // 单线程解压缩
         if (!pipeline.testBusy()) {
            var data = loadDatas.shift();
            pipeline.decompress(data);
         }
      } else {
         // 多线程解压缩
         var processDatas = o._processDatas;
         var processCount = processDatas.count();
         var idleCount = o._processLimit - processCount;
         if (idleCount <= 0) {
            return;
         }
         // 放入可处理数据中
         var freeCount = Math.min(loadCount, idleCount);
         for (var i = 0; i < freeCount; i++) {
            var data = loadDatas.shift();
            // 解压缩处理
            var pipeline = o.allocPipeline();
            pipeline.decompress(data);
            // 增加处理中集合
            processDatas.push(data);
         }
      }
   }

   //==========================================================
   // <T>收集资源处理管道。</T>
   //
   // @method
   // @return FResourcePipeline 处理管道
   //==========================================================
   public allocPipeline() {
      var o = this;
      var pool = o._pipelinePool;
      if (!pool.hasFree()) {
         var pipeline = ClassUtil.create(FResourceThreadPipeline);
         pipeline.setConsole(o);
         pool.push(pipeline);
      }
      return pool.alloc();
   }

   //==========================================================
   // <T>释放资源处理管道。</T>
   //
   // @method
   // @param pipeline:FResourcePipeline 处理管道
   //==========================================================
   public freePipeline(pipeline) {
      this._pipelinePool.free(pipeline);
   }

   //==========================================================
   // <T>加载资源数据。</T>
   //
   // @method
   // @param data:MResourceData 资源数据
   //==========================================================
   public load(data) {
      this._loadDatas.push(data);
   }
}
