# 🧩 Custom `set()` Implementation (Lodash-like)

A lightweight implementation of Lodash's `_.set()` method that allows setting values in a nested object using a path.

---

## 📌 Problem Statement

Implement a function:

```js
set(object, path, value)
```

That:

* Sets a value at a given path inside an object
* Creates missing objects/arrays automatically
* Supports multiple path formats

---

## ✅ Supported Features

* Dot notation

  ```js
  set(obj, 'a.b.c', 1)
  ```

* Bracket notation

  ```js
  set(obj, 'a.b.c[0]', 1)
  ```

* Array path

  ```js
  set(obj, ['a', 'b', 'c', '0'], 1)
  ```

* Auto-create nested structure

* Handles array indices vs object keys correctly

---

## 🚀 Example Usage

```js
const obj = {
  a: {
    b: {
      c: [1, 2, 3]
    }
  }
};

set(obj, 'a.b.c', 'BFE');
console.log(obj.a.b.c); // "BFE"

set(obj, 'a.b.c.0', 'BFE');
console.log(obj.a.b.c[0]); // "BFE"

set(obj, 'a.b.c[1]', 'BFE');
console.log(obj.a.b.c[1]); // "BFE"

set(obj, ['a', 'b', 'c', '2'], 'BFE');
console.log(obj.a.b.c[2]); // "BFE"

set(obj, 'a.b.c[3]', 'BFE');
console.log(obj.a.b.c[3]); // "BFE"

set(obj, 'a.c.d[0]', 'BFE');
console.log(obj.a.c.d[0]); // "BFE"

set(obj, 'a.c.d.01', 'BFE');
console.log(obj.a.c.d['01']); // "BFE"
```

---

## 🧠 How It Works

### 1. Parse Path

Convert path into an array of keys:

```js
'a.b.c[1]' → ['a', 'b', 'c', '1']
```

---

### 2. Traverse Object

* Iterate through keys
* Create missing nodes:

  * If next key is numeric → create `[]`
  * Otherwise → create `{}`

---

### 3. Assign Value

* When reaching last key → assign value directly

---

## 🔧 Implementation

```js
function set(obj, path, value) {
  if (obj == null) return obj;

  const keys = Array.isArray(path) ? path : parsePath(path);
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
      break;
    }

    if (current[key] == null) {
      const nextKey = keys[i + 1];

      if (isValidIndex(nextKey)) {
        current[key] = [];
      } else {
        current[key] = {};
      }
    }

    current = current[key];
  }

  return obj;
}

function parsePath(path) {
  const result = [];

  path.replace(/[^.[\]]+|\[(.*?)\]/g, (match, bracketKey) => {
    result.push(bracketKey !== undefined ? bracketKey : match);
  });

  return result;
}

function isValidIndex(key) {
  return /^\d+$/.test(key) && String(Number(key)) === key;
}
```

---

## ⚠️ Edge Cases Handled

* `"01"` treated as object key, not array index
* Missing paths are created automatically
* Works with both string and array paths

---

## ⏱ Complexity Analysis

### Time Complexity

* **O(n)** → where `n` = number of keys in path

### Space Complexity

* **O(n)** → for parsed path storage

---

## 💡 Key Insights

* Regex helps extract keys from complex paths
* Differentiating `"1"` vs `"01"` is critical
* Dynamic structure creation (array vs object) is the core logic

---

## 🎯 When to Use

* Deep object updates
* Form handling
* Config manipulation
* State updates in frontend apps

---

## 📚 Reference

Inspired by Lodash's `_.set()` method.
