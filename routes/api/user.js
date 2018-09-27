import express from "express";
import passport from "passport";
import { User } from "../../models/index";
import { keys } from "../../config/connection";
import jwt from "jsonwebtoken";
import {userRegisterValidator,userLoginValidator} from "./validator/index"
var bcrypt = require("bcryptjs");
var gravatar = require("gravatar")
const route = express.Router();

route.get("/", (req, res) => {
  res.json({ msg: "a user home route" });
});

//route for user registration , create new user
route.post("/register", async (req, res) => {
  //adding validation to the rigister route
  let {isValid,error} = userRegisterValidator(req.body);
  if(!isValid){
    return res.status(400).json(error);
  }

  let { name, email, password } = req.body;
  try {

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ email: "Email already exists try to log in" });
    } else {
      let avatar = gravatar.url(email,{
        s:'200',//size
        r:'pg',   //rating
        d:'mm'  //default
      }) 
      let user = new User({
        name,
        email,
        password,
        avatar
      });
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password.toString(), salt);
      user.password = hash;
      user = await user.save();
      res.json(user);
    }
  } catch (err) {
    console.log(">>>>>>err",err)
    return res.status(400).json(err)
  }
});

//route fo login

route.post("/login", async (req, res) => {

  let {isValid,error} = userLoginValidator(req.body);
  if(!isValid){
    return res.status(400).json(error);
  }

  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ email: "email id not register with us" });
    }
    let passwordMatched = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!passwordMatched) res.status(400).json({ password: "password did not matched for this email" });
    let payload = {
      _id:user._id,
      email:user.email,
      name:user.name,
      avatar:user.avatar
    }
    let token = await jwt.sign(payload,keys.secretKey);
    res.json({ msg: "Sucsess",token:'Bearer '+token });
  } catch (err) {
    return res.status(400).json(err)
  }
});



//token  authenticate route:

route.get('/currentUser',passport.authenticate('jwt',{session:false}), (req,res)=>{
res.status(200).json({msg:"authenticated!!",user:req.user})
})

module.exports = route;
