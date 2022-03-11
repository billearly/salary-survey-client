import { PaySchedule, SurveyResponse } from "../services/api";

type GroupedPay = Map<number, number>;

type PayChartData = {
  x: number;
  y: number;
  r: number;
  isMyPay?: boolean;
};

/**
 * Translate one pay schedule into another
 *
 * Yearly to Hourly, Monthly to By-Weekly, etc.
 */
export const normalizePay = (
  response: SurveyResponse,
  schedule: PaySchedule
): number => {
  let yearly: number = 0;

  switch (response.schedule) {
    case PaySchedule.HOURLY:
      yearly = response.pay * 40 * 52;
      break;

    case PaySchedule.WEEKLY:
      yearly = response.pay * 52;
      break;

    case PaySchedule.EVERY_OTHER_WEEK:
      yearly = response.pay * 26;
      break;

    case PaySchedule.TWICE_A_MONTH:
      yearly = response.pay * 24;
      break;

    case PaySchedule.MONTHLY:
      yearly = response.pay * 12;
      break;

    case PaySchedule.YEARLY:
      yearly = response.pay;
      break;
  }

  switch (schedule) {
    case PaySchedule.HOURLY:
      return yearly / 52 / 40;

    case PaySchedule.WEEKLY:
      return yearly / 52;

    case PaySchedule.EVERY_OTHER_WEEK:
      return yearly / 26;

    case PaySchedule.TWICE_A_MONTH:
      return yearly / 24;

    case PaySchedule.MONTHLY:
      return yearly / 12;

    case PaySchedule.YEARLY:
      return yearly;
  }
};

/**
 * Groups pay into pay bands and how many respondents have that pay
 * For example [12, 15, 15, 16] becomes { 12: 1, 15: 2, 16: 1}
 */
export const groupPay = (allPay: number[]): GroupedPay => {
  const groupedResponses: GroupedPay = new Map();
  allPay.forEach((pay) => {
    if (groupedResponses.has(pay)) {
      const currentVal = groupedResponses.get(pay) as number; // It clearly exists
      groupedResponses.set(pay, currentVal + 1);
    } else {
      groupedResponses.set(pay, 1);
    }
  });

  return groupedResponses;
};

export const toChartData = (
  groupedPay: GroupedPay,
  responses: SurveyResponse[],
  myRespondentId?: string
): PayChartData[] => {
  const chartData: PayChartData[] = [];

  groupedPay.forEach((numRespondentsWithPay, pay) => {
    chartData.push({
      x: pay,
      y: 0,
      r: 5 * numRespondentsWithPay,
      isMyPay:
        responses.find((response) => response.respondentId === myRespondentId)
          ?.pay === pay,
    });
  });

  return chartData;
};

export const toCurrency = (
  pay: string | number,
  local: string,
  currency: string
) => {
  return pay.toLocaleString(local, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
};
