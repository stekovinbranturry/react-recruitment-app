import React, { useContext, useState, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import uuid from 'uuid/v4';
import {
  NavBar,
  WhiteSpace,
  WingBlank,
  InputItem,
  List,
  TextareaItem,
  Button,
  Toast,
  Card
} from 'antd-mobile';
import {
  FORM_BLANK_ERROR,
  JOB_PUBLISH_SUCCESS,
  JOB_PUBLISH_FAILURE
} from '../../constants/info';
import { dateFormat } from '../../utils/date';
import Logout from '../../components/Logout.jsx';
import AvatarSelector from '../../components/AvatarSelector.jsx';
import UserStoreContext from '../../stores/user.store';

const HunterProfile = () => {
  const store = useContext(UserStoreContext);
  const { updateUser } = store;
  /**
   * Get user profile and job list from db
   * Run once only
   */
  useEffect(() => {
    axios
      .post('/user/query')
      .then(res => {
        if (res.data.code === 1300) {
          const { avatar, jobsHunting } = res.data.doc;
          updateUser({ avatar });
          setJobs([...jobs, ...jobsHunting]);
        }
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  /**
   * Hooks
   */
  const [jobs, setJobs] = useState([]);
  const [input, setInput] = useState({
    company: '',
    title: '',
    salary: '',
    desc: ''
  });

  /**
   * Handle actions
   */

  const publishJob = () => {
    const { company, title, salary, desc } = input;
    if (!company || !title || !salary || !desc) {
      Toast.info(FORM_BLANK_ERROR, 1);
      return;
    }
    const jobsHunting = {
      jobID: uuid(),
      company,
      title,
      salary,
      desc,
      createTime: dateFormat()
    };
    axios
      .post('/user/update', { jobsHunting })
      .then(res => {
        if (res.data.ok === 1) {
          Toast.info(JOB_PUBLISH_SUCCESS);
          setJobs([...jobs, jobsHunting]);
          setInput({
            company: '',
            title: '',
            salary: '',
            desc: ''
          });
        } else {
          Toast.info(JOB_PUBLISH_FAILURE);
        }
      })
      .catch(err => console.log(err));
  };

  /**
   * Jobs list published component
   */
  const jobsList = jobs.map(item => {
    const { jobID, company, title, salary, desc, createTime } = item;
    return (
      <Card key={jobID}>
        <Card.Header title={title} extra={<span>{company}</span>} />
        <Card.Body>
          <div>{`薪资：${salary}`}</div>
          <div>{`要求：${desc}`}</div>
        </Card.Body>
        <Card.Footer content={`发布时间：${createTime}`} />
      </Card>
    );
  });

  return (
    <Fragment>
      <NavBar className='nav-bar' mode='dark'>
        BOSS个人信息页
      </NavBar>
      <div className='page-content'>
        <WingBlank>
          <AvatarSelector />
          {jobs[0] ? (
            <div>
              <div className='input-title'>已发布职位</div>
              {jobsList}
            </div>
          ) : null}
          <div className='input-title'>发布新职位</div>
          <List>
            <InputItem
              placeholder='XXX公司'
              value={input.company}
              onChange={v => setInput({ ...input, company: v })}
            >
              公司名称
            </InputItem>
            <InputItem
              placeholder='软件工程师'
              value={input.title}
              onChange={v => setInput({ ...input, title: v })}
            >
              职位名称
            </InputItem>
            <InputItem
              placeholder='10k - 20k'
              value={input.salary}
              onChange={v => setInput({ ...input, salary: v })}
            >
              薪资水平
            </InputItem>
            <TextareaItem
              title='职位描述'
              rows={5}
              placeholder='描述您即将发布的职位要求'
              autoHeight
              value={input.desc}
              onChange={v => setInput({ ...input, desc: v })}
            />
          </List>
          <WhiteSpace size='lg' />
          <Button type='primary' onClick={publishJob}>
            确认发布
          </Button>
          <WhiteSpace size='lg' />
          <Logout />
          <WhiteSpace size='lg' />
        </WingBlank>
      </div>
    </Fragment>
  );
};

export default observer(HunterProfile);
