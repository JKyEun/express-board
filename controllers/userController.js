const mongoClient = require('./mongoConnect');

const userDB = {
  // 중복회원 찾기
  checkUser: async (userId) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');
      const findUser = await user.findOne({ id: userId });
      return findUser;
    } catch (err) {
      console.error(err);
    }
  },
  // 회원가입 하기
  registerUser: async (newUser) => {
    try {
      const client = await mongoClient.connect();
      const user = client.db('kdt5').collection('user');
      await user.insertOne(newUser);
      return true;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = userDB;
