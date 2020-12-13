import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class AddUserData extends Component {

    constructor() {
        super();
        this.state={
          currentuser:null,
          sch:null,
          doc:null
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



      AddData=async(event)=> {
        event.preventDefault()
        var bonafide_notice = document.getElementById("bonafide").value;
      var scholor_notice = document.getElementById("scholor").value;
        var academics_notice = document.getElementById("academics").value;

        console.log("Submitting file to ipfs...")
        const filesAdded=await ipfs.add(this.state.buffer)
        console.log(filesAdded.path)

        if(bonafide_notice)
        {
        bonafide_notice=filesAdded.path
        this.state.sch.methods.AddBonafidecertificate(this.state.currentuser,bonafide_notice).send({ from: this.state.currentuser }).then((r) => {
            console.log(bonafide_notice);
            document.location = "http://localhost:3000/Output";
            
         });
        }
        
        if(scholor_notice)
        {
            scholor_notice=filesAdded.path
            this.state.sch.methods.AddScholorcertificate(this.state.currentuser,scholor_notice).send({ from: this.state.currentuser }).then((r) => {
                console.log(scholor_notice);
                document.location = "http://localhost:3000/Output";
                
             });
        }
        
        if(academics_notice)
        {
            academics_notice=filesAdded.path
            this.state.sch.methods.AddAcademicscertificate(this.state.currentuser,academics_notice).send({ from: this.state.currentuser }).then((r) => {
                console.log(academics_notice);
                document.location = "http://localhost:3000/Output";
                
             });
        }

        
        
   
      }

      




      captureFile = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
      }
    
      onSubmit = async(event) => {
        
      
      }

    render() {
        return (
            <div>
                <div class="wrapper row0">
        </div>
        <div class="wrapper row1" style={{backgroundColor:'black'}}>
            <header id="header" class="hoc clear">
                <div id="logo" class="fl_left" > 
                <h2 style={{paddingTop: 10}}>Add Notice/Circular</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                <li><a href="/Administrator">Administrator</a></li>
                <li><a href="/">Home</a></li>
                <li><a href="http://www.walchandsangli.ac.in/">About Us</a></li>
                </ul>
                </nav>
            </header>
        </div>  

        <div class="wrapper bgded overlay gradient" style={{backgroundImage:"url(" +Logo + ")"}}>
        <div id="pageintro" class="hoc clear"> 
            <article>
            
            <div  style={{color:'#353730'}}>
            <h3 class="heading" style={{marginTop:-100}}>Add Respective Notice</h3>
            </div>
            <p>Decentralized College Administration system</p>
            
            <form name="IntelitixForm" onSubmit={this.onSubmit} >
            <div className="container container_body">
                <div className="row">
                    <div className="col-md-4 center-block">
                        <div className="panel panel-info">
                            
                            <div className="panel-body">

          <div class="form-group" >
              <div style={{color:'#353730'}}>
            <label class="control-label" for="txtFinanceAmount" style={{textDecorationLine:'underline'}} style={{fontSize:25} }  >Add Bonafide Notice</label>
            </div>
            <input type="file" id="bonafide"  onChange={this.captureFile}/><br></br>
                        <button  type="button" class="btn btn-primary"  onClick={this.AddData}>Add Bonafide Notice</button>
          </div>
          
                    <br></br>

        
          <div class="form-group">
              <div style={{color:'#353730'}}>
            <label class="control-label" for="txtFinanceAmount" style={{fontSize:25}}>Add Scholorship Notice</label>
            </div>
            <input type="file" id="scholor"  onChange={this.captureFile}/><br></br>
                        <button type="button" class="btn btn-primary" onClick={this.AddData}>Add Scholorship Notice</button>
          </div>
                    <br></br>

                    <div class="form-group">
                        <div style={{color:'#353730'}}>
            <label class="control-label" for="txtFinanceAmount" style={{fontSize:25}}>Add Academics Notice</label>
            </div>
            <input type="file" id="academics"  onChange={this.captureFile}/><br></br>
                        <button type="button" class="btn btn-primary" onClick={this.AddData}>Add Academics Notice</button>
          </div>
             
                                
                    <div className="aligncenter">
                       
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

export default AddUserData
