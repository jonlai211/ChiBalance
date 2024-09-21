import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import DiagnosisPage from "./components/DiagnosisPage.js";
import PatientScanPage from "./components/PatientScanPage.js";
import QuestionnairePage from "./components/QuestionnairePage.js";
import InitialPage from "./components/InitialPage.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/diagnosis">
            <DiagnosisPage />
          </Route>
          <Route path="/patientscan">
            <PatientScanPage />
          </Route>
          <Route path="/questionnairepage">
            <QuestionnairePage />
          </Route>
          <Route exact path="/">
            <InitialPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
