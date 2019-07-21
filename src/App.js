import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './reducers/store';
import AuthRouter from './components/AuthRouter';
import Login from './containers/login/Login';
import Register from './containers/register/Register';
import HunterProfile from './containers/profile/HunterProfile';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<AuthRouter />
				<Route exact path="/hunter-profile" component={HunterProfile} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Router>
		</Provider>
	);
};

export default App;
