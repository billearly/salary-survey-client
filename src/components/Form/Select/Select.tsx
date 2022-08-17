import { ReactNode } from "react";
import "./Select.css";

type SelectProps = {
  children: ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({ children, ...selectHtmlAttributes }: SelectProps) => {
  return <select {...selectHtmlAttributes}>{children}</select>
}
