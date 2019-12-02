const eventsRoutes = require("./events");
const userRoutes  = require("./users");
const data = require('../data');
const events = data.events;

const constructorMethod = app => {

  app.use("/events", eventsRoutes);
  app.use("/users", userRoutes);



  app.get('/', async (req,res) => {

    let allEvents = await events.getTopEvents();
    res.render('standard/home',{events: allEvents});
    
    });
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
  
};

module.exports = constructorMethod;
