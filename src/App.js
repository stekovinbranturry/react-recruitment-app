import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './reducers/store';
import Login from './containers/login/Login';
import Register from './containers/register/Register';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Router>
    </Provider>
  );
};

export default App;
