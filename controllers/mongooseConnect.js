const mongoose = require('mongoose');

// const { MONGO_DB_URI } = process.env;
const MONGO_DB_URI =
  'mongodb+srv://j56237:qwer1234@cluster0.03qkgmh.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      dbName: 'kdt5',
      useNewUrlParser: true,
    });

    console.log('몽구스 접속 성공');

    mongoose.connection.on('error', (err) => {
      console.error('Mongo DB 연결 에러', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('Mongo DB 연결이 끊어졌습니다. 연결을 재시도합니다.');
      connect();
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connect;
