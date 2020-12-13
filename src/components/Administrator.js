import React, { Component } from 'react'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

class Administrator extends Component {
    render() {
        return (
            <div>
                <div class="wrapper row0">
        </div>
        <div class="wrapper row1" style={{backgroundColor:'black'}}>
            <header id="header" class="hoc clear">
                <div id="logo" class="fl_left" > 
                <h2 style={{paddingTop: 10}}>Administrator</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                <li><a href="/AddStudent">Add Student</a></li>
                <li><a href="/AdduserData">Add Notice/Circular</a></li>
                <li><a href="/ViewRequest">View Applied Stu</a></li>
                <li><a href="/SeeStudentSendDoc">View Students Doc</a></li>
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
                <li style={{paddingTop:15}}><Link exact={true} to="/AddStudent" type="button" className="btn btn-light" >Add Students</Link></li>
                <li style={{paddingTop:15}}><Link exact={true} to="/AdduserData" type="button" className="btn btn-light" >Add Notice/Circular</Link></li>
                <li style={{paddingTop:15}}><Link exact={true} to="/ViewRequest" type="button" className="btn btn-light" >View Applied Students</Link></li>
                <li style={{paddingTop:15}}><Link exact={true} to="/SeeStudentSendDoc" type="button" className="btn btn-light" >View Students Documents</Link></li>
                </ul>
            </footer>
            
            </article>
        </div>
        </div>
           
                
            </div>
        )
    }
}

export default Administrator
