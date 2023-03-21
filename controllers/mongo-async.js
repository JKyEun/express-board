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
    const test = client.db('kdt5').collection('test');

    await test.deleteMany({});
    await test.insertOne({ name: 'pororo', age: 5 });
    await test.deleteMany({});
    await test.insertMany([
      { name: 'pororo', age: 5 },
      { name: 'crong', age: 4 },
      { name: 'loopy', age: 6 },
    ]);
    await test.deleteOne({ name: 'crong' });
    await test.deleteMany({});
    await test.insertMany([
      { name: 'pororo', age: 5 },
      { name: 'crong', age: 4 },
      { name: 'loopy', age: 6 },
    ]);
    await test.updateMany({ age: { $gte: 5 } }, { $set: { age: 10 } });
    const findCursor = test.find({ age: { $gte: 10 } });
    const dataArr = await findCursor.toArray();
    console.log(dataArr);
  } catch (err) {
    console.error(err);
  }
}

main();
