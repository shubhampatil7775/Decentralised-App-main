import React from 'react';
import Logo from '../logo.png';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';

function Home() {
    return (
        <div>
            <img className="Logo" src={Logo} alt="Logo"/>
            <h1>Walchand College Of Engineering,Sangli</h1>
            <h2>Welcome to our blockchain network</h2>
            
            <Link exact={true} to="/Student" type="button" className="btn btn-light" >Student</Link>
            <Link exact={true} to="/Administrator" type="button" className="btn btn-light" >Administrator</Link>
        </div>
    )
}

export default Home;