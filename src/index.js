const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

mongoose.connect('mongodb+srv://elkabonga:zasx1452@cluster0-hdtfh.mongodb.net/week10?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
const server = http.Server(app)
const port = normalizePort(process.env.PORT || "21254");
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port
    }
    return false;
}

const routes = require('./routes.js')
const { setupWebsocket } = require('./websocket.js')

setupWebsocket(server)

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(port)