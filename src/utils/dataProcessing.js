/* global goog */

export function getItemValues(data) {
  if (goog.isDef(data)) {
    return goog.array.map(data.items, function(item) {
      return item.value;
    });
  }
  return [];
}

export function processData(items) {
  const filtered = goog.array.filter(items, x => x != null);
  return filtered.map(x => x.value);
}

export function filterByTargets(items, targets) {
  return goog.array.filter(items, function(item) {
    return goog.array.contains(targets, item.id);
  });
}

export function asyncProcess(items, callback) {
  if (goog.array.isEmpty(items)) {
    return;
  }

  setTimeout(function() {
    const first = items[0];
    callback(first);
  }, 100);
}

export function processNodeList(nodes) {
  return goog.array.map(nodes, function(node) {
    return node.textContent;
  });
}
