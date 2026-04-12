function chunk(arr, size) {
    // Edge case
    if (size < 1) return [];

    const result = [];

    for (let i = 0; i < arr.length; i += size) {
        const chunk = arr.slice(i, i + size);
        result.push(chunk);
    }

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