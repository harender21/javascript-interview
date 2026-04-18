function isEqual(a, b, visited = new WeakMap()) {
    /**
     *  1. Fast path: strictly equal (same value OR same reference)
     *  isEqual(5, 5)
     *  isEqual(a, a)
     *  isEqual(null, null)
     *  isEqual('hi', 'hi')
     *  const obj = {}
     *  obj === obj
     *  isEqual(obj, obj) //true
     * 
     */
    if (a === b) return true;

    /**
     * Step 2: if either is null → cannot go deeper
     *  is only for cases like:
     *  isEqual(null, {})
     *  isEqual(null, 5)
     * 
     */
    if (a === null || b === null) return false;

    /**
     * if either is primitive
     * examples
     *  isEqual(5, 10)
     *  isEqual(5, {})
     *  isEqual({}, 6)
     * 
     * */
    if (typeof a !== 'object' || typeof b !== 'object') return false;

    // 3. Initialize mapping for a
    /**
     * For a given key a in WeakMap, the value (another WeakMap) stores all objects that a has already been compared with.
     * a → { b1, b2, b3 }
     * Meaning: a has already been compared with b1, b2, b3
     * 
     * x -> {y1, y2, y3}
     * Meaning: x has already been compared with y1, y2, y3
     */
    if (!visited.has(a)) {
        visited.set(a, new WeakMap());
    }

    // 4. If we've already compared this pair → return true
    if (visited.get(a).has(b)) {
        return true;
    }

    // 5. Mark this pair as visited
    /**
     * This does NOT mean:
     * “a is equal to b”
     * We have already started comparing a with b before
     * visited = memory of “already compared pairs”
     * a → [b, c] Don’t compare a with b or c again — already done
     */
    visited.get(a).set(b, true);

    // 6. Array handling
    const isArrayA = Array.isArray(a);
    const isArrayB = Array.isArray(b);

    if (isArrayA !== isArrayB) return false;

    if (isArrayA && isArrayB) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i], visited)) {
                return false;
            }
        }
        return true;
    }

    // 7. Object handling
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        // Ensure key exists in b (own properties only)
        if (!Object.prototype.hasOwnProperty.call(b, key)) {
            return false;
        }

        if (!isEqual(a[key], b[key], visited)) {
            return false;
        }
    }

    return true;
}

const a = [1, 2]
a[2] = a

const b = [1, 2]
b[2] = b

const c = [1, 2, [1, 2, a]]
const d = [1, 2, [1, 2, b]]

console.log(isEqual(a, b)) // true
console.log(isEqual(a, c)) // true
console.log(isEqual(a, d)) // true 
console.log(isEqual(b, c)) // true 
console.log(isEqual(b, d)) // true 
console.log(isEqual(c, d)) // true 