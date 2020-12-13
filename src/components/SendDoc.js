import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';
import '../style/layout.css';
import Logo from '../bc.jpg';

class SendDoc extends Component {


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
          this.ViewStuDocLength();
      }



      ViewStuDocLength() {

        this.state.sch.methods.viewDocLength(this.state.currentuser).call({from:this.state.currentuser},(error,result)=>{
            if(!error)
            {

               this.state.RequestLength=Number(result[0]);
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
            this.ViewUploadedDoc(i);
            setTimeout(resolve, 1000);
        });
        };



      ViewUploadedDoc(index) {
        this.state.sch.methods.getstudoc(this.state.currentuser,index).call({from:this.state.currentuser},(error,result)=>{
          console.log(result)
          if(!error)
        {
            const tryTable=document.getElementById('requestlistchild');
            const table=tryTable.getElementsByTagName('tbody')[0];

            var row1=table.insertRow();


            var col1=row1.insertCell(0);
            var newText1  = document.createElement('input');
            newText1.type="checkbox"
            newText1.id="tick"+index
            col1.appendChild(newText1);

            var col1=row1.insertCell(1);
            var newText1  = document.createElement('span');

              newText1.innerHTML=result[0];
              newText1.style.color="black"


            col1.appendChild(newText1);


            var col1=row1.insertCell(2);
            var newText1  = document.createElement('span');

            var temnewText  = document.createElement('BUTTON');
            temnewText.innerHTML="View";
            temnewText.onclick=()=>{
            document.location = "https://ipfs.io/ipfs/"+result[2];
            };

            newText1.appendChild(temnewText);
            col1.appendChild(newText1);



        }
        })
    }

    Tocheck=async()=>{

        var stuname=document.getElementById("txtStudentName");
        var appliedfor=document.getElementById("txtUserApplied")
        var check0=0;
        var check1=0;
        var check2=0;
        var check3=0;
        var check4=0;

        if(document.getElementById("tick0"))
        {
            if(document.getElementById("tick0").checked)
            check0=1;
        }

        
        if(document.getElementById("tick1"))
        {   
            if(document.getElementById("tick1").checked)
            check1=1;
        }

        
        if(document.getElementById("tick2"))
        {
            if(document.getElementById("tick2").checked)
            check2=1;
        }

        
        if(document.getElementById("tick3"))
        {
            if(document.getElementById("tick3").checked)
            check3=1;
        }

        
        if(document.getElementById("tick4"))
        {
            if(document.getElementById("tick4").checked)
            check4=1;
        }

        this.state.sch.methods.setTick(this.state.currentuser,stuname.value,appliedfor.value,check0,check1,check2,check3,check4).send({ from: this.state.currentuser }).then((r) => {
            console.log(r)
            document.location = "http://localhost:3000/Output";
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
                <h2 style={{paddingTop: 10}}>Send Documents</h2>
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
            <h3 class="heading" style={{marginTop:-100}}>Send Required Documents</h3>
            </div>  
            <p>Decentralized College Administration system</p>
            
            <form name="IntelitixForm" method="post">
<div className="container container_body">
	<div className="row">
		<div className="col-md-4 center-block">
			<div className="panel panel-info">
			
				<div className="panel-body">

					<div className="form-group">
						<label className="control-label" htmlFor="txtStudentName" style={{color:'#353730'}}>Student UserName</label>
						<input className="form-control" name="txtStudentName" id="txtStudentName" type="text"  placeholder="Student Name" required/>
					</div>

                    <div className="form-group">
						<label className="control-label" htmlFor="txtUserApplied" style={{color:'#353730'}}>Applied For</label>
						<input className="form-control" name="txtUserApplied" id="txtUserApplied" type="text" placeholder="Apply For" required/>
					</div>

					<div className="form-group">
						<label className="control-label" htmlFor="txtUserAddress" style={{color:'#353730'}}>User Blockchain ID</label>
						<input className="form-control" name="txtUserAddress" id="txtUserAddress" type="text" placeholder="User Blockchain ID" required/>
					</div>

                    <table className="table table-bordered" id="requestlistchild">
                                <tbody>
                                    <tr>
                                        
                                    </tr>
                                </tbody>
                    </table>


					<div className="aligncenter">
						<button type="button" className="btn btnsm btn-primary" onClick={this.Tocheck}>Send Documents</button>
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

export default SendDoc
