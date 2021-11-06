import React, { Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import Create from './Create';
import Market from "./Market";
import MyNFT from "./MyNFT";
import Home from "./Home";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';


import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Navi extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      selected: "4",
    };
    
  }
  

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount(){
    console.log("innavi contract"+this.props.contract);
  }
  

  render() {
    // console.log (this.props);
    // console.log (this.state);
    // console.log("this.props.account_balance in navi = "+this.props.account_balance);
    // console.log("this.props.accountsAddress in navi = "+this.props.account_Address);

    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['4']} mode="inline" 
          onSelect ={(item)=>{
            this.setState({
              selected: item.key,
            })
          }}>
            <Menu.Item key="4" icon={<FileOutlined />}>
              首页
            </Menu.Item>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              我的NFT
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
              创建NFT
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              交易市场
            </Menu.Item>

            
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0,color: "white"}} >
             N F T - AUCTION - DAPP
            </Header>
          
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {/* <Chooseone keys={this.state} /> */}
              {(this.state.selected=='4')&& <Home
                account_Addrress={this.props.account_Address}
                account_Balance={this.props.account_Balance}/>}
              {(this.state.selected=='1') && <MyNFT
                contract={this.props.contract}
                account_Address={this.props.account_Address}
                totNFT={this.props.totNFT}
                allNFTs={this.props.allNFTs}
                
                yourNFTNum={this.props.yourNFTNum}
              />}
              {(this.state.selected=='2') && <Market
                account_Address={this.props.account_Address}
                contract={this.props.contract}
                allAuctions={this.props.allAuctions}
                totAuction={this.props.totAuction}
                
              />}
              {(this.state.selected=='3') && <Create
                contract={this.props.contract}
                account_Address={this.props.account_Address}
              />}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Navi;