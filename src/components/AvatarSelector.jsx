import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Flex, Toast } from 'antd-mobile';

const AvatarSelector = props => {
	const avatars = [
		'boy',
		'bull',
		'chick',
		'crab',
		'girl',
		'hedgehog',
		'hippopotamus',
		'koala',
		'lemur',
		'man',
		'pig',
		'tiger',
		'whale',
		'woman',
		'zebra'
	];

	const data = avatars.map(item => ({
		icon: require(`../image/avatars/${item}.png`),
		text: item
	}));

	const { avatar, setAvatar } = props;

	const uploadAvatar = avatar => {
		axios
			.post('/user/uploadAvatar', { avatar })
			.then(res =>
				res.data.code === 1200 ? setAvatar(avatar) : Toast.info(res.data.msg)
			)
			.catch(err => console.log(err));
	};

	return avatar ? (
		<Flex justify="center">
			<img
				className="avatar"
				src={require(`../image/avatars/${avatar}.png`)}
				alt={avatar}
			/>
		</Flex>
	) : (
		<div>
			<div className="input-title">请选择头像：</div>
			<Grid data={data} columnNum={5} onClick={_el => uploadAvatar(_el.text)} />
		</div>
	);
};

AvatarSelector.propTypes = {
	avatar: PropTypes.string,
	setAvatar: PropTypes.func
};

export default AvatarSelector;
