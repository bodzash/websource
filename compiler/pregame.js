const EnigePreGame = `
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

ctx.imageSmoothingEnabled = false;

canvas.width = 320 //320
canvas.height = 240 //240

let ratioX = .5
let ratioY = .5

canvas.style.width = "640px";
canvas.style.height = "480px";

let mainArray = [] //main loop shit

/*

Responsive Shit

let ratioX = canvas.width / screen.width //window.innerWidth;
let ratioY = canvas.height / screen.height //window.innerHeight;

//canvas.style.width = ""+window.innerWidth+"px";
//canvas.style.height = ""+window.innerHeight+"px";

//canvas.style.width = ""+screen.width+"px";
//canvas.style.height = ""+screen.height+"px";

canvas.style.width = "100%";
canvas.style.height = "100%";
*/
`

export default EnigePreGame