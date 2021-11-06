import React, { Component } from "react";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class Create extends Component{
  constructor(props){
    super(props);
    this.state={
      NFTName: "name",
      NFTvalue: 0,
    }
    this.onSubmit = this.onSubmit.bind(this);
   
  }
  componentDidMount(){
    console.log(this.state);
    console.log(this.props);
  }
  
  onSubmit(event){
    
    event.preventDefault();
  
    console.log(this.props);
    console.log("create= " +this.props.contract);
    this.props.contract.methods.createNFT(this.state.NFTName,this.state.NFTvalue).send({from: this.props.account_Address, gas: '3000000'});
    // alert("创建成功");

    console.log(this.state.NFTName,this.state.NFTvalue);

  }
  render (){
    return(
      <div>
        <div>请输入唯一的NFTname和value:</div>
        <form onSubmit={this.onSubmit}>
        <label>
          NFTname:
          <input type="text" value={this.state.NFTName} onChange={(event)=>this.setState({NFTName:event.target.value})} />
        </label>
        <br></br>
        <label>
          NFTvalue:
          <input type="text" value={this.state.NFTvalue} onChange={(event)=>this.setState({NFTvalue:event.target.value})}  />
        </label>
        <br></br>
        <button className="mt-3 btn btn-outline-primary" type="submit">
                Submit
            </button>
        {/* <input type="submit" value="发送请求">提交</input>
         */}
      </form>
         
      </div>
    );
  }
    

}

export default Create;
