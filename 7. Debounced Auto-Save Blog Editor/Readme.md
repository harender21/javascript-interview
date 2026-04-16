# 📝 Debounced Auto-Save Blog Editor

## 📌 Problem Statement

Build a simple blog editor that **auto-saves user input** using a custom `debounce` function.

The goal is to:

* Avoid saving on every keystroke
* Save only after the user stops typing for a specified delay
* Optionally support **leading** and **trailing** execution

---

## 🚀 Features

* ⏳ Debounced auto-save (6 seconds delay)
* ⚡ Supports `leading` and `trailing` options
* 📊 Displays total number of saves
* 🔄 Real-time status updates:

  * `Typing...`
  * `Saved at HH:MM:SS`

---

## 🧠 Approach

### 1. Capture User Input

* Attach an `input` event listener to the textarea
* Trigger the debounced save function on every keystroke

```js
textarea.addEventListener('input', (e) => {
    status.innerText = "Typing...";
    saveContent(e.target.value);
});
```

---

### 2. Implement Custom Debounce

The debounce function ensures:

* Frequent calls are grouped into a single execution
* Execution happens based on `leading` and `trailing` options

#### Key Concepts:

* **Timer (`timeout`)** → Tracks active debounce cycle
* **lastArgs** → Stores latest input for trailing execution
* **clearTimeout()** → Cancels previous scheduled execution
* **timeout = null** → Marks debounce cycle as completed

```js
function debounce(func, wait, options = { leading: true, trailing: true }) {
    let timeout = null;
    let lastArgs = null;
    let lastContext = null;

    return function (...args) {
        lastArgs = args;
        lastContext = this;

        const shouldCallNow = options.leading && !timeout;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            timeout = null;

            if (options.trailing && lastArgs) {
                func.apply(lastContext, lastArgs);
                lastArgs = null;
            }
        }, wait);

        if (shouldCallNow) {
            func.apply(lastContext, lastArgs);
            lastArgs = null;
        }
    };
}
```

---

### 3. Save Function

* Increments save counter
* Updates UI status
* Displays timestamp

```js
const saveContent = debounce((value) => {
    count++;
    saveCountDisp.innerText = count;
    status.innerText = "Saved at " + new Date().toLocaleTimeString();
    status.style.color = "green";
}, 6000);
```

---

## 🔄 Execution Flow

1. User types → `input` event fires
2. Status updates to `"Typing..."`
3. Debounce resets timer
4. If user stops typing for 6 seconds:

   * Save function executes
   * Counter increments
   * Status updates to `"Saved"`

---

## ⚙️ Configuration Options

| Option     | Description                                      |
| ---------- | ------------------------------------------------ |
| `leading`  | Execute function immediately on first call       |
| `trailing` | Execute function after delay (when typing stops) |

### Example:

```js
debounce(func, 6000, { leading: true, trailing: true });
```

---

## ⏱️ Time & Space Complexity

### Time Complexity

* Each input event:

  * `clearTimeout()` → **O(1)**
  * `setTimeout()` → **O(1)**

👉 Overall: **O(1) per event**

---

### Space Complexity

* Stores:

  * `timeout`
  * `lastArgs`
  * `lastContext`

👉 Overall: **O(1)**

---

## 🎯 Key Learnings

* Difference between:

  * `clearTimeout()` vs `timeout = null`
* Handling **leading + trailing** execution correctly
* Avoiding unnecessary API calls in real-world apps
* Building production-like autosave behavior

---

## 💡 Real-World Use Cases

* Auto-saving forms (Google Docs, Notion)
* Search input optimization
* API request throttling
* Live validation

---

## ✅ Summary

This implementation demonstrates:

* Efficient event handling using debounce
* Clean separation of UI and logic
* Real-world performance optimization techniques

---

## 📁 Tech Stack

* HTML
* JavaScript (Vanilla JS)

---

## 🏁 Future Improvements

* Add API integration for saving data
* Show loading (`Saving...`) state
* Handle save failures & retries
* Convert into reusable React Hook (`useDebounce`)

---
