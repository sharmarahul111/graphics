var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

function randInt(min, max){
 return Math.floor(Math.random() * (max - min - 1) + min + 1);
 }

var mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}
window.addEventListener("touchmove",function(event){
	mouse.x = event.touches[0].clientX;
	mouse.y = event.touches[0].clientY;
	
});

function Circle(x,y,radius,color,shadow2){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.shadow = {
		color:shadow2.shadowColor,
		blur:shadow2.shadowBlur
	}
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
		c.fillStyle = this.color;
		c.shadowBlur = this.shadow.blur;
		c.shadowColor = this.shadow.color;
		c.fill();
		c.closePath();
	}
	this.update = function(){
		this.draw();
	}
}


var moon = new Circle(canvas.width - 77,50,25,"white",{
	shadowColor:"white",
	shadowBlur:"10"
});
var sunShadow = new Circle(canvas.width - 90,45,22,"black",{
	shadowColor:"white",
	shadowBlur:"0"
});

var yCoord = canvas.height/2;
var y = canvas.height/2;
var amplitude = 15;
var wavelength = 0.005;
var frequency = 0.05;
var increment = 0;
var color = 0;
var trails = 0;
var stars = [];
for(var i=0;i<150;i++){
	var x = Math.random()*canvas.width;
	var y2 = Math.random()*(canvas.height-20);
	var radius = Math.random()*1.5;
	stars.push(new Circle(x,y2,radius,"white",{
		shadowColor:"white",
		shadowBlur:radius*0.5
	}));
}

c.moveTo(0,yCoord);
function animate(){
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,1)';
	c.fillRect(0 ,0 ,innerWidth,innerHeight);
	moon.update();
	sunShadow.update();
	stars.forEach(function(star){
		star.update();
	});
	c.beginPath();
	c.moveTo(0,canvas.height);
	for(i=0;i<canvas.width;i++){
		c.lineTo(i,yCoord+ Math.sin(i*wavelength+increment) * (amplitude*Math.sin(increment)));
	}
	c.lineTo(canvas.width,canvas.height);
	c.fillStyle = 'hsl(240,70%,50%)';
	c.shadowColor = 'hsl(240,70%,50%)';
	c.fill();
	
	
	c.beginPath();
	c.moveTo(0,y*2);
	for(i=0;i<canvas.width;i++){
	c.lineTo(i,canvas.height - 40 + Math.sin(i*wavelength) * (amplitude));
	}
	c.lineTo(canvas.width,canvas.height);
	c.fillStyle = 'hsl(140,70%,30%)';
	c.shadowColor = 'hsl(140,70%,40%)';
	c.shadowBlur = 2;
	c.fill();
	
	increment += frequency; 
	
} 
animate();


