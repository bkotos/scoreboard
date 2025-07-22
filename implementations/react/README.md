# Scoreboard - React Implementation

This is the React implementation of the scoreboard application.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

This will:
- Copy vendor assets (Bulma CSS) to the public directory
- Build the React application with watch mode
- Start an HTTP server on port 8080

## Available Scripts

- `npm run build` - Build the application for production
- `npm run build:watch` - Build and watch for changes
- `npm run serve` - Serve the public directory on port 8080
- `npm start` - Run build:watch and serve in parallel
- `npm run lint:check` - Check code formatting
- `npm run lint:fix` - Fix code formatting

## Project Structure

This is a completely self-contained React implementation with its own build assets and public directory:

- `src/` - React source code
  - `App.tsx` - Main application component  
  - `Team.tsx` - Team component with scoring functionality
  - `index.tsx` - Application entry point
  - `hooks/` - Custom React hooks
    - `useGameState.ts` - Game state management with localStorage
    - `useLocalStorage.ts` - localStorage utility hook
- `public/` - Static assets served by this implementation
  - `index.html` - HTML template
  - `build/` - Built JavaScript output
  - `vendor/` - Third-party assets (Bulma CSS)
- `package.json` - React-specific dependencies and scripts
- `build-react.js` - Estrella build configuration
- `copy-vendor.sh` - Script to copy Bulma CSS from node_modules

## Testing

Tests are run from the root project directory using Cypress. The tests validate this implementation when it's running on port 8080. 