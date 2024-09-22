import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/InitialPage.css";
import {initsvg} from '../api/api.js'

const InitialPage = () => {
  const history = useHistory(); // Initialize navigate
  

  return (
    <div className="initial-container">
      <div className="initial-content">
        <div className="initial-text-section">
          <h1>Welcome to TCM Helper!</h1>
          <p>
            TCM delivers quick and reliable symptom diagnosis, making healthcare
            accessible anytime, anywhere. Trafalgar offers progressive and
            affordable solutions, empowering everyone to manage their health
            effortlessly, whether online or on mobile.
          </p>
          <button
            onClick={() => history.push("/questionnairepage")}
            className="btn"
          >
            Start
          </button>
        </div>
        <div className="initial-image-section">{initsvg}</div>
      </div>
    </div>
  );
};

export default InitialPage;
