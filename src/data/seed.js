const dbConnection = require('../data/mongoConnection');
const data = require('../data');
const users = data.users;
const events = data.events;

const main = async () => {
  const db = await dbConnection();
  //await db.dropDatabase();

  const adminDet = await users.createUser(
    'admin',
    'pass',
    2,
    'Vaishoo',
    'Gopal',
    'NJ',
    []
  );

  const userDet = await users.createUser(
    'tcardwel',
    'trek@',
    1,
    'Trevor',
    'Cardwel',
    'NY',
    []
  );

  console.log('Done seeding the database');
  await db.serverConfig.close();
};

main().catch(console.log);
