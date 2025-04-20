// Attach event listeners to buttons
document.querySelectorAll(".controller-button").forEach((button) => {
  button.addEventListener("click", () => {
    const buttonName = button.getAttribute("data-button-name"); // e.g., "A", "B", "X", etc.

    // Send the button press message
    window.parent.postMessage({ type: "button_press", button: buttonName }, "*");
  });
});
