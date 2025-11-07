/* global goog */

export function processValue(value) {
  if (goog.isDefAndNotNull(value)) {
    return value * 2;
  }
  return 0;
}

export function getLength(val) {
  if (goog.isDef(val)) {
    return val.length;
  }
  return 0;
}

export function getDisplayName(item) {
  if (!goog.isNull(item)) {
    return item.name;
  }
  return 'Unknown';
}

export function getValue(config, key) {
  const value = config[key];
  if (value) {
    return value;
  }
  return 'default';
}
