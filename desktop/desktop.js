// const socket = io.connect("http://mouze.herokuapp.com/")
const socket = io.connect("http://192.168.0.18:5000")

socket.on('leftDown', () => {

    console.log('left down');
    alert('mouse down');
})
