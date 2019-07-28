import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import UserStore from './stores/user.store';
import 'antd-mobile/dist/antd-mobile.css';
import './style/index.css';

ReactDOM.render(
	<Provider UserStore={UserStore}>
		<App />
	</Provider>,
	document.getElementById('root')
);
