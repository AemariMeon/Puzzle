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
  padding-bottom: 50px;
}

/* Anime header styling */
.anime-header {
  width: 100%;
  max-width: 1264px; /* The width of your header image */
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Main puzzle heading and container */
main {
  margin: 20px auto;
  max-width: 800px;
}

/* Container that holds the puzzle */
.puzzle-container {
  position: relative;
  margin: 20px auto;
  width: 720px;  /* Match puzzle image width */
  height: 728px; /* Match puzzle image height */
  background-color: #fff;
  border: 2px solid #ff99cc;
  overflow: hidden;
}

/* The puzzle itself (absolute-positioned tiles go inside) */
#puzzle {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Each tile styling */
.tile {
  position: absolute;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  /* Replace puzzle_image.jpg with your puzzle image file name. */
  background-image: url("puzzle_image.jpg");
  background-size: 720px 728px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Shuffle button styling */
button {
  background-color: #ff99cc;
  border: none;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 8px;
}

button:hover {
  background-color: #ff77aa;
}
