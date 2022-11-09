import Chart, { TooltipItem, TooltipModel } from "chart.js/auto";
import { FC, useEffect, useRef } from "react";
import { PaySchedule, SurveyResponse } from "../../services/api";
import {
  groupPay,
  normalizePay,
  PayChartData,
  setBubbleColor,
  setLabelText,
  toChartData,
  toCurrency,
} from "../../utils";
import "./PayChart.css";

type PayChartProps = {
  responses: SurveyResponse[];
  schedule: PaySchedule;
};

export const PayChart: FC<PayChartProps> = ({
  responses,
  schedule,
}) => {
  const chartRoot = useRef<HTMLCanvasElement>(null);

  const normalizedPay = responses.map((res) => normalizePay(res, schedule));
  const groupedResponses = groupPay(normalizedPay);
  const chartData = toChartData(groupedResponses, responses);

  useEffect(() => {
    const data = {
      datasets: [
        {
          label: "Salary",
          data: chartData,
        },
      ],
    };

    let chart: Chart<"bubble", PayChartData[], unknown>;

    if (chartRoot.current && data && responses.length > 0) {
      chart = new Chart(chartRoot.current, {
        type: "bubble",
        data: data,
        options: {
          backgroundColor: setBubbleColor,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                label: function (
                  this: TooltipModel<"bubble">,
                  tooltipItem: TooltipItem<"bubble">
                ) {
                  return setLabelText(this, tooltipItem);
                },
              },
            },
          },
          scales: {
            xAxis: {
              display: true,
              ticks: {
                callback: (value, index, ticks) => {
                  return toCurrency(value, "en-US", "USD");
                },
              },
            },
            yAxis: {
              display: false
            },
          },
        },
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    }
  }, [chartRoot, chartData, responses]);

  return (
    <div className="pay-chart">
      <canvas
        id="pay-chart"
        ref={chartRoot}
      ></canvas>
    </div>
  );
};
