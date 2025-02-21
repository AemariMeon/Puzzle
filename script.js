// Select the overlay element
const overlay = document.querySelector('.overlay');

// Listen for mouse movement over the entire document or just the container
document.addEventListener('mousemove', (event) => {
  // Get the mouse position relative to the viewport
  const x = event.pageX;
  const y = event.pageY;

  // Update the radial gradient so the bright center is at the mouse position
  overlay.style.background = `
    radial-gradient(
      circle 100px at ${x}px ${y}px,
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0.95) 70%
    )
  `;
});
