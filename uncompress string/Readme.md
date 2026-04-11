# Uncompress String Algorithm

## 🧠 Problem Statement
Given a compressed string where:
- A number `k` followed by `(substring)` means repeat the substring `k` times
- Nested patterns are allowed

### Examples

uncompress("3(ab)") → "ababab"
uncompress("3(ab2(c))") → "abccabccabcc"


---

## 🚀 Approach: Stack-Based Parsing

We use a stack to keep track of previous strings and repeat counts when encountering nested structures.

---

## 📌 Algorithm Steps

### 1. Initialize
- Create an empty stack
- Set:
  - `currentString = ""`
  - `currentNumber = 0`

---

### 2. Traverse the input string character by character

---

### 3. If the character is a digit (`0–9`)
- Update the current number:

currentNumber = currentNumber * 10 + digit value

- This handles multi-digit numbers like `12(ab)`

---

### 4. If the character is `'('`
- Push the current state to stack:

push (currentString, currentNumber)

- Reset:

currentString = ""
currentNumber = 0


---

### 5. If the character is `')'`
- Pop the last state from stack:

(previousString, repeatCount)

- Expand the current string:

currentString = previousString + (currentString repeated repeatCount times)


---

### 6. If the character is a letter (`a–z`)
- Append it to current string:

currentString = currentString + character


---

### 7. End of traversal
- Return:

currentString


---

## 🔍 Example Walkthrough

### Input:

3(ab2(c))


### Steps:

Read 3 → currentNumber = 3
Read ( → push ("", 3)

Read a → currentString = "a"
Read b → currentString = "ab"

Read 2 → currentNumber = 2
Read ( → push ("ab", 2)

Read c → currentString = "c"

Read ) → pop ("ab", 2)
currentString = "ab" + "cc" = "abcc"

Read ) → pop ("", 3)
currentString = "abccabccabcc"


---

## ⏱️ Complexity

- Time Complexity: `O(n * k)` (due to string repetition)
- Space Complexity: `O(n)` (stack usage)

---

## 💡 Key Insights

- Stack helps manage nested structures
- Each `(` starts a new context
- Each `)` resolves and expands the current substring
- Supports multi-digit repeat counts