import { FC } from "react";
import "./ChartStatsValue.css";

export const ChartStatsValue: FC = ({children}) => {
  return <span className="chart-stats__value">{children}</span>
}
