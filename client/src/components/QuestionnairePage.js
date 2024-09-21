import React, { useState } from "react";
import styles from "../styles/Detail.module.css"; // 스타일 추가

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
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
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
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

        <label>
          Symptoms:
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Describe your symptoms..."
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Questionnaire;
