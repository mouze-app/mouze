var el = document.getElementById("left")
alert("a")
var er = document.getElementById("right")
function handleStart(e) {
  //e.preventDefault()
  alert("a")
  el.classList += "dark"
}
el.addEventListener("touchstart", handleStart, false);
er.addEventListener("touchstart", handleStart, false);
