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
    res.sendFile(__dirname + 'templates/index.html')
})

// Move mouse
app.get('/move/:x/:y', (req, res) => {
    let args = req.params // Save GET parameters
    robot.moveMouse(args.x, args.y)
    res.send(args)
})

// Type with keyboard
app.get('/type/:text', (req, res) => {
    let args = req.params // Save GET parameters
    robot.typeString(args.text)
    res.send(args)
})

//Click
app.get('/click/', (req, res) => {
    let args = req.params // Save GET parameters
    robot.mouseClick()
    res.send(args)
})

// Start HTTP server
server.listen('3000', '0.0.0.0', (data) => {
    // Address data
    const address = server.address()

    // Console message with port and host
    console.log(`Listening at ${address.address}:${address.port}`)
})
