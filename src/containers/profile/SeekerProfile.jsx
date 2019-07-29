import React, { useContext, useState, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import {
  NavBar,
  WhiteSpace,
  WingBlank,
  InputItem,
  List,
  Toast,
  TextareaItem,
  Button
} from 'antd-mobile';
import Logout from '../../components/Logout.jsx';
import AvatarSelector from '../../components/AvatarSelector.jsx';
import UserStoreContext from '../../stores/user.store';

const SeekerProfile = () => {
  const store = useContext(UserStoreContext);
  const { updateUser } = store;
  // console.log(user, updateUser);

  useEffect(() => {
    axios
      .post('/user/query')
      .then(res => {
        if (res.data.code === 1300) {
          const { avatar } = res.data.doc;
          updateUser({ avatar });
          setInput(res.data.doc);
        }
      })
      .catch(err => console.log(err));
  }, [updateUser]);

  const [editable, setEditable] = useState(false);
  const [input, setInput] = useState({
    position: '',
    name: '',
    age: '',
    education: '',
    skills: '',
    workExperience: '',
    projectExperience: ''
  });

  const {
    position,
    name,
    age,
    education,
    skills,
    workExperience,
    projectExperience
  } = input;

  const handleConfirmUpdate = () => {
    console.log(input);
    axios
      .post('/user/update', input)
      .then(res => Toast.info(res.data.msg))
      .catch(err => console.log(err));
    setEditable(false);
  };

  return (
    <Fragment>
      <NavBar className='nav-bar' mode='dark'>
        牛人个人信息页
      </NavBar>
      <div className='page-content'>
        <WingBlank>
          <AvatarSelector />
          <div className='input-title'>个人简历</div>
          <List>
            <InputItem
              value={position}
              onChange={v => setInput({ ...input, position: v })}
              editable={editable}
            >
              职位
            </InputItem>
            <InputItem
              value={name}
              onChange={v => setInput({ ...input, name: v })}
              editable={editable}
            >
              姓名
            </InputItem>
            <InputItem
              value={age}
              onChange={v => setInput({ ...input, age: v })}
              editable={editable}
            >
              年龄
            </InputItem>
            <InputItem
              value={education}
              onChange={v => setInput({ ...input, education: v })}
              editable={editable}
            >
              学历
            </InputItem>
            <TextareaItem
              title='技能'
              rows={3}
              autoHeight
              value={skills}
              onChange={v => setInput({ ...input, skills: v })}
              editable={editable}
            />
            <TextareaItem
              title='工作经验'
              rows={3}
              autoHeight
              value={workExperience}
              onChange={v => setInput({ ...input, workExperience: v })}
              editable={editable}
            />
            <TextareaItem
              title='项目经验'
              rows={3}
              autoHeight
              value={projectExperience}
              onChange={v => setInput({ ...input, projectExperience: v })}
              editable={editable}
            />
          </List>
          <WhiteSpace size='lg' />
          {editable ? (
            <Button type='primary' onClick={handleConfirmUpdate}>
              确认更新
            </Button>
          ) : (
            <Button type='primary' onClick={() => setEditable(true)}>
              编辑简历
            </Button>
          )}
          <WhiteSpace size='lg' />
          <Logout />
          <WhiteSpace size='lg' />
        </WingBlank>
      </div>
    </Fragment>
  );
};

export default observer(SeekerProfile);
