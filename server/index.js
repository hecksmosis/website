"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var handler_js_1 = require("../build/handler.js");
var port = 3000;
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server);
io.on('connection', function (socket) {
    socket.emit('eventFromServer', 'Hello, World 👋');
});
app.use(handler_js_1.handler);
server.listen(port);
