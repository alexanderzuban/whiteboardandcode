# CLAUDE.md

This file provides guidance for Claude Code when working with the whiteboardandcode project.

## Project Overview

A collaborative whiteboard and code editor platform enabling real-time collaboration with drawing tools, freehand sketches, and Monaco Editor for code editing. Deployed on AWS serverless infrastructure.

## Tech Stack

### Frontend (`packages/client`)
- **React 18** with TypeScript (strict mode)
- **Redux Toolkit** for state management with redux-persist
- **styled-components** for CSS-in-JS styling
- **Monaco Editor** for code editing
- **Ant Design** for UI components
- **Font Awesome Pro** for icons

### Backend (`packages/server`)
- **Fastify** - High-performance Node.js framework
- **AWS Lambda** - Serverless compute
- **DynamoDB** - NoSQL database (pay-per-request)
- **API Gateway** - HTTP/WebSocket API

### Infrastructure (`packages/infrastructure`)
- **AWS CDK** - Infrastructure as Code
- **CloudFront** - CDN for frontend
- **S3** - Static asset hosting

## Project Structure

```
whiteboardandcode/
├── packages/
│   ├── client/              # React frontend application
│   │   └── src/
│   │       ├── Common/      # Utility types and functions
│   │       ├── Drawing/     # Core drawing functionality
│   │       ├── Store/       # Redux store configuration
│   │       ├── Style/       # Theme and global styles
│   │       ├── Text/        # Code editor functionality
│   │       └── UI/          # React components
│   │
│   ├── server/              # Fastify API (Lambda)
│   │   └── src/
│   │       ├── handlers/    # Lambda handlers
│   │       ├── routes/      # API routes
│   │       ├── services/    # Business logic
│   │       └── middleware/  # Request middleware
│   │
│   ├── shared/              # Shared TypeScript types
│   │   └── src/types/       # Common interfaces
│   │
│   └── infrastructure/      # AWS CDK stacks
│       ├── bin/             # CDK app entry
│       └── lib/             # Stack definitions
│
├── knowledge/               # Project documentation
├── package.json             # Monorepo root (npm workspaces)
└── CLAUDE.md
```

## Commands

```bash
# Root commands (from project root):
npm install               # Install all dependencies
npm run dev               # Start frontend dev server
npm run dev:server        # Start backend dev server
npm run dev:all           # Start both frontend and backend
npm run build             # Build all packages
npm run test              # Run all tests
npm run deploy:dev        # Deploy to dev environment
npm run deploy:prod       # Deploy to production

# Package-specific commands:
npm run build --workspace=@whiteboardandcode/client
npm run build --workspace=@whiteboardandcode/server
npm run build --workspace=@whiteboardandcode/shared
npm run build --workspace=@whiteboardandcode/infrastructure
```

## Architecture Patterns

### Monorepo Structure
- **npm workspaces** for package management
- Shared types in `@whiteboardandcode/shared`
- Scoped package names: `@whiteboardandcode/*`

### Frontend (packages/client)
- Redux store with IndexedDB persistence
- Canvas-based rendering for drawing
- Shape system: data model + behavior + painter pattern

### Backend (packages/server)
- Fastify with AWS Lambda adapter
- RESTful API with WebSocket support for real-time
- DynamoDB single-table design

### Infrastructure (packages/infrastructure)
- AWS CDK with TypeScript
- Separate stacks: Database, API, Frontend
- Environment-based deployments (dev/prod)

## Key Files

### Frontend
- `packages/client/src/Store/App.store.ts` - Redux configuration
- `packages/client/src/Drawing/Store/drawing-document.ts` - Document state
- `packages/client/src/Drawing/Shape/shapes.ts` - Shape exports

### Backend
- `packages/server/src/app.ts` - Fastify app configuration
- `packages/server/src/handlers/api.ts` - Lambda handler
- `packages/server/src/routes/documents.ts` - Document API

### Shared
- `packages/shared/src/types/document.ts` - Document types
- `packages/shared/src/types/drawing.ts` - Drawing types
- `packages/shared/src/types/api.ts` - API types

### Infrastructure
- `packages/infrastructure/lib/api-stack.ts` - API Gateway + Lambda
- `packages/infrastructure/lib/database-stack.ts` - DynamoDB
- `packages/infrastructure/lib/frontend-stack.ts` - S3 + CloudFront

## Development Notes

- Use `workspace:*` for internal package dependencies
- Build shared package first: `npm run build:shared`
- Local dev uses in-memory store; production uses DynamoDB
- Frontend port: 3000, Backend port: 3001

## Knowledge Base

The `/knowledge` folder contains project documentation that MUST be maintained:

```
knowledge/
├── documentation/    # Requirements and specifications
├── features/         # Feature documentation, architecture, APIs
└── history/          # Prompt history organized by date
```

### MANDATORY: After Every Change

After completing any task that modifies the codebase, Claude MUST:

1. **Update Feature Documentation** (`knowledge/features/`)
   - If a new feature was added, create a new documentation file
   - If an existing feature was modified, update the relevant documentation
   - Document architecture, APIs, and usage examples

2. **Update Requirements** (`knowledge/documentation/requirements.md`)
   - Add new requirements if functionality was added
   - Mark requirements as implemented if completed

3. **Log the Prompt** (`knowledge/history/YYYY-MM-DD.md`)
   - Add the user's prompt to today's history file
   - Create the file if it doesn't exist
   - Include a brief summary of what was done

### Documentation Standards

- Use Markdown format for all documentation
- Include code examples where applicable
- Reference source file paths for key implementations
- Keep documentation concise but comprehensive

### Review Checklist

Before completing a session, verify:
- [ ] All new/modified features are documented
- [ ] Today's prompts are logged in history
- [ ] Requirements reflect current functionality
- [ ] No stale documentation references removed code
