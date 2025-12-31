# Text Editor (Code Editor)

## Overview

The text editor feature provides a Monaco Editor integration for editing code with syntax highlighting and language support.

## Architecture

```
Text/
├── Store/
│   ├── text-document.ts              # Document interface
│   ├── text-document-in-dispatch.ts  # Dispatch helpers
│   └── text-editor-settings.store.ts # Editor settings slice
├── text-document-view.tsx            # Editor component
└── text-document-select-language-dialog.tsx  # Language picker
```

## Components

### TextDocumentView
Main editor component wrapping Monaco Editor.

**File:** `Text/text-document-view.tsx`

**Features:**
- Monaco Editor integration
- Language-aware syntax highlighting
- Theme support
- Auto-sizing to container

### LanguageSelectDialog
Modal for selecting programming language.

**File:** `Text/text-document-select-language-dialog.tsx`

## Data Model

### TextDocument

```typescript
interface TextDocument extends ContentDocument {
    type: DocumentType.Text;
    content: string;
    language: string;
}
```

### TextEditorSettings

```typescript
interface TextEditorSettings {
    theme: string;
    fontSize: number;
    tabSize: number;
    wordWrap: 'on' | 'off';
    minimap: boolean;
}
```

## Redux Integration

### Settings Slice

**File:** `Text/Store/text-editor-settings.store.ts`

Stores user preferences for the code editor:
- Theme (dark/light)
- Font size
- Tab size
- Word wrap setting
- Minimap visibility

## Monaco Editor Configuration

```typescript
import Editor from '@monaco-editor/react';

<Editor
    height="100%"
    language={document.language}
    value={document.content}
    theme={settings.theme}
    options={{
        fontSize: settings.fontSize,
        tabSize: settings.tabSize,
        wordWrap: settings.wordWrap,
        minimap: { enabled: settings.minimap }
    }}
    onChange={handleChange}
/>
```

## Supported Languages

Monaco Editor supports 50+ languages out of the box including:
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- HTML/CSS
- JSON/YAML
- Markdown
- SQL
- And many more...

## Key Files

| File | Purpose |
|------|---------|
| `text-document-view.tsx` | Main editor component |
| `Store/text-document.ts` | Document interface |
| `Store/text-editor-settings.store.ts` | Settings slice |

## Usage

### Creating a Text Document

```typescript
import { DocumentType } from '../UI/Content/Store/content.store';

const newTextDoc: TextDocument = {
    uid: uuid(),
    type: DocumentType.Text,
    name: 'untitled.js',
    content: '',
    language: 'javascript',
    unsaved: true
};
```

### Changing Editor Settings

```typescript
import { setTheme, setFontSize } from './Store/text-editor-settings.store';

dispatch(setTheme('vs-dark'));
dispatch(setFontSize(14));
```

## Extension Points

### Adding Custom Language Support
Monaco supports registering custom languages and themes. See Monaco Editor documentation for:
- `monaco.languages.register()`
- `monaco.languages.setMonarchTokensProvider()`
- `monaco.editor.defineTheme()`
