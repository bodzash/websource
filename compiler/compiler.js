import EnigePreGame from "./pregame.js"
import EngineRendering from "./rendering.js"
import EngineInput from "./input.js"
import EngineLoop from "./loop.js"

const Compiler = {
  //Takes in the whole object containing the assets
  compile: (assetObject) => {
    let src = ""
    src += "\n" + EnigePreGame
    src += "\n" + EngineInput

    src += "\n" + EngineRendering
    //load sound functions here
    //src += "\n" + EntityFunctions

    src += "\n" + Compiler.spriteAssembler(assetObject)
    //load sounds here
    //load components here
    src += "\n" + Compiler.entityAssembler(assetObject)
    //load maps here

    src += "\n" + EngineLoop

    return src //returns the whole javascript code of the game
  },
  spriteAssembler,
  entityAssembler,
}

//Assembles the sprites at the top of the file
function spriteAssembler(obj) {
  let arr = {...obj.Sprite}
  let temp = `//Sprites \n`

  for(const key in arr) {
    temp += `const ${key} = loadSprite("${arr[key]}")` + "\n"
  }
  return temp
}

//assembles the gameobjects in the mid dsction of the file
function entityAssembler(obj) {
  let arr = {...obj.Entity}
  let temp = `//Entitites`

for(const key in arr) {
  temp +=`
  class ${key} {
    constructor(x, y) {
      this.x = x || 0
      this.y = y || 0
      this.hspeed = 0
      this.vspeed = 0
      this.Create?.()
      mainArray.push(this)
    }
    ${arr[key]}
  }  
  `
  }
  return temp
}

export default Compiler