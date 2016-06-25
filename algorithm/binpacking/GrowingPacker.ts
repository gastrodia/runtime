export type Node = {
   x: number, y: number, w: number, h: number
   used?: boolean,
   down?: Node,
   right?: Node
};

export type Block = {
   w: number,
   h: number,
   fit?: Node
}


/*
   基于二叉树 自动增长的 平面装箱算法
   目前应用于：
      1. 贴图的合并处理
*/
export class GrowingPacker {

   root: Node

   fit(blocks: Array<Block>) {
      var n, node: Node, block: Block, len = blocks.length;
      var w = len > 0 ? blocks[0].w : 0;
      var h = len > 0 ? blocks[0].h : 0;
      this.root = { x: 0, y: 0, w: w, h: h };
      for (n = 0; n < len; n++) {
         block = blocks[n];
         var node = this.findNode(this.root, block.w, block.h)
         if (node) {
            var fitData = this.splitNode(node, block.w, block.h);
            //console.log(fitData);
            block.fit = fitData;
         } else {
            var fitData = this.growNode(block.w, block.h);
            //console.log(fitData);
            block.fit = fitData;
         }

         // if (node = this.findNode(this.root, block.w, block.h)) {
         //    var fitData = this.splitNode(node, block.w, block.h);
         //    console.log(fitData);
         //    block.fit = fitData;
         // } else {
         //    var fitData = this.growNode(block.w, block.h);
         //    console.log(fitData);
         //    block.fit = fitData;
         // } 


      }
   }

   //递归判断可以在二叉树的下面还是右面放下block   
   findNode(root: Node, w: number, h: number): Node {
      if (root.used)
         return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
      else if ((w <= root.w) && (h <= root.h))
         return root;
      else
         return null;
   }

   //更新二叉树节点   
   splitNode(node: Node, w: number, h: number): Node {
      node.used = true;
      node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
      node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
      return node;
   }

   //增长更节点大小（区域变大）   
   growNode(w: number, h: number) {
      var canGrowDown = (w <= this.root.w);
      var canGrowRight = (h <= this.root.h);

      var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
      var shouldGrowDown = canGrowDown && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

      if (shouldGrowRight)
         return this.growRight(w, h);
      else if (shouldGrowDown)
         return this.growDown(w, h);
      else if (canGrowRight)
         return this.growRight(w, h);
      else if (canGrowDown)
         return this.growDown(w, h);
      else
         return null; // need to ensure sensible root starting size to avoid this happening
   }

   //在右侧增长，更新二叉节点   
   growRight(w: number, h: number) {
      this.root = {
         used: true,
         x: 0,
         y: 0,
         w: this.root.w + w,
         h: this.root.h,
         down: this.root,
         right: { x: this.root.w, y: 0, w: w, h: this.root.h }
      };
      var node = this.findNode(this.root, w, h)
      if (node) {
          return this.splitNode(node, w, h);
      } else {
         return null;
         
      }

   }

   //在下侧增长，更新二叉节点   
   growDown(w: number, h: number) {
      this.root = {
         used: true,
         x: 0,
         y: 0,
         w: this.root.w,
         h: this.root.h + h,
         down: { x: 0, y: this.root.h, w: this.root.w, h: h },
         right: this.root
      };
      var node = this.findNode(this.root, w, h)
      if (node) {
          return this.splitNode(node, w, h);
      } else {
         return null;
      }
        
   }
}
