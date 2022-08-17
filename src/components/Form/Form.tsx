import { ReactNode } from "react"
import "./Form.css";

type FormProps = {
  children: ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>

type FormRowProps = {
  children: ReactNode;
}

export const Form = ({ children, ...htmlFormAttributes }: FormProps) => {
  return (
    <form {...htmlFormAttributes}>
      {children}
    </form>
  )
}

export const FormRow = ({ children }: FormRowProps) => {
  return <div className="row">{children}</div>
}
