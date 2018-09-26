
import {combineReducers} from "redux";
import auth from "./authReducer";
import errors from "./errorReducer";
import profile from "./profile"

const reducers = combineReducers({
    auth,
    errors,
    profile
})


export default reducers;
