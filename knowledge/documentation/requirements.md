# Project Requirements

## Overview

WhiteboardAndCode is a collaborative web-based platform that combines a digital whiteboard with a code editor, enabling real-time collaboration on sketches, diagrams, and code.

## Functional Requirements

### Drawing Canvas

1. **Shape Drawing**
   - Users can draw basic shapes: rectangles, circles, lines, polylines
   - Users can draw freehand sketches
   - Support for different line widths and colors
   - Fill color support for closed shapes

2. **Drawing Tools**
   - Freehand drawing tool
   - Highlighter tool (semi-transparent strokes)
   - Eraser tool
   - Shape tools (rectangle, circle, line, polyline)

3. **Canvas Operations**
   - Pan/scroll the canvas
   - Select shapes (single and multi-select)
   - Move/translate selected shapes
   - Copy and duplicate shapes
   - Delete shapes
   - Hover highlighting

4. **Selection Features**
   - Bounding box display for selected shapes
   - Resize handles for selected shapes
   - Multi-shape selection support

### Code Editor

1. **Monaco Editor Integration**
   - Syntax highlighting for multiple languages
   - Language selection dialog
   - Standard code editing features

2. **Document Management**
   - Create new text/code documents
   - Switch between documents

### User Interface

1. **Tool Panels**
   - Drawing tool category selector
   - Profile editor (color, line width)
   - Hot key configuration

2. **Document Management**
   - Tab-based document switching
   - Document naming

### Data Persistence

1. **Local Storage** (Implemented)
   - All data persisted to IndexedDB
   - Automatic state persistence
   - Offline-first operation

2. **Cloud Storage** (In Progress)
   - Backend API for document CRUD
   - DynamoDB for document storage
   - Sync between local and cloud

### Backend API

1. **Document Management** (Scaffolded)
   - List documents
   - Get single document
   - Create new document
   - Update document
   - Delete document

2. **Health & Monitoring**
   - Health check endpoint
   - Version information

3. **Real-time Collaboration** (Planned)
   - WebSocket support for live updates
   - Cursor/presence indicators
   - Conflict resolution

## Non-Functional Requirements

### Performance
- Smooth drawing experience (60fps target)
- Efficient canvas rendering
- Throttled state persistence (1 second)
- Lambda cold start < 500ms

### Scalability
- Serverless architecture (pay-per-use)
- Auto-scaling with demand
- Global CDN distribution

### Browser Support
- Modern browsers (Chrome, Firefox, Safari - latest versions)
- Desktop-focused experience

### Technology Stack
- **Frontend**: React 18, TypeScript, Redux Toolkit
- **Backend**: Fastify, Node.js, AWS Lambda
- **Database**: DynamoDB (pay-per-request)
- **Infrastructure**: AWS CDK, CloudFront, S3

### Cost Optimization
- Serverless to minimize idle costs
- Pay-per-request DynamoDB billing
- Free tier eligible for low traffic

## Implementation Status

| Feature | Status |
|---------|--------|
| Drawing canvas | ✅ Implemented |
| Shape tools | ✅ Implemented |
| Code editor | ✅ Implemented |
| Local persistence | ✅ Implemented |
| Monorepo structure | ✅ Implemented |
| Backend API scaffold | ✅ Implemented |
| Infrastructure (CDK) | ✅ Implemented |
| DynamoDB integration | 🔄 In Progress |
| Real-time collaboration | 📋 Planned |
| User authentication | 📋 Planned |
| Export functionality | 📋 Planned |

## Future Considerations

- Real-time collaboration with WebSockets
- User authentication (Cognito)
- Export functionality (PNG, SVG, PDF)
- Undo/redo functionality
- Layer support
- Text annotations on canvas
- Shared workspaces/rooms
- Version history
