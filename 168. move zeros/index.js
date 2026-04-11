function moveZeros(arr) {
    let j = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            j++;
        }
    }
}

const arr = [1, 0, 0, 2, 3];
moveZeros(arr);
console.log(arr)