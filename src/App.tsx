import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { SurveyCreate, SurveyView } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/surveys">
          <Route path="create" element={<SurveyCreate />}></Route>
          <Route path=":surveyId" element={<SurveyView />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <Link to="/surveys/create">Create Survey</Link>
  </Fragment>
);
const About = () => <p>About</p>;
const Dashboard = () => <p>Dashboard</p>;

export default App;
