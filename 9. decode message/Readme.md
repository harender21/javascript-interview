# Hidden Message in 2D Grid (Diagonal Zig-Zag Traversal)

## 📌 Problem Statement

You are given a 2D grid of characters. There is a hidden message that can be extracted by traversing the grid using a specific diagonal pattern.

### Traversal Rules:

1. Start at the **top-left cell** `(0,0)`
2. Move **diagonally down-right (↘️)**
3. When you can no longer move down-right, switch to **diagonally up-right (↗️)**
4. When you can no longer move up-right, switch back to **down-right**
5. Repeat steps 3–4
6. Stop when **neither move is possible**
7. The collected characters form the hidden message

---

## 🧪 Example

### Input:

```
I B C A L K A
D R F C A E A
G H O E L A D
```

### Output:

```
IROCLED
```

---

## 🧠 Approach

This problem is solved using **simulation with direction switching**.

We maintain:

* Current position `(row, col)`
* Direction:

  * `1` → down-right `(row+1, col+1)`
  * `-1` → up-right `(row-1, col+1)`

At each step:

* Add current character to result
* Try to move in the current direction
* If not possible:

  * Switch direction
  * Try again
* If still not possible → stop traversal

---

## ⚙️ Algorithm Steps

1. Initialize:

   * `row = 0`, `col = 0`
   * `dir = 1` (down-right)
   * `result = ""`

2. Loop until break:

   * Append `grid[row][col]` to result
   * Compute next position:

     * `nextRow = row + dir`
     * `nextCol = col + 1`
   * If valid:

     * Move to `(nextRow, nextCol)`
   * Else:

     * Switch direction (`dir = -dir`)
     * Recalculate next position
     * If valid:

       * Move
     * Else:

       * Break loop

3. Return result

---

## 💻 Implementation (JavaScript)

```js
function getHiddenMessage(grid) {
  if (!grid || grid.length === 0) return "";

  const rows = grid.length;
  const cols = grid[0].length;

  let row = 0;
  let col = 0;
  let dir = 1;
  let result = "";

  while (true) {
    result += grid[row][col];

    let nextRow = row + dir;
    let nextCol = col + 1;

    if (nextRow >= 0 && nextRow < rows && nextCol < cols) {
      row = nextRow;
      col = nextCol;
    } else {
      dir *= -1;

      nextRow = row + dir;
      nextCol = col + 1;

      if (nextRow >= 0 && nextRow < rows && nextCol < cols) {
        row = nextRow;
        col = nextCol;
      } else {
        break;
      }
    }
  }

  return result;
}
```

---

## ⏱ Time Complexity

* **O(min(rows, cols))**
* We move one column at a time, so the number of steps is bounded by the number of columns

---

## 🗂 Space Complexity

* **O(1)** auxiliary space (excluding output string)
* Only a few variables are used for traversal

---

## ⚠️ Edge Cases

* Empty grid → return `""`
* Single cell grid → return that character
* Single row → only rightward diagonal possible once
* Single column → only first character is collected

---

## 🚀 Key Takeaways

* This is a **simulation problem** with state (direction)
* Direction switching is the core logic
* Always validate bounds before moving
* Common pattern useful in:

  * Matrix traversal problems
  * Zig-zag or diagonal traversal questions

---
