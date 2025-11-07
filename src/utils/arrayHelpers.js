/* global goog */

export function filterActiveUsers(users) {
  return goog.array.filter(users, function(user) {
    return user.isActive;
  });
}

export function getValidItems(items) {
  const positive = goog.array.filter(items, x => x > 0);
  return goog.array.filter(positive, x => x < 100);
}

export function doubleValues(data) {
  return goog.array.map(data, function(item) {
    return item * 2;
  });
}

export function getUserNames(users) {
  return goog.array.map(users, function(user) {
    return user.name;
  });
}

export function getUniqueValues(numbers) {
  goog.array.removeDuplicates(numbers);
  return numbers;
}

export function sortNumbers(items) {
  const copy = goog.array.clone(items);
  goog.array.sort(copy, function(a, b) {
    return a > b;
  });
  return copy;
}

export function flattenAndModify(groups) {
  const flat = goog.array.flatten(groups);
  flat.forEach(item => {
    item.processed = true;
  });
  return flat;
}
