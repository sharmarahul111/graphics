var canvas = document.getElementById("myCanvas");
    var c = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight
    /*
    function randInt(min, max){
    return Math.floor(Math.random() * (max - min - 1) + min + 1);
    }
    */
    function Ball(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;

      this.radius = radius;
      this.color = color;
      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
      }
      this.update = function () {
        if (this.x > 300 - this.radius) {
          this.dx = -1 * this.dx;
        } else if (this.x < this.radius) {
          this.dx = Math.floor(Math.random() * 2);
        }

        if (this.y > 350 - this.radius) {
          this.dy = -1 * this.dy;
        } else if (this.y < this.radius) {
          this.dy = Math.floor(Math.random() * 2);
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }
    function init() {

      big = new Ball(150, 175, 4, 7, 50, "green");
      small = new Ball(20, 320, 3, 3, 20, "red");

    }
    init();
    var time = 0;
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, innerWidth, innerHeight);
      big.draw();
      small.update();
      if (distance(big.x, big.y, small.x, small.y) < big.radius + small.radius) {
        big.color = "red";
        console.log(distance(big.x, big.y, small.x, small.y));
        small.dx = -small.dx;
        small.dy = -small.dy;
        time += 1;
        document.getElementById("p").innerHTML = time;
      } else {
        big.color = "green";
      }

    }
    function distance(x1, y1, x2, y2) {
      xVal = x2 - x1;
      yVal = y2 - y1;
      var next = Math.pow(xVal, 2) + Math.pow(yVal, 2);
      return Math.sqrt(next);
    }
    animate();
    document.addEventListener("click", init);

    /*c.beginPath();
    c.arc(x ,y ,radius ,0 ,Math.PI * 2 ,true);
    c.strokeStyle = "green";
    c.stroke();
    
    
    if(x > 280){
       dx = -1 * dx;
    }else if(x <radius){
     dx = Math.floor(Math.random()* 10);
    }
    
    if(y > 280){
    dy = -1 * dy;
    }else if(y <radius){
    dy = Math.floor(Math.random()* 10);
    }
    
    x += dx;
    y += dy;
    }
    animate();
    */



