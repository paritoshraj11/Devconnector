import express from "express";
const route = express.Router();

route.get("/", (req, res) => {
  res.json({ msg: "post route works" });
});

module.exports = route;
