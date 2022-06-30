import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Spinner } from "../components";
import { PayChart } from "../components/Chart/PayChart";
import { ChartStats } from "../components/ChartStats/ChartStats";
import { ChartStatsLabel } from "../components/ChartStats/ChartStatsLabel";
import { ChartStatsValue } from "../components/ChartStats/ChartStatsValue";
import { getSurvey, PaySchedule, Survey } from "../services/api";
import { getLocalSurvey } from "../services/localStorage";
import { SurveyInfo } from "../services/localStorage";
import { toCurrency } from "../utils";

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

  // Load up my respondent ID from local storage
  useEffect(() => {
    if (surveyId) {
      const localInfo = getLocalSurvey(surveyId);
      setSurveyInfo(localInfo);
    }
  }, [surveyId]);

  const myResponseValue = useMemo(() => {
    if (survey && surveyInfo) {
      return survey.responses.find(r => r.respondentId === surveyInfo.respondentId)?.pay;
    }
  }, [survey, surveyInfo])

  const averagePay = useMemo(() => {
    if (survey && survey.responses.length > 0) {
      return survey.responses.map(r => r.pay).reduce((p, c) => p + c) / survey.responses.length;
    }
  }, [survey])

  return (
    <>
      <Header>
        <h1>Survey Info</h1>
      </Header>

      {survey && (
        <>
          <PayChart
            responses={survey?.responses || []}
            schedule={PaySchedule.HOURLY}
            myRespondentId={surveyInfo?.respondentId}
          />

          <ChartStats>
            <div style={{display: "flex", flexDirection: "column"}}>
              <ChartStatsLabel>Name</ChartStatsLabel>
              <ChartStatsValue>{survey.name}</ChartStatsValue>

              <ChartStatsLabel>Number of responses</ChartStatsLabel>
              <ChartStatsValue>{survey.responses.length}</ChartStatsValue>
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
              <ChartStatsLabel>Your pay</ChartStatsLabel>
              <ChartStatsValue>{toCurrency(myResponseValue, "en-US", "USD")}</ChartStatsValue>

              <ChartStatsLabel>Average pay</ChartStatsLabel>
              <ChartStatsValue>{toCurrency(averagePay, "en-US", "USD")}</ChartStatsValue>
            </div>
          </ChartStats>
        </>
      )}

      {isLoading && <Spinner />}
    </>
  );
};
