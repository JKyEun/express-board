const connection = require('./dbConnect');

const userDB = {
  // 중복회원 찾기
  checkUser: (userId, cb) => {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${userId}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  // 회원가입 하기
  registerUser: (newUser, cb) => {
    connection.query(
      `INSERT INTO mydb.user (USERID, PASSWORD) VALUES ('${newUser.id}', '${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = userDB;
