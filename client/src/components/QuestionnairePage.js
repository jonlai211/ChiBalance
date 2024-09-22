import React, { useState } from "react";
import "../styles/QuestionnairePage.css";
import { useHistory } from "react-router-dom";
import SHA256 from 'crypto-js/sha256';
import axios from 'axios';
import {questionnaire, defaultQuestionnaire} from '../api/api.js'

const QuestionnairePage = () => {
  const [formData, setFormData] = useState(defaultQuestionnaire);

  const [photoPreview, setPhotoPreview] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "month" || name === "day" || name === "year") {
      setFormData({
        ...formData,
        birthDate: {
          ...formData.birthDate,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // alert("Submitted!");
    const input = formData.name + formData.birthDate + Date.now()
    const userid = SHA256(input).toString();
    console.log(userid)
    console.log(formData)
    try {
        const res = await axios.post("http://localhost:4000/questionnaire", {userid, formData});
    } catch(e) {
        console.error(e)
    }
    history.push('/patientscan', { userid })
  };
  return (
    <div className="container">
      <h1>New Patient Questionnaire</h1>
      <h2>Personal Information</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group birthdateGenderRow">
          <div className="birthdate-container">
            <label>Birth Date (YYYY-MM-DD):</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          <div className="gender-container">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <h2>Health Questions</h2>

        {questionnaire.map(({ question, name, options }) => (
          <div className="form-group" key={name}>
            <label>{question}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="form-group">
          <label>
            (Optional) If you have any additional symptoms that the doctor
            should know about, please describe them:
          </label>
          <textarea
            name="additionalSymptoms"
            value={formData.additionalSymptoms}
            onChange={handleChange}
            placeholder="Describe your additional symptoms..."
            style={{ height: "100px", width: "100%" }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuestionnairePage;
