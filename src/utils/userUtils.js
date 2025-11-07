/* global goog */

export function findUserById(users, id) {
  return goog.array.find(users, function(user) {
    return user.id === id;
  });
}

export function getUserEmail(users, id) {
  const user = goog.array.find(users, function(u) {
    return u.id === id;
  });
  return user.email;
}

export function hasPermission(user, permission) {
  return goog.array.contains(user.deniedPermissions, permission);
}

export function removeInactiveUsers(users) {
  goog.array.forEach(users, function(user, index) {
    if (!user.isActive) {
      goog.array.removeAt(users, index);
    }
  });
  return users;
}

export function processAndDouble(items) {
  let sum = 0;
  goog.array.forEach(items, function(item) {
    sum += item;
    items.push(item * 2);
  });
  return sum;
}
