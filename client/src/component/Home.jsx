import React, { Component } from "react";


const Home = ({
  account_Addrress,
  account_Balance,
  
}) => {
   console.log("home= "+account_Addrress);
    return (
      <div>
        <div >
        欢迎，{account_Addrress}
        </div>
        <div >
        您的账户余额为： {account_Balance}
        </div>
      </div>
     
    );
  }


export default Home;
