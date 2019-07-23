import { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getRirectPath } from '../utils/user';

const AuthRouter = props => {
  useEffect(() => {
    const pathList = ['/login', '/register'];
    const currentPath = props.location.pathname;
    if (!pathList.includes(currentPath)) {
      axios.get('/user/info').then(res => {
        if (res.status === 200 && res.data.code === 1) {
          props.history.push('/login');
        }
      });
    } else {
      axios.get('/user/info').then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const path = getRirectPath(res.data.doc[0]);
          props.history.push(path);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return null;
};

export default withRouter(AuthRouter);
