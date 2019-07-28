import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import { Grid, Flex, Toast } from 'antd-mobile';
import UserStoreContext from '../stores/user.store';

const AvatarSelector = () => {
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

	const store = useContext(UserStoreContext);
	const { user, updateUser } = store;
	const { avatar } = user;

	const uploadAvatar = avatar => {
		axios
			.post('/user/uploadAvatar', { avatar })
			.then(res =>
				res.data.code === 1200
					? updateUser({ avatar })
					: Toast.info(res.data.msg)
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

export default observer(AvatarSelector);
