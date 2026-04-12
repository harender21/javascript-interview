const btn = document.querySelector('#like-btn');
const display = document.querySelector('#count');
let callCount = 0;

function debounceLeading(func, wait) {
    let timeout;

    return function (...args) {
        const context = this;
        //if no timeout exist, we are 'clear' to fire
        const callNow = !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
        }, wait);

        //Fire immediately if we are clear
        if (callNow) func.apply(this, args);
    }
}

const sendLikeRequest = debounceLeading(() => {
    callCount++;
    display.innerText = callCount;
    console.log("API Request Sent!");
}, 1000);

btn.addEventListener('click', sendLikeRequest);