const express = require('express');
const router = express.Router();
const data = require('../data');
const events = data.events;
const users = data.users;

router.get('/', async (req,res) => {

let allEvents = await events.getAllEvents();
res.render('events/multiple',{events: allEvents});

});

router.get('/update/:id', async (req,res) => {

  let eventId = req.params.id;
  console.log(eventId);
  let getEv = await events.getEvent(eventId);
  res.render('events/update',{event: getEv});
  
  });

router.get('/create', async (req,res) => {

  let allEvents = await events.getAllEvents();
  res.render('/create');
  
  });

router.get('/single/:id', async (req, res) => {
let eventId = req.params.id;
// let user = await users.getUser("5de3eb58e025f58f90e311f2");
let getEv = await events.getEvent(eventId);
console.log(getEv);
if (!getEv){
  res.redirect('/');
  return;
}
res.render('events/single',{event: getEv, registered: false});
// res.render('single');

});

router.get('/topfive', async(req, res) => {
  let getTopFive = await events.getTopEvents();
  res.render('events/multiple',{events: getTopFive});
  // res.render()
})

router.post('/', async (req,res) => {
  let eventInfo = req.body;
  if(!eventInfo)
  throw "Error"
  try{
  const newEvent = await events.createEvent(eventInfo);
  res.redirect('events/single/'+newEvent._id)
  }catch(e){
    res.sendStatus(500)
  }
});

router.post('/single/:id', async(req, res) => {
  let Id = req.params.id;
  if (req.body.type=="delete"){
  try{
  const delEvent = await events.deleteEvent(Id);
  res.redirect('/');
}catch(e){
  console.log(e);
}
  }
  else if (req.body.type=="update"){
    const update = await events.updateEvent(id, updateInfo);
    res.status(200).json(update);

  }
});


router.post('/update/:id', async(req, res) => {
  let id = req.params.id;

  if(typeof(id) !== "string")
  id = id.toString();

  let updateInfo = req.body;

  if(!updateInfo)
  throw "Provide new information";
  try{
  const update = await events.updateEvent(id, updateInfo);
  res.redirect('/events/single/'+id)
}catch(e){
  console.log(e);
}
});


module.exports = router;
