const { MongoClient, ServerApiVersion } = require('mongodb');

// eslint-disable-next-line operator-linebreak
const { MONGO_DB_URI } = process.env;

const client = new MongoClient(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
