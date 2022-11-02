import axios, { AxiosError, AxiosPromise } from "axios";

type CreateSurveyPayload = {
  name: string;
  pay: number;
  schedule: string;
  minNumberResponses: number;
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
  minNumberResponses: number;
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
  baseURL: process.env.REACT_APP_SALARY_SURVEY_API_URL,
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
  } catch (e: unknown) {
    console.error(e);
  }
};
