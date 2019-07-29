import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import UserStoreContext from '../stores/user.store';

const MainTabBar = props => {
  const UserStore = useContext(UserStoreContext);
  const { identity } = UserStore.user;

  const path = props.location.pathname;
  const isLogin = !['/login', '/register'].includes(path);

  const [PROFILE, LISTS, MESSAGE] = [
    identity === 'hunter' ? '/hunter-profile' : '/seeker-profile',
    identity === 'hunter' ? '/seeker-lists' : '/hunter-lists',
    '/message'
  ];
  const [PROFILE_TITLE, LISTS_TITLE, MESSAGE_TITLE] = [
    '我的',
    identity === 'hunter' ? '牛人列表' : 'BOSS列表',
    '消息'
  ];

  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    if (path === PROFILE) {
      setSelectedTab(PROFILE);
    }
    if (path === LISTS) {
      setSelectedTab(LISTS);
    }
    if (path === MESSAGE) {
      setSelectedTab(MESSAGE);
    }
  }, [selectedTab, path, LISTS, MESSAGE, PROFILE]);

  const handleOnPress = name => {
    setSelectedTab(name);
    props.history.push(name);
  };

  return (
    <div className='tab-bar' style={{ display: isLogin ? 'block' : 'none' }}>
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
          title={LISTS_TITLE}
          key={LISTS}
          dot
          selected={selectedTab === LISTS}
          onPress={() => handleOnPress(LISTS)}
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
          title={MESSAGE_TITLE}
          key={MESSAGE}
          dot
          selected={selectedTab === MESSAGE}
          onPress={() => handleOnPress(MESSAGE)}
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
          title={PROFILE_TITLE}
          key={PROFILE}
          selected={selectedTab === PROFILE}
          onPress={() => handleOnPress(PROFILE)}
        />
      </TabBar>
    </div>
  );
};

export default withRouter(MainTabBar);
