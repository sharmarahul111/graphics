const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const fontSize = 15
const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZΘΣΨΩ$₿".split('')
canvas.width = innerWidth
canvas.height = innerHeight
let columns = Math.floor(canvas.width/fontSize)
c.textAlign = "center"
c.font = fontSize+"px monospace"
class Text {
  constructor(x,y){
    this.x = x
    this.y = y
  }
  draw(){
    this.y += fontSize
    if (this.y > canvas.height && Math.random() > .97) {
      this.y = -fontSize
    }
    c.fillText(chars[Math.floor(Math.random()*chars.length)], this.x, this.y)
  }
}

let texts = []
for (var i = 0; i < columns; i++) {
  texts.push(new Text(i*fontSize, -Math.random()*fontSize*10))
}
//rygcbm
let gradient = c.createLinearGradient(0,0,canvas.width,canvas.height)
gradient.addColorStop(0,"red")
gradient.addColorStop(.2,"yellow")
gradient.addColorStop(.4,"green")
gradient.addColorStop(.6,"cyan")
gradient.addColorStop(.8,"blue")
gradient.addColorStop(1,"magenta")
// console.log(canvas.width)
let fps = 50
let frame = 1000/fps, timer = 0, lastTime = 0
function animate(timeStamp){
  const deltaTime = timeStamp-lastTime
  lastTime = timeStamp
  if (timer > frame) {
    c.fillStyle = "rgba(0,0,0,.1)"
    c.fillRect(0,0,canvas.width,canvas.height)
    c.fillStyle = gradient//"#0aff0a"
    texts.forEach(text => {
      text.draw()
    })
    timer = 0
  }else {
    timer += deltaTime
  }
  requestAnimationFrame(animate)
}
animate(0)

addEventListener("resize",function(){
  canvas.width = innerWidth
  canvas.height = innerHeight
  columns = Math.floor(canvas.width/fontSize)
  texts = []
  for (var i = 0; i < columns; i++) {
    texts.push(new Text(i*fontSize, -Math.random()*fontSize*10))
  }
})