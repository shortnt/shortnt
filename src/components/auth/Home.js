import React from 'react';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';

const Home = () => {
    const [log,setLog] = useState(localStorage.getItem('loginData'));
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLog(localStorage.getItem('loginData'));
       
    }
    return(
        <>
        {log !== null ? 
        <> 
        <h1>WElcom to home page</h1>
        <h1>You signed In as {log}</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
        : <Redirect to="/" /> 
    }
        </>
    );
}

export default Home;