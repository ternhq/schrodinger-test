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

This repo includes **realistic** broken code that exists in production codebases. These are all **valid JavaScript that runs**, but have logic errors, edge case bugs, or issues that transformations might expose or worsen.

> **Important**: No syntax errors! Everything here compiles and runs. These represent the types of bugs that actually make it to production.

### Broken React Components
**File**: `src/components/BrokenComponent.jsx`

All valid React code that runs in production, but has bugs. Includes **hard transformation cases**:

**Simple bugs (but realistic)**:
- **Logic errors**: Using findDOMNode before component mounts (returns null)
- **Runtime errors**: Missing null checks that crash in edge cases (when `hidden=true`)
- **Missing validation**: Crashes when required props are omitted
- **Race conditions**: Reading DOM before state updates complete
- **DOM assumptions**: Code that breaks when render structure changes

**Hard transformation cases** (can't easily auto-fix):
- ✓ **Multiple elements**: querySelector for multiple `<input>`, multiple `<img>` tags
- ✓ **Reaching into children**: Using findDOMNode to access child component internals
- ✓ **Conditional/dynamic**: Renders different element types (`<div>`, `<span>`, `<p>`) based on props
- ✓ **3rd party components**: findDOMNode on components without forwardRef (can't add ref)
- ✓ **Fragment returns**: Component returns `<>` with multiple root elements
- ✓ **Portals**: DOM rendered outside component tree
- ✓ **Dynamic lists**: Needs ref array or callback refs for `.map()`
- ✓ **HOC wrapped**: findDOMNode through Higher-Order Component wrapper
- ✓ **Stored references**: DOM node saved to instance variable, used in multiple places
- ✓ **Conditional types**: Different element types with different capabilities (focusable vs not)

### Broken JSDoc Types
**File**: `src/types/brokenTypes.js`

All valid JavaScript (JSDoc is just comments!), but causes TypeScript/tooling issues:

- **Missing commas**: JSDoc parse errors (JS doesn't care)
- **Invalid references**: References to non-existent types
- **Type mismatches**: JSDoc says `string` but code uses it as `number`
- **Circular references**: Types that reference themselves
- **Duplicate properties**: Same property defined multiple times with different types
- **Mixed syntax**: Inconsistent use of closure vs TypeScript JSDoc syntax
- **Missing generics**: `Array` and `Map` without type parameters
- **Function syntax**: Mixing closure `function(x): y` with TS `(x) => y` syntax

### Broken Closure API Usage
**File**: `src/utils/brokenHelpers.js`

All valid JavaScript that runs in production, but has subtle bugs:

- **Null handling**: `goog.array.filter(null)` works, `Array.filter(null)` crashes
- **Undefined vs null**: `goog.isDefAndNotNull` checks both, `!== null` only checks one
- **Array-like objects**: goog APIs handle NodeList, native methods don't
- **In-place mutations**: `goog.array.removeDuplicates` modifies original array
- **Logic bugs**: Backwards checks, redundant operations (already broken!)
- **Missing null checks**: `goog.isDef(null)` returns true, then code crashes
- **Iteration mutations**: Modifying arrays while iterating (classic bug)
- **Performance**: O(n*m) nested loops that should use Set
- **Type coercion**: Different behavior when wrong types are passed

### Why These Matter

These realistic broken examples test:

1. **Detection**: Can Tern/AI identify code that's already broken?
2. **Preservation vs Fix**: Does transformation preserve bugs or accidentally fix them?
3. **Behavioral changes**: Can AI reviewers catch subtle differences (null vs undefined)?
4. **Edge cases exposed**: Transformations might expose bugs that rarely trigger in production

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
