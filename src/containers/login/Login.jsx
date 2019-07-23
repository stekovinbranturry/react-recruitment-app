import React, { useState, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Toast,
  List,
  InputItem,
  Button,
  WhiteSpace,
  WingBlank
} from 'antd-mobile';
import Logo from '../../components/Logo.jsx';
import {
  PHONE_LENGTH_ERROR,
  LOGIN_FORM_BLANK_ERROR
} from '../../constants/info';
import { getRirectPath } from '../../utils/user';
import { createLoginAction } from '../../reducers/user.redux';

function Login(props) {
  // hooks
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneErr, setPhoneErr] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const loginInfo = { phone, password };

  const dispatch = useDispatch();

  const phoneOnChange = phone => {
    if (phone.replace(/\s/g, '').length < 11) {
      setPhoneErr(true);
    } else {
      setPhoneErr(false);
    }
    setPhone(phone);
  };

  const onErrorClick = () => {
    if (phoneErr) {
      Toast.info(PHONE_LENGTH_ERROR, 1);
    }
  };

  // form validate
  const handleLogin = () => {
    if (!phone || !password) {
      Toast.info(LOGIN_FORM_BLANK_ERROR, 1);
      return;
    }
    if (phone.replace(/\s/g, '').length < 11) {
      Toast.info(PHONE_LENGTH_ERROR, 1);
      return;
    }

    axios
      .post('/user/login', loginInfo)
      .then(res => {
        if (res.status === 200 && res.data.code === 1101) {
          Toast.info(res.data.msg);
        }
        if (res.status === 200 && res.data.code === 1100) {
          const { phone, avatar, identity } = res.data.doc;
          dispatch(createLoginAction({ phone, avatar, identity }));
          setRedirectPath(getRirectPath(res.data.doc));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      {redirectPath ? <Redirect to={redirectPath} /> : null}
      <Logo />
      <WingBlank>
        <List>
          <InputItem
            type='phone'
            placeholder='186 1234 1234'
            error={phoneErr}
            onErrorClick={onErrorClick}
            value={phone}
            onChange={phoneOnChange}
          >
            手机号码
          </InputItem>
          <InputItem
            type='password'
            placeholder='****'
            value={password}
            onChange={v => setPassword(v)}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace size='xl' />
        <Button type='primary' onClick={handleLogin}>
          登录
        </Button>
        <WhiteSpace />
        <Button type='primary' onClick={() => props.history.push('/register')}>
          注册
        </Button>
      </WingBlank>
    </Fragment>
  );
}

export default withRouter(Login);
