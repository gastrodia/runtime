import {VNode} from './Vertex';

export class Edge{
    public source:VNode;
    public target:VNode;
    public weight:number;
} 



/*
    边节点
*/
export class EdgeNode extends Edge{
    //有向边的另一个邻接点的序号
    get adjvex():VNode{
     return this.target;   
    };
    public next:EdgeNode
}

/*
    有向图边节点
*/
export class ArcEdgeNode extends Edge{
    
}
