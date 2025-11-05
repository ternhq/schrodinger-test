/**
 * LEGACY PATTERN: Closure-style typedef
 * @typedef {{
 *   value: string,
 *   count: number,
 *   enabled: boolean
 * }} SomeType
 */
export let SomeType;

/**
 * Create a SomeType object
 * @param {string} value
 * @param {number} count
 * @returns {SomeType}
 */
export function createSomeType(value, count) {
  return {
    value,
    count,
    enabled: true
  };
}
