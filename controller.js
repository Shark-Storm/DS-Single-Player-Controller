let moveJoystick;  // Declare moveJoystick in a scope accessible globally

// Send key press based on the button pressed
function sendKey(key) {
  fetch("http://192.168.0.27:5000/press/" + key)
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Joystick move simulation using dragging
function startJoystickDrag(event) {
  const joystick = document.querySelector('.joystick-pad');
  const joystickCenter = document.querySelector('.joystick-center');
  const joystickRect = joystick.getBoundingClientRect();
  
  // Calculate the initial touch/mouse position relative to the joystick area
  const centerX = joystickRect.left + joystickRect.width / 2;
  const centerY = joystickRect.top + joystickRect.height / 2;

  // Handle the movement of the joystick center
  moveJoystick = function (event) {
    let clientX, clientY;
    
    // For touch events
    if (event.touches) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      // For mouse events
      clientX = event.clientX;
      clientY = event.clientY;
    }

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    // Limit the movement within the joystick boundary
    const maxDistance = joystickRect.width / 2;
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), maxDistance);
    
    const angle = Math.atan2(deltaY, deltaX);

    // Calculate new joystick center position within bounds
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    joystickCenter.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Send directional key based on joystick's movement
    sendJoystickDirection(moveX, moveY);
  };

  // Add event listeners for dragging and stopping
  if (event.touches) {
    document.addEventListener('touchmove', moveJoystick);
    document.addEventListener('touchend', stopJoystickDrag);
    document.addEventListener('touchcancel', stopJoystickDrag);
  } else {
    document.addEventListener('mousemove', moveJoystick);
    document.addEventListener('mouseup', stopJoystickDrag);
    document.addEventListener('mouseleave', stopJoystickDrag);
  }
}

// Stop the joystick drag movement
function stopJoystickDrag() {
  // Remove event listeners for dragging
  document.removeEventListener('mousemove', moveJoystick);
  document.removeEventListener('mouseup', stopJoystickDrag);
  document.removeEventListener('mouseleave', stopJoystickDrag);
  document.removeEventListener('touchmove', moveJoystick);
  document.removeEventListener('touchend', stopJoystickDrag);
  document.removeEventListener('touchcancel', stopJoystickDrag);

  // Reset the joystick center back to the original position when drag ends
  const joystickCenter = document.querySelector('.joystick-center');
  joystickCenter.style.transform = 'translate(0, 0)';
}

// Determine joystick movement direction and send it
function sendJoystickDirection(moveX, moveY) {
  // Determine horizontal and vertical movement (simple logic for 4-way direction)
  if (Math.abs(moveX) > Math.abs(moveY)) {
    if (moveX > 0) {
      sendKey('right');
    } else {
      sendKey('left');
    }
  } else {
    if (moveY > 0) {
      sendKey('down');
    } else {
      sendKey('up');
    }
  }
}

// Add event listener to start dragging the joystick
document.querySelector('.joystick-pad').addEventListener('mousedown', startJoystickDrag);
document.querySelector('.joystick-pad').addEventListener('touchstart', startJoystickDrag);


// Prevent touch scrolling on the joystick
const joystickPad = document.querySelector('.joystick-pad');

joystickPad.addEventListener('touchstart', function(e) {
  e.preventDefault();
}, { passive: false });

joystickPad.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

joystickPad.addEventListener('touchend', function(e) {
  e.preventDefault();
}, { passive: false });
