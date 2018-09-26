import React from "react";

const DateField = ({
    ...restProps
}) => {
  return (
    <div class="form-group">
    <input
      type="date"
      class="form-control form-control-lg"
      {...restProps}
    />
  </div>
  );
};

export default DateField;
