import React, { Component } from 'react'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

function Duplicate() {
    return (
        <div>
        <div class="wrapper row0">
        </div>
        <div class="wrapper row1" style={{backgroundColor:'black'}}>
            <header id="header" class="hoc clear">
                <div id="logo" class="fl_left" > 
                <h2 style={{paddingTop: 10}}>Dapp Administration</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                    <li class="active"><a href="index.html">Home</a></li>
                    <li><a href="/Login">Login</a></li>
                    <li><a href="/Signup">Sign up</a></li>
                    <li><a href="http://www.walchandsangli.ac.in/">About us</a></li>
                </ul>
                </nav>
            </header>
        </div>  

        <div class="wrapper bgded overlay gradient" style={{backgroundImage:"url(" +Logo + ")"}}>
        <div id="pageintro" class="hoc clear"> 
            <article>
            
            <h3 class="heading"  style={{color:'#353730'}}>Walchand College of Engineering, Sangli</h3>
            <p>Decentralized College Administration system</p>
            <footer>
                <ul class="nospace inline pushright">
                <li><Link exact={true} to="/Student" type="button" className="btn btn-dark" >Student</Link></li>
                <li><Link exact={true} to="/Administrator" type="button" className="btn btn-dark" >Administrator</Link></li>
                </ul>
            </footer>
            
            </article>
        </div>
        </div>
           
        </div>
    )
}

export default Duplicate
