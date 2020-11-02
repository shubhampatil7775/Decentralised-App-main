import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';

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

                var temnewText  = document.createElement('BUTTON');
                temnewText.innerHTML="View Data";
                temnewText.onclick=()=>{ 
                };
                
                if(ApprovalStatus == "1")
                {
                    ApprovalStatusText = "Waiting Approval";
                    var listHTML = "<tr><td>"+StuName+"</td><td>"+ApprovalStatusText+"</td><td align='center'></td></tr>";
                           
                }
                else if(ApprovalStatus == "2")
                {
                    ApprovalStatusText = "Partially Approved";
                    var listHTML = "<tr><td>"+StuName+"</td><td>"+ApprovalStatusText+"</td><td align='center'>"+temnewText.outerHTML+"</td></tr>";
                }
                else if(ApprovalStatus == "3")
                {
                    ApprovalStatusText = "Approved";
                    var listHTML = "<tr><td>"+StuName+"</td><td>"+ApprovalStatusText+"</td><td align='center'>"+temnewText.outerHTML+"</td></tr>";
                }
                else if(ApprovalStatus == "4")
                {
                    ApprovalStatusText = "Rejected";
                    var listHTML = "<tr><td>"+StuName+"</td><td>"+ApprovalStatusText+"</td><td align='center'>"+temnewText.outerHTML+"</td></tr>";
                }
                
                requestlistparent.insertAdjacentHTML('beforeend',listHTML);
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
            <form name="IntelitixForm" onSubmit={this.handleSubmit}>
                <div className="container container_body">
                    <div className="row">
                        <div className="col-md-6 center-block">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">View Access Request</h3>
                                </div>
                                <div className="panel-body">
                                    <table className="table table-bordered" id="requestlistparent">
                                        <tbody>
                                        <tr>
                                            <td width="40" align="center"><b>Institution Name</b></td>
                                            <td width="40" align="center"><b>Approval Status</b></td>
                                            <td width="20" align="center"><b>More Info</b></td>
                                        </tr>
                                        </tbody>
                                        
                                    </table>
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

export default ViewRequestStu
