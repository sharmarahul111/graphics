var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min - 1) + min + 1);
}

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.draw = function() {
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, true);
    c.fillStyle = color;
    c.fill();
    c.stroke();
    c.closePath();
  }
  this.update = function() {
    gravity = 1;
    friction = 0.8;
    if (y >= canvas.height - radius - dy) {
      dy = -dy * friction;
    } else {
      dy += gravity;
    }

    if (x + radius + dx >= canvas.width || x - radius <= 0) {
      dx = -dx * 0.55;
    }
    y += dy;
    x += dx;
    this.draw();
  }
}
function init() {
  circleArray = [];
  for (var i = 0; i < 20; i++) {

    var dx = 1;
    var dy = 6;
    var radi = Math.floor(Math.random() * 20);
    var radius = radi + 20;
    var x1 = canvas.width - radius - 30;
    var x = Math.floor(Math.random() * x1) + radius;
    var y = Math.floor(Math.random() * 100) + radius;
    var colors = [, "#2285C5", "#7ECEFD", , "#FFF6E5", "#FF7F66"];
    var color = colors[Math.floor(Math.random() * colors.length) - 1];
    //var ball = new Ball(x, y, dx, dy, radius, color);
    circleArray.push(new Ball(x, y, dx, dy, radius, color));

  }
}
init();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var j = 0; j < circleArray.length; j++) {
    circleArray[j].update();
  }
  //ball.update();

}
animate();
document.addEventListener("click", init);


