const mongoCollections = require('./mongoCollections');
const events = mongoCollections.events;
//const {ObjectId}=require('mongodb');

const exportedMethods = {
  async getAllEvents() {
    const eventsCollection = await events();
    const allevents = await eventCollection.find({}).toArray();
    return allevents;
  },
  
};

module.exports = exportedMethods;