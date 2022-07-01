const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

ctx.imageSmoothingEnabled = false;

canvas.width = 320 //320
canvas.height = 240 //240

let ratioX = .5
let ratioY = .5

canvas.style.width = "640px";
canvas.style.height = "480px";

let mainArray = [] //main loop shit

/*

Responsive Shit

let ratioX = canvas.width / screen.width //window.innerWidth;
let ratioY = canvas.height / screen.height //window.innerHeight;

//canvas.style.width = ""+window.innerWidth+"px";
//canvas.style.height = ""+window.innerHeight+"px";

//canvas.style.width = ""+screen.width+"px";
//canvas.style.height = ""+screen.height+"px";

canvas.style.width = "100%";
canvas.style.height = "100%";
*/


let Input = {
  a: 0,
  d: 0,
  w: 0,
  s: 0,

  mouseX: 0,
  mouseY: 0,
};

//Later implement premade inputmap defined by user

window.addEventListener("keydown", (event)=> {
  Input[event.key] = 1;
});

window.addEventListener("keyup", (event)=> {
  Input[event.key] = 0;
});

canvas.addEventListener("mousemove", (event) => {
  //Input.mouseX = event.x //Math.round(event.x / ratioX)
  //Input.mouseY = event.y //Math.round(event.y / ratioY)

  Input.mouseX = Math.round(event.x * ratioX)
  Input.mouseY = Math.round(event.y * ratioY)
  
  //console.log("x "+event.x, "y "+event.y)
  //console.log("x "+Input.mouseX, "y "+Input.mouseY)
})


//Sprite functions
function loadSprite(path) {
  let spr = new Image();
  spr.src = path;
  return spr;
};

// Returns angle between two points
function pointDirection(x1, y1, x2, y2) { //
  let theta = Math.atan2(y2 - y1, x2 - x1) * 180 / 3.14;
  if (theta < 0) theta += 360
  return theta
}

//Sprites 
const sprFishIdle = loadSprite("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAACcklEQVRoQ+1YsU7DMBC9ShUzElWH/gFzBxhgQ4Kf6F90gxE2Bv6BnygSGx0Y6IbUP+hQFYkZIQWdE6dOcvY5PpuAFC9UpHm+e+/57twB9KtTBgad7t5vDr0AHZugF+AfCJAVMaJY5ueOQ/8z24v48TkB2fp+BMfzHWxfJzA+3ZiZ+7zPMSVKgAOvmSaFgUT8+BCoNnhb7ODydgJPN5vy7+xZpe+D4eKpkgDiF7gxsBFDRJCPwBJ+OPKy6fUQVuffZRzbw4n6jEQ9nAxhdaeecTisAKkFToRf4Wf9PoKjs4NW/LiIa5BvsohCjD83MH0RiUDugdiRBE5pICs/Ov7ZHFh+nALAYk+5Ito4CRVLXwWVokoCqfHrRzCCgTKTHxu++r+DH16A/GXAUkStogTpR21KUZ5AavwishQCxzAoRZieFMDcwKxvlBAfyy81KXn0g9T4OrxUAlfjFxqIFAC7um4mWOdx6bpm66Y4IRUjKncK1FSSEr+M0SihMQ1ExR+KbyMre7zI08BGgit0A4tgKfFTC4wpNeIPNaj3CXDNkVyjqb1LEhQRnyQoooHI+EPxnT2gfgewktRuCipraCp8qkREFLh9/I5JiL0H4Lv18RMnCr3Us3YClE3SJoAQvz1Bgvgpfhpih46hJkG2MU5wEVP3AGkCDmdb8YUCkwbSmGhIE1/l5/i1gJ1YcBQ1SG7kq0QK+zmicRGznbYY+IhNmUhgINVrpPx4CWApMTmBYeSXLpImwNR2MUE++PoyWbsDmfwgDMk1L0AegatZcxiuHPaXmuYermdsTy2+8Fv4wfxIyPMlof+eg4FegI7t0QvQsQA/MkfUKBsnukYAAAAASUVORK5CYIIA")
const sprFishWalk = loadSprite("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAYCAYAAAAVpXQNAAADT0lEQVRoQ+1au07dQBBdJJQaKYji/kFqCiiSLlL4Cf6CLpShS8E/8BNESpcUKUKHxB/cAhEpdYR0oxl717Prfcw+xnGw3XB9bc+Ozznz2sueWo8VgQoE9iqeXR9dEVCrgFYRVCEwJwHt+jcBn+jnqhd8YQ/PDiOugKZwfPfw+VC9uXhSjz826uh0S7nn+vkv9bJIjLjETEEurvHz9kl9+LRRXy635u/5V9QF11efiF4CufgOc8OIS4okuYDL7vjjvrp792zIfzzY4GcQ0vXJvrq7wmtcf10RSQeAOLmADxwUIzgHnACj8wul1FlVoBVhxCFEnFxXPJR9AOjo91Ydf6sSkWQAID6C5Abta5w0RhUCKg6AlIBG4pEgV90OVlEoJBNZqaQswiQDYBJyXYE2xqgqAJICEiYXyxeu0YlDabDcGtSXMP11ym99n3QAjMBvTK4p75jhujLOwSgLH1/25Ga31EKi5BqRkAz0cH+oXr995erHnP/6/gcnNWY/1PnfH/8ZuV1wad9Jj5jCqJ9gU9za4uyzfi5GoUWM45SAlOO55MJEocUCfQ4cuikMKQgmtByAJLObMLlIcAlGGVPrkEET2Y1kQEszQQGVOJ5JLgJ0876jAacIGFPbZKDZBkAGuaYM52LEDLAm2S2W5qTINcD4RBqsXfoCr5EuitwpAoBJbjlGPHyaZbesDNSIXAOOrwTE1sgc5ecXAHxyLYzoYKEnVG+vUmC/Nrsle6DYHg0lO5dcKh6sr2R0B1v0gGv0O8amojcDSQQAHbG1j423IUyz69q1RFQgnuwK4FkjWsJ8G2QxchnEmsgKbb75SHbXDDV05FlvfY9NGJkBQN0cbRX4MKrY5LMzNpkq8UK//cGcSi2/4cS3x+QGNFlnpJekgILRZPck+owzOg6AUDAGIJKJgtyQWm80xrvGaUlgCNPnWyfWwHZBhTBDONjr5Wcer4h82c0IKbJGVEAGlDi5KRJjghimpfLfueL2GSK1eozy39zouxifsAUotzkVdui71a7YnAc5TguoTuE52UTqXo5IuzLUlmgJm1IYmapgRMTkPS6gzmxNhpF+4Vb2Jf6BTcJmq/dtltmWII4pQF/sGquAFkt9mxdfBdQGx8Va+QtiNHs3f+p5ZgAAAABJRU5ErkJgggAA")
const sprBulletHAR = loadSprite("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAA4klEQVRIS2NkoBFgpJG5DKMGw0N2NCiICor/WJIi0UGHT+F/HS1TuNlv33xgeP7qNrHJnhGXwWBDFRXUMQy6/+AmA8gSYREBOA1TB5K7cu00SA/cYAxvI7sW2XSQofgA1FcIg9G9DdIMchUIoBtmYmIOFt+8bQkDSB/MB1DXorgYxPkvKaaK1TEgV4DkYGHs6xUDNxhXBMPCGMVQmEEgTdgiDOY7WHhicw2GwTCDkFwIUgOKA7haNIOwJgBsisEGIXsdyVBikxvOYhM5lRCdKZBtJUsTMc4eNZio0o2YoMSpBgCxalIYNQcTEwAAAABJRU5ErkJgggAA")

//Entitites
  class Player {
    constructor(x, y) {
      this.x = x || 0
      this.y = y || 0
      this.hspeed = 0
      this.vspeed = 0
      this.Create?.()
      mainArray.push(this)
    }
    
  Create() {
    this.speed = 1

    this.ang = 0

    this.sprite = sprFishWalk
    this.prevSprite = this.sprite
    this.frame = 0
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

    //if (Input.mouseX > this.x) console.log("flip char horiz")
    //if (Input.mouseY < this.y) console.log("flip gun vertic")
    //console.log(Input.mouseX, this.x)
    //console.log(Input.mouseY, this.y)

    this.hspeed = (Input.d - Input.a) * this.speed
    this.vspeed = (Input.s - Input.w) * this.speed

    this.x += this.hspeed
    this.y += this.vspeed

    this.sprite = (Input.a || Input.d || Input.w || Input.s) ? sprFishWalk : sprFishIdle
    if (this.sprite !== this.prevSprite) {this.frame = 0; this.prevSprite = this.sprite;}

  }
  Render() {
    let angle = pointDirection(this.x, this.y,Input.mouseX, Input.mouseY)

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(angle * 3.14 / 180) //covert it back to radians
    ctx.scale( 1, (Input.mouseX > this.x) ? 1 : -1)
    ctx.drawImage(sprBulletHAR, 0 -4, 0 -11)
    //ctx.drawImage(this.sprite, 24 * Math.floor(this.frame), 0, 24, 24, 24 / -2, 24 / -2, 24, 24) 
    ctx.restore()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale( (Input.mouseX > this.x) ? 1 : -1 , 1)
    ctx.drawImage(this.sprite, 24 * Math.floor(this.frame), 0, 24, 24, 24 / -2, 24 / -2, 24, 24) 
    ctx.restore()

    //ctx.drawImage(this.sprite, 24 * Math.floor(this.frame), 0, 24, 24, Math.round(this.x) - 12, Math.round(this.y) - 12, 24, 24) 

    

    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, 1, 1)
  }

  }  
  


let map1 = [new Player(100, 50)]

//mainArray = map1 //this is initiated high above

requestAnimationFrame(gameLoop) //<- make it that, this will only run when assets are loaded

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  mainArray.forEach(ent=> ent.Update?.())
  mainArray.forEach(ent=> ent.Render?.())
  requestAnimationFrame(gameLoop)
};