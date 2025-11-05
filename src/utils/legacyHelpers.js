// LEGACY PATTERN: Using Google Closure Compiler APIs
// NEEDS MIGRATION: Replace with native JS or lodash

// Assume goog is available globally (in their legacy codebase)
/* global goog */

/**
 * Filter active users using goog.array.filter
 * SHOULD USE: Native Array.filter() or lodash
 */
export function getActiveUsers(users) {
  // LEGACY: goog.array.filter
  return goog.array.filter(users, function(user) {
    return user.isActive;
  });
}

/**
 * Check if value is defined and not null using goog.isDefAndNotNull
 * SHOULD USE: Native !== null && !== undefined or lodash
 */
export function processValue(value) {
  // LEGACY: goog.isDefAndNotNull
  if (goog.isDefAndNotNull(value)) {
    return value * 2;
  }
  return 0;
}

/**
 * Find user by ID using goog.array.find
 * SHOULD USE: Native Array.find() or lodash
 */
export function findUserById(users, id) {
  // LEGACY: goog.array.find
  return goog.array.find(users, function(user) {
    return user.id === id;
  });
}

/**
 * Map user names using goog.array.map
 * SHOULD USE: Native Array.map() or lodash
 */
export function getUserNames(users) {
  // LEGACY: goog.array.map
  return goog.array.map(users, function(user) {
    return user.name;
  });
}

/**
 * Check if array contains value using goog.array.contains
 * SHOULD USE: Native Array.includes() or lodash
 */
export function hasRole(roles, targetRole) {
  // LEGACY: goog.array.contains
  return goog.array.contains(roles, targetRole);
}

/**
 * Remove duplicates using goog.array.removeDuplicates
 * SHOULD USE: Native Set or lodash.uniq
 */
export function getUniqueIds(ids) {
  // LEGACY: goog.array.removeDuplicates
  const copy = goog.array.clone(ids);
  goog.array.removeDuplicates(copy);
  return copy;
}

/**
 * Check if object is defined using goog.isDef
 * SHOULD USE: Native !== undefined or lodash
 */
export function hasValue(obj) {
  // LEGACY: goog.isDef
  return goog.isDef(obj);
}

/**
 * Check if value is null using goog.isNull
 * SHOULD USE: Native === null
 */
export function isNullValue(value) {
  // LEGACY: goog.isNull
  return goog.isNull(value);
}

/**
 * Sort array using goog.array.sort
 * SHOULD USE: Native Array.sort() or lodash
 */
export function sortUsersByName(users) {
  // LEGACY: goog.array.sort
  const copy = goog.array.clone(users);
  goog.array.sort(copy, function(a, b) {
    return a.name.localeCompare(b.name);
  });
  return copy;
}

/**
 * Flatten arrays using goog.array.flatten
 * SHOULD USE: Native Array.flat() or lodash.flatten
 */
export function flattenGroups(groups) {
  // LEGACY: goog.array.flatten
  return goog.array.flatten(groups);
}
