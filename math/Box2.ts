import {MathUtil} from './MathUtil';
import {Vector2} from './Vector2';

/**
 * 二维盒子。
 */
export class Box2 {
    // 最小点
    public min: Vector2;
    // 最大点
    public max: Vector2;

    /**
     * 构造处理。
     *
     * @param min 最小数据
     * @param max 最大数据
     */
    public constructor(min?: Vector2, max?: Vector2) {
        if (min == null) {
            this.min = new Vector2(+Infinity, +Infinity);
        } else {
            this.min = min;
        }
        if (max == null) {
            this.max = new Vector2(-Infinity, -Infinity);
        } else {
            this.max = max;
        }
    }

    /**
     * 判断是否为空。
     */
    public isEmpty(): boolean {
        var min = this.min;
        var max = this.max;
        return (max.x < min.x) || (max.y < min.y);
    }

    /**
     * 判断是否相等。
     *
     * @param box 盒子
     * @return 是否相等
     */
    public equals(box: Box2): boolean {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }

    /**
     * 判断是否近似相等。
     *
     * @param box 盒子数据
     * @param tolerance 公差
     * @return 是否相等
     */
    public nearlyEquals(box: Box2, tolerance: number = MathUtil.DEFAULT_TOLERANCE): boolean {
        return box.min.nearlyEquals(this.min) && box.max.nearlyEquals(this.max);
    }

    /**
     * 接收数据内容。
     *
     * @param value 数据
     * @return 向量
     */
    public assign(value: Box2): Box2 {
        this.min.assign(value.min);
        this.max.assign(value.max);
        return this;
    }

    /**
     * 设置数据。
     *
     * @param min 最小数据
     * @param max 最大数据
     * @return 盒子
     */
    public set(min: Vector2, max: Vector2): Box2 {
        this.min.assign(min);
        this.max.assign(max);
        return this;
    }

    /**
     * 从点集合中设置数据。
     *
     * @param points 点数据
     * @return 盒子
     */
    public setFromPoints(points: Array<Vector2>): Box2 {
        this.reset();
        var count = points.length;
        for (var i = 0; i < count; i++) {
            var point = points[i];
            this.expandByPoint(point);
        }
        return this;
    }

    /**
     * 根据中心和大小设置数据。
     *
     * @param center 中心点
     * @param size 尺寸
     * @return 盒子
     */
    public setFromCenterAndSize(center: Vector2, size: Vector2): Box2 {
        var halfSize = size.clone().multiplyScalar(0.5);
        this.min.assign(center).sub(halfSize);
        this.max.assign(center).add(halfSize);
        return this;
    }

    /**
     * 是否包含点。
     *
     * @param value 数据
     * @return 是否包含
     */
    public containsPoint(point: Vector2): boolean {
        var min = this.min;
        var max = this.max;
        if (point.x < min.x || point.x > max.x || point.y < min.y || point.y > max.y) {
            return false;
        }
        return true;
    }

    /**
     * 是否包含盒子。
     *
     * @param box 盒子数据
     * @return 是否包含
     */
    public containsBox(box: Box2): boolean {
        var min = this.min;
        var max = this.max;
        if ((min.x <= box.min.x) && (box.max.x <= max.x) && (min.y <= box.min.y) && (box.max.y <= max.y)) {
            return true;
        }
        return false;
    }

    /**
     * 获得中心点。
     *
     * @param value 数据
     * @return 中心点
     */
    public center(value: Vector2): Vector2 {
        var result = value || new Vector2();
        return result.addVectors(this.min, this.max).multiplyScalar(0.5);
    }

    /**
     * 获得尺寸。
     *
     * @param value 数据
     * @return 中心点
     */
    public size(value?: Vector2): Vector2 {
        var result = value || new Vector2();
        return result.subVectors(this.max, this.min);
    }

    /**
     * 是否相交盒子。
     *
     * @param box 盒子数据
     * @return 是否相交
     */
    public intersectsBox(box: Box2): boolean {
        var min = this.min;
        var max = this.max;
        if (box.max.x < min.x || box.min.x > max.x || box.max.y < min.y || box.min.y > max.y) {
            return false;
        }
        return true;
    }

    /**
     * 两个盒子间是否有相同部分
     *
     * @return boolean
     */
    public hasSamePart(box: Box2) {
        var xbox: Box2 = this.clone().intersect(box);
        var res = false;
        if (
            xbox.min.x < xbox.max.x &&
            xbox.min.y < xbox.max.y 
        ) {
            res = true;
        }

        return res;
    }

    /**
      * 两个盒子间是否有相同部分
      *
      * @return boolean
     */
    nearlyHasSamePart(box: Box2) {
        var xbox: Box2 = this.clone().intersect(box);
        var res = false;
        if (
            MathUtil.nearlyLess(xbox.min.x, xbox.max.x) &&
            MathUtil.nearlyLess(xbox.min.y, xbox.max.y) 
        ) {
            return !xbox.isNearlyZeroArea();
        }

        return res;
    }

   
   

   /**
    * 面积近视为0
    */
    isNearlyZeroArea() {
        return (
            MathUtil.nearlyEquals(this.size().x, 0) ||
            MathUtil.nearlyEquals(this.size().y, 0)
        )
    }



    /**
     * 计算相交盒子。
     *
     * @param box 盒子数据
     * @return 相交盒子
     */
    public intersect(box: Box2): Box2 {
        this.min.max(box.min);
        this.max.min(box.max);
        return this;
    }

    /**
     * 计算合并盒子。
     *
     * @param box 盒子数据
     * @return 合并盒子
     */
    public union(box: Box2): Box2 {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    }

    /**
     * 移动盒子位置。
     *
     * @param offset 位置
     * @return 盒子
     */
    public translate(offset: Vector2): Box2 {
        this.min.add(offset);
        this.max.add(offset);
        return this;
    }

    /**
     * 扩展盒子点。
     *
     * @param point 点数据
     * @return 盒子
     */
    public expandByPoint(point: Vector2): Box2 {
        this.min.min(point);
        this.max.max(point);
        return this;
    }

    /**
     * 扩展盒子方向。
     *
     * @param vector 方向
     * @return 盒子
     */
    public expandByVector(vector: Vector2): Box2 {
        this.min.sub(vector);
        this.max.add(vector);
        return this;
    }

    /**
     * 扩展盒子缩放。
     *
     * @param scalar 缩放
     * @return 盒子
     */
    public expandByScalar(scalar: number): Box2 {
        this.min.addScalar(-scalar);
        this.max.addScalar(scalar);
        return this;
    }

    /**
     * 计算盒子和点之间距离。
     *
     * @param point 点数据
     * @return 距离
     */
    public distanceToPoint(point: Vector2): number {
        var clampedPoint = point.clone().clamp(this.min, this.max);
        return clampedPoint.sub(point).length();
    }

    /**
     * 将一个点计算到盒子内。
     *
     * @param point 点数据
     * @param value 数据
     * @return 点数据
     */
    public clampPoint(point: Vector2, value: Vector2): Vector2 {
        var result = value || new Vector2();
        return result.assign(point).clamp(this.min, this.max);
    }

    /**
     * 重置处理。
     */
    public reset() {
        this.min.x = this.min.y = +Infinity;
        this.max.x = this.max.y = -Infinity;
        return this;
    }

    /**
     * 克隆数据。
     *
     * @return 盒子
     */
    public clone() {
        return new (this as any).constructor().assign(this);
    }
}
