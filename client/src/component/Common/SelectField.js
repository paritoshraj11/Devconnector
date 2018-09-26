import React from "react";
import classNames from "classnames";

const SelectFields = ({ text, error, options, ...restProps }) => {
  if(!options ||  !options.length){
      return <h4 className="is-invalid"> options array  of key value pair is required ... </h4>
  }  
  let suggestion = options.map(option => {
    return (
      <option name={option.value} value={option.value}>
        {option.key}
      </option>
    );
  });

  return (
    <div className="form-group">
      <select class={classNames("form-control form-control-lg",{"is-invalid":error})} {...restProps}>
        {suggestion}
      </select>

      {error && <dev className="invalid-feedback">{error}</dev>}
      {text && (
        <small className="form-text text-muted">
          This site uses Gravatar so if you want a profile image, use a Gravatar
          email
        </small>
      )}
    </div>
  );
};

export default SelectFields;
