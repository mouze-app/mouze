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
var io = socketio(server);

// Socket.io stuff
io.on('connection', function (socket) {
    console.log('a user connected');
});

// Set up express
app.use(_express2.default.static('public')); // Static file serving

//Robotjs Code
_robotjs2.default.setMouseDelay(2); // Speed up the mouse.

// Express routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
});

// Move mouse
app.get('/move/:x/:y', function (req, res) {
    var args = req.params; // Save GET parameters
    _robotjs2.default.moveMouse(args.x, args.y);
    res.send(args);
});

// Type with keyboard
app.get('/type/:text', function (req, res) {
    var args = req.params; // Save GET parameters
    _robotjs2.default.typeString(args.text);
    res.send(args);
});

//Click
app.get('/click/', function (req, res) {
    var args = req.params; // Save GET parameters
    _robotjs2.default.mouseClick();
    res.send(args);
});

// Start HTTP server
server.listen('3000', '0.0.0.0', function (data) {
    // Address data
    var address = server.address();

    // Console message with port and host
    console.log("Listening at " + address.address + ":" + address.port);
});

exports.default = server;
