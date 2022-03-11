import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../components";
import { joinSurvey, PaySchedule } from "../services/api";
import { payScheduleValues } from "../utils/payScheduleValues";

/**
 * Make sure the survey actually exists
 * Save info to local storage
 * Detect if I've already responded
 */
export const SurveyJoin = () => {
  const { surveyId } = useParams();

  const [pay, setPay] = useState<string>("");
  const [schedule, setSchedule] = useState<string>(PaySchedule.HOURLY);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [respondentId, setRespondentId] = useState<string>();

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
      setRespondentId(data.respondentId);
    }
  };

  return (
    <>
      <h1>Join Survey</h1>

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
