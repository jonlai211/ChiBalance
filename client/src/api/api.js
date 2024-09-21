import axios from 'axios'

export const defaultPatientData = {
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

export const defaultPatientDiagnosisAndObservation = {
    observations: ["aaaaa", 'bbbbb', 'cccccc', 'ddddd'],
    diagnosis: ["1111", '2222', '3333', '4444']
}

// image properties
// patient name
// patient age
// ten questions answers
export const createImage = async (req) => {
    console.log("Image creation request received", req)
    console.log("Image patient name", req.name)
    console.log("Image patient age", req.age)
    console.log("Image patient answers", req.answers)
    try {
        const res = axios.post(
            'http://localhost:4000/uploadimage',
            {
                patientName: req.name,
                patientAge: req.age,
                patientAnswers: req.answers
            }
        ),
        return res
    } catch (e){
        console.error("Error uploading the file", e.response.data)
        return e;
    }
}

