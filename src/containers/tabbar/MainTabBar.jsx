import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';

const MainTabBar = props => {
  const path = props.history.location.pathname;
  const PROFILE = ['/login', '/register', '/hunter-profile', '/seeker-profile'];
  const JOBS = '/jobs';
  const MESSAGE = '/message';
  useEffect(() => {
    if (path === JOBS) {
      setSelectedTab('jobs');
    }
    if (path === MESSAGE) {
      setSelectedTab('message');
    }
    if (PROFILE.includes(path)) {
      setSelectedTab('login');
    }
  }, [path, PROFILE]);
  const [selectedTab, setSelectedTab] = useState('');

  const handleOnPress = name => {
    setSelectedTab(name);
    props.history.push(`/${name}`);
  };
  return (
    <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
      <TabBar
        unselectedTintColor='#949494'
        tintColor='#33A3F4'
        barTintColor='white'
      >
        <TabBar.Item
          icon={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg'
          }}
          selectedIcon={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg'
          }}
          title='职位'
          key='jobs'
          dot
          selected={selectedTab === 'jobs'}
          onPress={() => handleOnPress('jobs')}
        />
        <TabBar.Item
          icon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
          }}
          selectedIcon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'
          }}
          title='消息'
          key='message'
          dot
          selected={selectedTab === 'message'}
          onPress={() => handleOnPress('message')}
        />
        <TabBar.Item
          icon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'
          }}
          selectedIcon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'
          }}
          title='我的'
          key='login'
          selected={selectedTab === 'login'}
          onPress={() => handleOnPress('login')}
        />
      </TabBar>
    </div>
  );
};

export default withRouter(MainTabBar);
