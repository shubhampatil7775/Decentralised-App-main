import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';

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
              newText1.style.color="green"


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

    Tocheck=async()=> {
        var stuname=document.getElementById("txtStudentName")
        var studoc=new Array(this.state.RequestLength)
        console.log("hello")


    }


    render() {
        return (
            <div>
                <form name="IntelitixForm" method="post">
<div className="container container_body">
	<div className="row">
		<div className="col-md-4 center-block">
			<div className="panel panel-info">
				<div className="panel-heading">
					<h3 className="panel-title">Request Access</h3>
				</div>
				<div className="panel-body">

					<div className="form-group">
						<label className="control-label" htmlFor="txtStudentName">Student UserName</label>
						<input className="form-control" name="txtStudentName" id="txtStudentName" type="text"  placeholder="Student Name"/>
					</div>

					<div className="form-group">
						<label className="control-label" htmlFor="txtUserAddress">User Blockchain ID</label>
						<input className="form-control" name="txtUserAddress" id="txtUserAddress" type="text" placeholder="User Blockchain ID"/>
					</div>

                    <table className="table table-bordered" id="requestlistchild">
                                <tbody>
                                    <tr>
                                        <td colSpan="2" align="center"><b>Tick the Boxes</b></td>
                                    </tr>
                                </tbody>
                    </table>


					<div className="aligncenter">
						<button type="button" className="btn btnsm btn-primary" onClick={this.Tocheck}>Request Access</button>
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

export default SendDoc
