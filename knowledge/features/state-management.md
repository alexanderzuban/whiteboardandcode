# State Management

## Overview

The application uses Redux Toolkit for state management with redux-persist for automatic persistence to IndexedDB.

## Architecture

```
Store/
├── App.store.ts           # Root store configuration
└── indexed-db-storage.ts  # Custom IndexedDB storage adapter
```

## Redux Store Structure

```typescript
interface AppState {
    appView: AppViewState;          // UI view state
    appHotKeys: AppHotKeysState;    // Keyboard shortcuts
    drawingSettings: DrawingSettings; // Drawing tool settings
    content: ContentState;          // Documents and tabs
    textSettings: TextEditorSettings; // Code editor settings
}
```

## Slices

### appView
UI state like panel visibility, current view mode.

**File:** `UI/Main/app-view.store.ts`

### appHotKeys
Configurable keyboard shortcuts.

**File:** `UI/Drawing/HotKey/hotkeys.store.ts`

### drawingSettings
Current drawing tool, colors, line widths.

**File:** `Drawing/Store/drawing-settings.store.ts`

### content
Open documents, active document, tabs.

**File:** `UI/Content/Store/content.store.ts`

### textSettings
Code editor preferences (theme, font size, etc.).

**File:** `Text/Store/text-editor-settings.store.ts`

## Persistence

### IndexedDB Storage

Custom storage adapter in `indexed-db-storage.ts`:

```typescript
const persistConfig = {
    key: 'root',
    storage: createIdbStorage({
        name: "wandc-db-04",
        version: 2,
        storeName: "state",
    }),
    serialize: false,
    deserialize: false,
    throttle: 1000  // Persist max once per second
};
```

### Database Schema
- **Database name:** `wandc-db-04`
- **Version:** 2
- **Store name:** `state`

## Usage Patterns

### Accessing State

```typescript
import { useSelector } from 'react-redux';
import { AppState } from '../Store/App.store';

// In component
const drawingSettings = useSelector((state: AppState) => state.drawingSettings);
```

### Dispatching Actions

```typescript
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/App.store';
import { setCurrentProfile } from '../Drawing/Store/drawing-settings.store';

// In component
const dispatch = useDispatch<AppDispatch>();
dispatch(setCurrentProfile(newProfile));
```

### Slice Pattern

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
    value: number;
}

const initialState: MyState = { value: 0 };

const slice = createSlice({
    name: 'mySlice',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    }
});

export const { setValue } = slice.actions;
export default slice;
```

## In-Dispatch Helpers

For complex updates, helper files provide dispatch-aware functions:

- `Drawing/Store/drawing-document-in-dispatch.ts`
- `Drawing/Store/drawing-settings-in-dispatch.ts`
- `Text/Store/text-document-in-dispatch.ts`
- `UI/Content/Store/content-in-dispatch.ts`

These wrap multiple dispatch calls and handle cross-slice updates.

## Key Files

| File | Purpose |
|------|---------|
| `Store/App.store.ts` | Root store configuration |
| `Store/indexed-db-storage.ts` | IndexedDB adapter |
| `Drawing/Store/drawing-settings.store.ts` | Drawing settings slice |
| `UI/Content/Store/content.store.ts` | Content/documents slice |

## Adding a New Slice

1. Create slice file following naming convention: `{feature}.store.ts`
2. Define state interface and initial state
3. Create slice with reducers
4. Export actions and default slice
5. Add to root reducer in `App.store.ts`:

```typescript
const rootReducer = combineReducers({
    // existing slices...
    newFeature: sliceNewFeature.reducer,
});
```
