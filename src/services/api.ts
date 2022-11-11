import axios from "axios";
import { DateTime } from "luxon";

type CreateSurveyPayload = {
  name: string;
  pay: number;
  schedule: string;
  minNumberResponses: number;
};

type CreateSurveyResponse = {
  surveyId: string;
  respondentId: string;
  expirationDate: DateTime;
};

type JoinSurveyPayload = {
  pay: number;
  schedule: string;
};

type JoinSurveyResponse = {
  respondentId: string;
  expirationDate: DateTime;
};

export type Survey = {
  name: string;
  minNumberResponses: number;
  responses: SurveyResponse[];
};

export type SurveyResponse = {
  isMyResponse: boolean;
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

    return {
      ...res.data,
      expirationDate: DateTime.fromISO(res.data.expirationDate).toUTC()
    } as CreateSurveyResponse;
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

    return {
      ...res.data,
      expirationDate: DateTime.fromISO(res.data.expirationDate).toUTC()
    } as JoinSurveyResponse;
  } catch (e) {
    console.log(e);
  }
};

export const getSurvey = async (
  surveyId: string,
  myRespondentId?: string
): Promise<Survey | undefined> => {
  try {
    const res = await instance.get(`/survey/${surveyId}`, {
      headers: {
        ...(myRespondentId ? { "X-Respondent-ID": myRespondentId } : {})
      }
    });

    return {
      ...res.data,
      creationDate: DateTime.fromISO(res.data.creationDate).toUTC(),
      expirationDate: DateTime.fromISO(res.data.expirationDate).toUTC()
    } as Survey;
  } catch (e: unknown) {
    console.error(e);
  }
};
