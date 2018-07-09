
var express = require("express");
var app = express();

var http = require('http').Server(app);

var server = http.listen(3000);
app.use(express.static("public"));//

console.log("hi");

var socket = require("socket.io");
var io = socket("185.199.108.153:3000");//
io.on("connection", newConnection);//

function newConnection(socket) {
    console.log(socket.id);

    socket.on("scrolled", msgl);

    function msgl(data) {
        io.emit("scrolled",data)//
        //console.log(data);
    }
}