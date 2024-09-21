import React, { useState } from "react";
import styles from "../styles/Detail.module.css"; // 스타일 추가

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: {
      month: "",
      day: "",
      year: "",
    },
    gender: "",
    coldHeat: "",
    sweating: "",
    headBodyIssues: "",
    bowelMovements: "",
    diet: "",
    chestAbdomenIssues: "",
    hearingIssues: "",
    thirst: "",
    pastIllnesses: "",
    knownCauses: "",
    additionalSymptoms: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null); // 사진 미리보기 상태 추가

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
    setPhotoPreview(URL.createObjectURL(file)); // 미리보기 URL 설정
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Submitted!");
  };

  return (
    <div className={styles.container}>
      <h2>New Patient Questionnaire</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Birthdate:
          <div style={{ display: "flex", gap: "10px" }}>
            <select
              name="month"
              value={formData.birthDate.month}
              onChange={handleChange}
              required
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="day"
              value={formData.birthDate.day}
              onChange={handleChange}
              required
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={formData.birthDate.year}
              onChange={handleChange}
              required
            >
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={2023 - i} value={2023 - i}>
                  {2023 - i}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label>
          Gender:
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
        </label>

        <h3>Health Questions</h3>

        <label>
          1. Have you experienced any cold or heat sensations?
          <select
            name="coldHeat"
            value={formData.coldHeat}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="cold">Cold</option>
            <option value="hot">Hot</option>
            <option value="normal">Normal</option>
          </select>
        </label>

        <label>
          2. Have you been sweating more than usual?
          <select
            name="sweating"
            value={formData.sweating}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          3. Any issues with your head or body?
          <select
            name="headBodyIssues"
            value={formData.headBodyIssues}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          4. How are your bowel movements?
          <select
            name="bowelMovements"
            value={formData.bowelMovements}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="regular">Regular</option>
            <option value="irregular">Irregular</option>
            <option value="constipation">Constipation</option>
            <option value="diarrhea">Diarrhea</option>
          </select>
        </label>

        <label>
          5. How is your diet?
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="balanced">Balanced</option>
            <option value="unbalanced">Unbalanced</option>
            <option value="restricted">Restricted</option>
          </select>
        </label>

        <label>
          6. Any chest or abdominal issues?
          <select
            name="chestAbdomenIssues"
            value={formData.chestAbdomenIssues}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          7. Have you had any hearing issues?
          <select
            name="hearingIssues"
            value={formData.hearingIssues}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          8. Are you feeling excessively thirsty?
          <select
            name="thirst"
            value={formData.thirst}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          9. Do you have any past illnesses we should know about?
          <select
            name="pastIllnesses"
            value={formData.pastIllnesses}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="known">Known</option>
          </select>
        </label>

        <label>
          10. Are there any known causes for your symptoms?
          <select
            name="knownCauses"
            value={formData.knownCauses}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="known">Known</option>
          </select>
        </label>

        <label>
          If you have any additional symptoms that the doctor should know about,
          please describe them:
          <textarea
            name="additionalSymptoms"
            value={formData.additionalSymptoms}
            onChange={handleChange}
            placeholder="Describe your additional symptoms..."
            style={{ height: "100px", width: "100%" }} // 크기 조절
            required
          />
        </label>

        <label>
          Upload Photo:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {photoPreview && (
          <div style={{ marginTop: "10px" }}>
            <h4>Photo Preview:</h4>
            <img
              src={photoPreview}
              alt="Uploaded"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Questionnaire;
