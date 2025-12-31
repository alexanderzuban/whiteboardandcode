# Drawing System

## Overview

The drawing system is the core functionality of the whiteboard, handling canvas rendering, user interactions, and shape management.

## Architecture

```
Drawing/
├── Operation/    # User interaction handlers
├── Painter/      # Canvas rendering utilities
├── Profile/      # Tool configurations
├── Shape/        # Shape data models and behaviors
└── Store/        # Drawing state management
```

### Component Relationships

```
User Input → Operation → Shape Behavior → Shape Data → Painter → Canvas
                ↓
            Redux Store (persistence)
```

## Key Concepts

### Drawing Document
The main data structure representing a drawing canvas:
- `shapes[]` - All shapes in the document
- `operation` - Current active operation
- `selectedShapes` - Currently selected shape IDs
- `origin` - Canvas pan offset
- `changes[]` - Change history for sync

### Profiles
Tool configurations that define drawing behavior:
- **Freehand Profile** - Pen-like drawing
- **Highlighter Profile** - Semi-transparent strokes
- **Eraser Profile** - Shape removal
- **Shape Profiles** - Rectangle, circle, line, polyline

### Operations
User interaction states:
- `NewShape` - Drawing a new shape
- `Select` - Selecting shapes
- `Translate` - Moving shapes
- `Pan` - Scrolling the canvas
- `Erase` - Removing shapes
- `Hover` - Mouse hover feedback

## Key Files

| File | Purpose |
|------|---------|
| `Store/drawing-document.ts` | Document interface and factory |
| `Store/drawing-settings.store.ts` | Redux slice for drawing settings |
| `Profile/profile.ts` | Profile type definitions |
| `Operation/operations.ts` | Operation type exports |
| `Shape/shapes.ts` | Shape type exports |

## API

### DrawingDocument Interface
```typescript
interface DrawingDocument extends ContentDocument {
    shapes: DrawingShape[];
    operation: Nullable<DrawingOperation>;
    selectedShapes: DrawingSelectedShapes;
    changes: DrawingShapeChange[];
    origin: Point;
}
```

### Creating a New Drawing
```typescript
import { newDrawingInstance } from './Store/drawing-document';

const drawing = newDrawingInstance();
// Returns initialized DrawingDocument with UUID
```

## Extension Points

### Adding a New Shape Type
1. Create files in `Shape/NewType/`:
   - `shape-newtype.ts` - Data model
   - `shape-newtype-behavior.ts` - Interaction logic
   - `shape-newtype-painter.ts` - Rendering
2. Export from `Shape/shapes.ts`
3. Add profile in `Profile/shape-profiles.ts`

### Adding a New Operation
1. Create folder in `Operation/NewOp/`
2. Implement operation state machine
3. Export from `Operation/operations.ts`
