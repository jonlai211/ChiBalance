//TongueAnalysis.js

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

// Main Component
function TongueAnalysis() {
  const [image, setImage] = useState(null); // State to store the selected image
  const [analysisResults, setAnalysisResults] = useState(""); // State to store analysis results
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to store error message
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    console.log('Uploaded file:', file); // Debug log for uploaded file
    setImage(file); // Set the image state
  };


  // Handle form submission and send image to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!image) {
      alert('Please upload an image first!');
      return;
    }

    const formData = new FormData(); // Create FormData object to hold the file
    formData.append('file', image); // Append the image file
    console.log('Form data prepared:', formData); // Debug log for form data

    try {
      setLoading(true); // Set loading to true before the request
      const response = await axios.post('http://localhost:4000/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const analysisContent = response.data.analysis.message.content; // Adjusted to match the response structure
      console.log('Analysis:', response);
      setAnalysisResults(analysisContent); // Store analysis results in state

    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Server is not responding, please try again later.'); // Set error message in state
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div>
      <h1>Upload Your Tongue Image</h1>
      <form onSubmit={handleSubmit}>
        <div onClick={() => document.getElementById('fileInput').click()}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Uploaded skin" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          ) : (
            <p>Click here or drag and drop an image to start your analysis</p>
          )}
        </div>
        <input id="fileInput" type="file" onChange={handleImageUpload} accept="image/*" />
        <button type="submit" disabled={!image || loading}>
          {loading ? 'Analyzing...' : 'Start Analysis'}
        </button>
        {error && <div><p>{error}</p></div>}
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        analysisResults && (
          <div>
            <h2>Tongue Analysis Results:</h2>
            <p>{analysisResults}</p>

          </div>
        )
      )}
        </div>
  );
}

export default TongueAnalysis;
