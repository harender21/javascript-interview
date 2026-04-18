**parsePath() — Deep Dive**

Regex Groups, Matching, and Capturing Explained

# **1\. The Function**

Here is the complete function we are going to dissect:

function parsePath(path) {  
    const result \= \[\];  
    path.replace(/\[^.\[\\\]\]+|\\\[(.\*)\\\]/g, (match, bracketKey) \=\> {  
        result.push(bracketKey \!== undefined ? bracketKey : match);  
    });  
    return result;  
}

What it does: converts a dot/bracket notation path string into an array of keys.

| Input | Output |
| :---- | :---- |
| "user.name" | \["user", "name"\] |
| "user.address\[0\].street" | \["user", "address", "0", "street"\] |
| "a\[0\]\[1\]" | \["a", "0", "1"\] |

# **2\. The Regex**

/\[^.\[\\\]\]+|\\\[(.\*?)\\\]/g

This regex has two alternatives separated by | (OR):

| Part | What it matches | Example |
| :---- | :---- | :---- |
| \[^.\[\\\]\]+ | One or more chars that are NOT . \[ or \] | "user", "name", "address" |
| \\\[(.\*?)\\\] | Anything inside \[ ... \] captured in Group 1 | "\[0\]" → captures "0" |

# **3\. Match vs Capture**

## **Match**

The entire string the regex found. Always stored in match\[0\].

## **Capture**

A specific part of the match, extracted using (). Stored in match\[1\], match\[2\], etc.

const m \= "order-42-shipped".match(/order-(\\d+)-(\\w+)/);

m\[0\]  // "order-42-shipped"  → full MATCH  
m\[1\]  // "42"                → CAPTURE group 1  
m\[2\]  // "shipped"           → CAPTURE group 2

**Rule:** Every capture is part of a match, but not every match has captures.

# **4\. Regex Groups ()**

Groups are created by parentheses (). They are numbered left-to-right by their opening (.

## **Simple — one group**

const m \= "hello world".match(/(hello) (world)/);  
m\[1\]  // "hello"   → Group 1  
m\[2\]  // "world"   → Group 2

## **Nested groups**

const m \= "abc".match(/(a(b(c)))/);  
m\[1\]  // "abc"  → Group 1  (outermost)  
m\[2\]  // "bc"   → Group 2  
m\[3\]  // "c"    → Group 3  (innermost)

## **Non-Capturing Group  (?:...)**

Sometimes you need () just for grouping logic, but don't need the value saved. Use ?: to skip numbering.

// Without ?:  
/cat|dog food/      → "cat"  OR  "dog food"  ❌

// With (?:)  
/(?:cat|dog) food/  → "cat food"  OR  "dog food"  ✅

| Symbol | Name | Captured? | Gets a number? |
| :---- | :---- | :---- | :---- |
| (abc) | Capturing group | Yes | Yes |
| (?:abc) | Non-capturing group | No | No |

# **5\. Greedy vs Lazy  (\* vs \*?)**

By default \* is greedy — it grabs as much as possible. Adding ? makes it lazy — as little as possible.

Input: "\[hello\]\[world\]"

/\\\[(.\*?)\\\]/g   →  lazy   →  captures "hello", then "world"  ✅  
/\\\[(.\*)\\\]/g    →  greedy →  captures "hello\]\[world"          ❌

| Symbol | Name | Behavior |
| :---- | :---- | :---- |
| \* | Greedy | Match as MUCH as possible |
| \*? | Lazy | Match as LITTLE as possible |
| \+ | Greedy | One or more, as much as possible |
| \+? | Lazy | One or more, as little as possible |

# **6\. \[ \] vs ( ) — Not the Same\!**

These are completely independent concepts in regex:

| Symbol | Purpose | Example |
| :---- | :---- | :---- |
| \[abc\] | Match ONE of these characters | \[0-9\] matches any digit |
| (abc) | Group & capture this pattern | (\\d+) captures digits |
| \\\[ | Match a literal \[ character | \\\[0\\\] matches "\[0\]" |
| \\( | Match a literal ( character | \\(hello\\) matches "(hello)" |

In \\\[(.\*?)\\\] — the \\\[ and \\\] match literal brackets in the input string. The (.\*?) inside captures what is between them.

# **7\. .replace() Used as forEach**

Normally .replace() replaces text. Here it is used only for its iteration — the return value is discarded.

path.replace(/regex/g, (match, bracketKey) \=\> {  
    // we never return anything — just using the loop  
    result.push(...);  
});

## **.replace() Callback Arguments — always in this order:**

| Position | Value |
| :---- | :---- |
| 1st | Full match (match\[0\]) |
| 2nd | Group 1 capture |
| 3rd | Group 2 capture |
| ... | More groups... |
| 2nd last | Offset (index in string) |
| Last | Original string |

bracketKey is the 2nd argument because there is only ONE capture group in the regex. Add more groups and it shifts further right.

# **8\. Step-by-Step Trace**

Input: "user.address\[0\].street"

| Match | bracketKey | Condition | Pushed |
| :---- | :---- | :---- | :---- |
| "user" | undefined | undefined → use match | "user" |
| "address" | undefined | undefined → use match | "address" |
| "\[0\]" | "0" | defined → use bracketKey | "0" |
| "street" | undefined | undefined → use match | "street" |

Result: \["user", "address", "0", "street"\]

# **9\. Quick Reference**

| Concept | Symbol | Meaning |
| :---- | :---- | :---- |
| Capturing group | () | Groups and stores the match |
| Non-capturing group | (?:) | Groups but does NOT store |
| Character class | \[\] | Match ONE of these chars |
| Greedy quantifier | \* | As much as possible |
| Lazy quantifier | \*? | As little as possible |
| Escape literal | \\\[ | Match actual \[ character |
| Alternation | | | Match left OR right side |
