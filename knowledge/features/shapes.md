# Shape System

## Overview

Shapes are the visual elements drawn on the canvas. Each shape type follows a consistent three-file pattern for separation of concerns.

## Architecture

Each shape type has three files:
- **Data Model** (`shape-{type}.ts`) - Type definitions and data structure
- **Behavior** (`shape-{type}-behavior.ts`) - Interaction logic (hit testing, bounds, etc.)
- **Painter** (`shape-{type}-painter.ts`) - Canvas rendering

## Implemented Shapes

### FreeHand
Freehand pen strokes stored as point arrays.

```typescript
interface FreeHandShape extends DrawingShapeBase {
    type: 'freehand';
    points: Point[];
}
```

**Key Files:**
- `Shape/FreeHand/shape-freehand.ts`
- `Shape/FreeHand/shape-freehand-behavior.ts`
- `Shape/FreeHand/shape-freehand-painter.ts`

### Rectangle
Axis-aligned rectangles defined by two corner points.

```typescript
interface RectShape extends DrawingShapeBase {
    type: 'rect';
    start: Point;
    end: Point;
}
```

**Key Files:**
- `Shape/Rect/shape-rect.ts`
- `Shape/Rect/shape-rect-behavior.ts`
- `Shape/Rect/shape-rect-painter.ts`

### Circle
Circles/ellipses defined by bounding rectangle.

```typescript
interface CircleShape extends DrawingShapeBase {
    type: 'circle';
    start: Point;
    end: Point;
}
```

**Key Files:**
- `Shape/Circle/shape-circle.ts`
- `Shape/Circle/shape-circle-behavior.ts`
- `Shape/Circle/shape-circle-painter.ts`

### Line
Straight lines between two points.

```typescript
interface LineShape extends DrawingShapeBase {
    type: 'line';
    start: Point;
    end: Point;
}
```

**Key Files:**
- `Shape/Line/shape-line.ts`
- `Shape/Line/shape-line-behavior.ts`
- `Shape/Line/shape-line-painter.ts`

### Polyline
Connected line segments (open path).

```typescript
interface PolylineShape extends DrawingShapeBase {
    type: 'polyline';
    points: Point[];
}
```

**Key Files:**
- `Shape/Polyline/shape-polyline.ts`
- `Shape/Polyline/shape-polyline-behavior.ts`
- `Shape/Polyline/shape-polyline-painter.ts`

## Common Shape Properties

All shapes extend `DrawingShapeBase`:

```typescript
interface DrawingShapeBase {
    id: number;
    type: string;
    lineColor: string;
    lineWidth: number;
    fillColor?: string;
    opacity?: number;
}
```

## Shape Behavior API

Each behavior file exports functions for:

```typescript
// Hit testing - is point on/in shape?
function hitTest(shape: Shape, point: Point): boolean;

// Get bounding rectangle
function getBounds(shape: Shape): Rect;

// Translate shape by offset
function translate(shape: Shape, offset: Point): Shape;

// Scale/resize shape
function resize(shape: Shape, scale: Point, anchor: Point): Shape;
```

## Shape Painter API

Each painter file exports a render function:

```typescript
function paint(
    ctx: CanvasRenderingContext2D,
    shape: Shape,
    options?: PaintOptions
): void;
```

## Adding a New Shape

1. **Create data model** (`shape-newtype.ts`):
```typescript
export interface NewTypeShape extends DrawingShapeBase {
    type: 'newtype';
    // shape-specific properties
}
```

2. **Create behavior** (`shape-newtype-behavior.ts`):
```typescript
export function hitTest(shape: NewTypeShape, point: Point): boolean { }
export function getBounds(shape: NewTypeShape): Rect { }
export function translate(shape: NewTypeShape, offset: Point): NewTypeShape { }
```

3. **Create painter** (`shape-newtype-painter.ts`):
```typescript
export function paint(ctx: CanvasRenderingContext2D, shape: NewTypeShape): void { }
```

4. **Export from shapes.ts**:
```typescript
export * from './NewType/shape-newtype';
```
