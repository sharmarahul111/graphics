var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")
canvas.height = innerHeight
canvas.width = innerWidth;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min - 1) + min + 1);
}

var mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
}
window.addEventListener("touchmove", function(event) {
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;

});
window.addEventListener("scrool", function(event) {
  e.preventDefault();

});


function BluePrint(x, y, velocity, radius, color) {
  this.x = x; this.y = y; this.velocity = velocity;
  this.radius = radius; this.color = color;
  this.ttl = 150;
  this.opacity = 1;

  this.draw = function() {
    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.globalAlpha = this.opacity;
    c.fillStyle = color;
    c.fill();
    c.closePath();
  }
  this.update = function() {

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
    this.ttl--;
    this.opacity -= 1 / 200;
  }
}
var global = {
  x: canvas.width / 2,
  y: canvas.height / 2,
}
var balls = [];
var iterate = 40;
var hue = 0;
var hueRadian = 0;
function generator() {
  hue = Math.sin(hueRadian);

  for (var i = 0; i < iterate; i++) {
    var radian = (Math.PI * 2) / iterate;

    var x = mouse.x;
    var y = mouse.y;
    var color = "hsl(" + Math.abs(hue * 360) + ",50%,60%)";
    balls.push(new BluePrint(x, y, {
      x: Math.cos(radian * i),
      y: Math.sin(radian * i)
    }, 4, color));
    hueRadian += 0.002;
  }
  setTimeout(generator, 400);
}


function animate() {

  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.7)";
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < balls.length; i++) {
    if (balls[i].ttl <= 0) {
      balls.splice(i, 1);
    } else {
      balls[i].update();
    }
  }

}
animate();
generator();

/*setTimeout(function(){
  var dataURI = canvas.toDataURL("image/png",1);
  var a = document.createElement("a");
  a.innerHTML = "download";
  a.download = "star.png";
  document.body.appendChild(a);
  a.href = dataURI;
  a.click();
  },4000);
  */

