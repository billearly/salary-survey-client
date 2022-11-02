import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Direction, Header, Section, Spinner } from "../components";
import { PayChart } from "../components/Chart/PayChart";
import { ChartStats } from "../components/ChartStats/ChartStats";
import { ChartStatsLabel } from "../components/ChartStats/ChartStatsLabel";
import { ChartStatsValue } from "../components/ChartStats/ChartStatsValue";
import { getSurvey, PaySchedule, Survey } from "../services/api";
import { getLocalSurvey } from "../services/localStorage";
import { SurveyInfo } from "../services/localStorage";
import { toCurrency } from "../utils";
import { ConnectedWorld } from "../img";

export const SurveyView = () => {
  const { surveyId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [survey, setSurvey] = useState<Survey>();
  const [surveyInfo, setSurveyInfo] = useState<SurveyInfo>();

  // States for errors
  const [isNotEnoughResponses, setIsNotEnoughResponses] = useState<boolean>(false);
  const [numAdditionalResponsesNeeded, setNumAdditionalResponsesNeeded] = useState<number>(0);

  useEffect(() => {
    if (surveyId) {
      getSurvey(surveyId).then((survey) => {
        setSurvey(survey);

        // TODO: Better handlng of undefined survey
        if (survey && survey.responses.length < survey.minNumberResponses) {
          setIsNotEnoughResponses(true);
          setNumAdditionalResponsesNeeded(survey.minNumberResponses - survey.responses.length)
        }

        setIsLoading(false);
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

  const additionalResponsesText = useMemo(() => {
    return numAdditionalResponsesNeeded === 1
      ? `1 more response is needed before results are shown`
      : `${numAdditionalResponsesNeeded} more responses are needed before results are shown`;
  }, [numAdditionalResponsesNeeded]);

  return (
    <>
      <Header>
        <h1>Survey Info</h1>
      </Header>

      {isNotEnoughResponses &&
        <Section direction={Direction.VERTICAL}>
          <ConnectedWorld style={{ width: "500px" }} />
          <p>{additionalResponsesText}</p>
        </Section>
      }

      {survey && !isNotEnoughResponses && (
        <>
          <PayChart
            responses={survey?.responses || []}
            schedule={PaySchedule.HOURLY}
            myRespondentId={surveyInfo?.respondentId}
          />

          <ChartStats>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ChartStatsLabel>Name</ChartStatsLabel>
              <ChartStatsValue>{survey.name}</ChartStatsValue>

              <ChartStatsLabel>Number of responses</ChartStatsLabel>
              <ChartStatsValue>{survey.responses.length}</ChartStatsValue>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
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
