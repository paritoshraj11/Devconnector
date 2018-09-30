import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_LOADING,
  } from "../actionConstant";

const initialState = {
    post:{},
    posts:[],
    loading:false
}


 const postReducers = (state=initialState, action)=>{
    switch(action.type){
        case POST_LOADING : return {...state, loading:true}
        case DELETE_POST: return {
            ...state,
            posts:state.posts.filter((post)=>post._id != action.data._id)
        }
        case ADD_POST : return {...state,posts:[action.data, ...state.posts]}
        case GET_POST: return {...state, post:action.data,loading:false}
        case GET_POSTS: return {...state, posts:action.data, loading:false }
        default : return state;
    }
}

export default postReducers;