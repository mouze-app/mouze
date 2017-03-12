// Imports
import http from "http"
import express from "express"
import robot from "robotjs"

// Variables/Constants
const app = express() // Create express app
const server = http.createServer(app) // Create HTTP server with the Nodejs http lib
const io = require("socket.io")(server)

// Socket.io stuff
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('joinRoom', (roomId) => {
      console.log('someone joined '+roomId);
      socket.leave(socket.room)
      socket.join(roomId)
      socket.emit('event', `You joined ${roomId}`)
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

// Start HTTP server
server.listen('3000', '0.0.0.0', (data) => {
    // Address data
    const address = server.address()

    // Console message with port and host
    console.log(`Listening at ${address.address}:${address.port}`)
})

export default server
