import React from "react";
import classNames from "classnames";

const InputField = ({ text, error, ...restProps }) => {
  return (
    <div className="form-group">
      <input
        className={classNames("form-control  form-control-lg", {
          "is-invalid": error
        })}
        {...restProps}
      />
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

export default InputField;
