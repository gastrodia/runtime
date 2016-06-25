import {Vector2} from '../../../../runtime/math/Vector2';
import {ShapeUtils} from '../ShapeUtils';
import {EllipseCurve} from '../curve/EllipseCurve';
import {LineCurve} from '../curve/LineCurve';
import {CurvePath} from './CurvePath';

/**
 * 多边形。
 *
 * @author maocy
 * @history 160506
 */
export class Path extends CurvePath {

	public actions: Array<any>;

	/**
	 * 构造处理。
	 */
	public constructor(points?: any) {
		super();
		// 设置属性
		if (points) {
			this.fromPoints(points);
		}
	}

	public fromPoints(vectors) {
		this.moveTo(vectors[0].x, vectors[0].y);
		for (var i = 1, l = vectors.length; i < l; i++) {
			this.lineTo(vectors[i].x, vectors[i].y);
		}
	}

	public moveTo(x, y) {
		this.actions.push({ action: 'moveTo', args: [x, y] });
	}

	public lineTo(x, y) {
		var lastargs = this.actions[this.actions.length - 1].args;
		var x0 = lastargs[lastargs.length - 2];
		var y0 = lastargs[lastargs.length - 1];
		var curve = new LineCurve(new Vector2(x0, y0), new Vector2(x, y));
		this.curves.push(curve);
		this.actions.push({ action: 'lineTo', args: [x, y] });
	}

	public arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
		var lastargs = this.actions[this.actions.length - 1].args;
		var x0 = lastargs[lastargs.length - 2];
		var y0 = lastargs[lastargs.length - 1];
		this.absarc(aX + x0, aY + y0, aRadius, aStartAngle, aEndAngle, aClockwise);
	}

	public absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
		this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
	}

	public absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation?: any) {
		var args = [
			aX, aY,
			xRadius, yRadius,
			aStartAngle, aEndAngle,
			aClockwise,
			aRotation || 0 // aRotation is optional.
		];
		var curve = new EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
		this.curves.push(curve);
		var lastPoint = curve.getPoint(1);
		args.push(lastPoint.x);
		args.push(lastPoint.y);
		this.actions.push({ action: 'ellipse', args: args });
	}

	public getPoints(divisions?: number) {
		divisions = divisions || 12;
		// var b2 = ShapeUtils.b2;
		// var b3 = ShapeUtils.b3;
		var points = [];
		var cpx, cpy, cpx2, cpy2, cpx1, cpy1, cpx0, cpy0, laste, tx, ty;
		for (var i = 0, l = this.actions.length; i < l; i++) {
			var item = this.actions[i];
			var action = item.action;
			var args = item.args;
			switch (action) {
				case 'moveTo':
					points.push(new Vector2(args[0], args[1]));
					break;
				case 'lineTo':
					points.push(new Vector2(args[0], args[1]));
					break;
				case 'arc':
					var aX = args[0], aY = args[1],
						aRadius = args[2],
						aStartAngle = args[3], aEndAngle = args[4],
						aClockwise = !!args[5];
					var deltaAngle = aEndAngle - aStartAngle;
					var angle;
					var tdivisions = divisions * 2;
					for (var j = 1; j <= tdivisions; j++) {
						var t = j / tdivisions;
						if (!aClockwise) {
							t = 1 - t;
						}
						angle = aStartAngle + t * deltaAngle;
						tx = aX + aRadius * Math.cos(angle);
						ty = aY + aRadius * Math.sin(angle);
						//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);
						points.push(new Vector2(tx, ty));
					}
					//console.log(points);
					break;
				case 'ellipse':
					var aX = args[0], aY = args[1],
						xRadius = args[2],
						yRadius = args[3],
						aStartAngle = args[4], aEndAngle = args[5],
						aClockwise = !!args[6],
						aRotation = args[7];
					var deltaAngle = aEndAngle - aStartAngle;
					var angle;
					var tdivisions = divisions * 2;
					var cos, sin;
					if (aRotation !== 0) {
						cos = Math.cos(aRotation);
						sin = Math.sin(aRotation);
					}
					for (var j = 1; j <= tdivisions; j++) {
						var t = j / tdivisions;
						if (!aClockwise) {
							t = 1 - t;
						}
						angle = aStartAngle + t * deltaAngle;
						tx = aX + xRadius * Math.cos(angle);
						ty = aY + yRadius * Math.sin(angle);
						if (aRotation !== 0) {
							var x = tx, y = ty;
							// Rotate the point about the center of the ellipse.
							tx = (x - aX) * cos - (y - aY) * sin + aX;
							ty = (x - aX) * sin + (y - aY) * cos + aY;
						}
						//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);
						points.push(new Vector2(tx, ty));
					}
					//console.log(points);
					break;
			} // end switch
		}
		// Normalize to remove the closing point by default.
		var lastPoint = points[points.length - 1];
		if (Math.abs(lastPoint.x - points[0].x) < Number.EPSILON && Math.abs(lastPoint.y - points[0].y) < Number.EPSILON) {
			points.splice(points.length - 1, 1);
		}
		if (this.autoClose) {
			points.push(points[0]);
		}
		return points;
	}
}
