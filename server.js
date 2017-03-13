// Imports
import http from "http"
import express from "express"
import robot from "robotjs"

// Variables/Constants
const app = express() // Create express app
const server = http.createServer(app) // Create HTTP server with the Nodejs http lib
const io = require("socket.io")(server)
const PORT = process.env.PORT;

// Socket.io stuff
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('leftDown', (roomId) => {
      robot.mouseToggle('down', 'left')
  })
  socket.on('leftUp', (roomId) => {
      robot.mouseToggle('up', 'left')
  })
  socket.on('rightDown', (roomId) => {
      robot.mouseToggle('down', 'right')
  })
  socket.on('rightUp', (roomId) => {
      robot.mouseToggle('up', 'right')
  })
  socket.on('x', (x) => {
      robot.moveMouse(x, robot.getMousePos().y)
  })
  socket.on('y', (y) => {
      robot.moveMouse(robot.getMousePos().x, y)
  })
})

// Set up express
app.use(express.static('mobile')) // Static file serving

//Robotjs Code
robot.setMouseDelay(2); // Speed up the mouse.

// Express routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/mobile/mobile.html')
})

app.get('/new_code', (req, res) => {
    res.send({
        code: newCode
    })
})

// Start HTTP server
server.listen(PORT, '0.0.0.0', (data) => {
    // Address data
    const address = server.address()

    // Console message with port and host
    console.log(`Listening at ${address.address}:${address.port}`)
})

export default server
