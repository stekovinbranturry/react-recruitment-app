import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AuthRouter from './components/AuthRouter.jsx';
import Login from './containers/login/Login.jsx';
import Register from './containers/register/Register.jsx';
import HunterProfile from './containers/profile/HunterProfile.jsx';
import SeekerProfile from './containers/profile/SeekerProfile.jsx';

import MainTabBar from './containers/tabbar/MainTabBar.jsx';

const App = () => {
	return (
		<CookiesProvider>
			<Router>
				<AuthRouter />
				<div className="pages">
					<Route exact path="/hunter-profile" component={HunterProfile} />
					<Route exact path="/seeker-profile" component={SeekerProfile} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</div>
				<MainTabBar />
			</Router>
		</CookiesProvider>
	);
};

export default App;
