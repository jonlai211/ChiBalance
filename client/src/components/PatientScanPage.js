import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/PatientScanPage.css";

const PatientScanPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false); // Capture state
  const [imageSrc, setImageSrc] = useState(null); // Store captured image data

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };

  const history = useHistory();

  const downloadImage = (dataURL) => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "captured-image.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const takePicture = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    // Set canvas dimensions to match the video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to an image (Data URL)
    const dataURL = canvas.toDataURL("image/png");
    setImageSrc(dataURL); // Store the captured image data

    // Automatically download the captured image
    downloadImage(dataURL);

    // Stop the camera
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    video.srcObject = null; // Clear the video source

    // Update the state to indicate that the picture has been captured
    setIsCaptured(true);
  };

  useEffect(() => {
    initCamera();
  }, []);

  return (
    <div className="container">
      <h1 style={{ top: "20px", right: "20px" }}>Camera Capture</h1>
      <div className="video-container">
        {isCaptured ? (
          <>
            {imageSrc && (
              <img src={imageSrc} alt="Captured" style={{ width: "100%" }} />
            )}
            <button onClick={() => history.go(0)} className="btn">
              Retry
            </button>
            <button onClick={() => history.push("/diagnosis")} className="btn">
              Next
            </button>
          </>
        ) : (
          <>
            <video ref={videoRef} autoPlay className="video" />
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <div className="guideline"></div>
            <button onClick={takePicture} className="btn">
              Take Picture
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientScanPage;
