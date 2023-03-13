const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia totam fugiat temporibus iste, nihil, ea iure, consectetur laudantium tempore sit ipsa voluptate ducimus quidem perferendis animi doloribus deserunt quis libero?',
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia totam fugiat temporibus iste, nihil, ea iure, consectetur laudantium tempore sit ipsa voluptate ducimus quidem perferendis animi doloribus deserunt quis libero?',
  },
];

// http://localhost:4000/board/
// 글 전체 목록 보여주기
router.get('/', (req, res) => {
  res.render('board', { ARTICLE, articleCounts: ARTICLE.length });
});

// 글 쓰기 모드
router.get('/write', (req, res) => {
  res.render('board_write');
});

// 글 추가 버튼
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newArticle);
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인해 주세요!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 수정 모드
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
});

// 글 수정하기 버튼
router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인해 주세요!');
    err.statusCode = 400;
    throw err;
  }
});

// 글 삭제 버튼
router.delete('/delete/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  if (arrIndex !== -1) {
    ARTICLE.splice(arrIndex, 1);
    res.send('삭제 완료!');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
