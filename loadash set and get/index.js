function getByPath(obj, path) {
    if (!path) return obj;

    const keys = path.split(".");
    let current = obj;

    for (let key of keys) {
        if (current == null || !(key in current)) {
            return undefined;
        }
        current = current[key];
    }

    return current;
}

function setByPath(obj, path, value) {
    if (!path) return obj;

    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // Create object if key doesn't exist or is not an object
        if (!(key in current) || typeof current[key] !== "object") {
            current[key] = {};
        }

        current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    return obj;
}

const obj = {};

// Set values
setByPath(obj, "a.b.c", 10);
setByPath(obj, "a.b.d", 20);

console.log(obj);
// { a: { b: { c: 10, d: 20 } } }

// Get values
console.log(getByPath(obj, "a.b.c")); // 10
console.log(getByPath(obj, "a.b.x")); // undefined