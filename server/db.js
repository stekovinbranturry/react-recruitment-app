const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(DB);
mongoose.connection.on('connected', () => console.log('Mongodb connected'));
