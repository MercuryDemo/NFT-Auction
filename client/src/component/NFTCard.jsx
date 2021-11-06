import React, { Component } from "react";
import {Card} from "antd";

const { Meta } = Card;

class NFTCard extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event){
    
    event.preventDefault();
  
    console.log(this.props);
    console.log("create= " +this.props.contract);
    this.props.contract.methods.startAuction(this.state.NFTName,this.state.NFTvalue).send({from: this.props.account_Address, gas: '3000000'});
    // alert("创建成功");

    console.log(this.state.NFTName,this.state.NFTvalue);

  }

  render() {
    
        // console.log("nft in Card"+this.props.nft);
    return (
    <div className="site-card-border-less-wrapper" >
      <Card title={this.props.nft.NFTName} bordered={false} style={{ width: 300 }}>
        <p>NFT Value： {this.props.nft.NFTvalue}</p>
        <p>是否在售： {this.props.nft.onSale?"是":"否"}</p>
        <p>
          {
            this.props.nft.onSale?
            (
              <button>售卖中</button>
            ):
            (
              <button
                onClick={ () => {
                  let minprice = prompt("请输入起拍价格");
                  let _duration = prompt("请输入拍卖持续时间");
                  this.props.contract.methods.startAuction(this.props.nft.NFTID,minprice,_duration).send({ from: this.props.account_Address, gas: '3000000'});
                }}
              >
                售卖
              </button>
            )
          }
        </p>



  


       
      </Card>
      <br></br>
    </div>
        
    );
  }


}
export default NFTCard;
