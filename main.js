import Compiler from "./compiler/compiler.js"

const modal = document.querySelector("#modal-pane")

document.getElementById("ico-play").onclick = runGameInBrower
document.getElementById("ico-stop").onclick = ()=> {
  document.querySelector("iframe").remove()
  document.querySelector("#modal-pane").style = "display: none"
}

function runGameInBrower() {
  const script = Compiler.compile(Game)
	const iframe = document.createElement('iframe')
	iframe.style = "border: none;"
	iframe.width = "100%"
	iframe.height = "100%"
	const html =
	`<body style="padding: 0; margin: 0; overflow: hidden; box-sizing: border-box;" > 
			<canvas width="320" height="240" id="canvas" style="background: rgb(77, 77, 77); image-rendering: pixelated" oncontextmenu="return false";></canvas> 
      <script type="module">
        ${script}
      </script>
	</body>`

	iframe.srcdoc = html

  document.querySelector("#modal-pane").style = "display: flex"
  document.querySelector("#modal").replaceChildren()
  document.querySelector("#modal").append(iframe)
  document.querySelector("#modal").focus()
}

/*
document.querySelector("#new-entity").onclick = () => {
  EntityManager.create("Player")
  console.log(Game);
}

document.querySelector("#edit-entity").onclick = () => {
  EntityManager.edit("Player", "hehehehehe")
  console.log(Game);
}
*/

/*
  Download JSON file

  var obj = {a: 123, b: "4 5 6"};
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

  var a = document.createElement('a');
  a.href = 'data:' + data;
  a.download = 'data.json';
  a.innerHTML = 'download JSON';

  var container = document.getElementById('container');
  container.appendChild(a);
*/


//IDE
const Preferences = {} 

const Game = {
  Sprite: {},
  Sound: {},
  Entity: {},
  Level: {},
  Module: {}, //aka components

  Options: {}, //includes name (project and game etc)
}

//manages the saving/loading, exporting and importing of project "files" (JSON) 
const SaveLoadManager = {
  save: (name) => {
    localStorage.setItem(name, JSON.stringify(Game))
    console.log(`Saving ${name}`);
  },
  load: (name) => {
    let loaded = JSON.parse(localStorage.getItem(name))
    console.log(`Loading ${name} and its content is ${loaded}`);
    //console.log(loaded.Sprite.sprBulletHAR);
  },
  import: () => {

  },
  export: () => {

  },
  delete: (name) => {
    localStorage.removeItem(name)
    console.log(`Deleted ${name} from local`)
  },
  showAll: () => {
    console.log(Object.entries(localStorage))
  }
}

//Manages the entity section of the whole game project
const EntityManager = {
  create: (name) => {
    Game.Entity[name] =
    `Create() {}
     Update() {}
     Render() {}
     Delete() {} //Flush() {}
    `
  },
  edit: (name, code) => {
    Game.Entity[name] = code
  },
  delete: (name) => {
    Game.Entity[name] = null
    delete Game.Entity[name]
  }
}

//hard coded base64encoded png images
let sprFishIdleHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAACcklEQVRoQ+1YsU7DMBC9ShUzElWH/gFzBxhgQ4Kf6F90gxE2Bv6BnygSGx0Y6IbUP+hQFYkZIQWdE6dOcvY5PpuAFC9UpHm+e+/57twB9KtTBgad7t5vDr0AHZugF+AfCJAVMaJY5ueOQ/8z24v48TkB2fp+BMfzHWxfJzA+3ZiZ+7zPMSVKgAOvmSaFgUT8+BCoNnhb7ODydgJPN5vy7+xZpe+D4eKpkgDiF7gxsBFDRJCPwBJ+OPKy6fUQVuffZRzbw4n6jEQ9nAxhdaeecTisAKkFToRf4Wf9PoKjs4NW/LiIa5BvsohCjD83MH0RiUDugdiRBE5pICs/Ov7ZHFh+nALAYk+5Ito4CRVLXwWVokoCqfHrRzCCgTKTHxu++r+DH16A/GXAUkStogTpR21KUZ5AavwishQCxzAoRZieFMDcwKxvlBAfyy81KXn0g9T4OrxUAlfjFxqIFAC7um4mWOdx6bpm66Y4IRUjKncK1FSSEr+M0SihMQ1ExR+KbyMre7zI08BGgit0A4tgKfFTC4wpNeIPNaj3CXDNkVyjqb1LEhQRnyQoooHI+EPxnT2gfgewktRuCipraCp8qkREFLh9/I5JiL0H4Lv18RMnCr3Us3YClE3SJoAQvz1Bgvgpfhpih46hJkG2MU5wEVP3AGkCDmdb8YUCkwbSmGhIE1/l5/i1gJ1YcBQ1SG7kq0QK+zmicRGznbYY+IhNmUhgINVrpPx4CWApMTmBYeSXLpImwNR2MUE++PoyWbsDmfwgDMk1L0AegatZcxiuHPaXmuYermdsTy2+8Fv4wfxIyPMlof+eg4FegI7t0QvQsQA/MkfUKBsnukYAAAAASUVORK5CYIIA"
let sprFishWalkHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAYCAYAAAAVpXQNAAADT0lEQVRoQ+1au07dQBBdJJQaKYji/kFqCiiSLlL4Cf6CLpShS8E/8BNESpcUKUKHxB/cAhEpdYR0oxl717Prfcw+xnGw3XB9bc+Ozznz2sueWo8VgQoE9iqeXR9dEVCrgFYRVCEwJwHt+jcBn+jnqhd8YQ/PDiOugKZwfPfw+VC9uXhSjz826uh0S7nn+vkv9bJIjLjETEEurvHz9kl9+LRRXy635u/5V9QF11efiF4CufgOc8OIS4okuYDL7vjjvrp792zIfzzY4GcQ0vXJvrq7wmtcf10RSQeAOLmADxwUIzgHnACj8wul1FlVoBVhxCFEnFxXPJR9AOjo91Ydf6sSkWQAID6C5Abta5w0RhUCKg6AlIBG4pEgV90OVlEoJBNZqaQswiQDYBJyXYE2xqgqAJICEiYXyxeu0YlDabDcGtSXMP11ym99n3QAjMBvTK4p75jhujLOwSgLH1/25Ga31EKi5BqRkAz0cH+oXr995erHnP/6/gcnNWY/1PnfH/8ZuV1wad9Jj5jCqJ9gU9za4uyzfi5GoUWM45SAlOO55MJEocUCfQ4cuikMKQgmtByAJLObMLlIcAlGGVPrkEET2Y1kQEszQQGVOJ5JLgJ0876jAacIGFPbZKDZBkAGuaYM52LEDLAm2S2W5qTINcD4RBqsXfoCr5EuitwpAoBJbjlGPHyaZbesDNSIXAOOrwTE1sgc5ecXAHxyLYzoYKEnVG+vUmC/Nrsle6DYHg0lO5dcKh6sr2R0B1v0gGv0O8amojcDSQQAHbG1j423IUyz69q1RFQgnuwK4FkjWsJ8G2QxchnEmsgKbb75SHbXDDV05FlvfY9NGJkBQN0cbRX4MKrY5LMzNpkq8UK//cGcSi2/4cS3x+QGNFlnpJekgILRZPck+owzOg6AUDAGIJKJgtyQWm80xrvGaUlgCNPnWyfWwHZBhTBDONjr5Wcer4h82c0IKbJGVEAGlDi5KRJjghimpfLfueL2GSK1eozy39zouxifsAUotzkVdui71a7YnAc5TguoTuE52UTqXo5IuzLUlmgJm1IYmapgRMTkPS6gzmxNhpF+4Vb2Jf6BTcJmq/dtltmWII4pQF/sGquAFkt9mxdfBdQGx8Va+QtiNHs3f+p5ZgAAAABJRU5ErkJgggAA"
let sprBulletHeavyArHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAA4klEQVRIS2NkoBFgpJG5DKMGw0N2NCiICor/WJIi0UGHT+F/HS1TuNlv33xgeP7qNrHJnhGXwWBDFRXUMQy6/+AmA8gSYREBOA1TB5K7cu00SA/cYAxvI7sW2XSQofgA1FcIg9G9DdIMchUIoBtmYmIOFt+8bQkDSB/MB1DXorgYxPkvKaaK1TEgV4DkYGHs6xUDNxhXBMPCGMVQmEEgTdgiDOY7WHhicw2GwTCDkFwIUgOKA7haNIOwJgBsisEGIXsdyVBikxvOYhM5lRCdKZBtJUsTMc4eNZio0o2YoMSpBgCxalIYNQcTEwAAAABJRU5ErkJgggAA"

//hard coded player object example
let playerplace = `
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
`

//hard coded assets
Game.Sprite["sprFishIdle"] = sprFishIdleHolder
Game.Sprite.sprFishWalk = sprFishWalkHolder
Game.Sprite.sprBulletHAR = sprBulletHeavyArHolder

Game.Entity.Player = playerplace


console.log(Compiler.compile(Game));

/*
SaveLoadManager.save("HOLOHOKOMON")
SaveLoadManager.save("HOL")
SaveLoadManager.save("bajla")

SaveLoadManager.showAll()

SaveLoadManager.load("HOL")

SaveLoadManager.delete("HOL")

SaveLoadManager.showAll()
*/

/*
let scroll = 100

canvas.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) scroll -= 20
  if (event.deltaY < 0) scroll += 20

  scroll = (scroll < 100) ? 100 : scroll+0
  scroll = (scroll > 500) ? 500 : scroll-0
  
  canvas.style.width = ""+scroll+"%"
  canvas.style.height = ""+scroll+"%"
})
*/