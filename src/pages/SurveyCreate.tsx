import { ChangeEvent, FormEvent, useState } from "react";
import { Spinner } from "../components";
import { createSurvey } from "../services/api";

export const SurveyCreate = () => {
  const [name, setName] = useState<string>("");
  const [pay, setPay] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [surveyId, setSurveyId] = useState<string>();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      setSurveyId(data.surveyId);
    }
  };

  return (
    <>
      <h1>Create New Survey</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={name} onChange={handleTitleChange} />

        <label>Pay</label>
        <input value={pay} onChange={handlePayChange} />

        <label>Schedule</label>
        <select value={schedule} onChange={handleScheduleChange}>
          <option value={"HOUR"}>Hourly</option>
          <option value={"SALARY"}>Salary</option>
        </select>

        <button>Submit</button>
      </form>

      {isSubmitting && <Spinner />}

      {surveyId && <p>{surveyId}</p>}
    </>
  );
};
