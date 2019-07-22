import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { useCookies } from 'react-cookie';

const Logout = props => {
	const removeCookie = useCookies(['userid'])[2];

	const logout = () => {
		removeCookie('userid');
		props.history.push('/login');
	};
	return <Button onClick={logout}>退出登录</Button>;
};

export default withRouter(Logout);
