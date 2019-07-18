import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Logo from '../../components/Logo';

@withRouter
class Login extends Component {
  render() {
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
          </List>
          <WhiteSpace size='xl' />
          <Button type='primary'>登录</Button>
          <WhiteSpace />
          <Button
            type='primary'
            onClick={() => this.props.history.push('/register')}
          >
            注册
          </Button>
        </WingBlank>
      </Fragment>
    );
  }
}

export default Login;
