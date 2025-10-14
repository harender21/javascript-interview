function throttle(func, wait) {
  let shouldTrottled = false;
  return function(...args) {
    if(shouldTrottled) {
      return;
    }

    shouldTrottled = true;
  
    setTimeout(() => {
      shouldTrottled = false;
    }, wait);

    func.apply(this, args);

  };
}

// Dom element to display mouse coordinates
const output = document.getElementById('output');

//function to update position
function updateMousePosition(event) {
    output.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;
}

//Throttle the update function to run every 500ms
const throlledMouseMove = throttle(updateMousePosition, 500);

window.addEventListener('mousemove', throlledMouseMove);


