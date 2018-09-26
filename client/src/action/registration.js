import {ADD_ERROR, SET_USER,REMOVE_USER} from "../actionConstant";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../util/setAuthToken"

export const registerUser = (user,locationHistory) => dispatch =>{
    axios.post('/user/register',user).then(user=>{
            locationHistory.push('/login');
    }).catch(err=>{
        dispatch({
            type:ADD_ERROR,
            errors:err.response.data
        })
    })
}


export const loginUser = (loginPayload,locationHistory) => dispatch =>{
    axios.post('/user/login',loginPayload).then(res=>{
             let {token} = res.data;
             //set token in local storage
             localStorage.setItem("alexaToken",token);
             //set token in axios headers for accessing all api route 
             setAuthToken(token)
             //set user and authenticated status in store
             dispatch(setCurrentUser(token))
            //locationHistory.push('/profile');
    }).catch(err=>{
        console.log("...error",err);
        dispatch({
            type:ADD_ERROR,
            errors:err.response.data
        })
    })
}

export const setCurrentUser = (token) =>{
    if(!token){
        return 
    }
    let user = jwt_decode(token);
    return{
        type:SET_USER,
        user:user
    }
}

export const logOutUser = () =>{
    //remove local storage 
    localStorage.removeItem("alexaToken");
    //remove headers from axios : Authorization headers
    setAuthToken(false);

    //call action to remove user from store

    return {
        type:REMOVE_USER,
    }

}
