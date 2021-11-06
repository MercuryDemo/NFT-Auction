import React, { Component } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Navi from "./component/Navi";


import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      totNFT:-1,
      totAuction:0,
      web3: null, 
      accounts: null, 
      account_Address: "",
      account_Balance: "",
      contract: null,
      allNFTs:[],
      allAuctions:[],
      
     
      attendAuctions:[],
      attendNum:0,
    };
  }
  

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      let balance = await web3.eth.getBalance(accounts[0]);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("networlID= "+networkId);
      const deployedNetwork = SimpleStorage.networks[networkId];
      console.log("deployedNetwork"+deployedNetwork);
      const instance = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log("instance"+instance);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      
      this.setState( {totNFT:0, web3, accounts,account_Address:accounts[0],account_Balance:balance,contract: instance},this.runExample );
      console.log(this.state);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const totNFT=await this.state.contract.methods.totNFT().call();
    this.setState({totNFT});
    const totAuction=await this.state.contract.methods.totAuction().call();
    this.setState({totAuction});
    for (let i = 1; i <= totNFT; i++) {
      const nft = await this.state.contract.methods.allNFTs(i).call();
      this.setState({allNFTs: [...this.state.allNFTs, nft],});
      
    }
    for(let i = 1; i <= totAuction; i++){
      const auction = await this.state.contract.methods.allAuctions(i).call();
      this.setState({allAuctions: [...this.state.allAuctions, auction],})
    }

    
    

   

    // Stores a given value, 5 by default.
    
    // const response = await contract.totNFT;

    // Update state with the result.
    // this.setState({ totNFT: response });
  };


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
   
    console.log(this.state);
    return (
      <div className="App">
        {/* <div>totNFT: {this.state.totNFT}</div> */}
        
         <Navi
            account_Address={this.state.account_Address}
            account_Balance={this.state.account_Balance}
            contract={this.state.contract}
            totNFT={this.state.totNFT}
            allAuctions={this.state.allAuctions}
            allNFTs={this.state.allNFTs}
            totAuction={this.state.totAuction}
         
           
            />
        
        {/* <div>{accounts}</div> */}
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div> */}
        
      </div>
    );
  }
}

export default App;
