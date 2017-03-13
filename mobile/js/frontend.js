// var socket = io.connect('http://mouze.herokuapp.com/')
var socket = io.connect('http://172.20.10.2:5000')

var userAgent = window.navigator.userAgent;
var modifier

if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
   modifier = -1
}
else {
   modifier = 1
}

var el = document.getElementById("left")
var er = document.getElementById("right")

var er = document.getElementById("right")

var fl = document.getElementById("flex")
var fls = document.getElementById("flexstart")

var lb = document.getElementById("statusLabel")
var mouse = document.getElementById("mouse")

fl.classList.remove("first")
fls.classList.add("first")

function handleStart(e) {
  e.preventDefault()
  e.target.classList.add("dark")
  //io.emit("click")
}
function handleEnd(e) {
  e.preventDefault()
  e.target.classList.remove("dark")
}

var left = 100
var toppos = 100
var zee = 0

let lastPosX = []
let lastPosY = []
let average = 0

window.addEventListener('devicemotion', function(event) {
  if (event.acceleration.z > -0.3 && event.acceleration.z < 0.3) {
    let a = 100
    let amount = -20
    let x = Math.round(event.acceleration.x*a)/a*amount
    let y = Math.round(event.acceleration.y*a)/a*amount

    lastPosX.push(event.acceleration.x)
    lastPosY.push(event.acceleration.y)

    if (lastPosX[lastPosX.length-1] < 0 && event.acceleration.x > 0) {
        x = 0
    }

    if (lastPosX.length > 5) {
        let sum = 0
        lastPosX.map(x => sum += x)
        average = sum/5
        lastPosX = []
    }

    if (lastPosX.length > 5) {
        let sum = 0
        lastPosX.map(x => sum += x)
        average = sum/5
        lastPosX = []
    }

    if (event.acceleration.x > 0.3) {
      //left += (event.acceleration.x * -1)*4;
      left += x
    }
    if (event.acceleration.x < -0.3) {
      left += x
    }
    if (event.acceleration.y > 0.3) {
      //toppos += (event.acceleration.y)*8;
      toppos -= y
    }
    if (event.acceleration.y < -0.3) {
      toppos -= y
    }
  }
  if (event.acceleration.z < 0) {
    zee += event.acceleration.z
  } else {
    zee += event.acceleration.z*8
  }
  lb.innerText = average;
  mouse.style.left = left + 200;
  mouse.style.top = toppos + 200;

  if (left < 1) {
      left = 1
  }

  if (toppos < 1) {
      toppos = 1
  }

  socket.emit('x', left)
  socket.emit('y', toppos)
});

function leftDown() {
    socket.emit('leftDown')
}
function leftUp() {
    socket.emit('leftUp')
}
function rightDown() {
    socket.emit('rightDown')
}
function rightUp() {
    socket.emit('rightUp')
}

el.addEventListener("touchstart", handleStart, false);
el.addEventListener("touchstart", leftDown, false);
el.addEventListener("touchend", handleEnd, false);
el.addEventListener("touchend", leftUp, false);
er.addEventListener("touchstart", handleStart, false);
er.addEventListener("touchstart", rightDown, false);
er.addEventListener("touchend", handleEnd, false);
er.addEventListener("touchstart", rightUp, false);

calibrate.addEventListener("touchstart", handleStart, false);
calibrate.addEventListener("touchend", handleEnd, false);
calibrate.addEventListener("touchend", calTouch, false);

function calTouch() {
  left = 0
  toppos = 0
  zee = 0
}

socket.on('event', (data) => console.log(data))
