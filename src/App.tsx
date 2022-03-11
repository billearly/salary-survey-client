import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SurveyCreate, SurveyJoin, SurveyView } from "./pages";
import "./App.css";
import { Header } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surveys/create" element={<SurveyCreate />} />
        <Route path="/surveys/:surveyId" element={<SurveyView />} />
        <Route path="/surveys/:surveyId/join" element={<SurveyJoin />} />
      </Routes>
    </Router>
  );
}

const Home = () => (
  <Header>
    <h1>Salary Survey</h1>
    <p>Know your worth</p>
    <Link to="/surveys/create">Create Survey</Link>
  </Header>
);
const About = () => <p>About</p>;
const Dashboard = () => <p>Dashboard</p>;

export default App;
