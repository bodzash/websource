const EngineLoop = `

let map1 = [new Fish(100, 50)]

requestAnimationFrame(gameLoop) //<- make it that, this will only run when assets are loaded

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  mainArray.forEach(ent=> ent.Update?.())
  mainArray.forEach(ent=> ent.Render?.())
  requestAnimationFrame(gameLoop)
};
`

export default EngineLoop