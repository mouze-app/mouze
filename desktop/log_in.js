const socket = io.connect("http://mouze.herokuapp.com/")
const form = document.getElementById("id-form")

form.addEventListener("submit", e => {
    e.preventDefault()

    const idEntered = document.querySelector('form > input').value
    console.log(`attempting to join ${idEntered}`);

    socket.emit('joinRoom', idEntered)
})

socket.on('event', (data) => console.log(data))