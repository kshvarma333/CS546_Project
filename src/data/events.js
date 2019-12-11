const mongoCollections = require('./mongoCollections');
const events = mongoCollections.events;
const {ObjectId}=require('mongodb');


const exportedMethods = {
  async getAllEvents() {
    const eventsCollection = await events();
    const allevents = await eventsCollection.find({}).toArray();
    return allevents;
  },

  async getEvent(id) {
    if(typeof(id) !== "string" )
    id=id.toString();

    const eventsCollection = await events();
    const gevent = await eventsCollection.findOne({_id: ObjectId(id)});

    if(!gevent)
    throw "Event Of ID "+id+" Not Found"

    return gevent;
  },

  async createEvent(eventInfo,createdby) {

    const eventCollection = await events();
    console.log(eventInfo.eventName);
    let newEvent={
      name: eventInfo.eventName,
      description: eventInfo.eventDesc,
      createdBy: createdby,
      location: eventInfo.location,
      tourGuide: eventInfo.tourGuide,
      price: eventInfo.price,
      maxUsers: eventInfo.maxUsers,
      regdUsersCount: eventInfo.regdUsersCount,
      regdUsers: {},
      eventDate: eventInfo.eventDate,
      eventStatus: eventInfo.eventStatus
    }
    const insertEvent = await eventCollection.insertOne(newEvent);
    if(insertEvent.insertedCount == 0)
    throw "Could not add Event";

    const Id = insertEvent.insertedId;
    const eve = exportedMethods.getEvent(Id);
    return eve;
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
    const delEvent = await eventsCollection.findOne({ _id: ObjectId(id) });

    const deleted = await eventsCollection.removeOne({ _id: ObjectId(id) });
    return delEvent;
  },

  async getTopEvents() {
    const eventsCollection = await events();
    const allevents = await eventsCollection.find({}).sort({rating : -1}).limit(5).toArray();
    return allevents;
  },
  async setRateEvent(id,rate) {
    // Need to work on.
    const eventsCollection = await events();
    const allevents = await eventCollection.find({_id: ObjectId(id)}).toArray();
    return allevents;
  },


};

module.exports = exportedMethods;