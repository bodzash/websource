const EngineRendering = `
//Sprite and render functions

//Loads Sprite
function loadSprite(path) {
  let spr = new Image();
  spr.src = path;
  return spr;
};

// Returns angle between two points
function pointDirection(x1, y1, x2, y2) { //
  let theta = Math.atan2(y2 - y1, x2 - x1) * 180 / 3.14;
  if (theta < 0) theta += 360
  return theta
}
`
export default EngineRendering