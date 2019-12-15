const dbConnection = require('../data/mongoConnection');
const data = require('../data');
const users = data.users;
const events = data.events;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  //admin login
  Admin={
    loginID: 'admin',
    email: 'null',
    password: 'test1234',
    firstName: 'Admin',
    lastName: 'Owner',
    location: '07082',
    regdEvents: []
  }
  tguide={
    loginID: 'tguide',
    email: 'null1',
    password: 'test1234',
    firstName: 'Trevor',
    lastName: 'Cardwell',
    location: '07082',
    regdEvents: []
  }
  user={
    loginID: 'vaishnavi',
    email: 'null2',
    password: 'test1234',
    firstName: 'Vaishnavi',
    lastName: 'Gopal',
    location: '07082',
    regdEvents: []
  }
  await users.createUser(Admin,3);
  let tourg = await users.createUser(tguide,2);
  await users.createUser(user,1);
  var date = new Date();

  
  
  let newEvent = {
    eventName : 'Hiking',
    eventDesc : 'Appalachian Hikinh',
    location : '10988',
    tourGuide : 'Trevor',
    price : '$20',
    maxUsers: 10,
    eventDate: date.setDate(date.getDate() + 1),
    eventStatus: 'open'
  }

  await events.createEvent(newEvent,tourg._id.toString())

 newEvent = {
    eventName : 'Rafting',
    eventDesc : 'Rafting down the river',
    location : '18327',
    tourGuide : 'Trevor',
    price : '$20',
    maxUsers: 10,
    eventDate: date.setDate(date.getDate() + 9),
    eventStatus: 'open'
  }

  await events.createEvent(newEvent,tourg._id.toString())

  console.log('Done seeding the database');
  await db.serverConfig.close();
};

main().catch(console.log);