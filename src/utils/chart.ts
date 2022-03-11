import {
  Color,
  ScriptableContext,
  TooltipItem,
  TooltipModel,
} from "chart.js/auto";
import { AnyObject } from "chart.js/types/basic";
import { toCurrency } from "./payTransforms";

export const setBubbleColor = (
  ctx: ScriptableContext<"bubble">,
  options: AnyObject
): Color | undefined => {
  const data = ctx.dataset.data[ctx.dataIndex] as any;
  return data.isMyPay ? "#65c1dc" : "#5ece5e";
};

export const setLabelText = (
  tooltipModel: TooltipModel<"bubble">,
  tooltipItem: TooltipItem<"bubble">
) => {
  let label = toCurrency(tooltipItem.parsed.x, "en-US", "USD");

  const r = tooltipItem.dataset.data[tooltipItem.dataIndex].r;
  const numRespondents = r / 5;

  const data = tooltipItem.dataset.data[tooltipItem.dataIndex] as any;

  // If this is my data denote that
  if (data.isMyPay) {
    label = `${label} - You`;

    // If there are 2 responses
    if (numRespondents === 2) {
      label = `${label} and 1 other person`;
    } else if (numRespondents > 2) {
      label = `${label} and ${numRespondents - 1} other people`;
    }

    return label;
  }

  if (numRespondents > 1) {
    label = `${label} - ${numRespondents} people`;
  }

  return label;
};
