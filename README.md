# Tern Test Project - Legacy Code Migration Demo

A realistic legacy codebase for demonstrating Tern's code transformation capabilities. This project contains real-world patterns that need migration, perfect for showcasing Tern's ability to handle complex transformations.

## Running the App

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser. All components use legacy patterns (findDOMNode, Closure APIs, etc.) that need migration.

## Validation Commands

```bash
# Run ESLint - passes with current tooling
npm run lint

# Try TypeScript type checking - shows why migration is needed
npm run typecheck

# Build with Vite - works perfectly
npm run build

# Run all validations
npm run validate
```

### Current State (Before Migration)

**With CURRENT tooling (Closure Compiler):**
- ✅ Code works perfectly
- ✅ Passes lint
- ✅ Builds successfully
- ✅ All components render and function

**With MODERN tooling (TypeScript):**
- ❌ TypeScript: 48+ errors (Closure-specific JSDoc syntax not supported)
- ❌ React 19: findDOMNode is deprecated
- ❌ Modern JS: Closure Library APIs need replacement

**This is why they need Tern**: Working legacy code that uses old patterns/tooling → needs migration to modern patterns/tooling.

## What's Inside

This is a **working application** with intentional legacy code patterns:

### 1. ReactDOM.findDOMNode Usage (React 19 incompatible)
**Files**: `src/components/*.jsx`

All components use the deprecated `ReactDOM.findDOMNode()` API:
- `UserProfile.jsx` - Basic findDOMNode usage
- `Modal.jsx` - Event listeners on DOM nodes
- `FormInput.jsx` - querySelector on multiple inputs
- `ImageGallery.jsx` - Measuring multiple images
- `DynamicList.jsx` - Dynamic list with querySelectorAll
- `Counter.jsx` - Race condition with state updates
- `NavLink.jsx` - Conditional element types
- `ScrollContainer.jsx` - Stored DOM reference

### 2. Closure Compiler APIs
**Files**: `src/utils/*.js`

Functions using Google Closure Library APIs that should be replaced with native JS or lodash:
- `arrayHelpers.js` - Array manipulation functions
- `validation.js` - Type checking and validation
- `userUtils.js` - User data operations
- `dataProcessing.js` - Data transformation functions

### 3. JSDoc Type Definitions
**Files**: `src/types/*.js`

Closure-compiler style JSDoc that needs to be TypeScript-compatible:
- `legacyTypes.js` - Working JSDoc typedefs
- `brokenTypes.js` - JSDoc with various issues
- `userService.js` - ES imports that should be @import

## Bug Documentation

See `BUGS.md` for detailed documentation of all the issues in this codebase. **Do not share this file with Tern** - it should discover these issues autonomously.

## Legacy Patterns by Difficulty

### Easy Transformations (Mechanical)
- JSDoc typedef syntax: `@typedef {{` → `@typedef {object}` + `@property`
- ES imports to JSDoc imports: `import { Type }` → `@import { Type }`
- Simple Closure API replacements: `goog.array.filter` → `Array.filter`

### Medium Transformations (Require Analysis)
- Null handling: `goog.isDefAndNotNull` → `!= null` (checks both null and undefined)
- Type coercion: `goog.array.map` handles non-arrays differently than `Array.map`
- In-place mutations: `goog.array.removeDuplicates` modifies array vs `[...new Set()]`

### Hard Transformations (Need Human Review)
- Multiple elements: querySelector for multiple inputs/images
- Child component access: findDOMNode reaching into children
- Conditional rendering: Different element types based on props
- Fragment returns: Multiple root elements
- Stored references: DOM nodes saved to instance variables
- HOC patterns: findDOMNode through wrapper components

## File Structure

```
schrodinger-test/
├── public/
│   └── index.html           # Runnable demo app
├── src/
│   ├── index.js             # App entry point
│   ├── components/          # React components (8 files)
│   │   ├── UserProfile.jsx
│   │   ├── Modal.jsx
│   │   ├── FormInput.jsx
│   │   ├── ImageGallery.jsx
│   │   ├── DynamicList.jsx
│   │   ├── Counter.jsx
│   │   ├── NavLink.jsx
│   │   └── ScrollContainer.jsx
│   ├── types/               # JSDoc typedefs (3 files)
│   │   ├── legacyTypes.js
│   │   ├── brokenTypes.js
│   │   └── some-module.js
│   └── utils/               # Closure API usage (5 files)
│       ├── arrayHelpers.js
│       ├── validation.js
│       ├── userUtils.js
│       ├── dataProcessing.js
│       └── userService.js
├── BUGS.md                  # Documentation of all bugs
├── package.json
└── README.md
```

## Using with Tern

### 1. Point Tern at this codebase
```bash
tern transform ./src
```

### 2. Expected Results

**Automatic Transformations**:
- JSDoc syntax fixes (mechanical)
- Simple Closure API replacements
- ES import → @import conversions

**Flagged for Review**:
- findDOMNode with querySelector (needs ref array)
- Null vs undefined handling changes
- Components with conditional rendering
- Stored DOM references
- Child component access patterns

**Already Broken (Should Flag)**:
- Missing null checks
- Type mismatches in JSDoc vs code
- Logic errors (backwards checks, redundant operations)
- Race conditions

### 3. Validation Workflow

1. **Before transformation**: Run lint/typecheck/tests → capture baseline
2. **Apply Tern transformations**: Transform code
3. **After transformation**: Run lint/typecheck/tests → compare results
4. **Adversarial AI review**: Check diffs for behavioral changes
5. **Flag for human review**: Any transformation that:
   - Introduces new errors
   - Changes behavior unexpectedly
   - Preserves bugs from broken original code

## Why This Project is Realistic

- ✓ **No syntax errors** - Everything compiles and runs
- ✓ **Production bugs** - Logic errors, missing null checks, race conditions
- ✓ **Multiple files** - Spread across ~15 files, not one monolith
- ✓ **Runnable app** - Actually works, can see it in action
- ✓ **Mixed quality** - Some code is fine, some is broken (like real codebases)
- ✓ **Hard cases** - Not just easy patterns, includes genuinely difficult transformations

## Installation

```bash
npm install
```

Then open `public/index.html` in your browser.

## Testing Tern's Capabilities

This codebase tests:

1. **Transformation accuracy**: Can it correctly transform legacy patterns?
2. **Bug detection**: Can it identify already-broken code?
3. **Behavioral analysis**: Can adversarial AI catch subtle changes (null vs undefined)?
4. **Human flagging**: Does it properly flag hard cases for manual review?
5. **Edge cases**: Null handling, type coercion, in-place mutations

---

**Note**: This is a test project. All bugs are intentional for testing purposes.
