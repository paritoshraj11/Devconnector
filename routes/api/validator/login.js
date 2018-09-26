import validator from "validator";
import {isEmpty} from "../utility"
export const  userLoginValidator = (data)=>{
    let {email,password} = data;
    let error = {};
  
    if(!validator.isEmail(email)){
        error.email = "provide valid email id"
    }

    if(isEmpty(password) || !validator.isLength(password,{min:4, max:30})){
        error.password = "provide valid password"  
    }

    return {
        error,
        isValid :isEmpty(error)
    }

}