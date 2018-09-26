import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { User, Profile } from "../../models/index";
import { profileValidator, experienceValidator,educationValidator } from "./validator/index";

const route = express.Router();

// route.get("/", (req, res) => {
//   res.json({ msg: "profile route works" });
// });

//getting current  user routes:

route.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { user } = req;
    let errors = {};
    try {
      let profile = await Profile.findOne({ user: user._id });
      if (!profile) {
        errors.noprofile = "No profile found for this user";
        return res.status(400).json(errors);
      }
      res.json(profile);
    } catch (err) {
      return res.status(400).json(err);
    }
    res.json(user);
  }
);

//find route by handle
route.get("/handle/:handle", async (req, res) => {
  let { handle } = req.params;
  try {
    let profile = await Profile.findOne({ handle: handle }).populate("user","name email");
    if (!profile) {
      return res.status(400).send("profile not found by this handle");
    }
    res.status(200).json(profile);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//find  profile by userId
route.get("/user/:user_id", async (req, res) => {
  let { user_id } = req.params;
  try {
    let profile = await Profile.find({ user: user_id }).populate(
      "user",
      "name email"
    );
    if (!profile) {
      return res.status(400).send(" profile not found for this user_id");
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json(err);
  }
});

route.get("/all", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", "name email");
    console.log(">>>>>>profiles", profiles);
    if (!profiles) {
      return res.status(400).send("profiles not found");
    }
    res.status(200).json(profiles);
  } catch (err) {
    res.status(400).json(err);
  }
});

//route for updating or creating profiles

route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let {
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubUserName,
      skills,
      youtube,
      google,
      facebook,
      twitter,
      linkedin
    } = req.body;

    const { error, isValid } = profileValidator(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }
    if (skills) {
      skills = skills.split(",");
    }
    let profileFields = {};
    let errors = {};
    profileFields.user = req.user._id;
    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUserName) profileFields.githubUserName = githubUserName;
    if (status) profileFields.status = status;
    if (skills) profileFields.skills = skills;
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (google) profileFields.social.google = google;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    let userProfile = await Profile.findOne({ user: req.user._id });
    if (userProfile) {
      //profile exists: update the profile
      let updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(updatedProfile);
    } else {
      //profile dont exists: create one:
      let profileWithHandleExists = await Profile.findOne({
        handle: profileFields.handle
      });
      if (profileWithHandleExists) {
        errors.handle = " this handle already exists";
        return res.status(400).json(errors);
      }

      //going to save:
      let profile = new Profile(profileFields);
      let savedProfile = await profile.save();
      if (savedProfile) {
        res.status(200).json(savedProfile);
      }
    }
  }
);

route.post(
  "/addExperience",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error, isValid } = experienceValidator(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(400).json({ user: "user not found" });
    }
    let experience = {
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      from: new Date(req.body.from),
      location: req.body.location,
      description: req.body.description
    };
    if (req.body.to.length) {
      experience.to = req.body.to;
    }
    if (req.body.current) {
      experience.current = req.body.current;
    }
    profile.experience.unshift(experience);
    profile
      .save()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(err => {
        console.log(">>>>err", err);
        return res.status(400).json({ error: "error in saving experience" });
      });
  }
);
route.post(
  "/addEducation",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error, isValid } = educationValidator(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(400).json({ user: "user not found" });
    }
    let education = {
      school: req.body.school,
      degree: req.body.degree,
      field: req.body.field,
      from: new Date(req.body.from),
      description: req.body.description
    };
    if (req.body.to.length) {
      education.to = req.body.to;
    }
    if (req.body.current) {
      education.current = req.body.current;
    }
    profile.education.unshift(education);
    profile
      .save()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(err => {
        console.log(">>>>err", err);
        return res.status(400).json({ error: "error in saving experience" });
      });
  }
);

module.exports = route;
