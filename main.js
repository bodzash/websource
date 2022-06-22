const script =`

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

ctx.fillStyle = "white"
ctx.fillRect(30, 30, 20, 20)

console.log(canvas)
`

const xd = `
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let idealWidth = 0
const idealHeight = 240

const aspectRatio = screen.width / screen.height
idealWidth = Math.round(idealHeight * aspectRatio)

if (idealWidth & 1) idealWidth++

canvas.width = 320 //idealWidth
canvas.height = 240

canvas.style.width = "1024px" //""+screen.width+"px"
canvas.style.height = "768px" //""+screen.height+"px"

class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.hspeed = 0
    this.vspeed = 0
    this.health = 10
    this.speed = 1

    this.sprite = sprFishWalk
    this.prevSprite = this.sprite
    this.frame = 0

    this.collider = new BoundingBox(this.x, this.y, 6, 13, 14, 8)
    //this.hitbox = new BoundingBox(this.x, this.y, 7, 6, 14, 14)
  }

  Update() {
    switch(this.sprite) {
      case sprFishWalk: {
        this.frame += 0.23
        if (this.frame > 6) this.frame = 0
        break
      }
      case sprFishIdle: {
        this.frame += 0.30
        if (this.frame > 4) this.frame = 0
        break
      }
    }

    

    this.hspeed = (InputMap.d - InputMap.a) * this.speed
    this.vspeed = (InputMap.s - InputMap.w) * this.speed

    this.x += this.hspeed
    this.y += this.vspeed

    this.sprite = (InputMap.a || InputMap.d || InputMap.w || InputMap.s) ? sprFishWalk : sprFishIdle
    if (this.sprite !== this.prevSprite) {this.frame = 0; this.prevSprite = this.sprite}

    //this.hitbox.Update(this.x, this.y)
    this.collider.Update(this.x, this.y)

    collideAndSlide(this, wall1)
    //collideAndSlide(this, wall2)

    this.Render()
  }
  Render() {
    ctx.drawImage(this.sprite, 24 * Math.floor(this.frame), 0, 24, 24, Math.round(this.x), Math.round(this.y), 24, 24)
    //this.hitbox.Render()
    this.collider.Render()

    //ctx.fillStyle = "red"
    //ctx.fillRect(this.x + 12, this.y + 12, 1, 1)
  }
}

class Wall {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.collider = new BoundingBox(this.x, this.y, 0, 0, 16, 16)
  }
  Update() {
    this.Render()
  }
  Render() {
    ctx.fillStyle = "black"
    ctx.fillRect(this.x, this.y, this.collider.w, this.collider.h)

    this.collider.Render()

    //ctx.fillStyle = "red";
    //ctx.fillRect(this.x, this.y, 1, 1)
  }
}

class Weapon {
  constructor() {

  }
  Update() {

  }
  Render() {

  }
}

//class Pistol, class AssaultRifle, class Shotgun extends Weapon

class Bullet {
  constructor() {

  }
  Update() {

  }
  Render() {

  }
}

class Camera {
  constructor() {

  }
  Update() {

  }
  Render() {

  }
}

class Enemy {
  constructor() {

  }
  Update() {

  }
  Render() {

  }
}

//class Maggot, class Bandit, class BigBandit extends Enemy

class BoundingBox {
  constructor(x, y, xo, yo, w, h) {
    this.x = x
    this.y = y
    this.xo = xo
    this.yo = yo
    this.w = w
    this.h = h

    this.north = 0
    this.south = 0
    this.west = 0
    this.east = 0
  }

  Update(xx, yy) {
    this.x = xx
    this.y = yy
  }

  Render() {
    //ctx.fillStyle = "rgba(0, 0, 255, .5)";
    //ctx.fillRect(Math.round(this.x + this.xo), Math.round(this.y + this.yo), this.w, this.h)

    //ctx.fillStyle = "red";
    //ctx.fillRect(Math.round(this.x + this.xo), Math.round(this.y + this.yo), 1, 1)

    //ctx.fillStyle = "yellow"
    //ctx.fillRect(Math.round(this.x + this.xo + this.w/2), Math.round(this.y + this.yo + this.h/2), 1, 1)
  }
}

class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

let sprFishIdle = loadSprite("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAACcklEQVRoQ+1YsU7DMBC9ShUzElWH/gFzBxhgQ4Kf6F90gxE2Bv6BnygSGx0Y6IbUP+hQFYkZIQWdE6dOcvY5PpuAFC9UpHm+e+/57twB9KtTBgad7t5vDr0AHZugF+AfCJAVMaJY5ueOQ/8z24v48TkB2fp+BMfzHWxfJzA+3ZiZ+7zPMSVKgAOvmSaFgUT8+BCoNnhb7ODydgJPN5vy7+xZpe+D4eKpkgDiF7gxsBFDRJCPwBJ+OPKy6fUQVuffZRzbw4n6jEQ9nAxhdaeecTisAKkFToRf4Wf9PoKjs4NW/LiIa5BvsohCjD83MH0RiUDugdiRBE5pICs/Ov7ZHFh+nALAYk+5Ito4CRVLXwWVokoCqfHrRzCCgTKTHxu++r+DH16A/GXAUkStogTpR21KUZ5AavwishQCxzAoRZieFMDcwKxvlBAfyy81KXn0g9T4OrxUAlfjFxqIFAC7um4mWOdx6bpm66Y4IRUjKncK1FSSEr+M0SihMQ1ExR+KbyMre7zI08BGgit0A4tgKfFTC4wpNeIPNaj3CXDNkVyjqb1LEhQRnyQoooHI+EPxnT2gfgewktRuCipraCp8qkREFLh9/I5JiL0H4Lv18RMnCr3Us3YClE3SJoAQvz1Bgvgpfhpih46hJkG2MU5wEVP3AGkCDmdb8YUCkwbSmGhIE1/l5/i1gJ1YcBQ1SG7kq0QK+zmicRGznbYY+IhNmUhgINVrpPx4CWApMTmBYeSXLpImwNR2MUE++PoyWbsDmfwgDMk1L0AegatZcxiuHPaXmuYermdsTy2+8Fv4wfxIyPMlof+eg4FegI7t0QvQsQA/MkfUKBsnukYAAAAASUVORK5CYIIA")
let sprFishWalk = loadSprite("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAYCAYAAAAVpXQNAAADT0lEQVRoQ+1au07dQBBdJJQaKYji/kFqCiiSLlL4Cf6CLpShS8E/8BNESpcUKUKHxB/cAhEpdYR0oxl717Prfcw+xnGw3XB9bc+Ozznz2sueWo8VgQoE9iqeXR9dEVCrgFYRVCEwJwHt+jcBn+jnqhd8YQ/PDiOugKZwfPfw+VC9uXhSjz826uh0S7nn+vkv9bJIjLjETEEurvHz9kl9+LRRXy635u/5V9QF11efiF4CufgOc8OIS4okuYDL7vjjvrp792zIfzzY4GcQ0vXJvrq7wmtcf10RSQeAOLmADxwUIzgHnACj8wul1FlVoBVhxCFEnFxXPJR9AOjo91Ydf6sSkWQAID6C5Abta5w0RhUCKg6AlIBG4pEgV90OVlEoJBNZqaQswiQDYBJyXYE2xqgqAJICEiYXyxeu0YlDabDcGtSXMP11ym99n3QAjMBvTK4p75jhujLOwSgLH1/25Ga31EKi5BqRkAz0cH+oXr995erHnP/6/gcnNWY/1PnfH/8ZuV1wad9Jj5jCqJ9gU9za4uyzfi5GoUWM45SAlOO55MJEocUCfQ4cuikMKQgmtByAJLObMLlIcAlGGVPrkEET2Y1kQEszQQGVOJ5JLgJ0876jAacIGFPbZKDZBkAGuaYM52LEDLAm2S2W5qTINcD4RBqsXfoCr5EuitwpAoBJbjlGPHyaZbesDNSIXAOOrwTE1sgc5ecXAHxyLYzoYKEnVG+vUmC/Nrsle6DYHg0lO5dcKh6sr2R0B1v0gGv0O8amojcDSQQAHbG1j423IUyz69q1RFQgnuwK4FkjWsJ8G2QxchnEmsgKbb75SHbXDDV05FlvfY9NGJkBQN0cbRX4MKrY5LMzNpkq8UK//cGcSi2/4cS3x+QGNFlnpJekgILRZPck+owzOg6AUDAGIJKJgtyQWm80xrvGaUlgCNPnWyfWwHZBhTBDONjr5Wcer4h82c0IKbJGVEAGlDi5KRJjghimpfLfueL2GSK1eozy39zouxifsAUotzkVdui71a7YnAc5TguoTuE52UTqXo5IuzLUlmgJm1IYmapgRMTkPS6gzmxNhpF+4Vb2Jf6BTcJmq/dtltmWII4pQF/sGquAFkt9mxdfBdQGx8Va+QtiNHs3f+p5ZgAAAABJRU5ErkJgggAA")

let canHurtMeLayer = []
let entityArray = []


let player = new Player(64, 16)
let wall1 = new Wall(32, 32)
//let wall2 = new Wall(32, 48)

requestAnimationFrame(gameLoop)



function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  wall1.Update()
	player.Update()
  //wall2.Update()
  requestAnimationFrame(gameLoop)
}


function collideAndSlide(obj1, obj2) {
  let col1 = obj1.collider
  let col2 = obj2.collider

  /*
  while(col1.x + col1.xo + col1.w > col2.x - col2.xo &&
    col1.x + col1.xo < col2.x + col2.xo + col2.w &&
    col1.y + col1.yo + col1.h > col2.y + col2.yo &&
    col1.y + col1.yo < col2.y + col2.yo + col2.h)
  {
    let ang = pointDirection(obj2.x + 8, obj2.y + 8, obj1.x + 12, obj1.y + 12)

    obj1.x += 1 * Math.cos(3.14 / 180 * ang)
    obj1.y -= 1 * Math.sin(3.14 / 180 * ang)

    //obj1.x -= obj1.hspeed
    //obj1.y -= obj1.vspeed

    col1.Update(obj1.x, obj1.y)

    console.log("COLLISION")
  }
  */

  
  if (
    col1.x + col1.xo + col1.w > col2.x - col2.xo &&
    col1.x + col1.xo < col2.x + col2.xo + col2.w &&
    col1.y + col1.yo + col1.h > col2.y + col2.yo &&
    col1.y + col1.yo < col2.y + col2.yo + col2.h
    )
  {
    let ang = pointDirection(obj2.x + 8, obj2.y + 8, obj1.x + 12, obj1.y + 12)

    //obj1.x += 2 * Math.cos(3.14 / 180 * ang)
    //obj1.y -= 2 * Math.sin(3.14 / 180 * ang)

    obj1.x += 1.41 * Math.cos(3.14 / 180 * ang)
    obj1.y -= 1.41 * Math.sin(3.14 / 180 * ang)

    col1.Update(obj1.x, obj1.y)

    console.log("COLLISION")
  }
  
}

// Returns angle between two points
function pointDirection(x1, y1, x2, y2) { //
  let rad = Math.atan2(y1 - y2, x1 - x2) * ( 180 / 3.14 )
  return Math.abs(rad - 180)
}

function pointDistance(x1, y1, x2, y2) {
  let a = x1 - x2
  let b = y1 - y2
  return Math.sqrt(a * a + b * b)
}

function loadSprite(path) {
  let spr = new Image()
  spr.src = path
  return spr
}

let InputMap = {
  w: false,
  s: false,
  a: false,
  d: false
}

window.addEventListener("keydown", (event)=> {
  InputMap[event.key] = 1
})

window.addEventListener("keyup", (event)=> {
  InputMap[event.key] = 0
})
`

document.getElementById("btn").onclick = runGameInBrower
document.getElementById("btn2").onclick = ()=> document.querySelector("iframe").remove()

function runGameInBrower() {
	const iframe = document.createElement('iframe')
	iframe.style = "border: none;"
	iframe.width = 1024
	iframe.height = 768
	const html =
	`<body style="padding: 0; margin: 0; overflow: hidden; box-sizing: border-box;" > 
			<canvas id="canvas" style="background: rgb(77, 77, 77); image-rendering: pixelated;" oncontextmenu="return false"></canvas>
			<script>${xd}</script>
	</body>`
	iframe.srcdoc = html
  document.querySelector("#canvas-pane").append(iframe)
	//document.body.appendChild(iframe)
}

/*
const iframe = document.createElement('iframe')
iframe.style = "border: none;"
iframe.width = 1024
iframe.height = 768
const html =
`<body style="padding: 0; margin: 0; overflow: hidden; box-sizing: border-box;" > 
    <canvas id="canvas" style="background: rgb(77, 77, 77); image-rendering: pixelated;" oncontextmenu="return false"></canvas>
    <script>${xd}</script>
</body>`
iframe.srcdoc = html
document.body.appendChild(iframe)
*/

// raneming asset should rename the class code as well class Before -> class After

class Diarreha {
  constructor(x) {
    this.y = "Woof"
  }
}

class Shit {
  constructor() {
    this.Bukkake.y = "cat"
    console.log(this.Bukkake);
    console.log(this._Components);
  }
}

//we turn the ide shit into real stuff
Shit.prototype._Components = [new Diarreha(32)]

//we make reference to the real stuff
Shit.prototype.Bukkake = Shit.prototype._Components[0] //<- components will be added like this

new Shit()

/*
  game loop:
  For Each Entity in Level Array {
    Entity's _Update()
    Entity's _Components Array[0 -> length-1]
  }
*/