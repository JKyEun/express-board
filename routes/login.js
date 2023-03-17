const express = require('express');
const userDB = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  userDB.checkUser(req.body.id, (data) => {
    if (data.length === 1) {
      if (data[0].PASSWORD === req.body.password) {
        req.session.login = true;
        req.session.userId = req.body.id;
        res.status(200);
        res.redirect('/dbBoard');
      } else {
        res.status(400);
        res.send(
          '비밀번호가 틀렸습니다! <br/><a href="/login">다시 로그인</a>',
        );
      }
    } else {
      res.status(400);
      res.send(
        '해당 아이디가 존재하지 않습니다! <br/><a href="/register">회원가입</a>',
      );
    }
  });
});

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;