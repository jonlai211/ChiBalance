const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const { downloadfiledirectory } = require('./downdir.js');
const { predict } = require('./classification.js');

const port = 4000

app.use(bodyParser.json());
const defaultPatientData = {
    name: 'UserAgent',
    age: 24,
    answers:[
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
}

const defaultPatientDiagnosisAndObservation = {
    name: defaultPatientData.name,
    age: defaultPatientData.age,
    answers: defaultPatientData.answers,
    observations: ["aaaaa", 'bbbbb', 'cccccc', 'ddddd'],
    diagnosis: ["1111", '2222', '3333', '4444']
}

const record = {}

app.use(cors())

app.post('/diagnosis', (req, res)=> {
    const { userid } = req.body
    console.log("diagnosis", userid)
    res.send(record[userid] ? record[userid] : {} )
})

app.post('/predict_face', (req, res) => {
    console.log(downloadfiledirectory)
    const { linkdownload } = req.body;  // Image path from the frontend

    exec(`python3 src/predict.py ${downloadfiledirectory}${linkdownload}`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).send('Error occurred while executing Python script');
        }

        if (stderr) {
            console.error(`Script error output: ${stderr}`);
        }

        console.log(`Python script output: ${stdout}`);

        // Assuming stdout contains the prediction results in JSON format
        const predictions = JSON.parse(stdout);
        const descriptions = predictions.map(prediction => `${prediction.object} ${prediction.description}`);

        const combinedDescription = descriptions.join(" ");
        console.log(`Combined Observation Description: ${combinedDescription}`);

        try {
            const gptResponse = await predict(combinedDescription);
            res.send({ diagnosis: gptResponse });
            console.log(`Response: ${gptResponse}`);
        } catch (apiError) {
            console.error(`Error calling API: ${apiError.message}`);
            res.status(500).send('Error occurred while calling API');
        }
    });
});
  

app.post('/patientscan', async (req, res)=> {
    const { userid, linkdownload } = req.body
    console.log("patient scan", userid, linkdownload)
    try {
        const eye_condition = await axios.post(`http://localhost:${port}/predict_face`, { linkdownload })
        console.log(eye_condition.data)
        res.send({status: "OK"})
    }catch(e){
        console.error(e)
    }

})

app.post('/questionnaire', (req, res)=>{
    console.log("here!")
    const userid = req.body.userid
    const user = record[userid] ? record[userid] : {}
    const formdata = req.body.formData
    user["formdata"] = formdata
    console.log(formdata)
    res.send("ok")
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
