const express = require('express');
const router = express.Router();
const data = require('../data');
const events = data.events;


router.get('/', async (req,res) => {

let allEvents = await events.getAllEvents();
res.status(200).json(allEvents);
// res.render('single');

});

router.get('/:id', async (req, res) => {
if(req.params.id === 'topfive'){
res.redirect('/events/topfive');
}
let eventId = req.params.id;
eventId = eventId.toString();
console.log("ID");
try{
let getEv = await events.getEvent(eventId);

res.status(200).json(getEv);
// res.render('single');
}catch(e){
  res.sendStatus(500).json();
  console.log(e);
}

});

router.get('/topfive', async(req, res) => {
  const getTopFive = await events.getTopEvents();
  res.status(200).json(getTopFive);
  // res.render()
})

router.post('/', async (req,res) => {
  let eventInfo = req.body;
  if(!eventInfo)
  throw "Error"

  const newEvent = await events.createEvent(eventInfo);

  res.status(200).json(newEvent);
  // res.render()

});

router.delete('/:id', async(req, res) => {
  let Id = req.params.id;
  if(typeof(Id) !== "string")
  Id=Id.toString();
  try{
  const delEvent = await events.deleteEvent(Id);
  res.status(200).json(delEvent.name + " event has been deleted !");
}catch(e){
  console.log(e);
}
});


router.put('/:id', async(req, res) => {
  let id = req.params.id;

  if(typeof(id) !== "string")
  id = id.toString();

  let updateInfo = req.body;

  if(!updateInfo)
  throw "Provide new information";
  try{
  const update = await events.updateEvent(id, updateInfo);
  res.status(200).json(update);
}catch(e){
  console.log(e);
}
});


module.exports = router;
