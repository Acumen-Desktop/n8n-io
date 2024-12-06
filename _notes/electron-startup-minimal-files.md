# Minimal n8n Electron Startup Files

## Core Requirements
- Minimal dependencies for offline, local-only operation
- SQLite as default database
- No external authentication
- Local editor files only

## Startup Sequence Minimal Files
1. `packages/cli/src/commands/start.ts`
2. `packages/cli/src/server.ts`
3. Configuration files
4. Minimal services and dependencies

## Recommended Approach
- Remove cloud/external service dependencies
- Stub out unnecessary authentication methods
- Use local-only configuration
- Minimal error handling for offline mode

## Potential Challenges
- Removing external hooks
- Simplifying licensing
- Removing unnecessary network-dependent features

## Next Steps
- Create electron-specific configuration
- Stub out cloud/network dependent services
- Ensure all paths are relative to Electron app
