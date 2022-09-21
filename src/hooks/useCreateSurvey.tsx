import { ChangeEvent, FormEvent, useState } from "react";
import { createSurvey, PaySchedule } from "../services/api";
import { saveSurveyLocally } from "../services/localStorage";

const NUM_RESPONSES_MIN = 3;
const NUM_RESPONSES_MAX = 10;

interface CreateSurvey {
  title: string;
  minResponses: number;
  pay: string;
  schedule: PaySchedule | undefined;

  isSubmitting: boolean;
  surveyId?: string;

  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMinResponsesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePayChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePayBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  handleScheduleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const useCreateSurvey = (): CreateSurvey => {
  const [title, setTitle] = useState<string>("");
  const [minResponses, setMinResponses] = useState<number>(NUM_RESPONSES_MIN);

  const [pay, setPay] = useState<string>("");
  const [schedule, setSchedule] = useState<PaySchedule | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [surveyId, setSurveyId] = useState<string>();


  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleMinResponsesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(e.target.value);
    const newValue = Math.min(Math.max(targetValue, NUM_RESPONSES_MIN), NUM_RESPONSES_MAX);

    setMinResponses(newValue);
  }

  const handlePayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPay(e.target.value);
  };

  const handlePayBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setPay(parseFloat(e.target.value).toFixed(2));
  }

  const handleScheduleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSchedule(PaySchedule[e.target.value as keyof typeof PaySchedule]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !pay || !schedule) {
      return;
    }

    setIsSubmitting(true);

    const data = await createSurvey({
      name: title,
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

  return {
    title,
    minResponses,
    pay,
    schedule,

    isSubmitting,
    surveyId,

    handleTitleChange,
    handleMinResponsesChange,
    handlePayChange,
    handlePayBlur,
    handleScheduleChange,
    handleSubmit,
  };
}
