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
  return (
    <Fragment>
      <Logo />
      <WingBlank>
        <List>
          <InputItem type='phone' placeholder='186 1234 1234'>
            手机号码
          </InputItem>
          <InputItem type='password' placeholder='****'>
            密码
          </InputItem>
          <InputItem type='password' placeholder='****'>
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
        <WhiteSpace />
        <WhiteSpace />
        <Button type='primary'>注册</Button>
      </WingBlank>
    </Fragment>
  );
}

export default Register;
