/**
 * LEGACY PATTERN: Closure Compiler style typedef with {{
 * NEEDS MIGRATION: Should be converted to TS-compatible format
 *
 * @typedef {{
 *   some: string,
 *   keys: number
 * }} SomeType
 */
export let SomeType;

/**
 * LEGACY PATTERN: Another closure-style typedef
 * @typedef {{
 *   id: string,
 *   name: string,
 *   age: number,
 *   isActive: boolean
 * }} UserProfile
 */
export let UserProfile;

/**
 * LEGACY PATTERN: Nested closure-style typedef
 * @typedef {{
 *   user: {
 *     id: string,
 *     email: string
 *   },
 *   settings: {
 *     theme: string,
 *     notifications: boolean
 *   },
 *   metadata: {
 *     createdAt: number,
 *     updatedAt: number
 *   }
 * }} ComplexConfig
 */
export let ComplexConfig;

/**
 * LEGACY PATTERN: Typedef with optional properties
 * @typedef {{
 *   required: string,
 *   optional?: number,
 *   nullable: ?string
 * }} MixedType
 */
export let MixedType;

/**
 * LEGACY PATTERN: Typedef with array types
 * @typedef {{
 *   items: Array<string>,
 *   counts: number[],
 *   matrix: Array<Array<number>>
 * }} ArrayTypes
 */
export let ArrayTypes;
