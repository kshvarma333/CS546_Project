const mongoCollections = require('./mongoCollections');
const events = mongoCollections.events;
//const {ObjectId}=require('mongodb');

const exportedMethods = {
  async getAllEvents() {
    const eventsCollection = await events();
    const allevents = await eventsCollection.find({}).toArray();
    return allevents;
  },

  async getEvent(id) {
    const eventsCollection = await events();
    const event = await eventsCollection.findOne({_id: ObjectId(id)});
    return event;
  },
  
  async updateEvent(id,update) {
    id=id.toString()
    if (!id || !update)
    {
      throw "No update";
    } 
    const eventsCollection = await events();
    const updatedEvent = { $set:update
    };

    const updatedInfo = await eventsCollection.updateOne({ _id: ObjectId(id) }, updatedEvent);
    if (updatedInfo.modifiedCount === 0) {
      throw "could not update event";
    }
    return await this.getEvent(id);
  },

  
  async deleteEvent(id) {
    const eventsCollection = await events();
    const deleted = await eventsCollection.removeOne({ _id: ObjectId(id) });    
    return deleted;
  },
  
  async getTopEvents(amount=5) {
    const eventsCollection = await events();
    const allevents = await eventsCollection.find({}).sort({rating : -1}).limit(5).toArray();
    return allevents;
  },
  async setRateEvent(id,rate) {
    // Need to work on.
    const eventsCollection = await events();
    const allevents = await eventCollection.find({_id: ObjectId(id}).toArray();
    return allevents;
  },
  

};

module.exports = exportedMethods;