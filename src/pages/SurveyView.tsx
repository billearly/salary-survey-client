import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components";
import { PayChart } from "../components/Chart/PayChart";
import { getSurvey, PaySchedule, Survey } from "../services/api";

export const SurveyView = () => {
  const { surveyId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [survey, setSurvey] = useState<Survey>();

  useEffect(() => {
    if (surveyId) {
      getSurvey(surveyId).then((survey) => {
        setIsLoading(false);
        setSurvey(survey);
      });
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
        myRespondentId={"kxMvSBjuZ_CtXjp3HyBJP"}
      />

      {isLoading && <Spinner />}
    </>
  );
};
