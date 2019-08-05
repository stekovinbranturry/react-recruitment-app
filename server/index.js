const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const userRouter = require('./user');

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = 3001;

io.on('connection', () => console.log('user login'));

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter);

server.listen(port, () => console.log(`Server is listening on port ${port}`));
