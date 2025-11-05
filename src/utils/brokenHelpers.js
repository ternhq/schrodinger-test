/**
 * BROKEN CLOSURE API EXAMPLES
 * These have logic errors and incorrect usage
 */

/* global goog */

/**
 * BROKEN: Doesn't handle null input
 * goog.array.filter handles null gracefully, but Array.filter doesn't
 */
export function filterUsers(users) {
  // BUG: If users is null/undefined, this will crash after transformation
  return goog.array.filter(users, function(user) {
    return user.isActive;
  });
}

/**
 * BROKEN: Wrong assumption about goog.isDefAndNotNull
 */
export function processValue(value) {
  // BUG: This checks for both null AND undefined
  // Simple transformation to !== null will miss undefined check
  if (goog.isDefAndNotNull(value)) {
    return value.toUpperCase(); // What if value is a number?
  }
  return '';
}

/**
 * BROKEN: Mixing goog APIs incorrectly
 */
export function brokenMix(items) {
  // BUG: Logic error - this filters then filters again
  const filtered = goog.array.filter(items, x => x > 0);
  return goog.array.filter(filtered, x => x < 100); // Redundant, should be && in one filter
}

/**
 * BROKEN: Incorrect type passed to goog.array.map
 */
export function mapData(data) {
  // BUG: If data is a string, this behaves differently than Array.map
  return goog.array.map(data, function(item) {
    return item * 2;
  });
}

/**
 * BROKEN: Using goog.isDef but value could be null
 */
export function checkValue(val) {
  // BUG: goog.isDef only checks !== undefined, not null
  if (goog.isDef(val)) {
    return val.length; // Will crash if val is null
  }
  return 0;
}

/**
 * BROKEN: Side effects in goog.array.forEach
 */
export function brokenForEach(items) {
  let sum = 0;
  // BUG: This modifies external variable - easy to break during transformation
  goog.array.forEach(items, function(item) {
    sum += item;
    items.push(item * 2); // BUG: Modifying array during iteration!
  });
  return sum;
}

/**
 * BROKEN: Incorrect usage of goog.array.removeDuplicates
 */
export function getUnique(numbers) {
  // BUG: removeDuplicates modifies in place!
  // If caller expects original array to be unchanged, this breaks
  goog.array.removeDuplicates(numbers);
  return numbers;
}

/**
 * BROKEN: Wrong comparison function for goog.array.sort
 */
export function sortItems(items) {
  const copy = goog.array.clone(items);
  // BUG: This comparison function is wrong - doesn't return -1/0/1 properly
  goog.array.sort(copy, function(a, b) {
    return a > b; // Should be a - b for numbers or use localeCompare for strings
  });
  return copy;
}

/**
 * BROKEN: Nested calls with wrong assumptions
 */
export function complexBroken(data) {
  // BUG: If data is null, outer goog.isDef passes but inner operations fail
  if (goog.isDef(data)) {
    return goog.array.map(data.items, function(item) {
      // BUG: What if data.items doesn't exist?
      return item.value;
    });
  }
  return [];
}

/**
 * BROKEN: Using goog.isNull incorrectly
 */
export function processItem(item) {
  // BUG: Only checks for null, not undefined
  if (!goog.isNull(item)) {
    return item.name; // Will crash if item is undefined
  }
  return 'default';
}

/**
 * LOGICALLY BROKEN: Transformation would preserve the bug
 */
export function hasPermission(user, permission) {
  // BUG: Logic is backwards - should be !goog.array.contains
  return goog.array.contains(user.deniedPermissions, permission);
}

/**
 * BROKEN: Performance issue that gets worse after transformation
 */
export function inefficientCheck(items, targets) {
  // BUG: O(n*m) complexity - should use Set
  return goog.array.filter(items, function(item) {
    return goog.array.contains(targets, item.id);
  });
}
