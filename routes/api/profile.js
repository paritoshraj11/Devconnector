import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { User, Profile } from "../../models/index";
import {
  profileValidator,
  experienceValidator,
  educationValidator
} from "./validator/index";

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
     return res.json(profile);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
);

//find route by handle
route.get("/handle/:handle", async (req, res) => {
  let { handle } = req.params;
  try {
    let profile = await Profile.findOne({ handle: handle }).populate(
      "user",
      "name email avatar"
    );
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
      "name email avatar"
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
    let profiles = await Profile.find().populate("user", "name email avatar");
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
      githubusername,
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
    if (githubusername) profileFields.githubusername = githubusername;
    if (status) profileFields.status = status;
    if (skills) profileFields.skills = skills;
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (google) profileFields.social.google = google;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    try {
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
    } catch (err) {
      console.log(">>>>>>>error in creating /updating user profile", err);
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

//route for delete Experience
route.delete(
  `/deleteCredentail/:credential/:credentailId`,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let {credential,credentailId} = req.params;
    if(!credentailId || !credential){
      return ;
    }
    try{
      let user = await User.findById(req.user._id);
      if(!user){
        return res.status(400).send("User not found");
      }
      let profile = await Profile.findOne({user:req.user._id});
      if(!profile){
        return res.status(400).send("Profile not found");
      }
      let credentialToModify = profile[credential];
      let indexToDelete = credentialToModify.map(exp=>exp._id.toString()).indexOf(credentailId.toString())
      if(indexToDelete >=0){
        //remove that experience;
        credentialToModify.splice(indexToDelete,1);
      }
      profile.save().then(result=>{
       return res.status(200).json(result);
      }).catch(err=>res.status(400).send("Error in saving Profile"))
    }catch(err){
      console.log(">>>>> error in deleting experience",err);
    }
  }
);



module.exports = route;
