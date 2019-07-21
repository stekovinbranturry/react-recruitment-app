import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Radio,
	List,
	InputItem,
	Button,
	WhiteSpace,
	WingBlank,
	Toast
} from 'antd-mobile';
import Logo from '../../components/Logo';
import {
	PHONE_LENGTH_ERROR,
	PASSWORD_NOT_MATCH,
	FORM_BLANK_ERROR,
	REGISTER_SUCCESS
} from '../../constants/info';
import { getRirectPath } from '../../utils/user';
import { createRegisterAction } from '../../reducers/user.redux';

const RadioItem = Radio.RadioItem;
function Register() {
	// hooks
	const [identity, setIdentity] = useState('seeker');
	const [phone, setPhone] = useState('');
	const [phoneErr, setPhoneErr] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [redirectPath, setRedirectPath] = useState('');

	const registerInfo = { identity, phone, password };

	const dispatch = useDispatch();
	// form validate
	const handleRegister = () => {
		if (!phone || !password || !confirmPassword) {
			Toast.info(FORM_BLANK_ERROR, 1);
			return;
		}
		if (phone.replace(/\s/g, '').length < 11) {
			Toast.info(PHONE_LENGTH_ERROR, 1);
			return;
		}
		if (password !== confirmPassword) {
			Toast.info(PASSWORD_NOT_MATCH, 1);
			return;
		}

		axios
			.post('/user/register', registerInfo)
			.then(res => {
				if (res.status === 200 && res.data.code === 1001) {
					Toast.info(res.data.msg);
				}
				if (res.status === 200 && res.data.code === 1000) {
					Toast.info(REGISTER_SUCCESS);
					dispatch(createRegisterAction({ phone, identity }));
					setRedirectPath(getRirectPath(registerInfo));
				}
			})
			.catch(err => console.log(err));
	};

	// phone error
	const onErrorClick = () => {
		if (phoneErr) {
			Toast.info(PHONE_LENGTH_ERROR, 1);
		}
	};
	const phoneOnChange = phone => {
		if (phone.replace(/\s/g, '').length < 11) {
			setPhoneErr(true);
		} else {
			setPhoneErr(false);
		}
		setPhone(phone);
	};

	return (
		<Fragment>
			{redirectPath ? <Redirect to={redirectPath} /> : null}
			<Logo />
			<WingBlank>
				<List>
					<InputItem
						type="phone"
						placeholder="186 1234 1234"
						error={phoneErr}
						onErrorClick={onErrorClick}
						value={phone}
						onChange={phoneOnChange}
					>
						手机号码
					</InputItem>
					<InputItem
						type="password"
						placeholder="****"
						value={password}
						onChange={v => setPassword(v)}
					>
						密码
					</InputItem>
					<InputItem
						type="password"
						placeholder="****"
						value={confirmPassword}
						onChange={v => setConfirmPassword(v)}
					>
						确认密码
					</InputItem>
				</List>
				<div className="input-title">选择身份：</div>
				<List>
					<RadioItem
						checked={identity === 'seeker'}
						onClick={() => setIdentity('seeker')}
					>
						牛人
					</RadioItem>
					<RadioItem
						checked={identity === 'hunter'}
						onClick={() => setIdentity('hunter')}
					>
						BOSS
					</RadioItem>
				</List>
				<WhiteSpace size="xl" />
				<Button type="primary" onClick={handleRegister}>
					注册
				</Button>
			</WingBlank>
		</Fragment>
	);
}

export default Register;
