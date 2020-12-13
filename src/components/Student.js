import React, { Component } from 'react'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

class Student extends Component {
    render() {
        return (
            <div>
                <div class="wrapper row0">
        </div>
        <div class="wrapper row1" style={{backgroundColor:'black'}}>
            <header id="header" class="hoc clear">
                <div id="logo" class="fl_left" > 
                <h2 style={{paddingTop: 10}}>Student Portal</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                <li><a href="/Adddoc">Add Doc</a></li>
                <li><a href="/SeeUploadedDoc">See Uploaded Doc</a></li>
                <li><a href="/ViewRequestStu">View Request Status</a></li>
                <li><a href="/AddRequest">Add Request</a></li>
                <li><a href="/SendDoc">Send Documents</a></li>
                <li><a href="/">Home</a></li>
                    
                </ul>
                </nav>
            </header>
        </div>  

        <div class="wrapper bgded overlay gradient" style={{backgroundImage:"url(" +Logo + ")"}}>
        <div id="pageintro" class="hoc clear"> 
            <article>
            
            <div  style={{color:'#353730'}}>
            <h3 class="heading" style={{marginTop:-100}}>Features</h3>
            </div>
            <p>Decentralized College Administration system</p>
            <footer>
                <ul class="pushright" style={{listStyleType:'none'}}>
                <li style={{paddingTop:15}}><Link exact={true} to="/Adddoc" type="button" className="btn btn-light" >Add Documents</Link></li>
                <li style={{paddingTop:15}}><Link exact={true} to="/SeeUploadedDoc" type="button" className="btn btn-light" >See Uploaded Documents</Link></li>
                <li style={{paddingTop:15}}><Link exact={true} to="/ViewRequestStu" type="button" className="btn btn-light" >View Request Status</Link></li>
                <li style={{paddingTop:15}}><Link exact={true} to="/AddRequest" type="button" className="btn btn-light" >Add Request</Link></li>
                <li style={{paddingTop:15}}><Link exact={true} to="/SendDoc" type="button" className="btn btn-light" >Send Documents</Link></li>
                </ul>
            </footer>
            
            </article>
        </div>
        </div>  
      
            </div>
        )
    }
}

export default Student
