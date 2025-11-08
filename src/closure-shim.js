/**
 * Shim for Google Closure Library APIs
 * This replicates the ACTUAL behavior of Closure APIs, including edge cases
 * that differ from native JavaScript APIs
 */

export const goog = {
  array: {
    /**
     * Real Closure behavior: Returns [] if arr is null/undefined
     * Native Array.filter would crash
     */
    filter: function(arr, fn, opt_obj) {
      if (arr == null) {
        return [];
      }
      // Closure coerces array-like objects
      return Array.prototype.filter.call(arr, fn, opt_obj);
    },

    map: function(arr, fn, opt_obj) {
      if (arr == null) {
        return [];
      }
      return Array.prototype.map.call(arr, fn, opt_obj);
    },

    find: function(arr, fn, opt_obj) {
      if (arr == null) {
        return undefined;
      }
      return Array.prototype.find.call(arr, fn, opt_obj);
    },

    contains: function(arr, obj) {
      if (arr == null) {
        return false;
      }
      return arr.indexOf(obj) !== -1;
    },

    /**
     * Real Closure behavior: Modifies array IN PLACE
     * Native Set/filter would return new array
     */
    removeDuplicates: function(arr, opt_rv, opt_hashFn) {
      if (arr == null) return;

      const seen = new Set();
      let writeIndex = 0;

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const key = opt_hashFn ? opt_hashFn(item) : item;

        if (!seen.has(key)) {
          seen.add(key);
          arr[writeIndex++] = item;
        }
      }

      arr.length = writeIndex;
    },

    clone: function(arr) {
      if (arr == null) {
        return [];
      }
      return Array.prototype.slice.call(arr);
    },

    sort: function(arr, opt_compareFn) {
      if (arr == null) return;
      arr.sort(opt_compareFn);
    },

    flatten: function(arr) {
      if (arr == null) {
        return [];
      }
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          result.push(...arr[i]);
        } else {
          result.push(arr[i]);
        }
      }
      return result;
    },

    isEmpty: function(arr) {
      return arr == null || arr.length === 0;
    },

    forEach: function(arr, fn, opt_obj) {
      if (arr == null) return;
      Array.prototype.forEach.call(arr, fn, opt_obj);
    },

    removeAt: function(arr, index) {
      if (arr == null) return false;
      return arr.splice(index, 1).length === 1;
    }
  },

  /**
   * Real Closure behavior: Checks BOTH null and undefined
   * This is different from !== null
   */
  isDefAndNotNull: function(val) {
    return val != null; // Note: loose equality checks both
  },

  /**
   * Real Closure behavior: Only checks undefined, NOT null
   * goog.isDef(null) returns TRUE
   */
  isDef: function(val) {
    return val !== undefined;
  },

  /**
   * Real Closure behavior: Only checks null, NOT undefined
   * goog.isNull(undefined) returns FALSE
   */
  isNull: function(val) {
    return val === null;
  }
};

// Make it available globally for legacy code
if (typeof window !== 'undefined') {
  window.goog = goog;
}

export default goog;
