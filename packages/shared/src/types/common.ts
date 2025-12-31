/**
 * Common utility types shared across packages
 */

/**
 * Represents a nullable value
 */
export type Nullable<T> = T | null;

/**
 * 2D point coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Rectangle defined by position and dimensions
 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Size dimensions
 */
export interface Size {
  width: number;
  height: number;
}
