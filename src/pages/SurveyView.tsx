import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components";
import { getSurvey } from "../services/api";

export const SurveyView = () => {
  const { surveyId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [survey, setSurvey] = useState<any>();

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
          <p>Creator: {survey.creatorId}</p>
          <p>Num responses: {survey.responses.length}</p>
        </>
      )}

      {isLoading && <Spinner />}
    </>
  );
};
