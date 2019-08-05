import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CookiesProvider } from 'react-cookie';
import AuthRouter from './components/AuthRouter.jsx';
import Login from './containers/login/Login.jsx';
import Register from './containers/register/Register.jsx';
import HunterProfile from './containers/profile/HunterProfile.jsx';
import SeekerProfile from './containers/profile/SeekerProfile.jsx';
import HunterLists from './containers/lists/HunterLists.jsx';
import SeekerLists from './containers/lists/SeekerLists.jsx';
import Message from './containers/message/Message.jsx';
import Chat from './containers/message/Chat.jsx';
import MainTabBar from './components/MainTabBar.jsx';

const App = () => {
	return (
		<CookiesProvider>
			<Router>
				<AuthRouter />
				<div className='pages'>
					<Switch>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/hunter-profile' component={HunterProfile} />
						<Route exact path='/hunter-lists' component={HunterLists} />
						<Route exact path='/seeker-profile' component={SeekerProfile} />
						<Route exact path='/seeker-lists' component={SeekerLists} />
						<Route exact path='/message' component={Message} />
						<Route path='/chat/:user' component={Chat} />
					</Switch>
				</div>
				<MainTabBar />
			</Router>
		</CookiesProvider>
	);
};

export default observer(App);
