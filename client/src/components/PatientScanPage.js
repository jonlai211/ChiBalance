import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import '../styles/Spinner.css';  // Optional if you want to move the CSS out
import '../styles/PatientScanPage.css';
const styles = {
    spinnerContainer: {
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        border: '8px solid #f3f3f3', /* Light grey */
        borderTop: '8px solid #3498db', /* Blue */
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 1s linear infinite',
    },
};
const Spinner = () => {
    return (
        <div style={styles.spinnerContainer}>
            <div style={styles.spinner}></div>
            <p>Loading...</p>
        </div>
    );
};


const PatientScanPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCaptured, setIsCaptured] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [linkdownload, setLinkDownload] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const initCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing the camera: ", error);
        }
    };

    const location = useLocation();
    const history = useHistory();

    const userid = location.state.userid;
    console.log(userid);

    const downloadImage = (dataURL) => {
        const link = document.createElement('a');
        link.href = dataURL;
        const downloadName = `${userid + Date.now()}.png`;
        setLinkDownload(downloadName);
        link.download = downloadName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const takePicture = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const video = videoRef.current;

        // Set canvas dimensions to match the video stream
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to an image (Data URL)
        const dataURL = canvas.toDataURL('image/png');
        setImageSrc(dataURL);

        // Automatically download the captured image
        downloadImage(dataURL);

        // Stop the camera
        const stream = video.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        video.srcObject = null;

        // Update the state to indicate that the picture has been captured
        setIsCaptured(true);
    };

    const submitPicture = async () => {
        setLoading(true);  // Start loading
        try {
            const res = await axios.post("http://localhost:4000/patientscan", { userid, linkdownload });
        } catch (error) {
            console.error("Error submitting picture:", error);
        } finally {
            setLoading(false);  // Stop loading
            history.push('/diagnosis', { userid, linkdownload });
        }
    };

    useEffect(() => {
        initCamera();
    }, []);

    return (
        <div className="container">
            <h1 style={{ marginTop: "20px" }}>Camera Capture</h1>
            <h2 style={{ marginTop: "20px", textAlign: 'center' }}>Please face front and look at the camera</h2>
            <div className="video-container">
                {isCaptured ? (
                    <>
                        {imageSrc && (
                            <>
                                <img src={imageSrc} alt="Captured" style={{ width: "100%" }} />
                                {/* Conditionally render 'Next' button or loading spinner */}
                                {loading ? (
                                    <p>Submitting...</p>
                                ) : (
                                <>
                                    <button onClick={() => history.go(0)} className="btn">
                                        Retry
                                    </button>
                                    <button onClick={submitPicture} className="btn">
                                        Next
                                    </button>
                                </>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
                        <button onClick={takePicture} className="btn">Take Picture</button>
                    </>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
        </div>
    );
};

export default PatientScanPage;
