import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components";
import { PayChart } from "../components/Chart/PayChart";
import { getSurvey, PaySchedule, Survey } from "../services/api";
import { getLocalSurvey } from "../services/localStorage";
import { SurveyInfo } from "../services/localStorage";

export const SurveyView = () => {
  const { surveyId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [survey, setSurvey] = useState<Survey>();
  const [surveyInfo, setSurveyInfo] = useState<SurveyInfo>();

  useEffect(() => {
    if (surveyId) {
      getSurvey(surveyId).then((survey) => {
        setIsLoading(false);
        setSurvey(survey);
      });
    }
  }, [surveyId]);

  useEffect(() => {
    if (surveyId) {
      const localInfo = getLocalSurvey(surveyId);
      setSurveyInfo(localInfo);
    }
  }, [surveyId]);

  return (
    <>
      <h1>Survey Info</h1>

      {survey && (
        <>
          <p>Name: {survey.name}</p>
          <p>Num responses: {survey.responses.length}</p>
        </>
      )}

      <PayChart
        responses={survey?.responses || []}
        schedule={PaySchedule.HOURLY}
        myRespondentId={surveyInfo?.respondentId}
      />

      {isLoading && <Spinner />}
    </>
  );
};
