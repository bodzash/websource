class BaseStorage {
  deleteKey(key) {delete this[key]}

  convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => resolve(fileReader.result)
      fileReader.onerror = (error) => reject(error)
    })
  }
}

class EntityStorage extends BaseStorage {
  createEntity(key) {
    //check for duplicates and check for no-no names & nospace & nostart with number & text and num only
    this[key] =
    `class ${key} {
      constructor() {}
      _Create() {}
      _Update() {}
      _Render() {}
    }`
  }

  updateEntity(key, code) {if (this.hasOwnProperty(key)) this[key] = code} 
}

//const EntityAssets = new EntityStorage()

class SpriteStorage extends BaseStorage {
  async uploadSprite(key, event) {
    //no duplicate names no space, only text and number
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    this[key] = base64
  }

  urlSprite(key, url) {this[key] = url} //dont use
}

//<input type="file" /> input.addEventListener("change", (event)=> {uploadSprite("", event)})

class SoundStorage extends BaseStorage {}

class LevelStorage extends BaseStorage {}

//ide preferences, themes and other shit
class IDE {}

//project preferences and other shit
class Project extends BaseStorage {
  //call init functions here
  constructor() {
    this.name = "Empty Project"
    this.saveState = true
    this.icon = ""
    this.updateTabTitle()
  }

  newProject(name) {
    //text and numbers only & no empty string & no start with space & no duplicates (if in localStorage or IDB)
    this.name = name
    this.saveState = true // true: saved, false: not saved
    this.updateTabTitle()

    return true 
  }

  updateTabTitle() {
    document.title = this.saveState ? `(*) ${this.name} ${this.name ? "•" : ""} WebSource IDE`
    : `${this.name} ${this.name ? "•" : ""} WebSource IDE` }

  saveProject() {
    //save it as json
  }

  loadProject() {
    //load from a json file
  }

  compileProject() {} //returns code a big ass string (later will be a seperate file)

  constructHtml() {} //retruns basic html as string

  runProject() {} // saves & creates an iframe and runs the whole game there

  runEntity() {} // saves & creates an iframe and runs an empty room with an entity in it

  exportProject() {} // saves & downloads html & js file
}

class ExampleProjects {}
