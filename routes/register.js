const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

// 회원가입 페이지로 이동
router.get('/', (req, res) => {
  res.render('register');
});

// 회원가입
router.post('/', registerUser);

// router.post('/', async (req, res) => {
//   const duplicatedUser = await userDB.checkUser(req.body.id);
//   if (!duplicatedUser) {
//     const registerResult = await userDB.registerUser(req.body);
//     if (registerResult) {
//       res.status(200);
//       res.send('회원 가입 성공! <br/><a href="/login">로그인으로 이동</a>');
//     } else {
//       res.status(500);
//       res.send(
//         '회원 가입 실패! <br/><a href="/register">회원가입으로 이동</a>',
//       );
//     }
//   } else {
//     res.status(400);
//     res.send(
//       '동일한 아이디가 존재합니다! <br/><a href="/register">회원가입으로 이동</a>',
//     );
//   }
// });

module.exports = router;
