const express = require('express');
const userRouter = require('./user');
const app = express();
const port = 3001;

app.use('/user', userRouter);
app.listen(port, () => console.log(`Server is listening on port ${port}`));
