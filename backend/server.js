const express = require('express');
const cors = require("cors");
const {Server}  = require("socket.io");
const http = require("http");
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD,OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin",
    "X-Requested-With", "Content-Type", "Accept")
    next()
})
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${data}---room id: user ------ ${socket.id} `);
    });
    socket.on("send_message",(data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message",data);
    })
})
io.on("disconnect" , () => {
    console.log("user disconnected");
})
server.listen(4040,() => {
    console.log(`listening to port 4040`);
})