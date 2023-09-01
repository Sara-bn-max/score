import React from "react";
import "./inputFieldStyle.css";

export default function InputField({
  disabled,
  type,
  inputName,
  required,
  value,
  placeholder,
  onChange,
  name,
  labelTxt,
}) {
  return (
    <div className="inputContainer">
      <div className="flex flex-row">
        <label className="sport-label">
          {labelTxt ? labelTxt : placeholder}
        </label>
      </div>
      <input
        className="sport-input"
        label={placeholder}
        placeholder={placeholder}
        type={type}
        name={inputName}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}