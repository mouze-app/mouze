// const socket = io.connect("http://mouze.herokuapp.com/")
const socket = io.connect("http://localhost:5000")

socket.on('leftDown', () => {
    // robot.mouseToggle('down')
    console.log('left down');
    alert('mouse down');
})
