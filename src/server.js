const {createServer} = require('node:http')
const app = require('./app');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('user send: ' + msg);

        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('user is disconnected.');
    });
});

server.listen(process.env.PORT, () => {
    console.log(`app is runnung on port: ${process.env.PORT}`);
})

