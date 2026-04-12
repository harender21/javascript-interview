function getHiddenMessage(grid) {
    if (!grid || grid.length === 0 || grid[0].length == 0) return "";

    const rows = grid.length;
    const cols = grid[0].length;

    let row = 0;
    let col = 0;
    let dir = 1; // 1 = down-right, -1 = up-right
    let result = "";

    while (true) {
        result += grid[row][col];

        let nextRow = row + dir;
        let nextCol = col + 1;

        // Check if current direction is valid
        if (
            nextRow >= 0 &&
            nextRow < rows &&
            nextCol < cols
        ) {
            row = nextRow;
            col = nextCol;
        } else {
            // Switch direction
            dir *= -1;

            nextRow = row + dir;
            nextCol = col + 1;

            // Check again after switching
            if (
                nextRow >= 0 &&
                nextRow < rows &&
                nextCol < cols
            ) {
                row = nextRow;
                col = nextCol;
            } else {
                break; // No movement possible
            }
        }
    }

    return result;
}

const grid = [
    ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
    ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
    ['G', 'H', 'O', 'E', 'L', 'A', 'D']
];

console.log(getHiddenMessage(grid)); // "IROCLED"