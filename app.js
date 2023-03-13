const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require('./routes/index');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`${PORT}번에서 서버 작동 중 . . .`);
});
