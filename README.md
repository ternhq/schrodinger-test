# Tern Test Project - Legacy Code Migration Demo

This test project demonstrates common legacy code patterns that need migration, perfect for showcasing Tern's capabilities.

## Legacy Patterns Included

### 1. ReactDOM.findDOMNode → Refs Migration
**File**: `src/components/LegacyComponent.jsx`

**Problem**: Uses deprecated `ReactDOM.findDOMNode()` API that's incompatible with React 19.

**Current Pattern**:
```javascript
const domNode = ReactDOM.findDOMNode(this);
domNode.style.backgroundColor = 'lightblue';
```

**Target Pattern**:
```javascript
this.divRef = React.createRef();
// In componentDidMount:
this.divRef.current.style.backgroundColor = 'lightblue';
// In render:
<div ref={this.divRef}>...</div>
```

### 2. Closure Compiler JSDoc → TypeScript Compatible JSDoc
**File**: `src/types/legacyTypes.js`

**Problem**: Uses closure-compiler specific `@typedef {{` syntax that's not TypeScript compatible.

**Current Pattern**:
```javascript
/**
 * @typedef {{
 *   some: string,
 *   keys: number
 * }} SomeType
 */
```

**Target Pattern**:
```javascript
/**
 * @typedef {object} SomeType
 * @property {string} some
 * @property {number} keys
 */
```

### 3. ES Imports → JSDoc @import
**File**: `src/utils/userService.js`

**Problem**: Uses ES module imports for type-only imports instead of JSDoc @import.

**Current Pattern**:
```javascript
import { SomeType } from './some-module';
```

**Target Pattern**:
```javascript
/**
 * @import { SomeType } from './some-module';
 */
```

### 4. Google Closure APIs → Native JS/Lodash
**File**: `src/utils/legacyHelpers.js`

**Problem**: Uses Google Closure Compiler APIs that should be replaced with modern alternatives.

**Examples**:

| Legacy API | Modern Alternative |
|------------|-------------------|
| `goog.array.filter()` | `Array.filter()` |
| `goog.isDefAndNotNull()` | `value != null` or lodash |
| `goog.array.find()` | `Array.find()` |
| `goog.array.map()` | `Array.map()` |
| `goog.array.contains()` | `Array.includes()` |
| `goog.array.flatten()` | `Array.flat()` or lodash.flatten |
| `goog.isDef()` | `value !== undefined` |
| `goog.isNull()` | `value === null` |

## Broken Code Examples

This repo also includes intentionally broken code to test Tern's ability to detect and flag problematic transformations.

### Broken React Components
**File**: `src/components/BrokenComponent.jsx`

Examples include:
- **Syntax errors**: Missing braces, incomplete code
- **Logic errors**: Using findDOMNode before mount, missing null checks
- **Ambiguous patterns**: Components that render different elements conditionally
- **Untransformable patterns**: Using findDOMNode to access child component internals
- **Type errors**: Missing prop validation, undefined checks

### Broken JSDoc Types
**File**: `src/types/brokenTypes.js`

Examples include:
- **Syntax errors**: Missing/extra braces, invalid type syntax
- **Logic errors**: Type mismatches (typedef says string but code uses it as number)
- **Circular references**: Types that reference themselves
- **Duplicate properties**: Same property defined multiple times
- **Invalid closure syntax**: Malformed union types, empty generics

### Broken Closure API Usage
**File**: `src/utils/brokenHelpers.js`

Examples include:
- **Null handling issues**: Code that works with goog.array.filter(null) but crashes with Array.filter(null)
- **Type mismatches**: Passing wrong types that goog APIs handle but native APIs don't
- **Logic errors**: Backwards logic, redundant operations
- **Side effects**: Modifying arrays during iteration
- **In-place mutations**: Using APIs that modify in-place vs returning new values
- **Performance issues**: Inefficient patterns that get worse after transformation

### Why These Matter

These broken examples help test:

1. **Detection**: Can Tern identify code that's already broken?
2. **Preservation**: Does transformation make broken code worse?
3. **Flagging**: Can AI reviewers catch subtle bugs that mechanical checks miss?
4. **Edge cases**: Null handling, type coercion, behavioral differences

## How to Use with Tern

1. Point Tern at this codebase
2. Create transformation rules for each pattern
3. Run transformations and validate results
4. Review flagged issues that couldn't be auto-fixed

### Testing Broken Code Detection

**Recommended workflow**:
1. Run lint/typecheck/tests on original code → capture baseline errors
2. Apply Tern transformations
3. Run lint/typecheck/tests on transformed code → compare errors
4. Use adversarial AI to review diffs for behavioral changes
5. Flag any transformations that:
   - Introduce new errors
   - Change behavior unexpectedly
   - Preserve bugs from broken original code

## Expected Outcomes

- **Automated**: Most patterns should be automatically transformable
- **Manual Review**: Some cases may need human review:
  - Complex ref patterns in React components
  - Nested JSDoc types with unusual structures
  - Closure API usage with complex side effects

## Installation

```bash
npm install
```

## Files Overview

```
src/
├── components/
│   ├── LegacyComponent.jsx        # ReactDOM.findDOMNode usage (working)
│   └── BrokenComponent.jsx        # ReactDOM.findDOMNode usage (broken)
├── types/
│   ├── legacyTypes.js             # Closure-style typedefs (working)
│   └── brokenTypes.js             # Closure-style typedefs (broken)
└── utils/
    ├── userService.js             # ES imports for types (working)
    ├── legacyHelpers.js           # Google Closure APIs (working)
    └── brokenHelpers.js           # Google Closure APIs (broken)
```
