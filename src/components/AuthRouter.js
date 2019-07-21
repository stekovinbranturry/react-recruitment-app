import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getRirectPath } from '../utils/user';

@withRouter
class AuthRouter extends Component {
	componentDidMount() {
		const pathList = ['/login', '/register'];
		const currentPath = this.props.location.pathname;
		if (!pathList.includes(currentPath)) {
			axios.get('/user/info').then(res => {
				if (res.status === 200 && res.data.code === 1) {
					this.props.history.push('/login');
				}
			});
		} else {
			axios.get('/user/info').then(res => {
				if (res.status === 200 && res.data.code === 0) {
					const path = getRirectPath(res.data.doc[0]);
					this.props.history.push(path);
				}
			});
		}
	}

	render() {
		return null;
	}
}

export default AuthRouter;
