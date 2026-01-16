var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;


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
  }
  this.update = function() {
    if (y >= canvas.height - radius) {
      dy = -dy * 0.8;
    } else {
      dy += 1;
    }
    y += dy;

    this.draw();
  }
}
var circleArray = [];
for (var i = 0; i < 10; i++) {

  var dx = 6;
  var dy = 6;
  var radi = Math.floor(Math.random() * 20);
  var radius = radi + 20;
  var x1 = canvas.width - radius;
  var x = Math.floor(Math.random() * x1) + radius;
  var y = Math.floor(Math.random() * 200) + radius;
  var colors = ["red", "green", "blue", "aqua", "pink", "navy", "purple", "yellow", , "teal"];
  var color = colors[Math.floor(Math.random() * colors.length) - 1];
  //var ball = new Ball(x, y, dx, dy, radius, color);
  circleArray.push(new Ball(x, y, dx, dy, radius, color));

}

function animate() {

  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var j = 0; j < circleArray.length; j++) {
    circleArray[j].update();
  }
  //ball.update();

}
animate();
