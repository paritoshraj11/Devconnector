
import {combineReducers} from "redux";
import auth from "./authReducer";
import errors from "./errorReducer";
import profile from "./profile";
import posts from "./postReducers"

const reducers = combineReducers({
    auth,
    errors,
    profile,
    posts
})


export default reducers;
