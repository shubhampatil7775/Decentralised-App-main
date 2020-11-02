import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';

class AddStudent extends Component {

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

      this.state.sch.methods.AddUser(this.state.currentuser,FullName,EmailID,MobileNo).send({ from: this.state.currentuser }).then((r) => {
        console.log(r);
        //return this.setState(r)
        
     });

     

    }







    render() {
        return (
            <div>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>

      <form name="IntelitixForm" method="post" >
      <div className="container container_body">
        <div className="row">
          <div className="col-md-4 center-block">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Create Wallet</h3>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label className="control-label" htmlFor="txtFullName">Your Name</label>
                  <input className="form-control" name="txtFullName" id="txtFullName" type="text"  placeholder="Name"></input>
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="txtEmailID">Email ID</label>
                  <input className="form-control" name="txtEmailID" id="txtEmailID" type="text"  placeholder="Email ID"></input>
                </div>
                <div className="form-group">
                          <label className="control-label" htmlFor="xtMobileNo">Mobile No.</label>
                  <input className="form-control" name="txtMobileNo" id="txtMobileNo" type="text"  placeholder="Mobile No."></input>
                </div>
                          
                <div className="aligncenter">
                  <button type="button" className="btn btnsm btn-primary" onClick={this.Adduser}>Create Wallet</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
      </div>
        )
    }
}

export default AddStudent
