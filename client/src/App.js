import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DiagnosisPage from './components/DiagnosisPage.js'
import PatientScanPage from './components/PatientScanPage.js'
import QuestionnairePage from './components/QuestionnairePage.js'

function App() {
  return (
   <Route>
    <div className='App'>
      <Switch>
        <Route path="/diagnosis" >
          <DiagnosisPage />
        </Route>
        <Route path="/patientscan" >
          <PatientScanPage/>
        </Route>
        <Route exact path="/" >
          <QuestionnairePage />
        </Route>
      </Switch>
    </div>
   </Route>
  );
}

export default App;
