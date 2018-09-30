import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  ADD_ERROR
} from "../actionConstant";

import axios from "axios";

//add post
export const addPost = data => dispatch => {
  axios
    .post("/post", data)
    .then(res => {
      dispatch({
        type: ADD_POST,
        data: res.data
      });
      // history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: ADD_ERROR,
        errors: err.response.data
      });
    });
};

//delete post
export const deletePost = data => dispatch => {
  axios.delete(`/post/${data._id}`).then(res => {
    dispatch({
      type: DELETE_POST,
      data: res.data
    });
  });
};
//delete comment
export const deleteComment = data => dispatch => {
  axios
    .delete(`/post/deleteComment/${data._id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        data: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_ERROR,
        data: err.response.data
      });
    });
};

//add comment
export const addComment = data => dispatch => {
  axios
    .post("/post/addComment", data)
    .then(res => {
      dispatch({
        type: GET_POST,
        data: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_ERROR,
        data: err.response.data
      });
    });
};

//get all posts
export const getAllPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/post/all")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        data: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        data: null
      });
    });
};

export const getPost = data => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/post/${data._id}`)
    .then(result => {
      dispatch({
        type: GET_POST,
        data: result.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        data: null
      });
    });
};

export const likePost = data => dispatch => {
  axios
    .post("/post/likePost", data)
    .then(res => {
      dispatch(getAllPosts());
    })
    .catch(err => {
      console.log(">>>error in liking post", err);
    });
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
