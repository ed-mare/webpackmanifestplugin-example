/* Returns true if object (not null and not an array). Code from
   http://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript.
 */
export function isObject(obj) {
  return obj !== null &&
        typeof obj === 'object' &&
        !Array.isArray(obj);
};
