const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();


const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on("connectionRoom"), box => {
        socket.join(box);
    }
    console.log("ok");
})

mongoose.connect('mongodb+srv://sa:ckz9b121@cluster0-rzc3b.mongodb.net/week?retryWrites=true',{
    useNewUrlParser: true
});

app.use((req,res, next) => {
    req.io = io;
    return next();
});

app.use(cors());
app.use(express.json()); //para a view se comunicar utilizando o formato json
app.use(express.urlencoded({extended: true})); //para envio de arquivos entre view e controller
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

server.listen(process.env.PORTgit || 3333);