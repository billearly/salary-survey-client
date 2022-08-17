import { FC, ReactNode } from "react"
import { Link } from "react-router-dom";
import { Footer } from "../components";
import "./MainLayout.css";

type MainLayoutProps = {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-link-bar">
        <div className="main-link-bar__content">
          <Link to="/">Salary Survey</Link>

          <div className="main-link-bar__content-links">
            <Link to="/about/how-it-works">About</Link>
            <div className="divider" />
            <Link to="/surveys/create">Create</Link>
          </div>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  )
}