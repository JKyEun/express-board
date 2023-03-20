const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://j56237:qwer1234@cluster0.03qkgmh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, result) => {
    if (deleteErr) throw deleteErr;
    console.log(result);
    test.insertOne(
      {
        name: 'JKE',
        nickName: 'goorm',
      },
      (insertErr, result) => {
        console.log(result);
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
      },
    );
  });
});
