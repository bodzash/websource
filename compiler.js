//Load Options (canvas usually)

//Load Images

//Load Audios*

//Load Component*

//Load Classes

//Load Levels

//Start Game Loop (load a level)






/*
  compiler handles constructor
  user can only edit the method part of a class ->

  class {Name} {extends Parent} {

    constructor(x, y) {
      this.x = x
      this.y = y
      //built in variables here

      //list of components here

      this.Create()
      mainArray.push(this)
    }

  Create() {}
  Update() {}
  Render() {}

  }

*/

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
  
    }
    Render() {
      ctx.drawImage(this.sprite, 24 * Math.floor(this.frame), 0, 24, 24, Math.round(this.x), Math.round(this.y), 24, 24)
    }
  }

console.log("XASDASDASD")