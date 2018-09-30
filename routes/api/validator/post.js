import validator from "validator";
import { isEmpty } from "../utility";
export const postValidator = data => {
  let { text } = data;
  let error = {};

  if (isEmpty(text) || !validator.isLength(text, { min: 10, max: 200 })) {
    error.text = "comment must be between 10 and 200 character";
  }

  return {
    error,
    isValid: isEmpty(error)
  };
};
