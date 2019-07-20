import React, { Fragment, useState } from 'react';
import axios from 'axios';
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
	FORM_BLANK_ERROR
} from '../../constants/error';

const RadioItem = Radio.RadioItem;
function Register() {
	// hooks
	const [identity, setIdentity] = useState('employee');
	const [phone, setPhone] = useState('');
	const [phoneErr, setPhoneErr] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const registerInfo = { identity, phone, password };

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
		console.log(registerInfo);
		axios('/user');
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
						checked={identity === 'employee'}
						onClick={() => setIdentity('employee')}
					>
						牛人
					</RadioItem>
					<RadioItem
						checked={identity === 'employer'}
						onClick={() => setIdentity('employer')}
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
