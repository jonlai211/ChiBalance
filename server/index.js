const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios');

const port = 4000

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

app.get('/diagnosis', (req, res)=> {
    console.log(defaultPatientDiagnosisAndObservation)
    res.send(defaultPatientDiagnosisAndObservation)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
  