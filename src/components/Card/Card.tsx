import { ReactNode } from "react";
import "./Card.css";

type CardProps = {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return <div className="card">{children}</div>
}
