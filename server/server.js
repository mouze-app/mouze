// Imports
const robot = require("robotjs")
const http = require('http')
const express = require('express')

// Variables/Constants
const app = express() // Create express app
const server = http.createServer(app) // Create HTTP server with the Nodejs http lib

//Robotjs Code
robot.setMouseDelay(2); // Speed up the mouse.

// Express routes
app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/move/to/', (req, res) => {
    let args = req.query // Save GET parameters
    robot.moveMouse(args.x, args.y)
    res.send(args)
})

// Start HTTP server
server.listen('3000', '0.0.0.0', (data) => {
    // Address data
    const address = server.address()

    // Console message with port and host
    console.log(`Listening at ${address.address}:${address.port}`)
})
