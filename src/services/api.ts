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

export const getSurvey = async (surveyId: string): Promise<any> => {
  try {
    const res = await instance.get(`/survey/${surveyId}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
