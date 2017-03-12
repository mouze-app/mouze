//var io = io()

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

window.addEventListener('devicemotion', function(event) {
  if (event.acceleration.z > -0.3 && event.acceleration.z < 0.3) {
    if (event.acceleration.x > 0.5) {
      //left += (event.acceleration.x * -1)*4;
      left -= 8
    }
    if (event.acceleration.x < -0.5) {
      left += 8
    }
    if (event.acceleration.y > 0.5) {
      //toppos += (event.acceleration.y)*8;
      toppos += 12
    }
    if (event.acceleration.y < -0.5) {
      toppos -= 12
    }
  }
  if (event.acceleration.z < 0) {
    zee += event.acceleration.z
  } else {
    zee += event.acceleration.z*8
  }
  lb.innerText = "Connected";
  mouse.style.left = left + 200;
  mouse.style.top = toppos + 200;
});

function leftDown() {

}
function leftUp() {

}
function rightDown() {

}
function rightUp() {

}

el.addEventListener("touchstart", handleStart, false);
el.addEventListener("touchend", leftDown, false);
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
