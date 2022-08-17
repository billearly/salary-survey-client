import React from "react";
import "./Input.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ ...htmlInputAttributes }: InputProps) => {
  return (
    <input {...htmlInputAttributes} />
  )
}
