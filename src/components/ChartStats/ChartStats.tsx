import { FC } from "react";
import "./ChartStats.css";

export const ChartStats: FC = ({ children }) => {
  return (
    <div className="chart-stats">
      {children}
    </div>
  )
}
