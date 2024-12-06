# n8n Electron Build Requirements Analysis

## Minimum Required n8n Components

Based on the n8n architecture, these are the essential components needed for a minimal working electron build:

### Core Components
1. **Editor UI Build**
   - Location: `packages/editor-ui/dist`
   - Contains the compiled Vue frontend
   - Critical for workflow editing interface

2. **Core Runtime**
   - Location: `packages/core/dist`
   - Essential for workflow execution
   - Contains base types and utilities

3. **CLI Build**
   - Location: `packages/cli/dist`
   - Handles server functionality
   - Manages database connections
   - API endpoints

4. **Base Nodes**
   - Location: `packages/nodes-base/dist`
   - Minimum set of essential nodes
   - Core functionality nodes (HTTP, Function, etc.)

### Database Requirements
- SQLite as default for desktop
- Located at: `~/.n8n/database.sqlite`
- Migrations from `packages/cli/dist/databases/sqlite`

## Integration Strategy

### 1. Build Process

```bash
# Example build script
pnpm install
pnpm build
```

Copy required dist folders to electron app:
```
electron-app/
├── backend/
│   ├── cli/          # from packages/cli/dist
│   ├── core/         # from packages/core/dist
│   └── nodes-base/   # from packages/nodes-base/dist
├── frontend/
│   └── editor-ui/    # from packages/editor-ui/dist
```

### 2. Electron Structure
```
electron-app/
├── main.js           # Electron main process
├── preload.js        # Secure bridge script
└── renderer/         # Frontend content
```

## Implementation Notes

1. **Process Management**
   - Main process launches n8n backend on port 5679
   - Renderer process loads editor UI
   - IPC handles communication between processes

2. **File System Access**
   - Use electron's `app.getPath('userData')` for storage
   - Default paths:
     - Windows: `%APPDATA%/n8n-desktop`
     - macOS: `~/Library/Application Support/n8n-desktop`
     - Linux: `~/.config/n8n-desktop`

3. **Build Configuration**
```
// electron-builder.config.js
{
  "files": [
    "backend/**/*",
    "frontend/**/*",
    "!node_modules/**/*"
  ],
  "extraResources": [
    {
      "from": "backend",
      "to": "backend",
      "filter": ["**/*"]
    }
  ]
}
```

4. **Development Workflow**
```
# Development
npm run dev:electron  # Watch n8n changes
npm run dev:main     # Watch electron main
npm run dev:renderer # Watch electron renderer

# Production
npm run build:n8n    # Build n8n
npm run build:electron # Build electron
```

## Testing Strategy

1. **Local Development**
   ```bash
   # Start n8n in one terminal
   cd n8n
   pnpm build
   pnpm start

   # Start electron in another terminal
   cd electron-app
   npm run dev
   ```

2. **Production Testing**
   - Build complete package
   - Test installation process
   - Verify all core functionality
   - Check resource usage
   - Test updates

## Optimization Opportunities

1. **Bundle Size**
   - Remove unnecessary node modules
   - Use webpack/rollup for better tree shaking
   - Implement lazy loading for nodes

2. **Startup Time**
   - Cache frequently used data
   - Optimize database initialization
   - Implement progressive loading

3. **Resource Usage**
   - Monitor memory usage
   - Implement garbage collection strategies
   - Optimize background processes

## Next Steps

1. Create proof-of-concept with minimal build
2. Test core functionality
3. Implement proper IPC
4. Add auto-updates
5. Optimize build size
6. Implement proper logging
7. Add crash reporting

This document should be updated as we discover more requirements during implementation.
