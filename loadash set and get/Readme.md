## setByPath - I and getByPath (similar to loadash)
- Write a function setByPath(obj, path, value) that sets a value in a nested object using a dot-notation path string. Also write the companion function getByPath(obj, path) that retrieves a value. (does not support nested array in object)

✅ 1. getByPath(obj, path)
✔️ Approach:
- Split path by "."
- Traverse object step by step
- If any key is missing → return undefined


✅ 2. setByPath(obj, path, value)
✔️ Approach:
- Split path
- Traverse until second last key
- Create nested objects if missing
- Set final value

- Edge Cases Covered
✅ Empty path → returns object
✅ Missing keys → safely handled
✅ Overwrites non-object values: