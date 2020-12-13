import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

class AddRequest extends Component {

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

      
    AddRequest=async(event)=> {

        var _stuname = document.getElementById("txtStudentName").value;
    	var bonafide=0;
        var scholor=0;
        var academics=0;
        var status=1;

     if(document.getElementById("bonafide").checked)
	{
		bonafide=1;
		//console.log(bonafide)
	}

	
	if(document.getElementById("scholorship").checked)
	{
		scholor=1;
	}
	
	if(document.getElementById("academics").checked)
	{
		academics=1;
    }
    
 

        this.state.sch.methods.AddRequest(this.state.currentuser,_stuname,bonafide,scholor,academics,status).send({ from: this.state.currentuser }).then((r) => {
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
                <h2 style={{paddingTop: 10}}>Add Request</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                <li><a href="/Student">Student</a></li>
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
            <h3 class="heading" style={{marginTop:-100}}>Add Request For Required Documents</h3>
            </div>  
            <p>Decentralized College Administration system</p>
			
			<form name="IntelitixForm" method="post">
<div className="container container_body">
	<div className="row">
		<div className="col-md-4 center-block">
			<div className="panel panel-info">
				
				<div className="panel-body">

					<div className="form-group">
						<label className="control-label" htmlFor="txtStudentName" style={{color:'#353730'}}>Requesting Student UserName</label>
						<input className="form-control" name="txtStudentName" id="txtStudentName" type="text"  placeholder="Student Name" required/>
					</div>
				
					<div className="form-group">
						<label className="control-label" htmlFor="txtUserAddress" style={{color:'#353730'}}>User Blockchain ID</label>
						<input className="form-control" name="txtUserAddress" id="txtUserAddress" type="text" placeholder="User Blockchain ID" required/>
					</div>
				
					<table className="table table-bordered" id="certlistparent">
                        <thead>
						<tr>
							<th colSpan="2" align="center"><b>Select the required access</b></th>
						</tr>
                        </thead>

                        <tbody>
						<tr>
							<td width="10%">
								<input id="bonafide" type="checkbox" name="bonafide"/>
							</td>
							<td width="90%">
								Bonafide Certificate
							</td>
						</tr>
					
						<tr>
							<td width="10%">
								<input id="scholorship" type="checkbox" name="scholorship"/>
							</td>
							<td width="90%">
								Scholorship
							</td>
						</tr>
						<tr>
							<td width="10%">
								<input id="academics" type="checkbox" name="academics" />
							</td>
							<td width="90%">
								Academics Fees
							</td>
						</tr>
                        </tbody>
					</table>
					
					<div className="aligncenter">
						<button type="button" className="btn btnsm btn-primary" onClick={this.AddRequest}>Request Access</button>
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

export default AddRequest
