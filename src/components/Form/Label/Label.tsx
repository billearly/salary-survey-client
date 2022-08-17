import { ReactNode } from "react";
import "./Label.css";

type LabelProps = {
  children: ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>

export const Label = ({ children, ...labelHtmlAttributes }: LabelProps) => {
  return <label {...labelHtmlAttributes}>{children}</label>
}
