import { Link } from "react-router-dom";
import { Card, Direction, Section } from "../components";
import { Button, Form, FormRow, Input, Label, RadioButton } from "../components/Form";
import { useCreateSurvey } from "../hooks";
import { MainLayout } from "../layout";
import { copyToClipboard } from "../utils";

export const SurveyCreate = () => {
  const {
    title,
    minResponses,
    pay,
    isSubmitting,
    surveyId,
    handleTitleChange,
    handleMinResponsesChange,
    handlePayChange,
    handlePayBlur,
    handleScheduleChange,
    handleSubmit
  } = useCreateSurvey();

  return (
    <MainLayout>
      <Section direction={Direction.VERTICAL}>
        {!surveyId &&
          <Form onSubmit={handleSubmit}>
            <h1>Create New Survey</h1>

            <Card>
              <FormRow>
                <h2>General info</h2>
                <p>Everyone that you send this survey to will see this information</p>
              </FormRow>

              <FormRow>
                <Label htmlFor="title">Title</Label>
                <p>This will seen by everyone that fills out the survey. Don't put in any information that would identify you personally</p>
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="My survey"
                  disabled={isSubmitting}
                  required
                />
              </FormRow>

              <FormRow>
                <Label htmlFor="min-respondents">Minimum number of responses</Label>
                <p>The results won't be shown until a minimum number of people have responded to the survey. This is to keep your information anonymous. The default is 3 but you can make it higher</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    id="min-respondents"
                    type="range"
                    min={3}
                    max={10}
                    value={minResponses}
                    onChange={handleMinResponsesChange}
                    disabled={isSubmitting}
                  />
                  <span style={{ paddingLeft: "1rem" }}>{minResponses}</span>
                </div>
              </FormRow>
            </Card>

            <Card>
              <FormRow>
                <h2>Your info</h2>
                <p>This is your data that will be shared anonymously with everyone else that responds. You are the first person to take the survey!</p>
              </FormRow>

              <FormRow>
                <Label>Pay Schedule</Label>
                <RadioButton
                  name="pay-schedule"
                  options={{
                    hourly: "HOURLY",
                    annually: "ANNUALLY"
                  }}
                  onChange={handleScheduleChange}
                  disabled={isSubmitting}
                  required
                />
              </FormRow>

              <FormRow>
                <Label htmlFor="pay">Pay</Label>
                <Input
                  id="pay"
                  value={pay}
                  min={0}
                  step={0.01}
                  onChange={handlePayChange}
                  onBlur={handlePayBlur}
                  placeholder="30,000"
                  type="number"
                  disabled={isSubmitting}
                  required
                />
              </FormRow>

            </Card>

            <Button
              isSubmitting={isSubmitting}
              disabled={isSubmitting}
            >
              <span>Create</span>
            </Button>
          </Form>
        }

        {surveyId && (
          <Card>
            <h2>Success!</h2>
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
          </Card>
        )}
      </Section>
    </MainLayout>
  );
};
