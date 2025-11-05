/**
 * BROKEN JSDOC EXAMPLES
 * These have various syntax and logic errors
 */

/**
 * BROKEN: Missing closing brace in typedef
 * @typedef {{
 *   name: string,
 *   age: number
 * } BrokenSyntax1
 */
export let BrokenSyntax1;

/**
 * BROKEN: Extra closing brace
 * @typedef {{
 *   id: string,
 *   value: number
 * }}} BrokenSyntax2
 */
export let BrokenSyntax2;

/**
 * BROKEN: Invalid type syntax - using non-existent type
 * @typedef {{
 *   data: CompletelyMadeUpType,
 *   count: number
 * }} BrokenType
 */
export let BrokenType;

/**
 * BROKEN: Circular reference
 * @typedef {{
 *   value: string,
 *   next: BrokenCircular
 * }} BrokenCircular
 */
export let BrokenCircular;

/**
 * BROKEN: Contradictory types
 * @typedef {{
 *   id: string,
 *   id: number,
 * }} BrokenDuplicate
 */
export let BrokenDuplicate;

/**
 * BROKEN: Using closure-specific syntax that's invalid
 * @typedef {{
 *   value: string|number|,
 *   data: Array<>
 * }} BrokenClosureSyntax
 */
export let BrokenClosureSyntax;

/**
 * LOGICALLY BROKEN: Type mismatch with actual usage
 * @typedef {{
 *   count: string,
 *   name: number
 * }} BackwardsType
 */
export let BackwardsType;

/**
 * This function expects count to be a number, but typedef says string
 * @param {BackwardsType} data
 * @returns {number}
 */
export function calculateTotal(data) {
  // BUG: data.count is typed as string but we're doing math
  return data.count * 2;
}

/**
 * BROKEN: Nested object with missing commas
 * @typedef {{
 *   user: {
 *     name: string
 *     age: number
 *   },
 *   settings: {
 *     theme: string
 *     lang: string
 *   }
 * }} BrokenNested
 */
export let BrokenNested;

/**
 * BROKEN: Wrong nullable syntax mix
 * @typedef {{
 *   required: string,
 *   optional: ?number,
 *   nullable: string | null | undefined,
 *   confused: ?string|null
 * }} BrokenNullable
 */
export let BrokenNullable;
