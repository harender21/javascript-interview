function chunk(arr, size) {
    if (size < 1) return [];

    const result = [];
    let temp = [];

    for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i]);

        if (temp.length === size) {
            result.push(temp);
            temp = [];
        }
    }

    if (temp.length) result.push(temp);

    return result;
}


chunk([1, 2, 3, 4, 5], 1)
// [[1], [2], [3], [4], [5]]

chunk([1, 2, 3, 4, 5], 2)
// [[1,2], [3,4], [5]]

chunk([1, 2, 3, 4, 5], 3)
// [[1,2,3], [4,5]]

chunk([1, 2, 3, 4, 5], 4)
// [[1,2,3,4], [5]]

chunk([1, 2, 3, 4, 5], 5)
// [[1,2,3,4,5]]