
const _popup = document.querySelector(".popup")

const _createEntity = document.querySelector("[data-create-entity]")
_createEntity.addEventListener("click", ()=> new CreateEntity())

const _openScript = document.querySelector("[data-open-script]")
_openScript.addEventListener("click", ()=> new OpenScriptEditor())

class Entity {
    constructor(name) {
        this.name = name
        this.position = {x: 0, y: 0}
        this.visible = true
        this.script = ""
        this.children = []
    }
}

let Game = {
    Entities: {},
    Settings: {},
}

function _popupHide() {
    _popup.style.display = "none"
    _popup.replaceChildren()
}

class CreateEntity {
    constructor() {
        //AutoPOP
        _popup.style.display = "flex"

        //Window
        this.window = document.createElement("div")
        this.window.className = "window wrapper"
        this.window.style = "height: 200px; width: 300px;"
        _popup.append(this.window)

        //Title
        this.title = document.createElement("div")
        this.title.className = "title"
        this.title.innerText = "Create an Entity"
        this.window.append(this.title)

        //Input
        this.input = document.createElement("input")
        this.input.className = "input btn stretch"
        this.input.type = "text"
        this.input.placeholder = "Give a name to this Entity"
        this.window.append(this.input)

        //ERROR MSG and other text bullshit here

        //Br
        this.window.append(document.createElement("br"))

        //Action
        this.action = document.createElement("div")
        this.action.className = "btn stretch centrify"
        this.action.innerText = "Create"
        this.action.addEventListener("click", ()=> {
            if (this.input.value === "") return
            Game.Entities[this.input.value] = new Entity(this.input.value)
            console.log(Game)
            _popupHide()
        })
        this.window.append(this.action)

        //Br
        this.window.append(document.createElement("br"))

        //Cancel
        this.cancel = document.createElement("div")
        this.cancel.className = "btn stretch centrify"
        this.cancel.innerText = "Cancel"
        this.cancel.addEventListener("click", _popupHide)
        this.window.append(this.cancel)
    }
}

class OpenScriptEditor {
    constructor() {
        //AutoPOP
        _popup.style.display = "flex"

        //Window
        this.window = document.createElement("div")
        this.window.className = "window wrapper"
        this.window.style = "height: 80%; width: 80%;"
        _popup.append(this.window)

        //Title
        this.title = document.createElement("div")
        this.title.className = "title"
        this.title.innerText = `Edit the Script for ${"entity-name"}`
        this.window.append(this.title)

        //Textarea
        this.text = document.createElement("textarea")
        this.className = "textarea stretch"
        this.window.append(this.text)

        //Close
        this.close = document.createElement("div")
        this.close.className = "btn stretch centrify"
        this.close.innerText = "Done"
        this.close.addEventListener("click", _popupHide)
        this.window.append(this.close)
    }
}