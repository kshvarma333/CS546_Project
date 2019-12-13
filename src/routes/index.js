const eventsRoutes = require("./events");
const userRoutes  = require("./users");
const data = require('../data');
const events = data.events;
const users = data.users;
const constructorMethod = app => {

  app.use("/events", eventsRoutes);
  app.use("/users", userRoutes);

app.get('/', async (req,res) => {
if(req.session.authed)
{
const userInfo = await users.getUserUpcomming(req.session.ID);
let cancreate=false;
if (req.session.accesslevel >=2 )
{
cancreate=true;
}
console.log(cancreate);
res.render('users/multiple',{events: userInfo, cancreate: cancreate});
}
else{
let allEvents = await events.getTopEvents();
res.render('standard/home',{events: allEvents});
}
});
app.use("*", (req, res) => {
res.sendStatus(404);
});

};

module.exports = constructorMethod;
