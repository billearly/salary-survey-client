import { Link } from "react-router-dom";
import {
  BackgroundColor,
  Direction,
  Footer,
  Header,
  IconCard,
  IconCardRow,
  Padding,
  Section
} from "../components";
import { ManHoldingChart, WordOfMouth } from "../img";

export const Home = () => (
  <>
    <Header>
      <div className="main-link-bar">
        <div className="main-link-bar__content">
          <Link to="/">Salary Survey</Link>

          <div className="main-link-bar__content-links">
            <Link to="/about/how-it-works">About</Link>
            <div className="divider" />
            <Link to="/surveys/create">Create</Link>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div>
          <h1>Salary Survey</h1>
          <p>because talking about pay can be awkward...</p>
        </div>
        <WordOfMouth />
      </div>
    </Header>

    <Section direction={Direction.HORIZONTAL} >
      <div>
        <h2>Talk about pay</h2>
        <p>Salary Survey lets you share your compensation with coworkers, friends, or family anonymously. Gain insights into where you stand.</p>
      </div>

      <ManHoldingChart height='20rem' />
    </Section>

    <Section direction={Direction.HORIZONTAL} backgroundColor={BackgroundColor.ALT}>
      <ManHoldingChart height='20rem' />

      <div>
        <h2>Anonymous</h2>
        <p>Share your salary information without identifying youself. No identifying information is collected, you can't even make an account.</p>
      </div>      
    </Section>

    <Section direction={Direction.VERTICAL}>
      <h2>How it works</h2>
      <IconCardRow>
        <IconCard
          icon="Edit3"
          text="Create"
          description="Setup a new survey in a few simple steps"
        />
        <IconCard
          icon="Send"
          text="Share"
          description="Share the unique link with coworkers, family, or friends"
        />
        <IconCard
          icon="Clock"
          text="Wait"
          description="Wait for others to anonymously fill out the survey"
        />
        <IconCard
          icon="BarChart"
          text="View"
          description="Take a look at the results in an easy to understand graph"
        />
      </IconCardRow>
    </Section>

    <Footer />
  </>
);
