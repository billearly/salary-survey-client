import { PaySchedule } from "../services/api";

// This is weird, not a fan
export const payScheduleValues = () => {
  return Object.values(PaySchedule).map((val) => val);
};
