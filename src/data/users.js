const mongoCollections = require('./mongoCollections');
const users = mongoCollections.users;
//const {ObjectId}=require('mongodb');

const exportedMethods = {
  async getAllUsers() {
    const usersCollection = await users();
    const allusers = await usersCollection.find({}).toArray();
    return allusers;
  },
  async getUser(id) {
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: ObjectId(id)});
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
    const updatedUser= { $addToSet:{events: eid}
    };
    const updatedInfo = await usersCollection.updateOne({ _id: ObjectId(id) }, updatedUser);
    return updatedInfo;
  },
  async unsetUserFollowEvent(uid,eid) {
    const usersCollection = await users();
    const updatedInfo = await usersCollection.updateOne({_id: ObjectId(id)}, {$pull: {posts: ObjectId(eid) }});
    return updatedInfo;
  },
};

module.exports = exportedMethods;