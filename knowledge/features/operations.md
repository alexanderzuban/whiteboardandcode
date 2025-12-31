# Drawing Operations

## Overview

Operations handle user interactions with the canvas. They implement state machines that respond to mouse/touch events and modify the drawing document.

## Architecture

```
Operation/
├── CopyTranslate/   # Duplicate and move shapes
├── Erase/           # Remove shapes
├── Hover/           # Mouse hover feedback
├── NewShape/        # Create new shapes
├── None/            # Idle state
├── Pan/             # Scroll canvas
├── Select/          # Select shapes
├── Translate/       # Move shapes
└── operations.ts    # Type exports
```

## Implemented Operations

### None
Default idle state when no operation is active.

**File:** `Operation/None/operation-none.ts`

### NewShape
Creates new shapes based on the current drawing profile.

**Files:**
- `Operation/NewShape/operation-new-shape.ts`
- `Operation/NewShape/operation-new-shape-painter.ts`
- `Operation/NewShape/new-shape-settings.ts`

**Flow:**
1. Mouse down → Start shape at point
2. Mouse move → Update shape preview
3. Mouse up → Finalize shape, add to document

### Select
Handles shape selection via click or drag box.

**Files:**
- `Operation/Select/operation-select.ts`
- `Operation/Select/operation-select-painter.ts`

**Features:**
- Click to select single shape
- Drag to create selection box
- Shift+click for multi-select

### Translate
Moves selected shapes.

**File:** `Operation/Translate/operation-translate.ts`

**Flow:**
1. Mouse down on selected shape
2. Mouse move → Update shape positions
3. Mouse up → Commit new positions

### CopyTranslate
Duplicates and moves selected shapes.

**File:** `Operation/CopyTranslate/operation-copy-translate.ts`

**Flow:**
1. Triggered with modifier key (Alt/Option)
2. Creates copies of selected shapes
3. Moves copies with mouse

### Pan
Scrolls the canvas viewport.

**File:** `Operation/Pan/operation-pan.ts`

**Trigger:** Middle mouse button or space+drag

### Erase
Removes shapes from the document.

**Files:**
- `Operation/Erase/operation-erase.ts`
- `Operation/Erase/operation-erase-painter.ts`

**Mode:** Click or drag over shapes to erase

### Hover
Provides visual feedback when hovering over shapes.

**Files:**
- `Operation/Hover/operation-hover.ts`
- `Operation/Hover/operation-hover-painter.ts`

## Operation State Machine

```
None ──────┬──────→ NewShape (draw tool active)
           ├──────→ Select (select tool or click on empty)
           ├──────→ Pan (middle mouse / space+drag)
           └──────→ Erase (eraser tool active)

Select ────┬──────→ Translate (drag selected shape)
           └──────→ CopyTranslate (alt+drag selected)

[Any] ─────────────→ None (mouse up / escape)
```

## Operation Interface

```typescript
interface DrawingOperation {
    type: OperationType;
    // Operation-specific state
}

enum OperationType {
    None,
    NewShape,
    Select,
    Translate,
    CopyTranslate,
    Pan,
    Erase,
    Hover
}
```

## Event Handling

Operations respond to these events:
- `onMouseDown(point: Point, event: MouseEvent)`
- `onMouseMove(point: Point, event: MouseEvent)`
- `onMouseUp(point: Point, event: MouseEvent)`
- `onKeyDown(event: KeyboardEvent)`
- `onKeyUp(event: KeyboardEvent)`

## Adding a New Operation

1. Create folder `Operation/NewOp/`
2. Implement operation file:
```typescript
export interface NewOpOperation extends DrawingOperationBase {
    type: 'newop';
    // operation state
}

export function startNewOp(point: Point): NewOpOperation { }
export function updateNewOp(op: NewOpOperation, point: Point): NewOpOperation { }
export function finishNewOp(op: NewOpOperation): DrawingDocument { }
```

3. Add painter if visual feedback needed
4. Export from `operations.ts`
5. Integrate into operation state machine
