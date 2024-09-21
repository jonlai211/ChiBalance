import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/DiagnosisPage.css';

const DiagnosisPage = () => {
    const [observation, setObservation] = useState([])
    const [diagnosis, setDiagnosis] = useState([])
    const [name, setName] = useState('')
    const [age,setAge] = useState(18)
    const [answers, setAnswers] = useState([])
    
    useEffect(()=> {
        const getDiagnosis = async () => {
            try {
                const res = await axios.get("http://localhost:4000/diagnosis");
                console.log(res.data)
                setName(res.data.name)
                setAge(res.data.age)
                setAnswers(res.data.answers)
                setDiagnosis(res.data.diagnosis)
                setObservation(res.data.observations)
                console.log(observation)
            } catch(e){
                console.log('error catched', e)
            }
        }
        getDiagnosis();
    }, [])

    return (
        <div className='diagnosis-page'>
            <div className="center-item">
                <div className="header">
                    Patient Name: { name }
                </div>
                <div className="header">
                    Patient Age: {age}
                </div>
                <div className="content">
                <div className="patient-diagnosis">
                        <strong>Diagnosis:</strong>
                        <ul>
                            {diagnosis?.map((diag, index) => (
                                <li key={index}>{diag}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="patient-observation">
                        <strong>Observations:</strong>
                        <ul>
                            {observation?.map((obs, index) => (
                                <li key={index}>{obs}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="patient-answers">
                        <strong>Answers:</strong>
                        <ul>
                            {answers?.map((ans, index) => (
                                <li key={index}>{ans}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiagnosisPage