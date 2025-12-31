/**
 * Drawing-related types
 */

import type { Point, Rect } from './common.js';
import type { DrawingShape } from './document.js';

/**
 * Shape types supported by the drawing system
 */
export enum ShapeType {
  FreeHand = 'freehand',
  Rectangle = 'rect',
  Circle = 'circle',
  Line = 'line',
  Polyline = 'polyline',
}

/**
 * Freehand drawing shape
 */
export interface FreeHandShape extends DrawingShape {
  type: ShapeType.FreeHand;
  points: Point[];
}

/**
 * Rectangle shape
 */
export interface RectShape extends DrawingShape {
  type: ShapeType.Rectangle;
  start: Point;
  end: Point;
}

/**
 * Circle/ellipse shape
 */
export interface CircleShape extends DrawingShape {
  type: ShapeType.Circle;
  start: Point;
  end: Point;
}

/**
 * Line shape
 */
export interface LineShape extends DrawingShape {
  type: ShapeType.Line;
  start: Point;
  end: Point;
}

/**
 * Polyline shape (connected line segments)
 */
export interface PolylineShape extends DrawingShape {
  type: ShapeType.Polyline;
  points: Point[];
}

/**
 * Union type of all shape types
 */
export type AnyShape = FreeHandShape | RectShape | CircleShape | LineShape | PolylineShape;

/**
 * Shape change tracking
 */
export enum ShapeChangeType {
  Added = 'added',
  Updated = 'updated',
  Removed = 'removed',
}

export interface ShapeChange {
  shapeId: number;
  type: ShapeChangeType;
  timestamp: string;
  userId?: string;
}
