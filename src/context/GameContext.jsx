import { createContext, useState } from "react";
import { useImmer } from "use-immer" //you cant return using immer


const defGame = {
  Settings: {},
  Entities: {},
  Sprites: {},
  Sounds: {},
  Levels: {},
}

const GameContext = createContext()

export function GameProvider({ children }) {
  const [Game, setGame] = useImmer(defGame)

  //Functions
  function changeEnt(name, code) {
    setGame(state=> {code == null ? delete state.Entities[name] : state.Entities[name] = code })
  }
  function changeSpr(name, asset) {
    setGame(state=> {asset == null ? delete state.Sprites[name] : state.Sprites[name] = asset })
  }
  
  return(
    <GameContext.Provider value={{ Game, changeEnt, changeSpr }} >
      {children}
    </GameContext.Provider>
  )
}

export default GameContext