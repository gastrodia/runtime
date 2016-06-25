import {EdgeNode,ArcEdgeNode} from './Edge';

export class Vertex{
   public uuid:string;

   //顶点的度数 degreee
   public get deg():number{
       return 0;
   }
   
   //顶点的出度 Outdegree
   public get od():number{
       return 0;
   }
   
   //顶点的入度 Indegree
   public get id():number{
       return 0;
   }
   
   //度数为偶数的点称为偶点（Even Vertex）
   public isEvenVertex():boolean{
       return false;
   }
   
   //度数为奇数的点称为奇点(Odd Vertex)
   public isOddVertex():boolean{
       return false;
   }
   
   //孤立顶点（Isolated Vertex):度数为0的点
   public isIsolatedVertex():boolean{
       return false;
   }
   
   //度数为1的顶点，称为叶顶点(Leaf Vertex)
   public isLeafVertex():boolean{
       return false;
   }
   
   //若从顶点u到v有路径，则称顶点u和v是联通的（Connected)
   public isConnectedTo(v:Vertex){
       return false;
   }
   
   
}

//无向图顶点
export class VNode extends Vertex{
    public edges:[EdgeNode]
}

//有向图顶点
export class ArcVNode extends Vertex{
    //入边表表头out edge link list head
    private _ie:ArcEdgeNode;
    //出边表表头in edge link list head
    private _oe:ArcEdgeNode;
    
    //获取入边表表头
    public getInEdgeLinkListHead():ArcEdgeNode{
        return this._ie;
    }
    //设置入边表表头
    public setInEdgeLinkListHead(edge:ArcEdgeNode){
        this._ie = edge;
    }
    
    //获取出边表表头
    public getOutEdgeLinkListHead():ArcEdgeNode{
        return this._oe;
    }
    
    //设置出边表表头
    public setOutEdgeLinkListHead(edge:ArcEdgeNode){
        this._oe = edge;
    }
}
