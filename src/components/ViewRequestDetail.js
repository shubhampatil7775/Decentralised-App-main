import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import {BrowserRouter as Router,Link,NavLink,Route,Redirect,Switch} from 'react-router-dom';
import '../style/layout.css';
import Logo from '../bc.jpg';



class ViewRequestDetail extends Component {

    constructor(props) {
        super(props);
        this.state={
          currentuser:null,
          sch:null,
          RequestLength:null,
          Stunam:null,
          bonafide: null,
          rector :null,
         scholor: null, 
         academics: null, 
         dochash:null, 
         status:null,
         dindex:null
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

        var requestlistchild = document.getElementById("requestlistchild");
        this.state.sch.methods.ViewRequestLength(this.state.currentuser).call({from:this.state.currentuser},(error,result)=>{
            if(!error)
            {   
                console.log(result)
            }
        })

        this.state.sch.methods.getAdmin().call({from:this.state.currentuser},(error,result)=>{
            if(!error)
            {   
                console.log(result)
                this.state.dindex=Number(result)
                console.log(this.state.dindex)
         

          this.state.sch.methods.ViewRequestDetail(this.state.currentuser,result).call({from:this.state.currentuser},(error,result)=>{
            //console.log(this.props.inde)
            if(!error)
		    {
			//console.log(result);
			this.state.Stunam=result[0];
            this.state.bonafide =Number(result[1]);
            this.state.scholor = Number(result[2]);
            this.state.academics = Number(result[3]);

			if(this.state.bonafide == 1)
			{
				var listHTML = "<tr><td width='80%'>Bonafide Certificate</td><td width='20%' align='center'><input type='checkbox' id='chk_bonafide'/></td></tr>";
				requestlistchild.insertAdjacentHTML('beforeend',listHTML);
			}


			if(this.state.scholor == 1)
			{
				var listHTML = "<tr><td width='80%'>Scholor</td><td width='20%' align='center'><input type='checkbox' id='chk_scholor' /></td></tr>";
				requestlistchild.insertAdjacentHTML('beforeend',listHTML);
			}

			if(this.state.academics == 1)
			{
				var listHTML = "<tr><td width='80%'>Academics</td><td width='20%' align='center'><input type='checkbox' id='chk_academics' /></td></tr>";
                requestlistchild.insertAdjacentHTML('beforeend',listHTML);
                console.log(document.getElementById("chk_academics"))
			}

		}
		else
		{
			console.log(error);
		}
            
        })
    }
});
      }


    UpdateRequestStatu=async()=>
    {
        var AccessReqCount=0;
        var AccessPerCount=0;

        if(this.state.bonafide == 1)
        {
            AccessReqCount=AccessReqCount+1;
            if(document.getElementById("chk_bonafide").checked)
            {
                this.state.bonafide=2;
                AccessPerCount=AccessPerCount+1;
            }
            else
            {
                this.state.bonafide=3;
            }
        }
        

        if(this.state.scholor == 1)
        {
            AccessReqCount=AccessReqCount+1;
            if(document.getElementById("chk_scholor").checked)
            {
                this.state.scholor=2;
                AccessPerCount=AccessPerCount+1;
            }
            else
            {
                this.state.scholor=3;
            }
        }

        if(this.state.academics == 1)
        {
            AccessReqCount=AccessReqCount+1;
            if(document.getElementById("chk_academics").checked)
            {
                this.state.academics=2;
                AccessPerCount=AccessPerCount+1;
            }
            else
            {
                this.state.academics=3;
            }
        }

        
        var Status = 0;
        if(AccessPerCount == 0)
        {
            Status = 4;
        }
        else if(AccessPerCount == AccessReqCount)
        {
            Status = 3;
        }
        else if(AccessPerCount < AccessReqCount)
        {
            Status = 2;
        }
 
        this.state.sch.methods.UpdateRequestStatus(this.state.currentuser,this.state.dindex,this.state.bonafide,this.state.scholor,this.state.academics,Status).send({ from: this.state.currentuser }).then((r) => {
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
                <h2 style={{paddingTop: 10}}>View Requests</h2>
                </div>
                <nav id="mainav" class="fl_right"> 
                <ul class="clear">
                <li><a href="/ViewRequest">Back</a></li>
                  <li><a href="/Administrator">Administrator</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="http://www.walchandsangli.ac.in/">About us</a></li>
                </ul>
                </nav>
            </header>
        </div>  

        <div class="wrapper bgded overlay gradient" style={{backgroundImage:"url(" +Logo + ")"}}>
        <div id="pageintro" class="hoc clear"> 
            <article>
            
            <h3 class="heading" style={{marginTop:-100}}>View Requests Data</h3>
            <p>Decentralized College Administration system</p>
            <form name="IntelitixForm" method="post" action="pubcert.asp">
            <div className="container container_body">
                <div className="row">
                    <div className="col-md-6 center-block">
                        <div className="panel panel-info">
                          
                            <div className="panel-body">
                                <table className="table table-bordered" id="requestlistparent">
                                    <tbody>
                                    
                                    </tbody>
                                </table>
                                
                                <table className="table table-bordered" id="requestlistchild">
                                <tbody>
                                    <tr>
                                        <td  align="center"><b>Requested Document</b></td>
                                        <td  align="center"><b>Mark</b></td>
                                    </tr>
                                </tbody>
                                </table>
                                
                                <div className="aligncenter">
                                    <button type="button" className="btn btnsm btn-primary" onClick={this.UpdateRequestStatu}>Update Access</button>
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

export default ViewRequestDetail
