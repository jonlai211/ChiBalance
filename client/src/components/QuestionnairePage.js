import React, { useState } from "react";
import "../styles/QuestionnairePage.css";
import { useHistory } from "react-router-dom";

const QuestionnairePage = () => {
  const [formData, setFormData] = useState({
    name: "UserAgent",
    birthDate: "1924-01-01",
    gender: "male",
    coldHeat: "cold",
    sweating: "yes",
    headBodyIssues: "yes",
    bowelMovements: "regular",
    diet: "balanced",
    chestAbdomenIssues: "yes",
    hearingIssues: "yes",
    thirst: "yes",
    pastIllnesses: "none",
    knownCauses: "none",
    additionalSymptoms: "",
    photo: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    history.push("/patientscan");
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

        {[
          {
            question: "1. Have you experienced any cold or heat sensations?",
            name: "coldHeat",
            options: ["cold", "hot", "normal"],
            example:
              "Example: Have you felt unusually cold or had a sensation of heat in your body?",
          },
          {
            question: "2. Have you been sweating more than usual?",
            name: "sweating",
            options: ["yes", "no"],
            example:
              "Example: Do you find yourself sweating without any apparent reason, or feeling hotter than usual?",
          },
          {
            question:
              "3. Do you have any discomfort or issues with your head or body?",
            name: "headBodyIssues",
            options: ["yes", "no"],
            example:
              "Example: Are you experiencing headaches, dizziness, or any muscle pain?",
          },
          {
            question:
              "4. How is your bowel health? Are your movements regular?",
            name: "bowelMovements",
            options: ["regular", "irregular", "constipation", "diarrhea"],
            example:
              "Example: Have you been experiencing constipation or diarrhea, or do you feel different from your usual bowel patterns?",
          },
          {
            question:
              "5. Can you describe your diet? What types of food do you usually eat?",
            name: "diet",
            options: ["balanced", "unbalanced", "restricted"],
            example:
              "Example: What foods do you consume daily, and do you have any particular likes or dislikes?",
          },
          {
            question:
              "6. Are you experiencing any discomfort or pain in your chest or abdomen?",
            name: "chestAbdomenIssues",
            options: ["yes", "no"],
            example:
              "Example: Do you feel any tightness in your chest or unusual sensations in your abdomen?",
          },
          {
            question: "7. Have you had any hearing issues?",
            name: "hearingIssues",
            options: ["yes", "no"],
            example:
              "Example: Have you noticed any ringing in your ears or difficulty hearing sounds clearly?",
          },
          {
            question: "8. Are you feeling excessively thirsty?",
            name: "thirst",
            options: ["yes", "no"],
            example:
              "Example: Do you find yourself needing to drink more water than usual, or experiencing frequent thirst?",
          },
          {
            question:
              "9. Do you have any past illnesses that we should be aware of?",
            name: "pastIllnesses",
            options: ["none", "known"],
            example:
              "Example: Have you had any serious illnesses in the past, or are you currently taking any medications?",
          },
          {
            question: "10. Are there any known causes for your symptoms?",
            name: "knownCauses",
            options: ["none", "known"],
            example:
              "Example: Have you been under significant stress recently, or noticed symptoms appearing after eating certain foods?",
          },
        ].map(({ question, name, options }) => (
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
