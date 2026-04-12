function partial(fn, ...presetArgs) {
    return function (...laterArgs) {
        let result = [];
        let laterIndex = 0;

        for (let i = 0; i < presetArgs.length; i++) {
            if (presetArgs[i] === partial.placeholder) {
                // fill placeholder with next laterArg
                result.push(laterArgs[laterIndex++]);
            } else {
                result.push(presetArgs[i]);
            }
        }

        // append remaining laterArgs
        while (laterIndex < laterArgs.length) {
            result.push(laterArgs[laterIndex++]);
        }

        return fn.apply(this, result);
    };
}

// unique placeholder
partial.placeholder = Symbol("placeholder");


const func = (...args) => args;

const func123 = partial(func, 1, 2, 3);
console.log(func123(4));
[1, 2, 3, 4]

const _ = partial.placeholder;

const func1_3 = partial(func, 1, _, 3);
console.log(func1_3(2, 4));
// [1, 2, 3, 4]