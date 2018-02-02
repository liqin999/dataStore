import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt,
  Redirect
} from 'react-router-dom';
import Tablelist from '../datatable/Tablelist.js';
export default class RouteIndex extends React.Component{
	constructor(props) {
	    super(props);
  	    this.state={
               database:[],
               myIndex:0
  	    }
   
     }
     componentWillReceiveProps(){//组件的声明周期的使用    componentWillReceiveProps
     	let database = this.props.database
     	this.setState({database})
     }

     componentDidMount(){
         let database = this.props.database
         this.setState({database})
     }

     render(){
     debugger;
      let {changeDefaultTip,database} = this.props;
     	let RouteCon = null;
     	var routeHtml = [];
     	 	//创建路由链接对应的组件页面
     	 	if(database.length == 0){
     	 		  routeHtml.push(
               <Redirect to="/reportform/index.html#/"/>
              )
     	 	}else{
               	for(var i=0;i<database.length;i++){
               		var cur = database[i].options;
               		for(var j=0;j<cur.length;j++){
               			var nowCur = cur[j];
               			var tabname = nowCur.tabname;
               			routeHtml.push(<Route exact 
                      path={`/reportform/index.html#/${tabname}`}
                      key={nowCur.id}
                      render={
                        (props)=>(
                                 <Tablelist {...{changeDefaultTip}} />  
                        )
                      }
                      />)
                         
               		}
               	}
     	 	}
	    	
     	return(
     			<div>
     			  {routeHtml}
     			</div>
          )
     }
}