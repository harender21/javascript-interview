# chunk(arr, size)

A utility function similar to `_.chunk()` that splits an array into smaller arrays (chunks) of a specified size.

---

## 📌 Description

The `chunk` function takes an array and a chunk size, then returns a new array containing subarrays (chunks), each of the given size.

* If the array cannot be evenly divided, the last chunk will contain the remaining elements.
* If `size < 1`, the function returns an empty array.

---

## 🧠 Function Signature

```js
chunk(arr: any[], size: number): any[][]
```

---

## ✅ Parameters

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `arr`     | `any[]`  | The input array to be split |
| `size`    | `number` | The size of each chunk      |

---

## 🔁 Returns

* A new array containing chunked subarrays.

---

## ✨ Implementation

```js
function chunk(arr, size) {
  if (size < 1) return [];

  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
```

---

## 🔍 Examples

```js
chunk([1,2,3,4,5], 1)
// [[1], [2], [3], [4], [5]]

chunk([1,2,3,4,5], 2)
// [[1,2], [3,4], [5]]

chunk([1,2,3,4,5], 3)
// [[1,2,3], [4,5]]

chunk([1,2,3,4,5], 4)
// [[1,2,3,4], [5]]

chunk([1,2,3,4,5], 5)
// [[1,2,3,4,5]]

chunk([1,2,3,4,5], 0)
// []
```

---

## ⚠️ Edge Cases

* `size <= 0` → returns `[]`
* Empty array → returns `[]`
* `size > arr.length` → returns `[arr]`

---

## 🚀 Alternative Implementation (Without slice)

```js
function chunk(arr, size) {
  if (size < 1) return [];

  const result = [];
  let temp = [];

  for (let i = 0; i < arr.length; i++) {
    temp.push(arr[i]);

    if (temp.length === size) {
      result.push(temp);
      temp = [];
    }
  }

  if (temp.length > 0) {
    result.push(temp);
  }

  return result;
}
```

---

## ⏱ Time & Space Complexity

| Complexity Type | Value |
| --------------- | ----- |
| Time            | O(n)  |
| Space           | O(n)  |

* `n` = number of elements in the input array

---

## 💡 Notes

* This is a commonly asked frontend and JavaScript utility question.
* Understanding array traversal and slicing is key.
* Useful in pagination, batching API calls, and UI grouping.

---

## 🧪 Test Cases

```js
console.log(chunk([], 2));            // []
console.log(chunk([1,2,3], 5));      // [[1,2,3]]
console.log(chunk([1,2,3], -1));     // []
console.log(chunk([1,2,3,4], 2));    // [[1,2], [3,4]]
```

---

## 📦 Use Cases

* Pagination logic
* Splitting data for batch processing
* Grid or layout rendering in UI
* Rate-limited API calls

---

Happy Coding! 🚀
