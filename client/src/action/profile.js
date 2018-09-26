import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  ADD_ERROR,
  GET_PROFILES
} from "../actionConstant";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        data: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        data: {}
      });
    });
};

export const addUserProfile = (data, history) => dispatch => {
  axios
    .post("/profile", data)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: ADD_ERROR,
        errors: err.response.data
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const addExperience = (experience, history) => dispatch => {
  axios
    .post("/profile/addExperience", experience)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: ADD_ERROR,
        errors: err.response.data
      });
    });
};
export const addEducation = (education, history) => dispatch => {
  axios
    .post("/profile/addEducation", education)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: ADD_ERROR,
        errors: err.response.data
      });
    });
};


export const getProfiles = ()=> dispatch =>{
  dispatch(setProfileLoading());
  axios.get('/profile/all').then(res=>{
    dispatch({
      type:GET_PROFILES,
      data:res.data
    })
  }).catch(err=>{
    dispatch({
      type:GET_PROFILES,
      data:null
    })
  })

}

export const getProfileByHandle = (handle) => dispatch =>{
  dispatch(setProfileLoading())
  axios.get(`/profile/handle/${handle}`).then(res=>{
    dispatch({
      type:GET_PROFILE,
      data:res.data
    })
  }).catch(err=>{
    dispatch({
      type:GET_PROFILE,
      data:null
    })
  })
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
