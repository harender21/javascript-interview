const textarea = document.querySelector('#editor');
const status = document.querySelector('#status');
const saveCountDisp = document.querySelector('#save-count');
let count = 0;

function debounce(func, wait, options = { leading: true, trailing: true }) {
    let timeout = null;
    let lastArgs = null;
    let lastContext = null;

    return function (...args) {
        lastArgs = args;
        lastContext = this;

        const shouldCallNow = options.leading && !timeout;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            timeout = null;

            if (options.trailing && lastArgs) {
                func.apply(lastContext, lastArgs);
                lastArgs = null;
            }
        }, wait);

        if (shouldCallNow) {
            func.apply(lastContext, lastArgs);
            lastArgs = null;
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