import React, { Fragment, useState } from 'react';
import io from 'socket.io-client';
import { List, InputItem, Icon, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import MainNavBar from '../../components/MainNavBar.jsx';

const Chat = props => {
	const { user } = props.match.params;
	const socket = io('ws://localhost:3001');
	const [input, setInput] = useState('');
	return (
		<Fragment>
			<MainNavBar title={`正在与${user}聊天`} />
			<Icon
				type='left'
				size='lg'
				onClick={() => {
					props.history.push('/message');
				}}
			/>
			<WingBlank>
				<List className='chat-input'>
					<InputItem value={input} extra='发送' onChange={v => setInput(v)} />
				</List>
			</WingBlank>
		</Fragment>
	);
};

export default withRouter(Chat);
