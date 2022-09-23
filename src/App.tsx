import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SurveyCreate, SurveyJoin, SurveyView } from "./pages";
import "./App.css";

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

export default App;
