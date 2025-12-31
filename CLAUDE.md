# CLAUDE.md

This file provides guidance for Claude Code when working with the whiteboardandcode project.

## Project Overview

A React/TypeScript whiteboard and code editor application that allows users to draw shapes, freehand sketches, and edit code with Monaco Editor. The application persists state to IndexedDB.

## Tech Stack

- **React 18** with TypeScript (strict mode)
- **Redux Toolkit** for state management with redux-persist
- **styled-components** for CSS-in-JS styling
- **Monaco Editor** for code editing
- **Ant Design** for UI components
- **Font Awesome Pro** for icons
- **IndexedDB** (via idb library) for local persistence

## Project Structure

```
client-ui/
└── src/
    ├── Common/           # Utility types and functions (Point, Size, arrays, etc.)
    ├── Drawing/          # Core drawing functionality
    │   ├── Operation/    # Drawing operations (Erase, Hover, NewShape, Pan, Select, Translate)
    │   ├── Painter/      # Canvas rendering (background, selection)
    │   ├── Profile/      # Drawing tool profiles (freehand, highlighter, eraser, shapes)
    │   ├── Shape/        # Shape implementations (Circle, FreeHand, Line, Polyline, Rect)
    │   └── Store/        # Drawing state management
    ├── Store/            # Root Redux store configuration
    ├── Style/            # Theme and global styles
    ├── Text/             # Text/code editor functionality
    └── UI/               # React components
        ├── Component/    # Reusable components (ColorPicker, LineWidthPicker, Modal, Panel)
        ├── Content/      # Content view and state
        ├── Drawing/      # Drawing UI (CategoryEditor, ProfileEditor, SelectionEditor, HotKey)
        └── Main/         # Main app view
```

## Commands

```bash
# From client-ui directory:
npm start         # Start development server
npm run build     # Production build
npm test          # Run tests
```

## Architecture Patterns

### State Management
- Redux store in `src/Store/App.store.ts` combines multiple slices
- State persisted to IndexedDB via custom `indexed-db-storage.ts`
- Redux slices: `appView`, `appHotKeys`, `drawingSettings`, `content`, `textSettings`

### Drawing System
- **Shapes**: Each shape type (Circle, FreeHand, Line, Polyline, Rect) has three files:
  - `shape-{type}.ts` - Data model and type definitions
  - `shape-{type}-behavior.ts` - Interaction logic
  - `shape-{type}-painter.ts` - Canvas rendering
- **Operations**: Implement user interactions (pan, select, draw, erase, translate)
- **Profiles**: Define tool configurations (colors, line widths, behaviors)

### Naming Conventions
- Files use kebab-case with descriptive prefixes: `shape-`, `operation-`, `profile-`
- React components use PascalCase
- Redux slices prefix: `slice`
- Store files suffix: `.store.ts`

### TypeScript Patterns
- Strict mode enabled
- `Nullable<T>` utility type for optional values
- Interfaces for data structures (DrawingDocument, DrawingShape, etc.)
- Enums for type constants (DrawingShapeChangeType, DocumentType)

## Key Files

- `src/Store/App.store.ts` - Redux store configuration
- `src/Drawing/Store/drawing-document.ts` - Drawing document state interface
- `src/Drawing/Shape/shapes.ts` - Shape type exports
- `src/Drawing/Operation/operations.ts` - Operation type exports
- `src/UI/Content/Store/content.store.ts` - Content management

## Development Notes

- No backend currently - all data persisted locally in IndexedDB
- Canvas-based rendering for drawing shapes
- Hot keys configurable through the UI
- Multiple document types supported: Drawing and Text (code editor)
