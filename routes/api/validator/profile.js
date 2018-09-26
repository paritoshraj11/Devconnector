import validator from "validator";
import { isEmpty } from "../utility";
export const profileValidator = data => {
  let { handle, status, website, youtube, facebook, linkedin , twitter} = data;

  let error = {};
  handle = !isEmpty(handle) ? handle : "";
  status = !isEmpty(status) ? status : "";

  if (isEmpty(handle) || !validator.isLength(handle, { min: 4, max: 30 })) {
    error.handle = "provide valid handle";
  }

  if (isEmpty(status)) {
    error.status = "provide valid status";
  }

  if (isEmpty(website) || !validator.isURL(website)) {
    error.website = "website is empty or invalid url";
  }

  if(facebook){
    if(!validator.isURL(facebook)){
      error.facebook = "facebook address is empty or invalid url";
    }
  }

  if(twitter){
    if(!validator.isURL(twitter)){
      error.twitter = "twitter address is invalid url";
    }
  }

  if(linkedin){
    if(!validator.isURL(linkedin)){
      error.linkedin = "linkedin address is  invalid url";
    }
  }

  if(youtube){
    if(!validator.isURL(youtube)){
      error.youtube = "youtube address is  invalid url";
    }
  }
  

 

  return {
    error,
    isValid: isEmpty(error)
  };
};



export const experienceValidator = (data) =>{
  let {title, location, description, company, current, from , to} = data;
  let error = {}
  if(isEmpty(title)){
    error.title = "*profile title for experience"
  }

  if(isEmpty(company)){
    error.company = "*provide company"
  }
  if(isEmpty(from)){
    error.from = "*provide working start from"
  }
  if(isEmpty(description)){
    error.description = "*provide description for your job/experience"
  }

  return {
    error,
    isValid:isEmpty(error)
  }

}

export const educationValidator = (data) =>{
  let {school, degree, description, field, from } = data;
  let error = {}
  if(isEmpty(school)){
    error.school = "*provide school"
  }
  if(isEmpty(degree)){
    error.degree = "*provide degree"
  }

  if(isEmpty(field)){
    error.field = "*provide field"
  }
  if(isEmpty(from)){
    error.from = "*provide educaton start from"
  }
  if(isEmpty(description)){
    error.description = "*Tell us about your experience and what you learned"
  }

  return {
    error,
    isValid:isEmpty(error)
  }

}