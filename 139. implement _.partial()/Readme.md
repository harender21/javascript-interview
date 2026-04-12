# 📦 Partial Function Implementation (with Placeholder Support)

## 📖 What is `_.partial()`?

`_.partial()` is a utility function that allows you to **pre-fill some arguments of a function** and return a new function.

It is similar to JavaScript’s built-in `Function.prototype.bind()`, but with a key difference:

* `bind()` fixes both **`this` context** and arguments
* `_.partial()` only presets arguments (does **not** bind `this`)

---

## ⚡ Key Features

* Pre-fill function arguments
* Supports **placeholders** for flexible argument positions
* Does **not** modify `this` binding
* Allows partial application in any order

---

## 🧠 How It Works

1. Store the initial arguments (`presetArgs`)
2. Return a new function
3. When the new function is called:

   * Replace placeholders with incoming arguments (in order)
   * Append any remaining arguments at the end
4. Call the original function with the final argument list

---

## 🚀 Implementation

```js
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    let result = [];
    let laterIndex = 0;

    for (let i = 0; i < presetArgs.length; i++) {
      if (presetArgs[i] === partial.placeholder) {
        result.push(laterArgs[laterIndex++]);
      } else {
        result.push(presetArgs[i]);
      }
    }

    // Append remaining arguments
    while (laterIndex < laterArgs.length) {
      result.push(laterArgs[laterIndex++]);
    }

    return fn.apply(this, result);
  };
}

// Unique placeholder
partial.placeholder = Symbol("placeholder");
```

---

## 🧪 Usage Examples

### ✅ Basic Partial Application

```js
const func = (...args) => args;

const func123 = partial(func, 1, 2, 3);
console.log(func123(4));
// [1, 2, 3, 4]
```

---

### ✅ Using Placeholder

```js
const _ = partial.placeholder;

const func = (...args) => args;

const func1_3 = partial(func, 1, _, 3);
console.log(func1_3(2, 4));
// [1, 2, 3, 4]
```

---

### ✅ Multiple Placeholders

```js
const _ = partial.placeholder;

const func = (...args) => args;

const f = partial(func, _, 2, _, 4);
console.log(f(1, 3));
// [1, 2, 3, 4]
```

---

### ✅ Extra Arguments

```js
console.log(f(1, 3, 5, 6));
// [1, 2, 3, 4, 5, 6]
```

---

## 🔍 Complexity Analysis

### ⏱ Time Complexity

* **O(n + m)**

  * `n` = number of preset arguments
  * `m` = number of later arguments

We iterate through:

* preset arguments once → `O(n)`
* remaining later arguments once → `O(m)`

---

### 🧠 Space Complexity

* **O(n + m)**

We create a new `result` array containing:

* preset arguments
* replaced placeholders
* additional arguments

---

## 🔄 Comparison with `bind()`

| Feature                 | `bind()` | `_.partial()` |
| ----------------------- | -------- | ------------- |
| Binds `this`            | ✅        | ❌             |
| Preset arguments        | ✅        | ✅             |
| Placeholder support     | ❌        | ✅             |
| Flexible argument order | ❌        | ✅             |

---

## 🎯 Summary

* `partial()` helps in **function reusability**
* Placeholders make it **more powerful than `bind()`**
* Commonly used in **functional programming patterns**

---

## 🚀 Bonus (Interview Tip)

You can extend this implementation to:

* Support **currying**
* Preserve original function `.length`
* Allow **nested partial calls**
