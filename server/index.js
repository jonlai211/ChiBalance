const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser');

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
app.use(cors())

app.post('/diagnosis', (req, res)=> {
    const { userid } = req.body
    console.log("diagnosis", userid)
    console.log(defaultPatientDiagnosisAndObservation)
    res.send(defaultPatientDiagnosisAndObservation)
})

app.post('/patientscan', (req, res)=> {
    const { linkdownload } = req.body
    console.log("patient scan", linkdownload)
    res.send({status: "OK"})
})

app.post('/questionnaire', (req, res)=>{
    console.log("here!")
    const userid = req.body.userid
    const formdata = req.body.formData
    console.log(formdata)
    res.send("ok")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
  