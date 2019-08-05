import React, { Fragment } from 'react';
import MainNavBar from '../../components/MainNavBar.jsx';

const Chat = props => {
	const { user } = props.match.params;
	return (
		<Fragment>
			<MainNavBar title={`正在与${user}聊天`} />
			<div>chat with: {user}</div>
		</Fragment>
	);
};

export default Chat;
