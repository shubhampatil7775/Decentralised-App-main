import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import '../style/layout.css';
import Logo from '../bc.jpg';


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class ViewRequestDetailStu extends Component {

      constructor(props) {
        super(props);
        this.state={
          currentuser:null,
          sch:null,
          RequestLength:null,
          Stunam:null,
          consthash:null
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
          this.ViewRequestDetails();
      }
    
 
     
      ViewRequestDetails=async()=> {

        this.state.sch.methods.getStu().call({from:this.state.currentuser},(error,result)=>{
        
          this.state.sch.methods.viewDoc(this.state.currentuser,result).call({from:this.state.currentuser},(error,result)=>{
            //console.log(this.props.inde)
            if(!error)
                {
                
              
              var bonafide = Number(result[0]); 
              var bonafide_Value = result[1]; 

              var scholor=Number(result[2]);
              var scholor_Value=result[3];


              var academics=Number(result[4]);
              var academics_Value=result[5];

              //console.log(result[1]);
              //console.log(result[0]);
              //console.log(result[2]);
            // console.log(result[3]);

                    
            
              if(bonafide > 0)
              {   
                const tryTable=document.getElementById('requestlistchild');
                const table=tryTable.getElementsByTagName('tbody')[0];
                
                var row1=table.insertRow();
                        
                          
                var col1=row1.insertCell(0);
                var newText1  = document.createElement('span');
                newText1.innerHTML="Bonafide";
                col1.appendChild(newText1);
                
                var col1=row1.insertCell(1);
                var newText1  = document.createElement('span');
                col1.appendChild(newText1);
                if(bonafide == 2)
                {
                  newText1.innerHTML="Approved";
                  newText1.style.color="green"

                
                }
                else
                { 
                  if(bonafide==1) 
                  newText1.innerHTML="Waiting";
                  else
                  newText1.innerHTML="Rejected";
                }
                if(bonafide==2)
                {
                  col1.appendChild(newText1);

                          
                  var col1=row1.insertCell(2);
                  var newText1  = document.createElement('span');

                  var temnewText  = document.createElement('BUTTON');
                  temnewText.innerHTML="View";
                  temnewText.onclick=()=>{ 
                      document.location = "https://ipfs.io/ipfs/"+bonafide_Value
                  };
                  
                  newText1.appendChild(temnewText);
                  col1.appendChild(newText1);
              
                  this.state.consthash=bonafide_Value;
              }

                
          
              }

              if(scholor > 0)
              {   
                const tryTable=document.getElementById('requestlistchild');
                const table=tryTable.getElementsByTagName('tbody')[0];
                
                var row1=table.insertRow();
                        
                          
                var col1=row1.insertCell(0);
                var newText1  = document.createElement('span');
                newText1.innerHTML="Scholorship";
                col1.appendChild(newText1);
                
                var col1=row1.insertCell(1);
                var newText1  = document.createElement('span');
                col1.appendChild(newText1);
                if(scholor == 2)
                {
                  newText1.innerHTML="Approved";
                  newText1.style.color="green"
                }
                else
                {
                  if(scholor==1) 
                  newText1.innerHTML="Waiting";
                  else
                  newText1.innerHTML="Rejected";
                }
                if(scholor==2)
                {
                col1.appendChild(newText1);

                
                var col1=row1.insertCell(2);
                var newText1  = document.createElement('span');

                var temnewText  = document.createElement('BUTTON');
                temnewText.innerHTML="View";
                temnewText.onclick=()=>{ 
                document.location = "https://ipfs.io/ipfs/"+scholor_Value
                };
                
                newText1.appendChild(temnewText);
                col1.appendChild(newText1);
            
                this.state.consthash=scholor_Value;
                
              }
              }
              
              if(academics > 0)
              {   
                const tryTable=document.getElementById('requestlistchild');
                const table=tryTable.getElementsByTagName('tbody')[0];
                
                var row1=table.insertRow();
                        
                          
                var col1=row1.insertCell(0);
                var newText1  = document.createElement('span');
                newText1.innerHTML="Academics";
                col1.appendChild(newText1);
                
                var col1=row1.insertCell(1);
                var newText1  = document.createElement('span');
                col1.appendChild(newText1);
                if(academics == 2)
                {
                  newText1.innerHTML="Approved";
                  newText1.style.color="green"
                }
                else
                {
                  if(academics==1) 
                  newText1.innerHTML="Waiting";
                  else
                  newText1.innerHTML="Rejected";
                }
                if(academics==2)
                {
                col1.appendChild(newText1);

                        
                        var col1=row1.insertCell(2);
                        var newText1  = document.createElement('span');

                        var temnewText  = document.createElement('BUTTON');
                temnewText.innerHTML="View";
                temnewText.onclick=()=>{ 
                  document.location = "https://ipfs.io/ipfs/"+academics_Value
                        };
                      
                        newText1.appendChild(temnewText);
                col1.appendChild(newText1);
            
                this.state.consthash=academics_Value;
                      }
          
              }
              
                        
              }
              else
              {
                  console.log(error);
              }
          
      })
    })
    }

  


    render() {
        return (
            <div>
              <div class="wrapper row0">
        </div>
        <div class="wrapper row1" style={{backgroundColor:'black'}}>
            <header id="header" class="hoc clear">
                <div id="logo" class="fl_left" > 
                <h2 style={{paddingTop: 10}}>View Request Status Details</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                  <li><a href="/ViewRequestStu">Back</a></li>
                  <li><a href="/Student">Student</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="http://www.walchandsangli.ac.in/">About us</a></li>
                </ul>
                </nav>
            </header>
        </div>  

        <div class="wrapper bgded overlay gradient" style={{backgroundImage:"url(" +Logo + ")"}}>
        <div id="pageintro" class="hoc clear"> 
            <article>
            
            <div  style={{color:'#353730'}}>
            <h3 class="heading" style={{marginTop:-100}}>Request Details</h3>
            </div>
            <p>Decentralized College Administration system</p>

            <div className="container container_body">
                <div className="row">
                    <div className="col-md-6 center-block">
                        <div className="panel panel-info">
                            
                            <div className="panel-body">
                                
                                
                                <table className="table table-bordered" id="requestlistchild">
                                <tbody>
                                    <tr>
                                    <th width="40" align="center"><b>Document Name</b></th>
                                            <th width="40" align="center"><b>Approval Status</b></th>
                                            <th width="20" align="center"><b>View Doc</b></th>
                                    </tr>
                                </tbody>
                                </table>
                                
              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      <input type="hidden" id="hdnDrivingLicenceHash" name="hdnDrivingLicenceHash" value=""></input>
            
            </article>
        </div>
        </div>
            
            </div>

      
        )
    }
}

export default ViewRequestDetailStu

