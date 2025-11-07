# Bug Documentation

This document explains all the bugs in the test codebase. **DO NOT** share this with Tern during transformation - it should discover these issues on its own.

## React Components (findDOMNode issues)

### BrokenLogicEarlyAccess
**Bug**: Tries to use findDOMNode before component mounts (in constructor)
- Returns null, height is always 0
- Should use componentDidMount instead

### BrokenNullCheck
**Bug**: Missing null check before calling addEventListener
- Crashes when render() returns null (when `hidden=true`)
- Should check if node exists before using it

### BrokenAmbiguous
**Bug**: Component renders different elements conditionally
- Which element gets the ref? The div, span, or p?
- Transformation is ambiguous

### BrokenComplexQuery
**Bug**: Uses findDOMNode with querySelectorAll to find multiple inputs
- Can't transform to single ref
- Needs ref callback on each input or ref array

### BrokenChildAccess
**Bug**: Uses findDOMNode to access child component's DOM
- Reaches into child with querySelector
- Simple ref won't work without forwardRef in child

### BrokenPropTypes
**Bug**: Missing prop validation
- this.props.onMount might not be a function - crashes when omitted
- this.props.title might be undefined - crashes with "Cannot read property 'toUpperCase' of undefined"

### BrokenDOMAssumption
**Bug**: Assumes firstChild is always the content div
- Breaks when render structure changes (when showHeader is true)
- Fragile DOM traversal

### BrokenRaceCondition
**Bug**: Reads DOM immediately after setState
- DOM hasn't updated yet when this runs
- findDOMNode returns stale content

### BrokenThirdPartyAccess
**Bug**: Uses findDOMNode on third-party component
- Can't add ref to ThirdPartyButton without modifying it
- Third-party component doesn't use forwardRef

### BrokenFragmentReturn
**Bug**: Component returns Fragment with multiple root elements
- findDOMNode returns first element only
- Which element should get the ref? Ambiguous

### BrokenPortalAccess
**Bug**: Portal renders content outside parent hierarchy
- findDOMNode behavior is weird here
- Transformation is complex

### BrokenDynamicList
**Bug**: Uses querySelectorAll on dynamically generated list items
- Transformation requires ref array or callback refs for each item
- Can't use single ref

### BrokenHOCWrapped
**Bug**: Uses findDOMNode on HOC-wrapped component
- Transformation needs to thread ref through HOC wrapper
- Complex refactoring required

### BrokenConditionalTypes
**Bug**: Renders different element types with different capabilities
- Tries to call focus() but element might not be focusable
- Different elements (a, button, input, div) have different APIs

### BrokenMeasureChildren
**Bug**: Needs to measure ALL images, not just one
- Uses querySelectorAll to find multiple images
- Transformation requires ref callback on each image or ref array

### BrokenStoredReference
**Bug**: Stores DOM node reference in instance variable
- Uses stored reference in multiple places
- Transformation needs to update all usages to use ref.current

## JSDoc Type Issues

### MissingCommas
**Bug**: Missing commas in JSDoc object properties
- Valid JavaScript (JSDoc is just comments)
- Causes JSDoc parse errors in TypeScript tooling

### InvalidTypeReference
**Bug**: References non-existent type `CompletelyMadeUpType`
- Code runs fine (JS doesn't care about types)
- TypeScript can't find the type

### BackwardsType + calculateTotal
**Bug**: Type mismatch - typedef says `count: string` but code does math
- Works at runtime if count happens to be a number
- TypeScript would catch this

### BrokenCircular
**Bug**: Circular/self-referencing type without proper structure
- Can cause issues during transformation
- Needs proper recursive type definition

### DuplicateProperties
**Bug**: Property `id` defined twice with different types (string and number)
- Which type is correct?
- Ambiguous

### MixedNullableSyntax
**Bug**: Mixing closure (`?number`) and TS (`| null`) nullable syntax
- Inconsistent
- Makes transformation ambiguous

### NestedMissingCommas
**Bug**: Nested object properties missing commas
- JSDoc parse error
- Valid JS but breaks tooling

### TrailingPipe
**Bug**: Union type with trailing pipe `string | number |`
- Closure-specific syntax
- Invalid in TypeScript

### ArraySyntaxMess
**Bug**: Inconsistent array syntax mixing `Array<T>` and `T[]`
- Confusing nested arrays `Array<Array<number>[]>`
- Hard to parse

### MixedFunctionSyntax
**Bug**: Mixing closure `function(x): y` and TS `(x) => y` function syntax
- Inconsistent
- Should pick one style

### OptionalPropertyMess
**Bug**: Optional properties marked multiple ways
- Using `?`, `| undefined`, and both together inconsistently
- Should standardize

### brokenReturnType
**Bug**: JSDoc says returns string, but actually returns number
- Type mismatch between annotation and implementation
- TypeScript would catch this

### brokenParamType
**Bug**: JSDoc says parameter is string, but code treats it as array
- Calls `.filter()` on what's typed as string
- Runtime error if actually passed string

### DeeplyNestedMess
**Bug**: Mix of closure and TS syntax at different nesting levels
- Inconsistent syntax choices
- Hard to transform consistently

### MissingGenericParams
**Bug**: Generic types `Array` and `Map` without type parameters
- Should be `Array<T>` and `Map<K, V>`
- TypeScript requires type parameters

### IndexSignatureInClosure
**Bug**: Record/index signature using TS syntax in closure-style typedef
- Mixed syntax styles
- Transformation is ambiguous

## Closure API Issues

### filterActiveUsers
**Bug**: Doesn't handle null/undefined
- `goog.array.filter(null, fn)` returns `[]`
- `Array.filter` would crash with "Cannot read property 'filter' of null"

### processValue
**Bug**: Wrong assumption about goog.isDefAndNotNull
- Checks both null AND undefined: `!== null && !== undefined`
- Simple transformation to `!== null` misses undefined check
- Should be: `!= null` (loose equality) or both checks

### getValidItems
**Bug**: Logic error - redundant double filtering
- Filters twice for no reason
- Should use `&&` in single filter
- Already broken, transformation preserves it

### doubleValues
**Bug**: Type might not be array
- `goog.array.map` coerces strings to arrays differently than `Array.map`
- Works in production if data is always array
- Breaks on edge case

### getLength
**Bug**: Using goog.isDef but value could be null
- `goog.isDef(null)` returns true (only checks !== undefined)
- Code crashes when val is null

### processAndDouble
**Bug**: Modifying array during iteration
- Pushes to items array while iterating
- Infinite loop potential!
- Already broken

### getUniqueValues
**Bug**: In-place mutation assumption
- `goog.array.removeDuplicates` modifies input array
- Caller might expect original array unchanged
- Transformation to `[...new Set()]` would accidentally fix this

### sortNumbers
**Bug**: Comparison function returns boolean instead of -1/0/1
- Should be `a - b` for numbers
- Works sometimes by accident

### getItemValues
**Bug**: Missing property check in nested access
- Checks if `data` is defined
- Doesn't check if `data.items` exists
- Crashes if `data.items` is undefined

### getDisplayName
**Bug**: Using goog.isNull incorrectly
- `goog.isNull(undefined)` returns false
- Crashes when item is undefined (not null)

### hasPermission
**Bug**: Logic is backwards
- Checks deniedPermissions instead of allowedPermissions
- Should be `!goog.array.contains` or check different array
- Already broken in original code

### filterByTargets
**Bug**: Performance issue O(n*m)
- Nested loop with `contains` check inside filter
- Should use Set for O(n+m)
- Naive transformation preserves bad performance

### getUserEmail
**Bug**: Doesn't handle when user not found
- `goog.array.find` returns undefined when not found
- No check before accessing `.email`
- Crashes if user doesn't exist

### processData
**Bug**: Mixing goog.array and native array methods
- Inconsistent style
- Works but might have subtle differences

### flattenAndModify
**Bug**: Mutations affect original arrays
- Flattens then modifies objects
- Mutates objects in original groups

### asyncProcess
**Bug**: Race condition with async operation
- Array might be modified between isEmpty check and setTimeout callback
- Original isEmpty check might not be valid anymore

### processNodeList
**Bug**: Assuming array-like object is array
- If nodes is NodeList or arguments object
- `goog.array.map` works, native methods might not

### getValue
**Bug**: Truthy vs defined check confusion
- Checks both undefined AND falsy values (0, "", false)
- `goog.isDef` would only check undefined
- Returns 'default' for valid falsy values

### removeInactiveUsers
**Bug**: Modifying array while iterating
- Uses removeAt during forEach
- Skips elements due to index shifting
- Classic mutation bug
