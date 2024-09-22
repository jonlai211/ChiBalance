import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs'; // Added fs import for file handling
import path from 'path';
import multer from 'multer';
import { classify } from './classification.js';
const server = process.env.SERVER || "http://localhost:4000";
const port = process.env.PORT || 4000;
dotenv.config();

console.log('Express app initialized.'); // Log app initialization
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY); // Log OpenAI API Key
console.log('Server:', server);
let questionnaire = "";

// Middleware to handle CORS
const app = express();
app.use(cors());
console.log('CORS middleware enabled.'); // Log CORS middleware

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); // Changed __dirname to process.cwd()
console.log('Static files served from /uploads.'); // Log static file serving

// Set up multer to handle image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save files with a timestamp and original extension
    }
});
const upload = multer({ storage });
console.log('Multer storage configured.'); // Log multer configuration

// Add this line before your routes
app.use(express.json()); // This allows express to parse JSON bodies




// Route to handle image uploads and call the OpenAI API
app.post('/classify', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        console.log('Received file:', file); // Debug log for received file

        if (!file) {
            console.error('No file uploaded'); // Debug log for missing file
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log('File uploaded successfully');

        // Prepare the image URL
        const imageUrl = `${server}/uploads/${file.filename}`; // Adjust this based on your file serving setup

        console.log('Image URL:', imageUrl); // Debug log for image URL

        // Fetch the image and convert to Base64
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const base64ImageUrl = `data:${file.mimetype};base64,${base64Image}`;

        console.log('Base64 Image URL prepared.'); // Log base64 image URL preparation

        // Call the classify function with the Base64 image with csv file in survey folder
        // const analysis = await classify(base64ImageUrl, 'survey/survey_answers.csv');
        // console.log('ANALYSIS:', analysis);
        // Call the classify function with the path of the image
        //tell what questionnaire.txt inside the questionnaire folder
        // const analysis = await classify(base64ImageUrl, fs.readFileSync('1.txt', 'utf8'));
        console.log(fs.readFileSync(path.join(process.cwd(), './questionnaire/1.json'), 'utf8'));
        questionnaire = fs.readFileSync(path.join(process.cwd(), './questionnaire/1.json'), 'utf8');
        const analysis = await classify(base64ImageUrl, questionnaire);
        console.log('ANALYSIS:', analysis);

        // Return the analysis to the frontend
        res.json({ analysis });
        console.log('Analysis sent to frontend.'); // Log analysis response
    } catch (error) {
        console.error('Error during image processing:', error); // Debug log for error
        res.status(500).json({ message: 'Error processing image' });
    }
});

const defaultPatientData = {
    name: 'UserAgent',
    age: 24,
    answers: [
        "Yes",
        "No",
        "No",
        "Yes",
        "OKay",
        "Yes",
        "No",
        "No",
        "Yes",
        "OKay"
    ]
};

const defaultPatientDiagnosisAndObservation = {
    name: defaultPatientData.name,
    age: defaultPatientData.age,
    answers: defaultPatientData.answers,
    observations: ["aaaaa", 'bbbbb', 'cccccc', 'ddddd'],
    diagnosis: ["1111", '2222', '3333', '4444']
};

app.post('/diagnosis', (req, res) => {
    const { userid } = req.body;
    console.log("diagnosis", userid);
    console.log(defaultPatientDiagnosisAndObservation);
    res.send(defaultPatientDiagnosisAndObservation);
});

app.post('/patientscan', (req, res) => {
    const { linkdownload } = req.body;
    console.log("patient scan", linkdownload);
    res.send({ status: "OK" });
});

app.post('/questionnaire', (req, res) => {
    console.log("here!");
    const userid = req.body.userid;
    const formdata = req.body.formData;
    // Ensure the questionnaire directory exists
    if (!fs.existsSync('questionnaire')) {
        fs.mkdirSync('questionnaire'); // Create the directory if it doesn't exist
    }
    fs.writeFileSync('questionnaire/1.json', JSON.stringify(formdata)); // Convert formdata to a string
    console.log(formdata);
    res.send("ok");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
