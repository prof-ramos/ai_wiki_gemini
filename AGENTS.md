# Commands
- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run preview` - preview production build
- No automated lint/test scripts configured
  - Developers must run manual checks before committing:
    - Run `npm run build` to verify compilation
    - Run `npx tsc --noEmit` to check types
  - Note: CI may fail if these checks are skipped locally

# Code Style
- TypeScript with functional React components (no classes)
- Use interfaces for types, enums for constants
- Named imports from libraries, default exports for components
- Tailwind CSS for styling (prefix pattern: legal-*, accent-*, gold-*)
- JSDoc comments for component documentation
- camelCase for vars/functions, PascalCase for components, UPPER_CASE for constants
- Error handling: try-catch with proper error typing (error instanceof Error)
  ```typescript
  try {
    // ... operation
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      // Handle known error
    }
  }
  ```
- Path alias `@/*` maps to root directory
  ```typescript
  // Imports from project root
  import { MyComponent } from '@/components/MyComponent';
  ```
- Service files for API calls (services/)
- Type definitions in types.ts
