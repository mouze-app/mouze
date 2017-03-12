"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _robotjs = require("robotjs");

var _robotjs2 = _interopRequireDefault(_robotjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Variables/Constants
var app = (0, _express2.default)(); // Create express app
// Imports
var server = _http2.default.createServer(app); // Create HTTP server with the Nodejs http lib
var io = require("socket.io")(server);

// Socket.io stuff
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('joinRoom', function (roomId) {
        console.log('someone joined ' + roomId);
        socket.leave(socket.room);
        socket.join(roomId);
        socket.emit('event', "You joined " + roomId);
    });
});

// Set up express
app.use(_express2.default.static('mobile')); // Static file serving

//Robotjs Code
_robotjs2.default.setMouseDelay(2); // Speed up the mouse.

// Express routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/mobile/mobile.html');
});

// Start HTTP server
server.listen('3000', '0.0.0.0', function (data) {
    // Address data
    var address = server.address();

    // Console message with port and host
    console.log("Listening at " + address.address + ":" + address.port);
});

exports.default = server;
