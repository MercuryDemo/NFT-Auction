import React, { Component } from "react";

import NFTCard from "./NFTCard";

class MyNFT extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  
  render() {
    console.log(this.props);
    
      var items = [];
      for (let i = 0; i < this.props.totNFT; i++) {
        console.log("i="+i);
        console.log("thisNFT= "+this.props.allNFTs[i]);
        if(this.props.allNFTs[i].Owner==this.props.account_Address){
          items.push(<NFTCard
            contract={this.props.contract}
            account_Address={this.props.account_Address}
            nft={this.props.allNFTs[i]}
          />);
        }
          
      }
      return(

          <div >
          

              {items}
          
          </div>

      );

  
    
      
    
  }


}
export default MyNFT;
