import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

@withRouter
class AuthRouter extends Component {
  componentDidMount() {
    const pathList = ['/login', '/register'];
    const currentPath = this.props.location.pathname;
    if (!pathList.includes(currentPath)) {
      axios.get('/user/info').then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
          } else {
            this.props.history.push('/login');
          }
        }
      });
    }
  }

  render() {
    return null;
  }
}

export default AuthRouter;
