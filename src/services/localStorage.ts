export type SurveyInfo = {
  surveyId: string;
  respondentId: string;
};

const SURVEY_PREFIX = "survey-id";

export const saveSurveyLocally = (survey: SurveyInfo): boolean => {
  if (window.localStorage) {
    window.localStorage.setItem(
      `${SURVEY_PREFIX}-${survey.surveyId}`,
      JSON.stringify(survey)
    );

    return true;
  }

  return false;
};

export const getLocalSurvey = (surveyId: string): SurveyInfo | undefined => {
  if (window.localStorage) {
    const surveyInfo = window.localStorage.getItem(
      `${SURVEY_PREFIX}-${surveyId}`
    );

    if (surveyInfo) {
      return JSON.parse(surveyInfo);
    }
  }
};
