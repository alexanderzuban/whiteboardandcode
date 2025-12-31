# Monorepo Structure

## Overview

The project uses npm workspaces to manage multiple packages in a single repository, enabling code sharing and coordinated development across frontend, backend, and infrastructure.

## Package Structure

```
whiteboardandcode/
├── packages/
│   ├── client/           # @whiteboardandcode/client
│   ├── server/           # @whiteboardandcode/server
│   ├── shared/           # @whiteboardandcode/shared
│   └── infrastructure/   # @whiteboardandcode/infrastructure
├── knowledge/            # Documentation
├── package.json          # Root workspace configuration
└── CLAUDE.md
```

## Packages

### @whiteboardandcode/client
React frontend application.

**Dependencies:**
- `@whiteboardandcode/shared` (workspace)
- React, Redux, Monaco Editor, etc.

### @whiteboardandcode/server
Fastify API for AWS Lambda.

**Dependencies:**
- `@whiteboardandcode/shared` (workspace)
- Fastify, AWS SDK, etc.

### @whiteboardandcode/shared
Shared TypeScript types and utilities.

**Exports:**
- Document types
- Drawing types
- API types
- Common utilities

### @whiteboardandcode/infrastructure
AWS CDK infrastructure definitions.

**No internal dependencies** (uses CDK constructs only)

## Workspace Configuration

```json
// Root package.json
{
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "npm run dev --workspace=@whiteboardandcode/client",
    "build": "npm run build --workspaces"
  }
}
```

## Dependency Management

### Internal Dependencies
Use `workspace:*` protocol:

```json
{
  "dependencies": {
    "@whiteboardandcode/shared": "workspace:*"
  }
}
```

### Installing Dependencies
```bash
# Install to specific package
npm install lodash --workspace=@whiteboardandcode/server

# Install to root (dev tools)
npm install -D concurrently
```

## Build Order

Packages must be built in dependency order:

1. `@whiteboardandcode/shared` (no dependencies)
2. `@whiteboardandcode/client` (depends on shared)
3. `@whiteboardandcode/server` (depends on shared)
4. `@whiteboardandcode/infrastructure` (standalone)

The `npm run build` command handles this automatically.

## Development Workflow

```bash
# Install all dependencies
npm install

# Build shared types first
npm run build:shared

# Start development
npm run dev:all    # Both frontend and backend
npm run dev        # Frontend only
npm run dev:server # Backend only
```

## Common Commands

```bash
# Run command in specific workspace
npm run test --workspace=@whiteboardandcode/client

# Run command in all workspaces
npm run build --workspaces

# Run if script exists
npm run lint --workspaces --if-present

# Clean all build artifacts
npm run clean
```

## Adding a New Package

1. Create directory: `mkdir packages/newpkg`
2. Initialize: `cd packages/newpkg && npm init`
3. Set name: `@whiteboardandcode/newpkg`
4. Add to build scripts if needed

## Best Practices

1. **Shared types go in `shared` package** - Avoid duplicating types
2. **Build shared first** - Other packages depend on it
3. **Use workspace protocol** - `workspace:*` for internal deps
4. **Scope all packages** - `@whiteboardandcode/*`
5. **Keep root minimal** - Only dev tools at root level
