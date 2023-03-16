const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('alert', true, {
    expires: new Date(Date.now() + 1000 * 60),
    httpOnly: false,
  });
  console.log(req.cookies);
  res.render('index');
});

module.exports = router;
