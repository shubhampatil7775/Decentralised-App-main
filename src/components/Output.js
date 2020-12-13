import React, { Component } from 'react'
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

class Output extends Component {
    render() {
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
                    <li><a href="/">Home</a></li>
                    <li><a href="/Student">Student</a></li>
                    <li><a href="/Administrator">Administrator</a></li>
                    <li><a href="http://www.walchandsangli.ac.in/">About us</a></li>
                </ul>
                </nav>
            </header>
        </div>  

        <div class="wrapper bgded overlay gradient" style={{backgroundImage:"url(" +Logo + ")"}}>
        <div id="pageintro" class="hoc clear"> 
            <article>
            
            <div  style={{color:'#353730'}}>
            <h3 class="heading" style={{marginTop:-100}}>Congratulations!!</h3>
            </div>
            <p>Your transaction has been successfully completed!!</p>
            <footer>
            <div>To view your transaction details you can visit Etherscan</div><br></br>
                <ul class="nospace inline pushright">
                <li><Link exact={true} to="https://etherscan.io/" type="button" className="btn btn-light" >Etherscan</Link></li>
                </ul>
            </footer>
            
            </article>
        </div>
        </div>
            </div>
        )
    }
}

export default Output
