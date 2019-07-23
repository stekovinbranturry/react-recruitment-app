const express = require('express');
const db = require('./db');
const utils = require('./utils');

const Router = express.Router();
const User = db.getModel('user');

const _filter = { password: 0, __v: 0 };

/**
 * User route redirect
 */
Router.get('/info', (req, res) => {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  } else {
    User.find({ _id: userid }, _filter, (err, doc) =>
      doc
        ? res.json({ code: 0, doc })
        : res.json({ code: 1, msg: 'userid不存在' })
    );
  }
});

/**
 * User list
 */
Router.get('/list', (req, res) => {
  User.find({}, _filter, (err, doc) => (err ? res.json(err) : res.json(doc)));
});

/**
 * User register
 */
Router.post('/register', (req, res) => {
  console.log(req.body);
  const { identity, phone, password } = req.body;
  User.findOne({ phone }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1001, msg: '用户名已存在' });
    }
    const userModel = new User({
      identity,
      phone,
      password: utils.md5Encryption(password)
    });

    userModel.save((err, doc) => {
      if (err) {
        return res.json({ code: 1002, msg: '后台出错' });
      } else {
        const { _id, identity, phone } = doc;
        res.cookie('userid', _id);
        return res.json({ code: 1000, data: { _id, identity, phone } });
      }
    });
  });
});

/**
 * User login
 */
Router.post('/login', (req, res) => {
  console.log(req.body);
  const { phone, password } = req.body;
  User.findOne(
    { phone, password: utils.md5Encryption(password) },
    _filter,
    (err, doc) => {
      if (doc) {
        res.cookie('userid', doc._id);
        return res.json({ code: 1100, doc });
      } else {
        res.json({ code: 1101, msg: '用户名或密码错误' });
      }
    }
  );
});

/**
 * Update profile
 */
Router.post('/update', (req, res) => {
  console.log(req.body);
  const { userid } = req.cookies;
  const { avatar, jobsHunting } = req.body;
  if (avatar) {
    User.findByIdAndUpdate({ _id: userid }, { avatar }, (err, doc) =>
      doc
        ? res.json({ code: 1200, msg: 'Avatar上传成功' })
        : res.json({ code: 1201, msg: 'Avatar上传失败' })
    );
  }
  if (jobsHunting) {
    User.updateOne({ _id: userid }, { $push: { jobsHunting } }, (err, doc) =>
      doc ? res.json(doc) : res.json(err)
    );
  }
});

/**
 * User query
 */
Router.post('/query', (req, res) => {
  const { userid } = req.cookies;
  User.findOne({ _id: userid }, (err, doc) =>
    doc ? res.json({ code: 1300, doc }) : res.json({ code: 1301, doc })
  );
});

module.exports = Router;