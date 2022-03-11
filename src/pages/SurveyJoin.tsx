import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../components";
import { getSurvey, joinSurvey, PaySchedule } from "../services/api";
import { getLocalSurvey, saveSurveyLocally } from "../services/localStorage";
import { payScheduleValues } from "../utils/payScheduleValues";

enum ResponseStatus {
  UNKNOWN = "UNKNOWN",
  ALREADY_RESPONDED = "ALREADY_RESPONDED",
  SURVEY_ID_DOESNT_EXIST = "SURVEY_ID_DOESNT_EXIST",
  SURVEY_DOESNT_EXIST = "SURVEY_DOESNT_EXIST",
  CAN_RESPOND = "CAN_RESPOND",
}

export const SurveyJoin = () => {
  const { surveyId } = useParams();

  const [pay, setPay] = useState<string>("");
  const [schedule, setSchedule] = useState<string>(PaySchedule.HOURLY);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [respondentId, setRespondentId] = useState<string>();
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(
    ResponseStatus.UNKNOWN
  );

  const checkAbilityToRepond = async () => {
    if (!surveyId) {
      setResponseStatus(ResponseStatus.SURVEY_ID_DOESNT_EXIST);
      return;
    }

    const surveyInfo = getLocalSurvey(surveyId);
    if (surveyInfo) {
      setResponseStatus(ResponseStatus.ALREADY_RESPONDED);
      return;
    }

    const survey = await getSurvey(surveyId);
    if (!survey) {
      setResponseStatus(ResponseStatus.SURVEY_DOESNT_EXIST);
      return;
    }

    setResponseStatus(ResponseStatus.CAN_RESPOND);
  };

  useEffect(() => {
    (async () => {
      await checkAbilityToRepond();
    })();
  }, [surveyId]);

  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPay(e.target.value);
  };

  const handleScheduleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSchedule(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!surveyId || !pay || !schedule) {
      return;
    }

    setIsSubmitting(true);

    const data = await joinSurvey(surveyId, {
      pay: Number(pay),
      schedule,
    });

    setIsSubmitting(false);

    if (data) {
      saveSurveyLocally({
        surveyId,
        respondentId: data.respondentId,
      });

      setRespondentId(data.respondentId);
    }
  };

  return (
    <>
      <h1>Join Survey</h1>

      {responseStatus === ResponseStatus.CAN_RESPOND && (
        <form onSubmit={handleSubmit}>
          <label>Pay</label>
          <input value={pay} onChange={handlePayChange} />

          <label>Schedule</label>
          <select value={schedule} onChange={handleScheduleChange}>
            {payScheduleValues().map((val) => (
              <option value={val}>{val.toString()}</option>
            ))}
          </select>

          <button>Submit</button>
        </form>
      )}

      {responseStatus === ResponseStatus.SURVEY_ID_DOESNT_EXIST && (
        <p>Survey ID doesn't exist</p>
      )}

      {responseStatus === ResponseStatus.SURVEY_DOESNT_EXIST && (
        <p>Survey doesn't exist in the backend</p>
      )}

      {responseStatus === ResponseStatus.ALREADY_RESPONDED && (
        <p>You've already responded to this survey</p>
      )}

      {responseStatus === ResponseStatus.UNKNOWN && (
        <>
          <p>Checking on ability to repond</p>
          <Spinner />
        </>
      )}

      {isSubmitting && <Spinner />}

      {respondentId && (
        <>
          <p>Success!</p>
          <Link to={`/surveys/${surveyId}`}>View Results</Link>
        </>
      )}
    </>
  );
};
