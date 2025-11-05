/**
 * REALISTIC BROKEN CLOSURE API EXAMPLES
 * All valid JavaScript that runs in production
 * But has logic errors or behavioral issues that transformations might expose
 */

/* global goog */

/**
 * BROKEN: Doesn't handle null/undefined correctly
 * goog.array.filter handles null gracefully, but Array.filter crashes
 * This works in production if users is always an array, but crashes on edge cases
 */
export function filterActiveUsers(users) {
  // BUG: If users is null/undefined, this works with goog but crashes with Array
  // goog.array.filter(null, fn) returns []
  // [].filter would crash with "Cannot read property 'filter' of null"
  return goog.array.filter(users, function(user) {
    return user.isActive;
  });
}

/**
 * BROKEN: Wrong assumption about goog.isDefAndNotNull
 * Checks both null AND undefined, simple !== null misses undefined
 */
export function processValue(value) {
  // BUG: goog.isDefAndNotNull checks !== null && !== undefined
  // Simple transformation to value !== null misses undefined check
  // Should be: value != null (loose equality) or both checks
  if (goog.isDefAndNotNull(value)) {
    return value * 2;
  }
  return 0;
}

/**
 * BROKEN: Logic error - redundant double filtering
 * Already a bug, transformation preserves it
 */
export function getValidItems(items) {
  // BUG: Filters twice for no reason, should use && in single filter
  const positive = goog.array.filter(items, x => x > 0);
  return goog.array.filter(positive, x => x < 100);
}

/**
 * BROKEN: Type passed might not be array
 * goog.array.map coerces strings to arrays, Array.map doesn't
 */
export function doubleValues(data) {
  // BUG: If data is a string, goog.array.map handles it differently than Array.map
  // Works in production if data is always array, breaks on edge case
  return goog.array.map(data, function(item) {
    return item * 2;
  });
}

/**
 * BROKEN: Using goog.isDef but value could be null
 * goog.isDef only checks !== undefined, not null
 */
export function getLength(val) {
  // BUG: goog.isDef(null) returns true
  // This crashes when val is null but passes the check
  if (goog.isDef(val)) {
    return val.length; // Crashes if val is null
  }
  return 0;
}

/**
 * BROKEN: Modifying array during iteration
 * Side effect bug that exists in original code
 */
export function processAndDouble(items) {
  let sum = 0;
  // BUG: Modifying items array during iteration
  // This is already broken but transformation might make it worse
  goog.array.forEach(items, function(item) {
    sum += item;
    items.push(item * 2); // Infinite loop potential!
  });
  return sum;
}

/**
 * BROKEN: In-place mutation assumption
 * goog.array.removeDuplicates modifies in-place
 * Caller might expect original array unchanged
 */
export function getUniqueValues(numbers) {
  // BUG: This modifies the input array!
  // If caller expects original array to be unchanged, this breaks
  // Transformation to [...new Set(numbers)] would fix this bug accidentally
  goog.array.removeDuplicates(numbers);
  return numbers;
}

/**
 * BROKEN: Incorrect comparison function
 * Returns boolean instead of -1/0/1
 */
export function sortNumbers(items) {
  const copy = goog.array.clone(items);
  // BUG: Comparison function should return -1/0/1, not boolean
  // Works sometimes by accident, but incorrect
  goog.array.sort(copy, function(a, b) {
    return a > b; // Should be: a - b
  });
  return copy;
}

/**
 * BROKEN: Missing property check in nested access
 * goog.isDef passes but inner property might not exist
 */
export function getItemValues(data) {
  // BUG: Checks if data is defined, but not if data.items exists
  if (goog.isDef(data)) {
    return goog.array.map(data.items, function(item) {
      // Crashes if data.items is undefined
      return item.value;
    });
  }
  return [];
}

/**
 * BROKEN: Using goog.isNull incorrectly
 * Only checks for null, not undefined
 */
export function getDisplayName(item) {
  // BUG: goog.isNull(undefined) returns false
  // This crashes when item is undefined
  if (!goog.isNull(item)) {
    return item.name; // Crashes if item is undefined
  }
  return 'Unknown';
}

/**
 * BROKEN: Logic is backwards
 * Already a bug in the original code
 */
export function hasPermission(user, permission) {
  // BUG: Checks deniedPermissions instead of allowedPermissions
  // Should be !goog.array.contains or check different array
  return goog.array.contains(user.deniedPermissions, permission);
}

/**
 * BROKEN: Performance issue that gets worse after naive transformation
 * O(n*m) nested loop
 */
export function filterByTargets(items, targets) {
  // BUG: O(n*m) complexity, should use Set for O(n+m)
  // Naive transformation to .filter + .includes preserves bad performance
  return goog.array.filter(items, function(item) {
    return goog.array.contains(targets, item.id);
  });
}

/**
 * BROKEN: Assumes goog.array.find returns undefined when not found
 * But doesn't handle that case
 */
export function getUserEmail(users, id) {
  const user = goog.array.find(users, function(u) {
    return u.id === id;
  });
  // BUG: No check if user was found, crashes if user is undefined
  return user.email;
}

/**
 * BROKEN: Mixing goog.array and native array methods
 * Inconsistent style, might have subtle bugs
 */
export function processData(items) {
  // BUG: Uses goog.array.filter but native .map
  // Works but inconsistent, might have subtle differences
  const filtered = goog.array.filter(items, x => x != null);
  return filtered.map(x => x.value); // Mixed styles
}

/**
 * BROKEN: Wrong usage of goog.array.flatten with mutations
 */
export function flattenAndModify(groups) {
  // BUG: Flattens then modifies, might affect original arrays
  const flat = goog.array.flatten(groups);
  flat.forEach(item => {
    item.processed = true; // Mutates objects in original groups!
  });
  return flat;
}

/**
 * BROKEN: Race condition with async operation
 * Array might be modified between checks
 */
export function asyncProcess(items, callback) {
  if (goog.array.isEmpty(items)) {
    return;
  }

  setTimeout(function() {
    // BUG: items might have changed by the time this runs
    // Original isEmpty check might not be valid anymore
    const first = items[0];
    callback(first);
  }, 100);
}

/**
 * BROKEN: Assuming array-like object is array
 * goog.array.toArray handles array-like objects, native methods don't
 */
export function processNodeList(nodes) {
  // BUG: If nodes is a NodeList or arguments object,
  // goog.array.map works, but Array.prototype.map.call might not
  return goog.array.map(nodes, function(node) {
    return node.textContent;
  });
}

/**
 * BROKEN: Truthy vs defined check confusion
 */
export function getValue(config, key) {
  const value = config[key];
  // BUG: This checks both undefined AND falsy values (0, "", false)
  // goog.isDef would only check undefined
  if (value) {
    return value;
  }
  return 'default';
}

/**
 * BROKEN: Using remove during iteration
 * Classic mutation bug
 */
export function removeInactiveUsers(users) {
  // BUG: Modifying array while iterating over it
  goog.array.forEach(users, function(user, index) {
    if (!user.isActive) {
      goog.array.removeAt(users, index); // Skips elements!
    }
  });
  return users;
}
