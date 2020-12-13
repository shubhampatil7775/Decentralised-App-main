
import React, { Component } from 'react'
import './App.css';
import Web3 from 'web3';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import Home from './components/Home';
import Administrator from './components/Administrator';
import Student from './components/Student';
import AddDoc from './components/AddDoc';
import Meme from './abis/Adddoc.json';
import AddStudent from './components/AddStudent';
import AddRequest from './components/AddRequest';
import ViewRequest from './components/ViewRequest';
import ViewRequestDetail from './components/ViewRequestDetail';
import ViewRequestStu from './components/ViewRequestStu';
import ViewRequestDetailStu from './components/ViewRequestDetailStu';
import AddUserData from './components/AddUserData';
import SeeUploadedDoc from './components/SeeUploadedDoc';
import SendDoc from './components/SendDoc';
import SeeStudentSendDoc from './components/SeeStudentSendDoc';
import Output from './components/Output';
import Loginpage from './components/Loginpage';
import Signup from './components/Signup';
import Duplicate from './components/Duplicate';



class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Meme.abi, networkData.address)
      this.setState({ contract })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      memeHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null
    }
    
  }
  

  render() {
      return (
        <div className="App">
         
         
        <Router>
  
          <Switch>
              <Route path="/" exact={true} component={Home}/>
          </Switch>
  
          <Switch>
             <Route path="/Administrator"  component = {Administrator}/> 
          </Switch>
  
          
          <Switch>
             <Route path="/Student"  component = {Student}/> 
          </Switch>
  
          <Switch>
             <Route path="/Adddoc"  component = {()=><AddDoc contract={this.state.contract} account={this.state.account}/>}/> 
          </Switch>


          <Switch>
             <Route path="/AddStudent"  component = {AddStudent}/> 
          </Switch>
        
          <Switch>
             <Route path="/AddRequest"  component = {AddRequest}/> 
          </Switch>
        
          <Switch>
             <Route path="/ViewRequest"  component = {ViewRequest}/> 
          </Switch>

          <Switch>
             <Route path="/ViewRequestDetail"  component = {ViewRequestDetail}/> 
          </Switch>

          <Switch>
             <Route path="/ViewRequestStu"  component = {ViewRequestStu}/> 
          </Switch>

          <Switch>
             <Route path="/ViewRequestDetailStu"  component = {ViewRequestDetailStu}/> 
          </Switch>

          <Switch>
             <Route path="/AddUserData"  component = {AddUserData}/> 
          </Switch>


          <Switch>
             <Route path="/SeeUploadedDoc"  component = {SeeUploadedDoc}/> 
          </Switch>

          <Switch>
             <Route path="/SendDoc"  component = {SendDoc}/> 
          </Switch>

          <Switch>
             <Route path="/SeeStudentSendDoc"  component = {SeeStudentSendDoc}/> 
          </Switch>

          <Switch>
             <Route path="/Output"  component = {Output}/> 
          </Switch>

          <Switch>
             <Route path="/Login"  component = {Loginpage}/> 
          </Switch>

          
          <Switch>
             <Route path="/Signup"  component = {Signup}/> 
          </Switch>

          <Switch>
             <Route path="/Home"  component = {Duplicate}/> 
          </Switch>


        </Router>   
         
        
      </div>
      )
  }
}



export default App;
