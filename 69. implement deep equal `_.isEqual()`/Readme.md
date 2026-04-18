# Deep Equal (`isEqual`) Implementation

## 📌 Overview

This utility function performs a **deep comparison** between two values to determine if they are **structurally equal**.

Unlike `===`, which checks **reference equality for objects**, this function compares:

* ✅ Primitives (by value)
* ✅ Arrays (by elements)
* ✅ Plain objects (by keys & values)
* ✅ Handles **circular references safely**

---

## 🚀 Features

* Supports:

  * Primitives (`number`, `string`, `boolean`, `null`, `undefined`)
  * Arrays
  * Plain objects
* Compares **own enumerable properties only**
* Prevents **infinite recursion** using `WeakMap`
* Handles **circular references correctly**

---

## 🧠 Core Idea

The function works in 3 major steps:

```
1. Fast equality check (a === b)
2. Reject non-object cases
3. Recursively compare structure
```

For circular references:

```
Store already compared pairs (a, b)
If seen again → return true (avoid infinite loop)
```

---

## 🧩 Implementation

```js
function isEqual(a, b, visited = new WeakMap()) {

    // 1. Fast path: same value OR same reference
    if (a === b) return true;

    // 2. Handle null cases
    if (a === null || b === null) return false;

    // 3. Handle primitives
    if (typeof a !== 'object' || typeof b !== 'object') return false;

    // 4. Handle circular references
    if (!visited.has(a)) {
        visited.set(a, new WeakMap());
    }

    if (visited.get(a).has(b)) {
        return true;
    }

    visited.get(a).set(b, true);

    // 5. Array handling
    const isArrayA = Array.isArray(a);
    const isArrayB = Array.isArray(b);

    if (isArrayA !== isArrayB) return false;

    if (isArrayA) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i], visited)) {
                return false;
            }
        }
        return true;
    }

    // 6. Object handling
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) {
            return false;
        }

        if (!isEqual(a[key], b[key], visited)) {
            return false;
        }
    }

    return true;
}
```

---

## 🔁 Circular Reference Handling

### Problem

```js
const a = [];
a.push(a); // self reference
```

Naive recursion → ❌ infinite loop

---

### Solution

Use `WeakMap` to track:

```
(a → { b1, b2, ... })
```

Meaning:

> "Object `a` has already been compared with these objects"

---

## 🧪 Example Usage

```js
const a = [1, 2];
a[2] = a;

const b = [1, 2];
b[2] = b;

console.log(isEqual(a, b)); // true
```

---

### Complex Nested Case

```js
const c = [1, 2, [1, 2, a]];
const d = [1, 2, [1, 2, b]];

console.log(isEqual(c, d)); // true
```

---

## ⚡ Time & Space Complexity

### Time Complexity

```
O(N)
```

* Each node (object/array element) is visited once

---

### Space Complexity

```
O(N)
```

* Due to recursion + `WeakMap` storage

---

## ⚠️ Limitations

This implementation does NOT handle:

* `Date`
* `Map`, `Set`
* `Function`
* `RegExp`
* Special objects

---

## 💡 Interview Tips

* Emphasize **circular reference handling**
* Mention **WeakMap for memory-safe tracking**
* Explain difference between:

  * **Value equality (primitives)**
  * **Reference equality (objects)**

---

## 🧠 Key Takeaways

* Deep equality = **structure + values**
* Circular structures = **graph comparison**
* `WeakMap` = **prevents infinite recursion**

---

## ✅ Summary

This implementation provides a clean and efficient way to:

* Compare complex nested structures
* Handle circular references
* Avoid common pitfalls of naive recursion

---
