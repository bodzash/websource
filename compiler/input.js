const EngineInput = `
let Input = {
  a: 0,
  d: 0,
  w: 0,
  s: 0,

  mouseX: 0,
  mouseY: 0,
};

//Later implement premade inputmap defined by user

window.addEventListener("keydown", (event)=> {
  Input[event.key] = 1;
});

window.addEventListener("keyup", (event)=> {
  Input[event.key] = 0;
});

canvas.addEventListener("mousemove", (event) => {
  //Input.mouseX = event.x //Math.round(event.x / ratioX)
  //Input.mouseY = event.y //Math.round(event.y / ratioY)

  Input.mouseX = Math.round(event.x * ratioX)
  Input.mouseY = Math.round(event.y * ratioY)
  
  //console.log("x "+event.x, "y "+event.y)
  //console.log("x "+Input.mouseX, "y "+Input.mouseY)
})
`

export default EngineInput