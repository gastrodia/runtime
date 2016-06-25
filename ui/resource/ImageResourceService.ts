import {Dictionary} from '../../common/lang/Dictionary';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {ScopeEnum} from '../../common/lang/ScopeEnum';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {Linker} from '../../common/reflect/Linker';
import {Service} from '../../core/Service';
import {EnvironmentService} from '../../core/service/EnvironmentService';
import {ImageResource} from './ImageResource';

//==========================================================
// <T>图片资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
export class ImageResourceService extends Service {
   // 图像集合
   protected _images: Dictionary<ImageResource>;
   // 环境控制台
   @Linker(EnvironmentService)
   protected _environmentConsole: EnvironmentService;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置变量
      this._scopeCd = ScopeEnum.Global;
      this._images = new Dictionary<ImageResource>();
   }

   //==========================================================
   // <T>创建图片资源。</T>
   //
   // @param uri 网络地址
   // @return 图片对象
   //==========================================================
   public create(url: string) {
      // 加载地址
      var image = ClassUtil.create(ImageResource);
      image.loadUrl(url);
      return image;
   }

   //==========================================================
   // <T>加载声音资源。</T>
   //
   // @param uri 网络地址
   // @return 图片对象
   //==========================================================
   public load(uri): any {
      //Promise<any>
      // 获得地址
      var url = this._environmentConsole.parse(uri);
      // 加载位图
      var images = this._images;
      var image = images.get(url);
      if (!image) {
         image = this.create(uri);
         images.set(url, image);
      }
      // var promise = new Promise(function(params:any) {
      // });
      // return promise;
      return image;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 清空变量
      this._images = ObjectUtil.dispose(this._images);
      // 父处理
      super.dispose();
   }
}
