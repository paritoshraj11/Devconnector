import React from "react";
import classNames from "classnames";

const FileInputField = ({ text, error, ...restProps }) => {
  return (
    <div className="form-group">
      <input
        type="file"
        className={classNames("form-control  form-control-lg", {
          "is-invalid": error
        })}
        {...restProps}
      />
      {error && <dev className="invalid-feedback">{error}</dev>}
      {text && (
        <small className="form-text text-muted">
         Browse File 
        </small>
      )}
    </div>
  );
};

export default FileInputField;
