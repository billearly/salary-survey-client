import Chart, { TooltipItem, TooltipModel } from "chart.js/auto";
import { FC, useEffect, useRef } from "react";
import { PaySchedule, SurveyResponse } from "../../services/api";
import {
  groupPay,
  normalizePay,
  setBubbleColor,
  setLabelText,
  toChartData,
  toCurrency,
} from "../../utils";

type PayChartProps = {
  responses: SurveyResponse[];
  schedule: PaySchedule;
  myRespondentId: string; // this isn't how I should do this. The API should mark which respons is mine. Just for now while testing
};

export const PayChart: FC<PayChartProps> = ({
  responses,
  schedule,
  myRespondentId,
}) => {
  const chartRoot = useRef<HTMLCanvasElement>(null);

  const normalizedPay = responses.map((res) => normalizePay(res, schedule));
  const groupedResponses = groupPay(normalizedPay);
  const chartData = toChartData(groupedResponses, responses, myRespondentId);

  const data = {
    datasets: [
      {
        label: "Salary",
        data: chartData,
      },
    ],
  };

  useEffect(() => {
    if (chartRoot.current && data && responses.length > 0) {
      const chart = new Chart(chartRoot.current, {
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
              display: false,
              min: -0.5,
              max: 0.5,
            },
          },
        },
      });
    }
  }, [chartRoot, data, responses]);

  return (
    <div
      style={{
        width: "500px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        style={{ margin: "50px" }}
        id="pay-chart"
        ref={chartRoot}
      ></canvas>
    </div>
  );
};
