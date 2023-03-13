const express = require('express');

const router = express.Router();

// http://localhost:4000/
router.get('/', (req, res) => {
  res.render('index', { msg: '이 메시지는 백엔드에서 보냈어요.' });
});

module.exports = router;
