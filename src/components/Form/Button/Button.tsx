import { ReactNode } from "react";
import { Spinner } from "../../Spinner/Spinner";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  isSubmitting?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, isSubmitting, ...buttonHtmlAttributes }: ButtonProps) => {
  return (
    <button {...buttonHtmlAttributes}>
      {isSubmitting
        ? <Spinner />
        : children
      }
    </button>
  )
}
