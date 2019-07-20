const express = require('express');
const Router = express.Router();
const db = require('./db');
const User = db.getModel('user');
const utils = require('./utils');

Router.get('/info', (req, res) => res.json({ code: 1 }));

Router.get('/list', (req, res) => {
	User.find({}, (err, doc) => (err ? res.json(err) : res.json(doc)));
});

Router.post('/register', (req, res) => {
	console.log(req.body);
	const { identity, phone, password } = req.body;
	User.findOne({ phone }, (err, doc) => {
		if (doc) {
			return res.json({ code: 1001, msg: '用户名已存在' });
		}
		User.create(
			{ identity, phone, password: utils.md5Encryption(password) },
			(err, doc) =>
				err
					? res.json({ code: 1002, msg: '后台出错' })
					: res.json({ code: 1000 })
		);
	});
});

Router.post('/login', (req, res) => {
	console.log(req.body);
	const { phone, password } = req.body;
	User.findOne({ phone, password: utils.md5Encryption(password) }, (err, doc) =>
		doc
			? res.json({ code: 1100, doc })
			: res.json({ code: 1101, msg: '手机号或密码错误' })
	);
});

module.exports = Router;
