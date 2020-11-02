import React, { Component } from 'react'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';

class Student extends Component {
    render() {
        return (
            <div>
                <Link exact={true} to="/Adddoc" type="button" className="btn btn-light">Add Doc</Link>
                <Link exact={true} to="/SeeUploadedDoc" type="button" className="btn btn-light" >See uploaded doc</Link>
                <Link exact={true} to="/ViewRequestStu" type="button" className="btn btn-light" >View request Status</Link>
                <Link exact={true} to="/AddRequest" type="button" className="btn btn-light" >Add request</Link>
                <Link exact={true} to="/SendDoc" type="button" className="btn btn-light" >Send Documents</Link>
                <Link exact={true} to="/" type="button" className="btn btn-light" >Home</Link>
            </div>
        )
    }
}

export default Student
