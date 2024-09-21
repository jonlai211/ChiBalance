import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios'

const PatientScanPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCaptured, setIsCaptured] = useState(false); // Capture state
    const [imageSrc, setImageSrc] = useState(null); // Store captured image data
    const [linkdownload, setLinkDownload] = useState("");
    
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
    console.log(userid)

    const downloadImage = (dataURL) => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = dataURL;
        const download = `${userid+Date.now()}.png`;
        setLinkDownload(download)
        link.download = download
        
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
        setImageSrc(dataURL); // Store the captured image data

        // Automatically download the captured image
        downloadImage(dataURL);

        // Stop the camera
        const stream = video.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        video.srcObject = null; // Clear the video source

        // Update the state to indicate that the picture has been captured
        setIsCaptured(true);
    };

    const submitPicture = async () => {
        const res = await axios.post("http://localhost:4000/patientscan", { linkdownload })
        history.push('/diagnosis', {userid: userid})
    }

    useEffect(() => {
        initCamera();
    }, []);


    return (
        <div>
            <h1>Camera Capture</h1>

            {isCaptured ? (
                <>
                    {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: '100%' }} />}
                    <button onClick={() => history.go(0)} className="btn">
                        Retry
                    </button>
                    <button onClick={submitPicture} className="btn">
                        Next
                    </button>
                </>
            ) : (
                <>
                    <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
                    <button onClick={takePicture}>Take Picture</button>
                </>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default PatientScanPage;
