const textarea = document.querySelector('#editor');
const status = document.querySelector('#status');
const saveCountDisp = document.querySelector('#save-count');
let count = 0;

function debounce(func, wait, options = { leading: true, trailing: true }) {
    let timeout;
    let lastArgs;

    return function (...args) {
        const context = this;
        const isInvoked = options.leading && !timeout;

        // Capture arguments for the trailing edge
        lastArgs = args;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
            // If trailing is true and we didn't just fire on the leading edge
            if (options.trailing && lastArgs) {
                func.apply(context, lastArgs);
                lastArgs = null;
            }
        }, wait);

        if (isInvoked) {
            func.apply(context, args);
            lastArgs = null; // Clear to prevent double-firing if only one click occurred
        }
    };
}

const saveContent = debounce((e) => {
    count++;
    saveCountDisp.innerText = count;
    status.innerText = "Saved at " + new Date().toLocaleTimeString();
    status.style.color = "green";
}, 2000);

textarea.addEventListener('input', (e) => {
    status.innerText = "Typing...";
    status.style.color = "orange";
    saveContent(e);
});