import { mongoUrl } from "./config/connection";
import express from "express";
import mongoose from "mongoose";
import passport from "passport"
import { userRoute, postRoute, profileRoute } from "./routes/api";
import {jwtAuthentication} from "./config/passport"
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');

//connecting to mongodb using mongoose

mongoose.connect(mongoUrl);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log(">>>>we are connected");
});





//using body-parser to parse incoming request body 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//using passport middleware 
app.use(passport.initialize());
jwtAuthentication(passport);

//registering routes here to app 

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/profile", profileRoute);

//server listening 
app.listen(PORT, () => {
  console.log(">>>>>server running at :", PORT);
});
