# Move Zeros to End (In-Place)

## 🧠 Problem Statement

Given an array of integers, move all `0`s to the end while maintaining the relative order of non-zero elements.

### Example

Input: [1, 0, 0, 2, 3]
Output: [1, 2, 3, 0, 0]


---

## 🚀 Approach: Two-Pointer Technique

We use two pointers:
- `i` → traverses the array
- `j` → tracks the position to place the next non-zero element

---

## 📌 Algorithm Steps

### 1. Initialize
- Set pointer:

j = 0


---

### 2. Traverse the array
- Loop through the array using index `i` from `0` to `n - 1`

---

### 3. Check for non-zero elements
- If `arr[i] !== 0`:
  - Swap `arr[i]` with `arr[j]`
  - Increment `j`


swap(arr[i], arr[j])
j++


---

### 4. Continue traversal
- Repeat until the end of the array

---

### 5. Final Result
- All non-zero elements are shifted to the front
- All zeros move to the end automatically

---
