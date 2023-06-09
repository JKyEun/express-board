const express = require('express');
const { login } = require('../controllers/userController');

const router = express.Router();

// 로그인 페이지로 이동
router.get('/', (req, res) => {
  res.render('login');
});

// 로그인
router.post('/', login);

// router.post('/', (req, res) => {
//   userDB.checkUser(req.body.id, (data) => {
//     if (data.length === 1) {
//       if (data[0].PASSWORD === req.body.password) {
//         req.session.login = true;
//         req.session.userId = req.body.id;

//         // 로그인 쿠키 발행
//         res.cookie('user', req.body.id, {
//           maxAge: 1000 * 10,
//           httpOnly: true,
//           signed: true,
//         });

//         res.status(200);
//         res.redirect('/dbBoard');
//       } else {
//         res.status(400);
//         res.send(
//           '비밀번호가 틀렸습니다! <br/><a href="/login">다시 로그인</a>',
//         );
//       }
//     } else {
//       res.status(400);
//       res.send(
//         '해당 아이디가 존재하지 않습니다! <br/><a href="/register">회원가입</a>',
//       );
//     }
//   });
// });

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;
