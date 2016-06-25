import {Matrix4} from '../../math/Matrix4';

export class SceneUtils {
   public static createMultiMaterialObject(geometry, materials) {
      // var group = new THREE.Group();
      // for (var i = 0, l = materials.length; i < l; i++) {
      //    group.add(new THREE.Mesh(geometry, materials[i]));
      // }
      // return group;
   }

   public static detach(child, parent, scene) {
      child.applyMatrix(parent.matrixWorld);
      parent.remove(child);
      scene.add(child);
   }

   public static attach(child, scene, parent) {
      var matrixWorldInverse = new Matrix4();
      // matrixWorldInverse.getInverse(parent.matrixWorld);
      child.applyMatrix(matrixWorldInverse);
      scene.remove(child);
      parent.add(child);
   }
}
