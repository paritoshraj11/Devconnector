import express from "express";
import { Post, User } from "../../models/index";
import passport from "passport";
import { postValidator } from "./validator/index";
const route = express.Router();

route.get("/all", async (req, res) => {
  try {
    let posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).send("error in getting all post ");
  }
});

route.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { postId } = req.params;

    let user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res.status(400).send("user not found");
    }
    //checking post owners
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(400).send("post not found by id");
    }
    if (JSON.stringify(post.user) === JSON.stringify(post.user)) {
      post.remove({ _id: post._id }).then(result => {
        res.status(200).json(result);
      });
    } else {
      res.status(400).send("you are not owners");
    }
  }
);
route.delete(
  "/deleteComment/:commentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(">>>>> delete comments called");
    let { commentId } = req.params;

    let user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res.status(400).send("user not found");
    }
    let post = await Post.findOne({ "comments._id": commentId });
    if (!post) {
      return res.status(400).send("post not found by id");
    }

    let removeIndex = post.comments
      .map(comment => comment._id.toString())
      .indexOf(commentId);
    post.comments.splice(removeIndex, 1);

    post
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).send("unable to delete post");
      });
  }
);

route.post(
  "/likePost",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { postId } = req.body;

    if (!postId) {
      return;
    }
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send("User not found");
    }
    let post = await Post.findById(postId);
    if (!post) {
    }
    //if users not liked the post then add user in post , otherwise remove

    let indexOfUser = post.likes
      .map(like => like.user.toString())
      .indexOf(user._id.toString());
    if (indexOfUser >= 0) {
      //remove user

      post.likes.splice(indexOfUser, 1);
    } else if (indexOfUser < 0) {
      //add user ;
      post.likes.push({ user: req.user._id });
    }
    post.save().then(result => {
      console.log(
        ">>>>> after adding user in likesa array",
        JSON.stringify(result)
      );
      return res.status(200).json(result);
    });
  }
);

route.post(
  "/addComment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { error, isValid } = postValidator(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }
    let post = await Post.findById(req.body.postId);
    if (!post) {
      return res.status(400).json({ postNotFound: "post not found" });
    }
    let newComment = {
      user: req.user._id,
      name: req.body.name,
      text: req.body.text,
      avatar: req.body.avatar
    };
    console.log(">>>>>>>new Comment", newComment);
    post.comments.unshift(newComment);
    post
      .save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(">>>>> error in saving post", err);
        res.status(400).send("error in saving post");
      });
  }
);

route.get("/:postId", async (req, res) => {
  let { postId } = req.params;
  try {
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(400).send("post not found");
    }
    return res.status(200).json(post);
  } catch (err) {
    console.log(">>>.error in geting post", err);
    return res.status(400).json(err);
  }
});

route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { error, isValid } = postValidator(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id
    });

    newPost
      .save()
      .then(result => res.json(result))
      .catch(err => {
        console.log(">>>> error in saving new post", err);
        res.status(400).json("error in saving new post");
      });
  }
);

module.exports = route;
