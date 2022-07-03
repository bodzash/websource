import { useContext } from 'react'
import GameContext from './context/GameContext'


//Combiler
import Compiler from "./compiler/Compiler"

function App() {

  const {Game, changeEnt, changeSpr} = useContext(GameContext)

  console.log(Game)

  function runGameInBrower() {
    const script = Compiler.compile(Game)
    const html = `
    <body style="padding: 0; margin: 0; overflow: hidden; box-sizing: border-box;" > 
        <canvas width="320" height="240" id="canvas" style="background: rgb(77, 77, 77); image-rendering: pixelated" oncontextmenu="return false";></canvas>
        <script>
          console.log("Game up and running...")
          ${script}
        </script>
    </body>
    `
    iframe.srcdoc = html
  }

  changeSpr("sprFishIdle", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAACcklEQVRoQ+1YsU7DMBC9ShUzElWH/gFzBxhgQ4Kf6F90gxE2Bv6BnygSGx0Y6IbUP+hQFYkZIQWdE6dOcvY5PpuAFC9UpHm+e+/57twB9KtTBgad7t5vDr0AHZugF+AfCJAVMaJY5ueOQ/8z24v48TkB2fp+BMfzHWxfJzA+3ZiZ+7zPMSVKgAOvmSaFgUT8+BCoNnhb7ODydgJPN5vy7+xZpe+D4eKpkgDiF7gxsBFDRJCPwBJ+OPKy6fUQVuffZRzbw4n6jEQ9nAxhdaeecTisAKkFToRf4Wf9PoKjs4NW/LiIa5BvsohCjD83MH0RiUDugdiRBE5pICs/Ov7ZHFh+nALAYk+5Ito4CRVLXwWVokoCqfHrRzCCgTKTHxu++r+DH16A/GXAUkStogTpR21KUZ5AavwishQCxzAoRZieFMDcwKxvlBAfyy81KXn0g9T4OrxUAlfjFxqIFAC7um4mWOdx6bpm66Y4IRUjKncK1FSSEr+M0SihMQ1ExR+KbyMre7zI08BGgit0A4tgKfFTC4wpNeIPNaj3CXDNkVyjqb1LEhQRnyQoooHI+EPxnT2gfgewktRuCipraCp8qkREFLh9/I5JiL0H4Lv18RMnCr3Us3YClE3SJoAQvz1Bgvgpfhpih46hJkG2MU5wEVP3AGkCDmdb8YUCkwbSmGhIE1/l5/i1gJ1YcBQ1SG7kq0QK+zmicRGznbYY+IhNmUhgINVrpPx4CWApMTmBYeSXLpImwNR2MUE++PoyWbsDmfwgDMk1L0AegatZcxiuHPaXmuYermdsTy2+8Fv4wfxIyPMlof+eg4FegI7t0QvQsQA/MkfUKBsnukYAAAAASUVORK5CYIIA")
  changeSpr("sprFishWalk", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAYCAYAAAAVpXQNAAADT0lEQVRoQ+1au07dQBBdJJQaKYji/kFqCiiSLlL4Cf6CLpShS8E/8BNESpcUKUKHxB/cAhEpdYR0oxl717Prfcw+xnGw3XB9bc+Ozznz2sueWo8VgQoE9iqeXR9dEVCrgFYRVCEwJwHt+jcBn+jnqhd8YQ/PDiOugKZwfPfw+VC9uXhSjz826uh0S7nn+vkv9bJIjLjETEEurvHz9kl9+LRRXy635u/5V9QF11efiF4CufgOc8OIS4okuYDL7vjjvrp792zIfzzY4GcQ0vXJvrq7wmtcf10RSQeAOLmADxwUIzgHnACj8wul1FlVoBVhxCFEnFxXPJR9AOjo91Ydf6sSkWQAID6C5Abta5w0RhUCKg6AlIBG4pEgV90OVlEoJBNZqaQswiQDYBJyXYE2xqgqAJICEiYXyxeu0YlDabDcGtSXMP11ym99n3QAjMBvTK4p75jhujLOwSgLH1/25Ga31EKi5BqRkAz0cH+oXr995erHnP/6/gcnNWY/1PnfH/8ZuV1wad9Jj5jCqJ9gU9za4uyzfi5GoUWM45SAlOO55MJEocUCfQ4cuikMKQgmtByAJLObMLlIcAlGGVPrkEET2Y1kQEszQQGVOJ5JLgJ0876jAacIGFPbZKDZBkAGuaYM52LEDLAm2S2W5qTINcD4RBqsXfoCr5EuitwpAoBJbjlGPHyaZbesDNSIXAOOrwTE1sgc5ecXAHxyLYzoYKEnVG+vUmC/Nrsle6DYHg0lO5dcKh6sr2R0B1v0gGv0O8amojcDSQQAHbG1j423IUyz69q1RFQgnuwK4FkjWsJ8G2QxchnEmsgKbb75SHbXDDV05FlvfY9NGJkBQN0cbRX4MKrY5LMzNpkq8UK//cGcSi2/4cS3x+QGNFlnpJekgILRZPck+owzOg6AUDAGIJKJgtyQWm80xrvGaUlgCNPnWyfWwHZBhTBDONjr5Wcer4h82c0IKbJGVEAGlDi5KRJjghimpfLfueL2GSK1eozy39zouxifsAUotzkVdui71a7YnAc5TguoTuE52UTqXo5IuzLUlmgJm1IYmapgRMTkPS6gzmxNhpF+4Vb2Jf6BTcJmq/dtltmWII4pQF/sGquAFkt9mxdfBdQGx8Va+QtiNHs3f+p5ZgAAAABJRU5ErkJgggAA")
  changeSpr("sprBulletHAR", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAA4klEQVRIS2NkoBFgpJG5DKMGw0N2NCiICor/WJIi0UGHT+F/HS1TuNlv33xgeP7qNrHJnhGXwWBDFRXUMQy6/+AmA8gSYREBOA1TB5K7cu00SA/cYAxvI7sW2XSQofgA1FcIg9G9DdIMchUIoBtmYmIOFt+8bQkDSB/MB1DXorgYxPkvKaaK1TEgV4DkYGHs6xUDNxhXBMPCGMVQmEEgTdgiDOY7WHhicw2GwTCDkFwIUgOKA7haNIOwJgBsisEGIXsdyVBikxvOYhM5lRCdKZBtJUsTMc4eNZio0o2YoMSpBgCxalIYNQcTEwAAAABJRU5ErkJgggAA")

  return (
    <>
    <button onClick={()=> changeEnt("Fish", player)}>Add Fish</button>
    <button onClick={()=> changeEnt("Fish", null)}>Remove Fish</button>

    <textarea value={Game.Entities.Fish ?? ""} onChange={(e)=> changeEnt("Fish", e.target.value)} />
    <button onClick={()=> console.log(Compiler.compile(Game))}>Compile</button>
    <button onClick={runGameInBrower}>Run Game</button>
    <iframe width={640} height={480} id='iframe'></iframe>
    </>
  )
}

export default App

let player = `
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

  this.hspeed = (Input.d - Input.a) * this.speed
  this.vspeed = (Input.s - Input.w) * this.speed

  this.x += this.hspeed
  this.y += this.vspeed

  this.sprite = (Input.a || Input.d || Input.w || Input.s) ? sprFishWalk : sprFishIdle
  if (this.sprite !== this.prevSprite) {this.frame = 0; this.prevSprite = this.sprite;}

}
Render() {
  let angle = pointDirection(this.x, this.y,Input.mouseX, Input.mouseY)

  if (Input.mouseY <= this.y) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(angle * 3.14 / 180) //covert it back to radians
    ctx.scale( 1, (Input.mouseX > this.x) ? 1 : -1)
    ctx.drawImage(sprBulletHAR, 0 -4, 0 -11)
    ctx.restore()
  }

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale( (Input.mouseX > this.x) ? 1 : -1 , 1)
    ctx.drawImage(this.sprite, 24 * Math.floor(this.frame), 0, 24, 24, 24 / -2, 24 / -2, 24, 24) 
    ctx.restore()
  
    if (Input.mouseY >= this.y) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(angle * 3.14 / 180) //covert it back to radians
    ctx.scale( 1, (Input.mouseX > this.x) ? 1 : -1)
    ctx.drawImage(sprBulletHAR, 0 -4, 0 -11)
    ctx.restore()
  }
}
`







/*
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
*/