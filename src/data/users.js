const mongoCollections = require('./mongoCollections');
const users = mongoCollections.users;
const events = require("./events");
const {ObjectId}=require('mongodb');
const bcrypt = require('bcryptjs');

const exportedMethods = {

  async getAllUsers() {
    const usersCollection = await users();
    const allusers = await usersCollection.find({}).toArray();
    return allusers;
  },
  async getUser(id) {
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: ObjectId(id)});
    let allEvents=[]  
    console.log(user.regdEvents.length);
    if(user.regdEvents.length != undefined){
    for (const event of user.regdEvents){
      try{
        const info = await events.getEvent(event._id); 
      allEvents.push(info);
      }
      catch(e){
        console.log(e);
      }
    }
  }
    user.regdEvents=allEvents;
    console.log(user);
    return user;
  },

  async getUserUpcomming(id) {
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: ObjectId(id)});
    let allEvents=[]  
    console.log(user.regdEvents.length);
    if(user.regdEvents.length != undefined){
    for (const event of user.regdEvents){
      try{
        const info = await events.getEvent(event._id); 
      var datacheck = new Date().getTime() + (30 * 24 * 60 * 60 * 1000)
      console.log(datacheck);
      console.log(info.eventDate);

      if (datacheck > info.eventDate){
      allEvents.push(info);
      }
      }
      catch(e){
        console.log(e);
      }
    }
  }
    return allEvents;
  },  

  async checkReg(id,eid) {
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: ObjectId(id)});
    if(user.regdEvents.length != undefined){
    for (const event of user.regdEvents){
      console.log(event._id);
      console.log(eid);
      console.log(ObjectId(eid));
      if (event._id==eid)
      {
        return true;
      }
    }
  }
    return false;
  },
  async getUserByUsername(uname) {
    const userCollection = await users();
    const getUser = await userCollection.findOne({ loginID: uname});
    return getUser;
  },
  async getUserByEmail(useremail) {
    const userCollection = await users();
    const getUser = await userCollection.findOne({ email: useremail.toLowerCase()});
    return getUser;
  },
  async createUser(userInfo) {
    const userCollection = await users();
    let hPassword = bcrypt.hashSync(userInfo.password, 4);
    let newUser = {
      loginID: userInfo.loginID.toLowerCase(),
      email: userInfo.email.toLowerCase(),
      hashedPassword: hPassword,
      accessLevel: 1,
      fname: userInfo.firstName,
      lname: userInfo.lastName,
      location: userInfo.location,
      regdEvents:[]
    };
    
    if(this.getUserByUsername(userInfo.loginID.toLowerCase())|| this.getUserByEmail(userInfo.email.toLowerCase())){
      throw 'Users Exists';
    }
    const insertedUser = await userCollection.insertOne(newUser);
    if(insertedUser.insertedCount == 0)
        throw "Could not add user"

    const Id = insertedUser.insertedId;
    const user = exportedMethods.getUser(Id);
    return user;

  },
  async deleteUser(id) {
    const usersCollection = await users();
    const deleted = await usersCollection.removeOne({ _id: ObjectId(id) });    
    return deleted;
  },
  async updateUser(id,update) {
    id=id.toString()
    if (!id || !update)
    {
      throw "bad update";
    } 
    const usersCollection = await users();
    const updatedUser = { $set:update
    };

    const updatedInfo = await usersCollection.updateOne({ _id: ObjectId(id) }, updatedUser);
    if (updatedInfo.modifiedCount === 0) {
      throw "could not update user";
    }
    return await this.getUser(id);
  },

  async setUserFollowEvent(uid,eid) {
    const usersCollection = await users();
    const updatedUser= {$addToSet:{regdEvents:{_id: ObjectId(eid)} } };

    console.log(updatedUser);
    const updatedInfo = await usersCollection.updateOne({ _id: ObjectId(uid) }, updatedUser);
    return updatedInfo;
  },
  async unsetUserFollowEvent(uid,eid) {
    const usersCollection = await users();
    const updatedInfo = await usersCollection.updateOne({_id: ObjectId(uid)}, {$pull: {regdEvents: {'_id':ObjectId(eid)} }});
    return updatedInfo;
  },
};

module.exports = exportedMethods;