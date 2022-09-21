import React, { ChangeEvent } from "react";
import "./RadioButton.css";

type RadioButtonProps = {
  name: string;
  options: Option[]
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'id' | 'name' | 'type'>;

type Option = {
  value: string;
  displayText: string;
}

export const RadioButton = ({ name, options, ...htmlInputAttributes }: RadioButtonProps) => {
  return (
    <div className="radio-button">
      {options.map(({ value, displayText }) => (
        <div key={`${name}- ${value}`}>
          <input
            id={`${name}-${value}`}
            value={value}
            name={name}
            type="radio"
            {...htmlInputAttributes}
          />

          <label
            htmlFor={`${name}-${value}`}
          >
            {displayText}
          </label>
        </div>
      ))}
    </div>
  )
}
