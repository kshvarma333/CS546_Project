const dbConnection = require('../data/mongoConnection');
const data = require('../data');
const users = data.users;
const events = data.events;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  //admin login
  const adminDet = await users.createUser(
    'admin',
    'none',
    'pass',
    2,
    'Vaishoo',
    'Gopal',
    'NJ',
    []
  );

  //trek guide login
  const userDet = await users.createUser(
    'tcardwel',
    'trevorc212@gmail.com',
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