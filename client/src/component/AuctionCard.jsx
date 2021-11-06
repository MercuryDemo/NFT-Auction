import React, { Component } from "react";
import {Card} from "antd";

const { Meta } = Card;

class AuctionCard extends Component {
  constructor(props) {
    super(props);
    
  }
  

  render() {
    //   console.log(this.props);
    return (
    <div className="site-card-border-less-wrapper" >
      <Card title={this.props.auction.AuctionID} bordered={false} style={{ width: 500 }}>
      <p>NFTID： {this.props.auction.whichNFT}</p>
        <p>起拍价格： {this.props.auction.MinPrice}</p>
        <p>最高出价： {this.props.auction.MaxPrice}</p>
        <p>最高出价人： {this.props.auction.MaxBidder}</p>
        <p>截止时间：{this.props.auction.endTime}</p>
        
        <p>
            <button
                onClick={ () => {
                  let maxprice = prompt("请输入价格");
                  
                  this.props.contract.methods.biddingforNFT(this.props.auction.AuctionID,maxprice).send({ from: this.props.account_Address, gas: '3000000'});
                }}
            >
                竞价
            </button>
            
          
        </p>

        <p>
          
              <button
                onClick={ () => {
                    console.log(this.props);
                    console.log(this.props.auction.MaxPrice);
                  this.props.contract.methods.claimNFT(this.props.auction.AuctionID).send({ from: this.props.account_Address, value: this.props.auction.MaxPrice,gas: '3000000'});
                }}
              >
                认领
              </button>
            
          
        </p>




  


       
      </Card>
      <br></br>
    </div>
        
    );
  }


}
export default AuctionCard;
