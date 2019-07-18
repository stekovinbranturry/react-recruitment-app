import React, { Fragment, useState } from 'react';
import {
  Radio,
  List,
  InputItem,
  Button,
  WhiteSpace,
  WingBlank
} from 'antd-mobile';
import Logo from '../../components/Logo';

const RadioItem = Radio.RadioItem;
function Register() {
  const [identity, setIdentity] = useState('employee');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const registerInfo = {identity, number, password, rePassword};
  const handleRegister = () =>{
    console.log(registerInfo);
  }
  return (
    <Fragment>
      <Logo />
      <WingBlank>
        <List>
          <InputItem
            type='phone'
            placeholder='186 1234 1234'
            value={number}
            onChange={v => setNumber(v)}
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
          <InputItem
            type='password'
            placeholder='****'
            value={rePassword}
            onChange={v => setRePassword(v)}
          >
            确认密码
          </InputItem>
        </List>
        <div className='input-title'>选择身份：</div>
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
        <WhiteSpace size='xl' />
        <Button type='primary' onClick={handleRegister}>注册</Button>
      </WingBlank>
    </Fragment>
  );
}

export default Register;
