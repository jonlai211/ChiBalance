import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import '../styles/DiagnosisPage.css';

const DiagnosisPage = () => {
  const [observation, setObservation] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const history = useHistory(); 

  const userid = location.state?.userid; // Ensure location.state is available
  console.log(userid);

  useEffect(() => {
    const getDiagnosis = async () => {
      try {
        const res = await axios.post("http://localhost:4000/diagnosis", { userid });
        setName(res.data.name);
        setAge(res.data.age);
        setAnswers(res.data.answers);
        setDiagnosis(res.data.diagnosis);
        setObservation(res.data.observations);
      } catch (e) {
        console.error('Error caught:', e);
      } finally {
        setLoading(false);
      }
    };

    if (userid) {
      getDiagnosis(); // Only fetch if userid is available
    } else {
      setLoading(false); // Handle case where userid is undefined
    }
  }, [userid]);

  if (loading) {
    return (
      <div className='diagnosis-page'>
        <div className="center-item">
          <div className="header">Loading patient data...</div>
          <div className="content">
            <p>Please wait while we fetch the diagnosis information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnosis-page">
      <div className="center-item">
        <div className="header">Patient Name: {name}</div>
        <div className="header">Patient Age: {age}</div>
        <div className="content">
          <div className="patient-diagnosis">
            <strong>Diagnosis:</strong>
            <ul>
              {diagnosis?.length > 0 ? (
                diagnosis.map((diag, index) => <li key={index}>{diag}</li>)
              ) : (
                <li>No diagnosis available.</li>
              )}
            </ul>
          </div>
          <div className="patient-observation">
            <strong>Observations:</strong>
            <ul>
              {observation?.length > 0 ? (
                observation.map((obs, index) => <li key={index}>{obs}</li>)
              ) : (
                <li>No observations available.</li>
              )}
            </ul>
          </div>
          <div className="patient-answers">
            <strong>Answers:</strong>
            <ul>
              {answers?.length > 0 ? (
                answers.map((ans, index) => <li key={index}>{ans}</li>)
              ) : (
                <li>No answers available.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <button onClick={() => history.push("/")} className="wide-btn btn">
        Finish and go back
      </button>
    </div>
  );
};

export default DiagnosisPage;
