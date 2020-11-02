import React, { Component } from 'react'
import Web3 from 'web3';
import Sch from '../abis/Adddoc.json';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class AddDoc extends Component {

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


  AddData=async(event)=> {
    event.preventDefault()
    var docname = document.getElementById("txtFullName").value;
    var docdate = document.getElementById("txtDOB").value;
    var dochash = document.getElementById("invoicefile").value;

    console.log("Submitting file to ipfs...")
    const filesAdded=await ipfs.add(this.state.buffer)
    
    dochash=filesAdded.path
     
    this.state.sch.methods.setstudoc(this.state.currentuser,docname,docdate,dochash).send({ from: this.state.currentuser }).then((r) => {
      this.setState({ doc: filesAdded.cid.string }) 
      console.log(r);    
     });

     
  }

  render() {
    return (
      <div>
                 <form name="IntelitixForm" onSubmit={this.onSubmit} >
            <div className="container container_body">
                <div className="row">
                    <div className="col-md-4 center-block">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Add Driving Licence Details</h3>
                            </div>
                            <div className="panel-body">

                            <div className="form-group">
					
					<div className="form-group">
						<label className="control-label" htmlFor="txtFullName">Name as per Driving Licence</label>
						<input className="form-control" name="txtFullName" id="txtFullName" type="text" placeholder="Name"/>
					</div>
					<div className="form-group">
						<label className="control-label" htmlFor="txtDOB">DOB as per Driving Licence</label>
						<input className="form-control" name="txtDOB" id="txtDOB" type="text" placeholder="DD/MM/YYYY"/>
					</div>
				
                   
                    <div class="form-group">
						<label class="control-label" for="txtFinanceAmount" >Attach Driving Licence</label>
						<input type="file" name="invoicefile" id="invoicefile"  onChange={this.captureFile}/>
					</div>
					   
                                
                    <div className="aligncenter">
                        <button type="button" className="btn btnsm btn-primary" onClick={this.AddData}>Add Driving Licence</button>
                    </div>
                    <img src={`https://ipfs.infura.io/ipfs/${this.state.doc}`} />
                    
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

export default AddDoc;