import React from 'react';
import { useHistory } from "react-router-dom";

const InitialPage = () => {
    const history = useHistory(); // Initialize navigate

    return (
        <div className='container'>
            Welcome to TCM helper, click start to continue;
            <button onClick={() => history.push('/questionnairepage')} className="btn">
                Start
            </button>
        </div>
        
    )
}

export default InitialPage