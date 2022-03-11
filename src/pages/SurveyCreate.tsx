import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../components";
import { createSurvey, PaySchedule } from "../services/api";
import { saveSurveyLocally } from "../services/localStorage";
import { payScheduleValues } from "../utils/payScheduleValues";

export const SurveyCreate = () => {
  const [name, setName] = useState<string>("");
  const [pay, setPay] = useState<string>("");
  const [schedule, setSchedule] = useState<string>(PaySchedule.HOURLY);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [surveyId, setSurveyId] = useState<string>();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPay(e.target.value);
  };

  const handleScheduleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSchedule(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !pay || !schedule) {
      return;
    }

    setIsSubmitting(true);

    const data = await createSurvey({
      name,
      pay: Number(pay),
      schedule,
    });

    setIsSubmitting(false);

    if (data) {
      saveSurveyLocally({
        surveyId: data.surveyId,
        respondentId: data.respondentId,
      });

      setSurveyId(data.surveyId);
    }
  };

  const copyToClipboard = (content: string) => {
    if (window.navigator) {
      window.navigator.clipboard.writeText(content);
    }
  };

  return (
    <>
      <h1>Create New Survey</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={name} onChange={handleNameChange} />

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

      {surveyId && (
        <>
          <Link to={`/surveys/${surveyId}`}>View Survey Results</Link>
          <button
            onClick={() => {
              copyToClipboard(
                `${window.location.host}/surveys/${surveyId}/join`
              );
            }}
          >
            Copy Share Link
          </button>
        </>
      )}
    </>
  );
};
