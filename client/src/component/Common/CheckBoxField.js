import React from "react";

const CheckBoxField = ({
    label,
    ...restProps
}) => {
  return (
    <div class="form-check mb-4">
      <input
        class="form-check-input"
        type="checkbox"
        {...restProps}
      />
      <label class="form-check-label" for="current">
        {label}
      </label>
    </div>
  );
};

export default CheckBoxField;
