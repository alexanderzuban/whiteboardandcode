# Backend API

## Overview

The backend is a Fastify-based API designed for AWS Lambda deployment, providing RESTful endpoints for document management and real-time collaboration.

## Architecture

```
packages/server/
├── src/
│   ├── app.ts           # Fastify app configuration
│   ├── index.ts         # Package exports
│   ├── local.ts         # Local development server
│   ├── handlers/
│   │   └── api.ts       # Lambda handler
│   ├── routes/
│   │   ├── health.ts    # Health check endpoint
│   │   └── documents.ts # Document CRUD endpoints
│   ├── services/
│   │   └── document-service.ts  # Business logic
│   ├── middleware/      # Request middleware
│   └── utils/           # Utility functions
```

## Technology Stack

- **Fastify** - High-performance web framework
- **@fastify/aws-lambda** - Lambda adapter
- **@fastify/cors** - CORS support
- **@fastify/websocket** - WebSocket support (for real-time)
- **AWS SDK v3** - DynamoDB client

## API Endpoints

### Health Check
```
GET /api/health
Response: { status: "ok", timestamp: "...", version: "0.1.0" }
```

### Documents

```
GET    /api/documents      # List all documents
GET    /api/documents/:id  # Get single document
POST   /api/documents      # Create document
PUT    /api/documents/:id  # Update document
DELETE /api/documents/:id  # Delete document
```

### Request/Response Types

```typescript
// Create document
POST /api/documents
Body: { name: string, type: "drawing" | "text" }
Response: Document

// Update document
PUT /api/documents/:id
Body: { name?: string, content?: unknown }
Response: Document
```

## Lambda Handler

```typescript
// packages/server/src/handlers/api.ts
import awsLambdaFastify from '@fastify/aws-lambda';
import { buildApp } from '../app.js';

const app = buildApp({ logger: false });
const proxy = awsLambdaFastify(await app);

export const handler = proxy;
```

## Local Development

```bash
# Start local server
npm run dev --workspace=@whiteboardandcode/server

# Server runs on http://localhost:3001
```

## Configuration

Environment variables:
- `PORT` - Local server port (default: 3001)
- `HOST` - Local server host (default: 0.0.0.0)
- `CORS_ORIGIN` - Allowed CORS origin (default: *)
- `NODE_ENV` - Environment (dev/prod)
- `DOCUMENTS_TABLE` - DynamoDB table name

## Key Files

| File | Purpose |
|------|---------|
| `src/app.ts` | Fastify app factory |
| `src/handlers/api.ts` | Lambda entry point |
| `src/routes/documents.ts` | Document API routes |
| `src/services/document-service.ts` | Document business logic |

## Extension Points

### Adding New Routes
1. Create route file in `src/routes/`
2. Register in `app.ts`

### Adding Middleware
1. Create middleware in `src/middleware/`
2. Register in `app.ts` with `app.register()`

## Future Enhancements

- WebSocket support for real-time collaboration
- Authentication/authorization middleware
- DynamoDB implementation (currently in-memory)
- Rate limiting
- Request validation with JSON schemas
