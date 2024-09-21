import logo from './logo.svg';
import './styles/App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DiagnosisPage from './components/DiagnosisPage.js'
import PatientScanPage from './components/PatientScanPage.js'
import QuestionnairePage from './components/QuestionnairePage.js'

function App() {
  return (
   <div className='container'>
      <DiagnosisPage />
   </div>
  );
}

export default App;
