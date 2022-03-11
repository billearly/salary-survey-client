import { FC, ReactNode } from "react";
import "./Header.css";

type HeaderProps = {
  children: ReactNode;
};

export const Header: FC<HeaderProps> = ({ children }) => {
  return <header>{children}</header>;
};
