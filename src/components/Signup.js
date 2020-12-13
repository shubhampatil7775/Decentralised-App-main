import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

class Signup extends Component {

    constructor() {
      super();
      this.state={
        currentuser:null,
        sch:null
      } 
    }


    async componentWillMount(){
            await this.loadWeb3()
    }
    
    
    async loadWeb3(){
        if(window.ethereum){
            window.web3=new Web3(window.ethereum);//new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));   //new Web3(window.ethereum);
        
            await window.ethereum.enable();
        }
        else if(window.web3)
        {
            window.web3=new Web3(window.web3.currentProvider)
        }
        else{
            window.alert('MetaMask not detected');
        }
        this.state.currentuser= await window.web3.eth.getCoinbase();
        this.state.sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['5777'].address);

    }

    Adduser=async(event)=> {

      var FullName = document.getElementById("txtFullName").value;
	    var EmailID = document.getElementById("txtEmailID").value; 
      var MobileNo = document.getElementById("txtMobileNo").value; 
      var password = document.getElementById("Password").value; 

      this.state.sch.methods.AddUser(this.state.currentuser,FullName,EmailID,MobileNo,password).send({ from: this.state.currentuser }).then((r) => {
        console.log(r);
        document.location = "http://localhost:3000/Output";
        
     });

     

    }







    render() {
        return (
            <div>
        <div class="wrapper row0">
        </div>
        <div class="wrapper row1" style={{backgroundColor:'black'}}>
            <header id="header" class="hoc clear">
                <div id="logo" class="fl_left" > 
                <h2 style={{paddingTop: 10}}>SignUp</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                <li><a href="/Home">Home</a></li>
                <li><a href="http://www.walchandsangli.ac.in/">About Us</a></li>
                </ul>
                </nav>
            </header>
        </div>  

        <div class="wrapper bgded overlay gradient" style={{backgroundImage:"url(" +Logo + ")"}}>
        <div id="pageintro" class="hoc clear"> 
            <article>
            
            <div  style={{color:'#353730'}}>
            <h3 class="heading" style={{marginTop:-100}}>Enter Your Information</h3>
            </div>  
            <p>Decentralized College Administration system</p>
            <form name="IntelitixForm" method="post"  >
              <div className="container container_body">
                <div className="row">
                  <div className="col-md-4 center-block">
                    <div className="panel panel-info">
                      
                      <div className="panel-body">
                        <div className="form-group">
                          <label className="control-label" htmlFor="txtFullName" style={{color:'#353730'}}>Your Name</label>
                          <input className="form-control" name="txtFullName" id="txtFullName" type="text"  placeholder="Name"></input>
                        </div>
                        <div className="form-group">
                          <label className="control-label" htmlFor="txtEmailID" style={{color:'#353730'}}>Email ID</label>
                          <input className="form-control" name="txtEmailID" id="txtEmailID" type="text"  placeholder="Email ID"></input>
                        </div>
                        <div className="form-group">
                                  <label className="control-label" htmlFor="xtMobileNo" style={{color:'#353730'}}>Mobile No.</label>
                          <input className="form-control" name="txtMobileNo" id="txtMobileNo" type="text"  placeholder="Mobile No."></input>
                        </div>
                        <div className="form-group">
                                  <label className="control-label" htmlFor="Password" style={{color:'#353730'}}>Password</label>
                          <input className="form-control" name="Password" id="Password" type="password"  placeholder="Enter Password"></input>
                        </div>
                                  
                        <div className="aligncenter">
                          <button type="button" className="btn btnsm btn-primary" onClick={this.Adduser}>SignUp</button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            </article>
        </div>
        </div>
        
      
      </div>
        )
    }
}

export default Signup
