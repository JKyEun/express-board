const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  res.cookie('notAlert', true, {
    maxAge: 1000 * 60 * 5,
    httpOnly: false,
  });
  res.status(200);
  res.json('쿠키를 구웠습니다.');
});

module.exports = router;
