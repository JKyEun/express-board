const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

// 로그인 확인용 미들웨어
function isLogin(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    res.status(400);
    res.send('로그인이 필요합니다. <br/><a href="/login">로그인</a>');
  }
}

// 게시판 페이지 호출
router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    const { userId } = req.session;
    res.render('db_board', { ARTICLE, articleCounts, userId });
  });
});

// 글 쓰기 페이지 모드
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
});

// 데이터베이스에 글 추가
router.post('/write', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.wrtieArticle(req.body, (data) => {
      // affectedRows를 이용하여 DB에 잘 입력되었는지 확인
      console.log(req.body);
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 쓰기 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목이나 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정 모드로 이동
router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] });
    } else {
      const err = new Error('해당 ID 값을 가지는 게시글이 없습니다.');
      err.statusCode = 500;
      throw err;
    }
  });
});

// 글 수정하기
router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 수정 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목이나 내용이 없습니다.');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제하기
router.delete('/delete/:id', isLogin, (req, res) => {
  boardDB.removeArticle(req.params.id, (data) => {
    if (data.affectedRows >= 1) {
      res.status(200).send('삭제 성공');
    } else {
      const err = new Error('삭제 실패');
      err.statusCode = 500;
      throw err;
    }
  });
});

router.get('/getAll', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    res.send(data);
  });
});

module.exports = router;
