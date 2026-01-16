var video = document.querySelector("video");
var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth
canvas.height = innerHeight
var x = 140;
var y = 40;
var dx = 8;
var dy = 8;
var radius = 24;
var color = 0;

function animate() {

  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.3)';
  c.fillRect(0, 0, innerWidth, innerHeight);

  c.beginPath();
  c.strokeStyle = "aqua";
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.fillStyle = 'hsl(' + color + ',60%,60%)';
  c.fill();

  if (x > canvas.width - radius) {
    dx = -1 * dx;
  } else if (x < radius) {
    dx = Math.floor(Math.random() * 10);
  }

  if (y > canvas.height - radius) {
    dy = -1 * dy;
  } else if (y < radius) {
    dy = Math.floor(Math.random() * 10);
  }

  x += dx;
  y += dy;
  if (color == 360) {
    color = 0
  } else {
    color += 2;
  }

}
animate();

