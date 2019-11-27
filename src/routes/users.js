const express = require('express');
const router = express.Router();
const data = require('../data');
const events = data.events;
const users = data.users;
const bcrypt = require("bcryptjs")


router.get("/", async(req res) => {
  if(req.session.name === "AuthCookie"){
    // res.redirect('/userpage')
  }

  // const allUsers = await users.getALLUsers();

  // res.status(200).json(allUsers);
  // res.render()
});



router.post('/', async(req, res) => {

  userInfo = req.body;
  if(!userInfo)
  throw "Enter details "

  if(!userInfo.username || !userInfo.password)
  throw "Please enter Username and Password"

  const authUser = await users.getUserAuthentication(userInfo.username, userInfo.password);
  if(authUser){
    req.session.name = "AuthCookie";
    req.session.username = userInfo.username;
  }

  try{
  const newUser = await users.createUser(userInfo);

  req.session.id = newUser._id;
  res.status(200);
  // res.render()
}catch(e){
  console.log(e);
  res.status(500);
  // res.render()
}
});

router.use("/userpage", function(req,res,next) => {
  if(req.session.name !== "AuthCookie"){
    // res.status(403).render(error)
  }
  else
    next();
});

router.get("/userpage", async(req, res) => {
  const userInfo = await users.getUser(req.session.id);

  // res.render('userInfo')
})


router.put('/:id', async(req, res) => {
  userId = req.params.id;
  newInfo = req.body;

  userId=userId.toString();

  const userInfo = await users.getUser(userId);

  if(!userInfo)
  throw "User not present"
  try{
  const updateUser = await users.updateUser(userId, newInfo);

  res.status(200).json(update);
  // res.render()
}catch(e){
  // res.render()
  res.status(500);
  console.log(e);
}
});

router.delete("/:id", async(req.res) => {
  const userId = req.params;
  userId = userId.toString()

  const delUser = await users.getUser(userId);

  if(!delUser)
  throw "The user doesnt exist";

  try{
  const deletedUser = await users.deleteUser(userId);
  res.status(200).json(deletedUser);
  // res.render(User with username delUser.loginID has been removed)
}catch(e){
  console.log(e);
  res.status(500);
  // res.render()
}
});


router.get("/regEvent", async(req res) =>{
  const eventId = req.body;
  eventId = eventId.toString();

  const eventInfo = await events.getEvent(eventId);

  const userId = req.session.id;

  try{
  const userEventInfo = await users.setUserFollowEvent(userId, eventInfo._id);
  res.status(200).json(userEventInfo)
  // res.render()
}catch(e){
  console.log(e);
  res.status(500);
  // res.render()
}
});


router.get("/unregEvent", async(req, res) => {
  const eventId = req.body;
  eventId = eventId.toStrin();
  const userId = req.session._id;

  try{
    const userEventInfo = await users.unsetUserFollowEvent(userId, eventId);
    res.status(200).json(userEventInfo);
    res.render();
  }catch(e){
    console.log(e);
    res.status(200);
    // res.render()
  }
});

router.get("/logout", async(req,res) => {
  req.session.destroy();
  // res.render()
});

module.exports = router;
