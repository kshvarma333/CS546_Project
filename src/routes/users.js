const express = require('express');
const router = express.Router();
const data = require('../data');
const events = data.events;
const users = data.users;
const bcrypt = require("bcryptjs");




router.use("/userpage", function(req,res,next) {
  //if(req.session.name !== "AuthCookie"){
    // res.status(403).render(error)
  //}
  //else
    next();
});

router.get("/userpage", async(req, res) => {
  const userInfo = await users.getUser("5de3eb58e025f58f90e311f2");
  console.log(userInfo);
  res.render('users/single',{events: userInfo.regdEvents, user: userInfo});
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

router.delete("/:id", async(req, res) => {
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


router.post("/regevent", async(req, res) =>{

  let eventId = req.body.eventId.toString();
  console.log(eventId);
  //const userId = req.session.id;
  const userId = "5de3eb58e025f58f90e311f2";
  try{
  const userEventInfo = await users.setUserFollowEvent(userId, eventId);
  res.redirect('/events/single/'+eventId)
  // res.render()
}catch(e){
  console.log(e);
  res.status(500);
  // res.render()
}
});


router.post("/unregevent", async(req, res) => {
  let eventId = req.body.eventId.toString();
  //const userId = req.session._id;
  const userId = "5de3eb58e025f58f90e311f2";
  try{
    const userEventInfo = await users.unsetUserFollowEvent(userId, eventId);
    res.status(200).json(userEventInfo);
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

router.get("/", async(req, res) => {
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

module.exports = router;
