import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import store from './reducers/store';
import AuthRouter from './components/AuthRouter.jsx';
import Login from './containers/login/Login.jsx';
import Register from './containers/register/Register.jsx';
import HunterProfile from './containers/profile/HunterProfile.jsx';
import MainTabBar from './containers/tabbar/MainTabBar.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Router>
          <AuthRouter />
          <Route exact path='/hunter-profile' component={HunterProfile} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <MainTabBar />
        </Router>
      </CookiesProvider>
    </Provider>
  );
};

export default App;
