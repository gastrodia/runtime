import {AssertUtil} from '../../common/AssertUtil';
import {Dictionary} from '../../common/lang/Dictionary';
import {ObjectBase} from '../../common/lang/ObjectBase';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {MathUtil} from '../../math/MathUtil';
import {Texture} from './Texture';

/**
 * 基础渲染材质。
 *
 * @author maocy
 * @history 150107
 */
export class Material extends ObjectBase {
   /** 唯一编号 */
   public guid: string;
   /** 名称 */
   public name: string;
   /** 标签 */
   public label: string;
   /** 效果器代码 */
   public effectCode: string;
   /** 效果器 */
   public effect: any;
   /** 渲染器代码 */
   public renderCode: string;
   /** 配置深度检查 */
   public optionDepth: boolean;
   /** 配置深度写入 */
   public optionDepthWrite: boolean;
   /** 配置双面 */
   public optionDouble: boolean;
   /** 配置透明度 */
   public optionAlpha: boolean;
   /** 纹理集合 */
   public textures: Dictionary<Texture>;
   /** 脏标志 */
   public dirty: boolean;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.guid = MathUtil.makeUuid();
      this.effectCode = 'automatic';
      this.optionDepth = true;
      this.optionDepthWrite = true;
      this.optionDouble = false;
      this.optionAlpha = false;
      this.textures = new Dictionary<Texture>();
      this.dirty = true;
   }

   /**
    * 根据代码查找纹理。
    *
    * @param code 名称
    * @return 纹理
    */
   public findTexture(code: string): Texture {
      var texture: Texture = null;
      var textures = this.textures;
      if (textures) {
         texture = textures.get(code);
      }
      return texture;
   }

   /**
    * 设置一个纹理。
    *
    * @param code 名称
    * @param texture 纹理
    */
   public setTexture(code: string, texture: Texture) {
      AssertUtil.debugNotEmpty(code);
      AssertUtil.debugNotNull(texture);
      var textures = this.textures;
      if (!textures) {
         textures = this.textures = new Dictionary<Texture>();
      }
      // 增加纹理
      textures.set(code, texture);
   }

   /**
    * 重置内容。
    */
   public reset() {
      this.optionDepth = true;
      this.optionDepthWrite = true;
      this.optionDouble = false;
      this.optionAlpha = false;
   }

   /**
    * 更新处理。
    */
   public update() {
      this.dirty = true;
   }

   /**
    * 释放处理。
    */
   public dispose(): void {
      // 释放属性
      this.effect = ObjectUtil.dispose(this.effect);
      this.textures = ObjectUtil.dispose(this.textures);
      // 父处理
      super.dispose();
   }
}
