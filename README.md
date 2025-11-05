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

## How to Use with Tern

1. Point Tern at this codebase
2. Create transformation rules for each pattern
3. Run transformations and validate results
4. Review flagged issues that couldn't be auto-fixed

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
│   └── LegacyComponent.jsx        # ReactDOM.findDOMNode usage
├── types/
│   └── legacyTypes.js             # Closure-style typedefs
└── utils/
    ├── userService.js             # ES imports for types
    └── legacyHelpers.js           # Google Closure APIs
```
