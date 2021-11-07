# NFT-Auction
 浙江大学区块链大作业-去中心化NFT拍卖平台

## 功能实现
### 合约部分
实现了作业要求的：
1. 输入NFT名称和唯一值，铸造属于自己的NFT
2. 选择铸造的NFT并进行拍卖，规定起拍价格和截止时间
3. 其他用户可以对正在拍卖的NFT出价
4. 存储了NFT过去的所有所属权流转信息
5. 拍卖结束后，出价最高者手动认领NFT，合约将NFT所有权转到该用户地址下，并完成转账

### 前端部分
搭建了基本的页面框架，但基本实现子页面：
1. 铸造NFT（完全实现）：输入name和id，铸造NFT
2. 查看自己的NFT：存在bug
3. 交易市场：已实现

4.**部分页面存在循环渲染子组件bug，尚未解决，只需刷新页面即可。**
## 部署方法
在本地部署，需要安装ganache区块链网络，truffle、react框架
1. 下载GitHub代码
2. `npm install` 安装依赖
3. `truffle compile`、`truffle migrate`，对智能合约编译
4. `npm start` 启动项目

## 运行成功网页截图
![image](https://github.com/MercuryDemo/blockchain_Auciton/blob/main/%E6%BC%94%E7%A4%BA%E6%88%AA%E5%9B%BE.png)
![image](https://github.com/MercuryDemo/blockchain_Auciton/blob/main/%E6%BC%94%E7%A4%BA%E6%88%AA%E5%9B%BE2.png)
