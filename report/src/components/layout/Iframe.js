import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon ,Tag } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink ,
  HashRouter
} from 'react-router-dom';
import {getDomain,mockData} from '../../common/config/interface.js';
import RouteIndex from '../Routecom/RouteIndex.js';
import axios from 'axios';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class Iframe extends React.Component{
constructor(props) {
    super(props);
    this.state={
       previews: [],
       authors: [],
       database:[],//默认请求的数据库和数据表
       isDefaultTip:true,//是否显示默认的提示信息
       defaultTip:'',//提示信息
       layoutH:0// 内容的默认高度
    };
   this.changeDefaultTip = this.changeDefaultTip.bind(this);
 }
 changeDefaultTip(isDefaultTip){
    this.setState({
      isDefaultTip
    })
 }

  componentDidMount(){//从后台获得数据 

 //解析字符串，看是否是已经登录，没有登陆的时候重定向到单点
  let search = window.location.search;
  let obj = {};
  let reg = /(\w+)=(\w+)/ig;
  let status = null;
  let winH = document.documentElement.offsetHeight;
  let restH = 155;//头部信息和底部版权的高度和
  let that = this;
  //假数据：    mockData.allTables;
  //测试数据：  getDomain() + '/dm/jdbc/allTables';

  let _getallTableUrl = getDomain() + '/dm/jdbc/allTables';

  search.replace(reg,function(arg1,arg2,arg3){
     obj[arg2] = arg3
  });
  status = obj.status;

  sessionStorage.setItem('status', status);

  if (sessionStorage.getItem("status")) {
    status = sessionStorage.getItem("status");
  }

  console.log(search);
  console.log(obj);
  console.log('status是：'+status);


    axios.get(_getallTableUrl)
    .then(function (ret) {
         if(typeof(ret) == 'string'){
              ret = JSON.parse(ret);  
         };
          that.setState({
                database: ret.data.data.database,
                layoutH: winH - 155
          });
         sessionStorage.setItem('dStatus', 'ok');
    });

   if (!sessionStorage.getItem("dStatus")) {
        let isLoginUrl= getDomain() + '/dm/jdbc/login';
        window.location.assign(isLoginUrl);
    }

    
   
};

 render(){
 	let SubMenuCon = null;//路由链接
 	let MenuItemCon = null;
 	let {database,isDefaultTip,defaultTip} = this.state;
 	//循环创建路由的链接对象
 	SubMenuCon = database.map((item,index)=>{//两层嵌套的map循环
		MenuItemCon = item.options.map((_item,_index)=>{
			return (
				/*<Menu.Item key={_item.id}>{_item.tabname}</Menu.Item>*/
        <Menu.Item key={_item.id}>
            {<Link to={{ 
            	pathname:`/reportform/index.html#/${_item.tabname}`,
            	state: {
            	 	databaseId: item.id,
            	 	tableId:_item.id,
            	 	tableType:_item.type,
            	 	field_name:_item.condition
            	 }
            }}>
               {_item.tabname}
            </Link>}
        </Menu.Item>
			)
 		});
 		return (//组件之间数据的传递
 			<SubMenu key={index} key={item.id} data-parentId={item.id} title={<span><Icon type="user" />{item.database}</span>}>
			    {MenuItemCon} 
            </SubMenu>
 			)
 	});

  if(isDefaultTip){
      defaultTip = (<div>
           暂无数据 , 请点击左侧下拉导航...
        </div>)
  }else{
      defaultTip = null
  }
 
 return (
  <Layout style={{ minHeight: '100vh' }}>
  
    <Content style={{ padding: '0 50px'}}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>数据报表展示</Breadcrumb.Item>
      </Breadcrumb>
      <Router>
      <Layout style={{ padding: '24px 0', background: '#fff',height:`${this.state.layoutH}px`}}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
		    {SubMenuCon}

          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
             <div>{defaultTip}</div> 
             <RouteIndex database={database} changeDefaultTip={this.changeDefaultTip}/>
        </Content>
      </Layout>
	  </Router>
    </Content>


    <Footer style={{ textAlign: 'center' }}>
	    <div>
	       版权所有 © 1999-2017 北京中企网动力数码科技有限公司    Copyright © 1999-2017 300.cn All Rights Reserved
	    </div>
	    <div>
	       京公网安备11030102010293号 京ICP证010249号
	    </div>
    </Footer>
  </Layout>
 		)
 }

}