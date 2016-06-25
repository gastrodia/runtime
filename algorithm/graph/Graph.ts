import {VNode} from './Vertex';

export class Graph{
    vertexs:Array<VNode>;
    
    //最小度(Minimum Degree),图G所有顶点的最小度数
    get minDegree():number{
        return 0;
    }
    
    //最大度(Maximum Degree),图G所有顶点的最大度数
    get maxDegree():number{
        return 0;
    }
    
    //如果无向图中任意一对顶点都是连通的，则称此图为连通图（Connected Graph）
    public isConnectedGraph():boolean{
        return false;
    }
    
    
    
    //设有两个图G（ V， E）和 G′（ V′， E′），如果V′ ⊆ V，且 E′ ⊆ E，则称图G′是图G的子图(Subgraph)
    public isMySubGraph(g:Graph):boolean{
        return false;
    }
    
    public isSubGraphOf(g:Graph):boolean{
        return false;
    }
    
    //一个无向连通图的生成树是它的包含所有顶点的极小连通子图，这里所谓的极小就是边的数目极小
    public getSpaningTree():SpanningTree{
        return null;
    }
    
    //获取邻接矩阵
    getAdjacencyMatrix(){
        
    }
    
    //设置邻接矩阵
    setAdjacencyMatrix(){
        
    }
    
    //获取邻接表
    getAdjacencyList(){
        
    } 
    
    //设置邻接表
    setAdjacencyList(){
        
    } 
    
    //深度优先搜索
    dfs(vertex:VNode,iterator:Function,visited?:{[vertex_uuid:string]:boolean}){
        if(!visited){
            visited = {};
        }
        visited[vertex.uuid] = true;
    }

    //广度优先搜索
    bfs(){
        
    }    
    
}

//无向图
export class UnDirectedGraph extends Graph{
    
}

//有向图
export class DirectedGraph extends Graph{
    
}


/*
  度序列( Degree Sequence): 若把图G所有顶点的度数排成一个序列 s, 则称s为图G的度序列
*/
export class DegreeSequence{
    
    /*
        根据Havel-Hakimi定理判断序列是否是可图的
    */
    public isGraphic():boolean{
        return false;
    }
}


/*
    图的生成树:
    一个无向连通图的生成树是它的包含所有顶点的极小连通子图，这里所谓的极小就是边的数目极小
    如果图中有n个顶点，则生成树有n-1条边。一个无向连通图可能有多个生成树
*/
export class SpanningTree{
    
}
