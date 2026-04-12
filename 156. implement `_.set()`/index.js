function set(obj, path, value) {
    if (obj == null) return obj;

    // Convert path to array
    const keys = Array.isArray(path) ? path : parsePath(path);

    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];

        // Last key → assign value
        if (i === keys.length - 1) {
            current[key] = value;
            break;
        }

        // Decide next structure
        if (current[key] == null) {
            const nextKey = keys[i + 1];

            // valid array index → create array
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

// Parse string path into keys
function parsePath(path) {
    const result = [];

    path.replace(/[^.[\]]+|\[(.*?)\]/g, (match, bracketKey) => {
        result.push(bracketKey !== undefined ? bracketKey : match);
    });

    return result;
}

// Check valid array index (no leading zero like "01")
function isValidIndex(key) {
    return /^\d+$/.test(key) && String(Number(key)) === key;
}


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