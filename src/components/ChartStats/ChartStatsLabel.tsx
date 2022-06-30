import { FC } from "react";
import "./ChartStatsLabel.css";

export const ChartStatsLabel: FC = ({children}) => {
  return <span className="chart-stats__label">{children}</span>
}
