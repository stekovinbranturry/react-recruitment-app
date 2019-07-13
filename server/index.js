const express = require('express');
const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(DB);
mongoose.connection.on('connected', () => console.log('Mongodb connected'));
const User = mongoose.model(
	'user',
	new mongoose.Schema({
		user: { type: String, require: true },
		age: { type: Number, require: true }
	})
);

/**
 * 增
 */
// User.create(
// 	{
// 		user: 'lm',
// 		age: 27
// 	},
// 	(err, doc) => {
// 		console.log(err ? err : doc);
// 	}
// );

/**
 * 删
 */
// User.remove({}, (err, doc) => console.log(err ? err : doc));

/**
 * 改
 */
// User.update({ user: 'jj' }, { $set: { age: 30 } }, (err, doc) =>
// 	console.log(err ? err : doc)
// );

const app = express();
const port = 3001;

app.get('/', (req, res) => res.send('hello world'));
app.get('/data', (req, res) => {
	User.findOne({ user: 'jj' }, (err, doc) => {
		res.json(doc);
	});
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
