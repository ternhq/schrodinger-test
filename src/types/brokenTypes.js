/**
 * REALISTIC BROKEN JSDOC EXAMPLES
 * These run fine in JavaScript (JSDoc is just comments!)
 * But cause issues with TypeScript tooling or during transformation
 */

/**
 * BROKEN: Missing commas in JSDoc (valid JS, invalid JSDoc)
 * JavaScript doesn't care, but TypeScript/tooling does
 * @typedef {{
 *   name: string
 *   age: number
 *   email: string
 * }} MissingCommas
 */
export let MissingCommas;

/**
 * BROKEN: Invalid type reference - references non-existent type
 * Code runs fine, but TypeScript can't find CompletelyMadeUpType
 * @typedef {{
 *   data: CompletelyMadeUpType,
 *   count: number
 * }} InvalidTypeReference
 */
export let InvalidTypeReference;

/**
 * BROKEN: Type says string but code uses it as number
 * Classic type mismatch that exists in untyped JS codebases
 * @typedef {{
 *   count: string,
 *   name: number
 * }} BackwardsType
 */
export let BackwardsType;

/**
 * This function does math with count, but typedef says it's a string
 * Works in JS if count happens to be a number at runtime
 * @param {BackwardsType} data
 * @returns {number}
 */
export function calculateTotal(data) {
  // BUG: data.count is typed as string but we're doing math
  // Works at runtime if actual value is a number
  return data.count * 2;
}

/**
 * BROKEN: Circular/self-referencing type without proper structure
 * Can cause issues during transformation
 * @typedef {{
 *   value: string,
 *   next: BrokenCircular
 * }} BrokenCircular
 */
export let BrokenCircular;

/**
 * BROKEN: Duplicate property definitions
 * Which type is id really? String or number?
 * @typedef {{
 *   id: string,
 *   name: string,
 *   id: number
 * }} DuplicateProperties
 */
export let DuplicateProperties;

/**
 * BROKEN: Mixing closure and TS nullable syntax inconsistently
 * Makes transformation ambiguous
 * @typedef {{
 *   required: string,
 *   optional: ?number,
 *   nullable: string | null,
 *   confused: ?string | undefined
 * }} MixedNullableSyntax
 */
export let MixedNullableSyntax;

/**
 * BROKEN: Nested objects missing commas (JSDoc parse error)
 * @typedef {{
 *   user: {
 *     name: string
 *     age: number
 *   },
 *   settings: {
 *     theme: string
 *     notifications: boolean
 *   }
 * }} NestedMissingCommas
 */
export let NestedMissingCommas;

/**
 * BROKEN: Union type with trailing pipe (closure-specific)
 * @typedef {{
 *   value: string | number |,
 *   status: boolean
 * }} TrailingPipe
 */
export let TrailingPipe;

/**
 * BROKEN: Array syntax inconsistency
 * Mixing Array<T> and T[] in confusing ways
 * @typedef {{
 *   items: Array<string>,
 *   counts: Array<number[]>,
 *   matrix: Array<Array<number>[]>
 * }} ArraySyntaxMess
 */
export let ArraySyntaxMess;

/**
 * BROKEN: Function type with wrong parameter syntax
 * Closure vs TS function syntax confusion
 * @typedef {{
 *   callback: function(string, number): boolean,
 *   handler: (x: number) => void
 * }} MixedFunctionSyntax
 */
export let MixedFunctionSyntax;

/**
 * BROKEN: Optional properties marked multiple ways
 * Using both ? and | undefined inconsistently
 * @typedef {{
 *   prop1?: string,
 *   prop2: string | undefined,
 *   prop3: ?string,
 *   prop4?: string | undefined
 * }} OptionalPropertyMess
 */
export let OptionalPropertyMess;

/**
 * BROKEN: Type mismatch with actual usage
 * JSDoc says returns string, but actually returns number
 * @param {string} value
 * @returns {string}
 */
export function brokenReturnType(value) {
  // BUG: Returns number but JSDoc says string
  return parseInt(value);
}

/**
 * BROKEN: Parameter types don't match usage
 * JSDoc says string, code treats as array
 * @param {string} items
 * @returns {number}
 */
export function brokenParamType(items) {
  // BUG: Treats items as array but JSDoc says string
  return items.filter(x => x > 0).length;
}

/**
 * BROKEN: Deeply nested with inconsistent syntax
 * Mix of closure and TS syntax at different levels
 * @typedef {{
 *   level1: {
 *     level2: {
 *       value: string
 *       nested: ?{
 *         data: Array<string | number>
 *       }
 *     },
 *     items: Array<{
 *       id: number,
 *       tags: string[]
 *     }>
 *   }
 * }} DeeplyNestedMess
 */
export let DeeplyNestedMess;

/**
 * BROKEN: Generic type with missing type parameter
 * @typedef {{
 *   data: Array,
 *   map: Map
 * }} MissingGenericParams
 */
export let MissingGenericParams;

/**
 * BROKEN: Type exists but transformation would be ambiguous
 * Record type in closure syntax
 * @typedef {{
 *   [key: string]: number
 * }} IndexSignatureInClosure
 */
export let IndexSignatureInClosure;
