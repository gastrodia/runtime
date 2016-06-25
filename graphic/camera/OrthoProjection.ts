import {MatrixUtil} from '../../../runtime/math/MatrixUtil';
import {Projection} from './Projection';

//==========================================================
// <T>渲染正交投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class OrthoProjection extends Projection {
   //============================================================
   // <T>更新矩阵。</T>
   //
   // @method
   //============================================================
   public update() {
      var size = this.size;
      var left = -size.width * 0.5;
      var top = -size.height * 0.5;
      MatrixUtil.orthoLH(this.matrix, left, top, size.width, size.height, this.znear, this.zfar);
   }

   //============================================================
   // <T>根据视截体更新矩阵。</T>
   //
   // @method
   // @param frustum:SFrustum 视截体
   //============================================================
   public updateFrustum(frustum) {
      this.znear = frustum.minZ;
      this.zfar = frustum.maxZ;
      this.update();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      super.dispose();
   }
}
