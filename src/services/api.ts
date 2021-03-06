import axios from "axios";

type CreateSurveyPayload = {
  name: string;
  pay: number;
  schedule: string;
};

type CreateSurveyResponse = {
  surveyId: string;
  respondentId: string;
};

type JoinSurveyPayload = {
  pay: number;
  schedule: string;
};

type JoinSurveyResponse = {
  respondentId: string;
};

export type Survey = {
  name: string;
  responses: SurveyResponse[];
};

export type SurveyResponse = {
  respondentId: string;
  pay: number;
  schedule: PaySchedule;
};

export enum PaySchedule {
  HOURLY = "HOURLY", // * 40 * 52
  WEEKLY = "WEEKLY", // * 52
  EVERY_OTHER_WEEK = "EVERY_OTHER_WEEK", // * 26
  TWICE_A_MONTH = "TWICE_A_MONTH", // * 24
  MONTHLY = "MONTHLY", // * 12
  YEARLY = "YEARLY", // * 1
}

const instance = axios.create({
  baseURL: "/prod", // In order to get around CORS issues locally... this needed to be shorted, and then 'proxy' was added to package.json
  timeout: 30000,
});

export const createSurvey = async (
  data: CreateSurveyPayload
): Promise<CreateSurveyResponse | undefined> => {
  try {
    const res = await instance.post("/survey/create", data);
    return res.data as CreateSurveyResponse;
  } catch (e) {
    console.log(e);
  }
};

export const joinSurvey = async (
  surveyId: string,
  data: JoinSurveyPayload
): Promise<JoinSurveyResponse | undefined> => {
  try {
    const res = await instance.post(`survey/${surveyId}/join`, data);
    return res.data as JoinSurveyResponse;
  } catch (e) {
    console.log(e);
  }
};

export const getSurvey = async (
  surveyId: string
): Promise<Survey | undefined> => {
  try {
    const res = await instance.get(`/survey/${surveyId}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
