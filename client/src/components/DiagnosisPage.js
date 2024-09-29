import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import '../styles/DiagnosisPage.css';

const DiagnosisPage = () => {
  const [observation, setObservation] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const history = useHistory();

  const userid = location.state?.userid; // Ensure location.state is available
  console.log(userid);

  useEffect(() => {
    const getDiagnosis = async () => {
      try {
        const res = await axios.post("http://localhost:4000/diagnosis", { userid });
        const jsonstring = res.data.slice(8).slice(0, -3);
        console.log(jsonstring)
        const data = JSON.parse(jsonstring);
        console.log(data)
        setRecommendation(data.recommendation);
        setDiagnosis(data.diagnosis);
        setObservation(data.observation);
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
        <div className="header">
            <h1>Analysis</h1>
            <h2>
                Below is the analysis of your health condition
            </h2>
        </div>
        {/* <div className="header">
            <div className="subpart"> Patient Name: {name}</div>
            <div className="subpart">Patient Age: {age}</div>
        </div> */}
        <div className="content">
          <div className='recommend'>
            {recommendation ? (
              <>
              <h2>Recommendation</h2>
              <p>{recommendation}</p>
              </>
            ):(
              <p>
                 No recommendations available.
              </p>
            )}
          </div>
          <div className="observation_block">
            <div className="patient-analyze">
              {/*<ul>*/}
              {/*  {observation?.length > 0 ? (*/}
              {/*    observation.map((obs, index) => <li key={index}>{obs}</li>)*/}
              {/*  ) : (*/}
              {/*    <li>No observations available.</li>*/}
              {/*  )}*/}
              {/*</ul>*/}
              {observation ? (
                <>
                  <h2>Observation</h2>
                  <p> {observation} </p>
                  </>
              ) : (
                  <p> No observations available.</p>
              )}
            </div>
            <div className="patient-analyze">
              {/*<ul>*/}
              {/*  {diagnosis?.length > 0 ? (*/}
              {/*    diagnosis.map((diag, index) => <li key={index}>{diag}</li>)*/}
              {/*  ) : (*/}
              {/*    <li>No diagnosis available.</li>*/}
              {/*  )}*/}
              {/*</ul>*/}
              {diagnosis ? (
                <>
                  <h2>Diagnosis</h2>
                  <p> {diagnosis} </p>
                </>
                  
              ) : (
                  <p> No diagnosis available.</p>
              )}
            </div>
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
