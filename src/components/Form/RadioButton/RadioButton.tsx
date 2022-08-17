import React, { ChangeEvent } from "react";
import "./RadioButton.css";

type RadioButtonProps = {
  name: string;
  options: {[key: string]: string};
} & React.InputHTMLAttributes<HTMLInputElement>;

export const RadioButton = ({ name, options, ...htmlInputAttributes }: RadioButtonProps) => {
  return (
    <div className="radio-button">
      {Object.entries(options).map(([key, value]) => (
        <div>
          <input
            id={`${name}-${key}`}
            value={value}
            name={name}
            type="radio"
            {...htmlInputAttributes}
          />

          <label
            htmlFor={`${name}-${key}`}
          >
            {key}
          </label>
        </div>
      ))}
    </div>
  )
}
