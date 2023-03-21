const { MongoClient, ServerApiVersion } = require('mongodb');

// eslint-disable-next-line operator-linebreak
const uri =
  'mongodb+srv://j56237:qwer1234@cluster0.03qkgmh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// insertOne
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertOne(
      {
        name: 'pororo',
        age: 5,
      },
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);
      },
    );
  });
});

// insertMany
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'crong', age: 4 },
        { name: 'loopy', age: 6 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);
      },
    );
  });
});

// deleteOne
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'crong', age: 4 },
        { name: 'loopy', age: 6 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);

        test.deleteOne({ name: 'crong' }, (deleteOneErr, deleteOneResult) => {
          if (deleteOneErr) throw deleteOneErr;
          console.log(deleteOneResult);
        });
      },
    );
  });
});

// deleteMany
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'crong', age: 4 },
        { name: 'loopy', age: 6 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);

        test.deleteMany(
          { age: { $gte: 5 } },
          (deleteManyErr, deleteManyResult) => {
            if (deleteManyErr) throw deleteManyErr;
            console.log(deleteManyResult);
          },
        );
      },
    );
  });
});
// findOne
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'crong', age: 4 },
        { name: 'loopy', age: 6 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);

        test.findOne(
          { name: 'loopy' },
          { $set: { name: '루피' } },
          (updateOneErr, updateOneResult) => {
            if (updateOneErr) throw updateOneErr;
            console.log(updateOneResult);
          },
        );
      },
    );
  });
});

// updateMany
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'crong', age: 4 },
        { name: 'loopy', age: 6 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);

        test.updateMany(
          { age: { $gte: 5 } },
          { $set: { name: '나이가 5살 이상인 친구들' } },
          (updateManyErr, updateManyResult) => {
            if (updateManyErr) throw updateManyErr;
            console.log(updateManyResult);
          },
        );
      },
    );
  });
});

// findOne
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'crong', age: 4 },
        { name: 'loopy', age: 6 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);

        test.findOne({ name: 'loopy' }, (findOneErr, findOneData) => {
          if (findOneErr) throw findOneErr;
          console.log(findOneData);
        });
      },
    );
  });
});

// find
client.connect((err) => {
  if (err) throw err;
  const test = client.db('kdt5').collection('test');
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertMany(
      [
        { name: 'pororo', age: 5 },
        { name: 'crong', age: 4 },
        { name: 'loopy', age: 6 },
      ],
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);

        const findCursor = test.find({ age: { $gte: 5 } });
        console.log(findCursor);

        findCursor.toArray((toArrErr, arrData) => console.log(arrData));
      },
    );
  });
});
