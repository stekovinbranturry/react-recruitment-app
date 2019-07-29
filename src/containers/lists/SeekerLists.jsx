import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Toast, WingBlank } from 'antd-mobile';
import MainNavBar from '../../components/MainNavBar.jsx';
import ResumeCard from '../../components/ResumeCard.jsx';

const SeekerLists = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get('/user/list?identity=seeker')
      .then(res => {
        if (res.data.code === 1400) {
          setList([...list, ...res.data.doc]);
        } else {
          Toast.info(res.data.msg);
        }
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <MainNavBar title='牛人列表' />
      <WingBlank>
        <ResumeCard list={list} />
      </WingBlank>
    </Fragment>
  );
};

export default SeekerLists;
