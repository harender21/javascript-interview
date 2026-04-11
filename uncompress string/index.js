function uncompress(s) {
    let stack = [];
    let currStr = "";
    let num = 0;

    for (let char of s) {
        if (!isNaN(char)) {
            // Build number (handles multi-digit)
            num = num * 10 + Number(char);
        } else if (char === "(") {
            // Push current state
            stack.push([currStr, num]);

            // Reset for new substring
            currStr = "";
            num = 0;
        } else if (char === ")") {
            // Pop previous state
            const [prevStr, repeatCount] = stack.pop();

            // Expand current substring
            currStr = prevStr + currStr.repeat(repeatCount);
        } else {
            // Normal character
            currStr += char;
        }
    }

    return currStr;
}

let res = uncompress('3(ab2(c))');
console.log(res);