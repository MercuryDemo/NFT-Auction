import React, { Component } from "react";
import AuctionCard from "./AuctionCard"



import NFTCard from "./NFTCard";

class Market extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  
  render() {
    console.log(this.props);
    
      var items = [];
      for (let i = 0; i < this.props.totAuction; i++) {
       
       
          items.push(<AuctionCard
            contract={this.props.contract}
            account_Address={this.props.account_Address}
            auction={this.props.allAuctions[i]}
          />);
        
          
      }
      return(

          <div >
          

              {items}
          
          </div>

      );

  
    
      
    
  }


}
export default Market;

