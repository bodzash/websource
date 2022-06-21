const Project = {}
const SpriteAssets = {} //PNG ONLY
const SoundAssets = {} //OGG ONLY
const ComponentAssets = {}
const EntityAssets = {} //User edited code
const LevelAssets = {} //Object of arrays

//Game Global

const Global = {} //you can put stuff here that you want to persist
const Input = {} //holds every possbile keyboard and mouse input and getters

// Prototype version: JavaScript && Canvas
// Future version: TypeScript && WebGL

/*
const TextureAssets = {}
const ModelAssets = {}
*/

/*
  Every Entity is a class

  Compiler loops trough every EntityAsset creates a big snippet of the defined classes
  *Entity with Componenets (is future version)

  Default Entity as string (current/old)

  EntityAssets = {
    Player: "
    //Don't change the name of the class in code
    class Player {
      constructor() {
        this._Create()
        //Define 'variables' here using <this> such as: this.health = 100
      }
      _Create() {

      }
      //This is automaticaly called by the engine (if it exists) 60 times a second (FPS)
      _Update() {

      }
      //Same as above but this happenes after the _Update function
      _Render() {

      }
      //Ran automatically when the instance is removed/destroyed from the game
      _Delete() {

      }
    }
    "
  }

*/



const root = ReactDOM.createRoot(document.getElementById("container"))
root.render(<h1>távéén báktáléé</h1>)