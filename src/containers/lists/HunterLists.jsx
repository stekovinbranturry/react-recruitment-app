import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Toast, WingBlank } from 'antd-mobile';
import MainNavBar from '../../components/MainNavBar.jsx';
import JobCard from '../../components/JobCard.jsx';

const HunterLists = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get('/user/list?identity=hunter')
      .then(res => {
        if (res.data.code === 1400) {
          let tmp = [];
          res.data.doc.forEach(el => {
            tmp = [...tmp, ...el.jobsHunting];
          });
          console.log(tmp);
          setJobs([...jobs, ...tmp]);
        } else {
          Toast.info(res.data.msg);
        }
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <MainNavBar title='BOSS列表' />
      <WingBlank>
        <JobCard jobs={jobs} />
      </WingBlank>
    </Fragment>
  );
};

export default HunterLists;
