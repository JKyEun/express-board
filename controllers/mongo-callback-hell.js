const { MongoClient, ServerApiVersion } = require('mongodb');

// eslint-disable-next-line operator-linebreak
const uri =
  'mongodb+srv://j56237:qwer1234@cluster0.03qkgmh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  if (err) throw err;
  const member = client.db('kdt5').collection('member');
  member.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    member.insertMany(
      [
        { name: '장경은', age: 27 },
        { name: '송수빈', age: 26 },
        { name: '박지원', age: 26 },
        { name: '윤제', age: 26 },
        { name: '김계환', age: 36 },
      ],
      (insertManyErr, insertManyResult) => {
        if (insertManyErr) throw insertManyErr;
        console.log(insertManyResult);
        member.insertOne(
          { name: '조성희', age: 24 },
          (insertOneErr, insertOneResult) => {
            if (insertOneErr) throw insertOneErr;
            console.log(insertOneResult);
            member.deleteOne(
              { name: '송수빈' },
              (deleteOneErr, deleteOneResult) => {
                if (deleteOneErr) throw deleteOneErr;
                console.log(deleteOneResult);
                member.updateOne(
                  { name: '조성희' },
                  { $set: { name: '송수빈', age: 26 } },
                  (updateOneErr, updateOneResult) => {
                    if (updateOneErr) throw updateOneErr;
                    console.log(updateOneResult);
                    const findCursor = member.find({ age: { $gt: 26 } });
                    findCursor.toArray((toArrErr, arrData) => {
                      if (toArrErr) throw toArrErr;
                      console.log(arrData);
                    });
                  },
                );
              },
            );
          },
        );
      },
    );
  });
});
