import validator from "validator";
import { isEmpty } from "../utility";
export const userRegisterValidator = data => {
  let { name, email, password, password2 } = data;

  let error = {};
  if (isEmpty(name)) {
    error.name = "Name is Empty, provide valid username";
  }
  if (!validator.isLength(name, { min: 3, max: 40 })) {
    error.name = "name must contain between 3 to 40 characters";
  }

  if (!validator.isEmail(email)) {
    error.email = "provide valid email id";
  }

  if (isEmpty(password) || !validator.isLength(password, { min: 4, max: 30 })) {
    error.password = "password must contain between 3 to 40 characters";
  }

  if (isEmpty(password2) || password != password2) {
    error.password2 = "password did not match";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
