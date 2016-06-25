import {MathUtil} from '../../math/MathUtil';

export class Node {
    min: { x: number, y: number, z: number };
    max: { x: number, y: number, z: number };

    top: Node;
    left: Node;
    right: Node;
    bottom: Node;
    front: Node;
    back: Node;

    box: Box;
    used: boolean;
    uuid: number;

    constructor() {
        this.min = { x: -Infinity, y: -Infinity, z: -Infinity };
        this.max = { x: Infinity, y: Infinity, z: Infinity };
        this.used = false;
        this.uuid = Math.random();
    }

    clone() {
        var node = new Node();
        node.min = { x: this.min.x, y: this.min.y, z: this.min.z };
        node.max = { x: this.max.x, y: this.max.y, z: this.max.z };

        this.copyBoxRefToNode(node);

        return node;
    }

    copyBoxRefToNode(node: Node) {

        if (this.top instanceof Box) {
            node.top = this.top.clone();
        }

        if (this.left instanceof Box) {
            node.left = this.left.clone();
        }

        if (this.right instanceof Box) {
            node.right = this.right.clone();

        }

        if (this.bottom instanceof Box) {
            node.bottom = this.bottom.clone();
        }


        if (this.front instanceof Box) {
            node.front = this.front.clone();
        }

        if (this.back instanceof Box) {
            node.back = this.back.clone();
        }
        // console.log('copyBoxRefToNode')
        // console.log('this',this)
        // console.log('node',node)
    }

    shouldBeSplitByThisBox(box: Box) {

        var step1 = MathUtil.nearlyLessEquals(this.min.x, box.min.x);
        var step2 = MathUtil.nearlyLessEquals(this.min.y, box.min.y);
        var step3 = MathUtil.nearlyLessEquals(this.min.z, box.min.z);
        var step4 = MathUtil.nearlyGreaterEquals(this.max.x, box.max.x);
        var step5 = MathUtil.nearlyGreaterEquals(this.max.y, box.max.y);
        var step6 = MathUtil.nearlyGreaterEquals(this.max.z, box.max.z);
        var step7 = !this.used;
        var step8 = !(this instanceof Box)
        //console.log(this,box);
        //console.log(step1 , step2 , step3 , step4 , step5 , step6 , step7 , step8)
        return step1 && step2 && step3 && step4 && step5 && step6 && step7 && step8;
    }

    shouldSearchDirection(direction, exclude?: Array<string>) {
        if (this[direction]) {
            if (exclude && exclude.indexOf(direction) > -1) {
                return false;
            };

            if (this[direction] instanceof Box) {
                return false;
            }

            return true;
        } else {
            return false;
        }

    }



    dfs(iterator: (node: Node) => boolean, exclude?: Array<string>) {
        var next = iterator(this);

        if (next && this.shouldSearchDirection('top', exclude)) {
            next = this.top.dfs(iterator)
        }

        if (next && this.shouldSearchDirection('bottom', exclude)) {
            next = this.bottom.dfs(iterator);
        }

        if (next && this.shouldSearchDirection('left', exclude)) {
            next = this.left.dfs(iterator);
        }

        if (next && this.shouldSearchDirection('right', exclude)) {
            next = this.right.dfs(iterator);
        }

        if (next && this.shouldSearchDirection('front', exclude)) {
            next = this.front.dfs(iterator);
        }

        if (next && this.shouldSearchDirection('back', exclude)) {
            next = this.back.dfs(iterator);
        }

        return next;
    }

    bfs(iterator: (node: Node) => boolean, exclude?: Array<string>) {
        var next = true;

        if (next && this.shouldSearchDirection('top', exclude)) {
            next = iterator(this.top);
        }

        if (next && this.shouldSearchDirection('bottom', exclude)) {
            next = iterator(this.bottom);
        }

        if (next && this.shouldSearchDirection('left', exclude)) {
            next = iterator(this.left);
        }

        if (next && this.shouldSearchDirection('right', exclude)) {
            next = iterator(this.right);
        }

        if (next && this.shouldSearchDirection('front', exclude)) {
            next = iterator(this.front);
        }

        if (next && this.shouldSearchDirection('back', exclude)) {
            next = iterator(this.back);
        }

        if (next && this.shouldSearchDirection('top', exclude)) {
            next = this.top.bfs(iterator)
        }

        if (next && this.shouldSearchDirection('bottom', exclude)) {
            next = this.bottom.bfs(iterator);
        }

        if (next && this.shouldSearchDirection('left', exclude)) {
            next = this.left.bfs(iterator);
        }

        if (next && this.shouldSearchDirection('right', exclude)) {
            next = this.right.bfs(iterator);
        }

        if (next && this.shouldSearchDirection('front', exclude)) {
            next = this.front.bfs(iterator);
        }

        if (next && this.shouldSearchDirection('back', exclude)) {
            next = this.back.bfs(iterator);
        }

        return next;
    }

    findNodeDFS(box: Box): Node {
        var node: Node = null;

        this.dfs((n: Node) => {
            if (n.shouldBeSplitByThisBox(box)) {
                node = n
                return false;
            } else {
                return true;
            }
        })

        return node;
    }


    findNodeBFS(box: Box): Node {
        //console.log('findNodeBFS')
        var node: Node = null;
        if (this.shouldBeSplitByThisBox(box)) {
            node = this;
        } else {
            this.bfs((n: Node) => {
                if (n.shouldBeSplitByThisBox(box)) {
                    node = n;
                    return false;
                } else {
                    return true;
                }
            })
        }

        return node;
    }

    getCount() {
        var count = 1;
        this.bfs((n: Node) => {
            count++;
            return true;
        });
        return count;
    }

    splitByBox(box: Box) {
        //console.log('splitByBox')
        var node = this.findNodeBFS(box);
        //console.log(node, box);
        //debugger;
        if (node) {
            node.used = true;
            node.box = box;

            if (!node.top || !node.top.isBox()) {

            }

            if (!node.left || !node.left.isBox()) {

            }

            if (!node.right || !node.right.isBox()) {

            }

            if (!node.bottom || !node.bottom.isBox()) {

            }

            if (!node.front || !node.front.isBox()) {

            }

            if (!node.back || !node.back.isBox()) {
               
            }

            return true;
        } else {
            console.log('box cant split space')
            console.log(box);
            return false;
        }

    }

    shouldGrowTop() {

    }

    shouldGrowDown() {

    }

    shouldGrowLeft() {

    }

    shouldGrowRight() {

    }

    shouldGrowFront() {

    }

    shouldGrowBack() {

    }

    canGrowTop(box) {
        return MathUtil.nearlyLessEquals(this.min.z,box.min.z);
    }

    canGrowDown() {

    }

    canGrowLeft() {

    }

    canGrowRight() {

    }

    canGrowFront() {

    }

    canGrowBack() {

    }

    growTop(box) {
        var top = this.clone();
        top.bottom = box;
        top.min.z = box.position.z + box.size.z;
        this.top = top;
    }

    growDown(box) {
        var bottom = this.clone();
        this.top = box;
        bottom.max.z = box.position.z;
        this.bottom = bottom;
    }

    growLeft(box) {
        var left = this.clone();
        left.right = box;
        left.max.x = box.position.x;
        this.left = left;
    }

    growRight(box) {
        var right = this.clone();
        right.left = box;
        right.min.x = box.position.x + box.size.x;
        this.right = right;
    }

    growFront(box) {
        var front = this.clone();
        front.back = box;
        //front.max.y = box.position.y - box.size.y;
        front.max.y = box.min.y;
        this.front = front;
    }

    growBack(box) {
        var back = this.clone();
        back.front = box;
        //back.min.y = box.position.y;
        back.min.y = box.max.y;
        this.back = back;
    }

    isBox() {
        return this instanceof Box;
    }

    //findNodeByBoxPosition(['left','right'])
    findNodeByBoxPosition(posArray: Array<string>): Array<Node> {
        var res = [];

        var isThisNode = function (node, posArray) {
            var res: boolean = true;
            for (var i in posArray) {
                var pos = posArray[i];
                var thisPosHasBox = node[pos] instanceof Box;
                if (!(thisPosHasBox)) {
                    res = false;
                }
            }
            //console.log('isThisNode: ' + res, node, posArray)
            return res;
        }


        if (isThisNode(this, posArray)) {
            res.push(this)
        }

        this.bfs((node: Node) => {
            if (isThisNode(node, posArray)) {
                res.push(node)
            }
            return true;
        })

        return res;
    }



    castToBox(): Box {
        //空间相邻面
        var faceArray = [];
        if (this.top instanceof Box) {
            let top = <Box>this.top;
            let topFace = [
                { x: top.min.x, y: top.min.y, z: top.min.z },
                { x: top.min.x, y: top.max.y, z: top.min.z },
                { x: top.max.x, y: top.max.y, z: top.min.z },
                { x: top.max.x, y: top.min.y, z: top.min.z }
            ];
            faceArray.push(topFace);
        }

        if (this.bottom instanceof Box) {
            let bottom = <Box>this.bottom;
            let bottomFace = [
                { x: bottom.min.x, y: bottom.min.y, z: bottom.max.z },
                { x: bottom.min.x, y: bottom.max.y, z: bottom.max.z },
                { x: bottom.max.x, y: bottom.max.y, z: bottom.max.z },
                { x: bottom.max.x, y: bottom.min.y, z: bottom.max.z }
            ];
            faceArray.push(bottomFace);
        }

        if (this.left instanceof Box) {
            let left = <Box>this.left;
            let leftFace = [
                { x: left.max.x, y: left.min.y, z: left.min.z },
                { x: left.max.x, y: left.min.y, z: left.max.z },
                { x: left.max.x, y: left.max.y, z: left.max.z },
                { x: left.max.x, y: left.max.y, z: left.min.z }
            ]
            faceArray.push(leftFace);
        }

        if (this.right instanceof Box) {
            let right = <Box>this.right;
            let rightFace = [
                { x: right.min.x, y: right.min.y, z: right.min.z },
                { x: right.min.x, y: right.min.y, z: right.max.z },
                { x: right.min.x, y: right.max.y, z: right.max.z },
                { x: right.min.x, y: right.max.y, z: right.min.z }
            ]
            faceArray.push(rightFace);
        }

        if (this.front instanceof Box) {
            let front = <Box>this.front;
            let frontFace = [
                { x: front.min.x, y: front.max.y, z: front.min.z },
                { x: front.max.x, y: front.max.y, z: front.min.z },
                { x: front.max.x, y: front.max.y, z: front.max.z },
                { x: front.min.x, y: front.max.y, z: front.max.z }
            ]
            faceArray.push(frontFace);
        }

        if (this.back instanceof Box) {
            let back = <Box>this.back;
            let backFace = [
                { x: back.min.x, y: back.min.y, z: back.min.z },
                { x: back.max.x, y: back.min.y, z: back.min.z },
                { x: back.max.x, y: back.min.y, z: back.max.z },
                { x: back.min.x, y: back.min.y, z: back.max.z }
            ]
            faceArray.push(backFace);
        }

        //得到相交面上所有的点
        var points = Array.prototype.concat.apply([], faceArray);

        //剔除掉不符合空间约束的点
        var pointArray = [];
        for (var i in points) {
            var point = points[i];
            if (
                point.x >= this.min.x && point.x <= this.max.x &&
                point.y >= this.min.y && point.y <= this.max.y &&
                point.z >= this.min.z && point.z <= this.max.z
            ) {
                pointArray.push(point)
            }
        }


        //根据点集求算空间 
        var box: Box;
        if (pointArray.length > 4) {

            var max = { x: this.min.x, y: this.min.y, z: this.min.z }
            var min = { x: this.max.x, y: this.max.y, z: this.max.z }

            for (var i in pointArray) {
                var point = pointArray[i];
                if (point.x < min.x) {
                    min.x = point.x;
                }
                if (point.y < min.y) {
                    min.y = point.y;
                }
                if (point.z < min.z) {
                    min.z = point.z;
                }
                if (point.x > max.x) {
                    max.x = point.x;
                }
                if (point.y > max.y) {
                    max.y = point.y;
                }
                if (point.z > max.z) {
                    max.z = point.z;
                }
            }

            var size = { x: max.x - min.x, y: max.y - min.y, z: max.z - min.z };
            if (size.x > 0 && size.y > 0 && size.z > 0) {
                box = new Box(min, size);
            }
        }

        return box;
    }

    findAllPossibleSpace() {
        var res = [];

        if (this.castToBox()) {
            res.push(this)
        }

        this.bfs((node: Node) => {
            if (node.castToBox()) {
                res.push(node)
            }
            return true;
        })

        return res;

    }

}

export class Space extends Node {
}


export class Box extends Node {
    //设置些附加信息 用以调试
    info: any;
    setInfo(info) {
        this.info = info;
    }
    constructor(public position: { x: number, y: number, z: number }, public size: { x: number, y: number, z: number }) {
        super();
        this.min.x = position.x;
        this.min.y = position.y;
        this.min.z = position.z;

        this.max.x = position.x + size.x;
        this.max.y = position.y + size.y;
        this.max.z = position.z + size.z;
    }

    clone() {
        var box = new Box({
            x: this.position.x,
            y: this.position.y,
            z: this.position.z
        }, {
                x: this.size.x,
                y: this.size.y,
                z: this.size.z
            });

        //  this.copyBoxRefToNode(box);

        return box;
    }

}
