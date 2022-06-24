import { script } from "./example.js"



const Preferences = {}

const Game = {
  Sprite: {},
  Sound: {},
  Entity: {},
  Level: {},
  Commponent: {},

  Options: {},
}

const modal = document.querySelector("#modal-pane")

document.getElementById("ico-play").onclick = runGameInBrower
document.getElementById("ico-stop").onclick = ()=> document.querySelector("iframe")?.remove()

function runGameInBrower() {
	const iframe = document.createElement('iframe')
	iframe.style = "border: none;"
	iframe.width = "100%"
	iframe.height = "100%"
	const html =
	`<body style="padding: 0; margin: 0; overflow: hidden; box-sizing: border-box;" > 
			<canvas id="canvas" style="background: rgb(77, 77, 77); image-rendering: pixelated;" oncontextmenu="return false"></canvas>
			<script>${script}</script>
	</body>`

	iframe.srcdoc = html

  document.querySelector("#iframe").replaceChildren()
  document.querySelector("#iframe").append(iframe)
  document.querySelector("iframe").focus()
}

document.querySelector("#new-entity").onclick = () => {
  EntityManager.create("Player")
  console.log(Game);
}

document.querySelector("#edit-entity").onclick = () => {
  EntityManager.edit("Player", "hehehehehe")
  console.log(Game);
}

const EntityManager = {
  create: (name) => {
    Game.Entity[name] =
    `class ${name} {
      constructor() {}
      _Create() {}
      _Update() {}
      _Render() {}
    }`
    return Game.Entity[name] // or true
  },
  edit: (name, code) => {
    Game.Entity[name] = code
  }
}

const Compiler = {
  compile: () => {
    //stitch shit together
  }
}

class Cuck {

}

class Data extends Cuck {

}