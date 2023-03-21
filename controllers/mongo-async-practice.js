const { MongoClient, ServerApiVersion } = require('mongodb');

// eslint-disable-next-line operator-linebreak
const uri =
  'mongodb+srv://j56237:qwer1234@cluster0.03qkgmh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    await client.connect();
    const member = client.db('kdt5').collection('member');
    await member.deleteMany({});
    await member.insertMany([
      { name: '장경은', age: 27 },
      { name: '송수빈', age: 26 },
      { name: '박지원', age: 26 },
      { name: '윤제', age: 26 },
      { name: '김계환', age: 36 },
    ]);
    await member.insertOne({ name: '조성희', age: 24 });
    await member.deleteOne({ name: '송수빈' });
    await member.updateOne(
      { name: '조성희' },
      { $set: { name: '송수빈', age: 26 } },
    );
    const findCursor = member.find({ age: { $gt: 26 } });
    const arrData = await findCursor.toArray();
    console.log(arrData);
  } catch (err) {
    console.error(err);
  }
}

main();
