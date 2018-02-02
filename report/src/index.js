import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter 
} from 'react-router-dom';
import Iframe from './components/layout/Iframe';
require("./common/style/index.css");

ReactDOM.render(
	  <HashRouter>
		<div style={{height:"100%"}}>
		     <Route path="/" component={Iframe}></Route>
		     
		</div>
	  </HashRouter>,
       document.getElementById('root')
	);

