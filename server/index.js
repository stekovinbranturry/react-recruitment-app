const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
