import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';

class ViewRequestStu extends Component {

    constructor() {
        super();
        this.state={
          currentuser:null,
          sch:null,
          RequestLength:null,
          ind:0,
          Stunam:null
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
          this.ViewRequestLength();
      }

      ViewRequestLength() {

        this.state.sch.methods.ViewRequestLength(this.state.currentuser).call({from:this.state.currentuser},(error,result)=>{
            if(!error)
            {
                
               this.state.RequestLength=Number(result);
               console.log(this.state.RequestLength)
               var i=0;
               for(;i<this.state.RequestLength;i++)
               this.loop(i); 
                
                
            }
            else
            {
                window.alert(error);
            }
        })
      }

      
    loop(i) {
        if (i < this.state.RequestLength) new Promise(resolve => {
            this.ViewRequestHeader(i);
            setTimeout(resolve, 1000);
        });
    }


    ViewRequestForm=async(index, StuName)=>
    {   
        
        var Frm = document.IntelitixForm;
        //console.log(Frm)
        Frm.hdnRequestIndex.value = index;
        Frm.hdnStuName.value = StuName;
       // Frm.submit();
    }

    ViewRequestHeader(index)
    {
        var requestlistparent = document.getElementById("requestlistparent");
       
        
        this.state.sch.methods.ViewRequestHeader(this.state.currentuser,index).call({from:this.state.currentOwner},(error,result)=>{
            if(!error)
            {
                var StuName="";
                var ApprovalStatus="";
                var ApprovalStatusText="";
                
                StuName = result[0];
                ApprovalStatus = Number(result[1]); 

                this.state.ind=index;
                this.state.Stunam=StuName;

                if(ApprovalStatus == "1")
                {
                ApprovalStatusText = "Waiting Approval";
			
                this.state.ind=index;
                this.state.Stunam=StuName;
                console.log(this.state.ind)

                const tryTable=document.getElementById('requestlistchild');
                const table=tryTable.getElementsByTagName('tbody')[0];
                
                var row1=table.insertRow();
                        
                        
                var col1=row1.insertCell(0);
                var newText1  = document.createElement('span');
                newText1.innerHTML=StuName;
                col1.appendChild(newText1);
                
                var col1=row1.insertCell(1);
                var newText1  = document.createElement('span');
                
                newText1.innerHTML=ApprovalStatusText;
                
                col1.appendChild(newText1);

                        
                var col1=row1.insertCell(2);
                var newText1  = document.createElement('span');

                var temnewText  = document.createElement('BUTTON');
                temnewText.innerHTML="View";
                temnewText.onclick=()=>{ 
                    this.state.sch.methods.setStu(index).send({ from: this.state.currentuser }).then((r) => {
                           
                            //console.log(index)
                            document.location = "ViewRequestDetailStu"
                        
                      
                    });
               
                
                    };
                    
                newText1.appendChild(temnewText);
                col1.appendChild(newText1);
            
            
                                
                }
                else if(ApprovalStatus == "2")
                {
                    ApprovalStatusText = "Partially Approved";
                   
                    const tryTable=document.getElementById('requestlistchild');
                    const table=tryTable.getElementsByTagName('tbody')[0];
                    
                    var row1=table.insertRow();
                            
                            
                    var col1=row1.insertCell(0);
                    var newText1  = document.createElement('span');
                    newText1.innerHTML=StuName;
                    col1.appendChild(newText1);
                    
                    var col1=row1.insertCell(1);
                    var newText1  = document.createElement('span');
                    
                    newText1.innerHTML=ApprovalStatusText;
                    
                    col1.appendChild(newText1);

                            
                    var col1=row1.insertCell(2);
                    var newText1  = document.createElement('span');

                    var temnewText  = document.createElement('BUTTON');
                    temnewText.innerHTML="View";
                    temnewText.onclick=()=>{ 
                        this.state.sch.methods.setStu(index).send({ from: this.state.currentuser }).then((r) => {
                               
                                //console.log(index)
                                document.location = "ViewRequestDetailStu"
                            
                          
                        });
                   
                    
                        };
                        
                    newText1.appendChild(temnewText);
                    col1.appendChild(newText1);
                
                    
                }

                else if(ApprovalStatus == "3")
                {
                    ApprovalStatusText = "Approved";
                    const tryTable=document.getElementById('requestlistchild');
                    const table=tryTable.getElementsByTagName('tbody')[0];
                    
                    var row1=table.insertRow();
                            
                            
                    var col1=row1.insertCell(0);
                    var newText1  = document.createElement('span');
                    newText1.innerHTML=StuName;
                    col1.appendChild(newText1);
                    
                    var col1=row1.insertCell(1);
                    var newText1  = document.createElement('span');
                    
                    newText1.innerHTML=ApprovalStatusText;
                    
                    col1.appendChild(newText1);

                            
                    var col1=row1.insertCell(2);
                    var newText1  = document.createElement('span');

                    var temnewText  = document.createElement('BUTTON');
                    temnewText.innerHTML="View";
                    temnewText.onclick=()=>{ 
                        this.state.sch.methods.setStu(index).send({ from: this.state.currentuser }).then((r) => {
                               
                                console.log(index)
                                document.location = "ViewRequestDetailStu"
                            
                          
                        });
                   
                    
                        };
                        
                    newText1.appendChild(temnewText);
                    col1.appendChild(newText1);
                
                    
                    
                    
                }

                else if(ApprovalStatus == "4")
                {
                    ApprovalStatusText = "Rejected";
                    const tryTable=document.getElementById('requestlistchild');
                    const table=tryTable.getElementsByTagName('tbody')[0];
                    
                    var row1=table.insertRow();
                            
                            
                    var col1=row1.insertCell(0);
                    var newText1  = document.createElement('span');
                    newText1.innerHTML=StuName;
                    col1.appendChild(newText1);
                    
                    var col1=row1.insertCell(1);
                    var newText1  = document.createElement('span');
                    
                    newText1.innerHTML=ApprovalStatusText;
                    
                    col1.appendChild(newText1);

                            
                    var col1=row1.insertCell(2);
                    var newText1  = document.createElement('span');

                    var temnewText  = document.createElement('BUTTON');
                    temnewText.innerHTML="View";
                    temnewText.onclick=()=>{ 
                        this.state.sch.methods.setStu(index).send({ from: this.state.currentuser }).then((r) => {
                               
                                //console.log(index)
                                document.location = "ViewRequestDetailStu"
                            
                          
                        });
                   
                    
                        };
                        
                    newText1.appendChild(temnewText);
                    col1.appendChild(newText1);
                
                    
                }
            }
            else
            {
                console.log(error);
            }
        })
    }

    handleSubmit=async(event)=> {
        event.preventDefault()
        //console.log(this.state.ind)
        document.location="ViewRequestDetailStu"
        
    }


    render() {
        return (
            <div>

<div class="wrapper row0">
        </div>
        <div class="wrapper row1" style={{backgroundColor:'black'}}>
            <header id="header" class="hoc clear">
                <div id="logo" class="fl_left" > 
                <h2 style={{paddingTop: 10}}>View Your Request Status</h2>
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
            <h3 class="heading" style={{marginTop:-100}}>Request Status</h3>
            </div>
            <p>Decentralized College Administration system</p>
            
            <div className="container container_body">
                    <div className="row">
                        <div className="col-md-6 center-block">
                            <div className="panel panel-info">
                               
                                <div className="panel-body" id="requestlistchild">
                                    <table className="table table-bordered" id="requestlistparent">
                                        <tbody>
                                        <tr>
                                            <th width="40" align="center"><b>Student Name</b></th>
                                            <th width="40" align="center"><b>Approval Status</b></th>
                                            <th width="20" align="center"><b>More Info</b></th>
                                        </tr>
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </article>
        </div>
        </div>
               
            </div>
        )
    }
}

export default ViewRequestStu
