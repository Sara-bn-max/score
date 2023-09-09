import React from "react";
import "../inputField/inputFieldStyle.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function TextareaField({
  disabled,
  type,
  inputName,
  required,
  value,
  placeholder,
  onChange,
  labelTxt,
  autocomplete,
  className
}) {
  return (
    <div className={`inputContainer ${className}`}>
      <div className="flex flex-row">
        <label className="sport-label">
          {labelTxt ? labelTxt : placeholder}
        </label>
      </div>
      <textarea
        rows="3"
        autocomplete={autocomplete}
        className="sport-textArea"
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
