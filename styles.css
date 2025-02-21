/* Basic reset and body styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #ffe6f2; /* Cute pink background */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  min-height: 100vh;
}

/* Anime header styling (optional) */
.anime-header {
  width: 100%;
  max-width: 1264px; /* The width of your header image */
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Main container */
main {
  max-width: 800px;
  margin: 20px auto;
}

/* Container that holds the puzzle_image in the background */
.container {
  position: relative;
  width: 400px;   /* Adjust to any desired size */
  height: 400px;  /* Adjust to any desired size */
  margin: 20px auto;
  background: url("puzzle_image.jpg") center center / cover no-repeat;
  border: 2px solid #ff99cc;
  overflow: hidden;
}

/* The overlay that darkens everything except for the flashlight circle */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* So mouse events pass through to the container */
  /* Default gradient (centered); we’ll update it in JS */
  background: radial-gradient(
    circle 100px at 50% 50%, 
    rgba(255, 255, 255, 0), 
    rgba(0, 0, 0, 0.95) 70%
  );
  transition: background-position 0.02s;
}
