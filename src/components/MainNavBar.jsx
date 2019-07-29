import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';

const MainNavBar = ({ title }) => {
  return (
    <NavBar className='nav-bar' mode='dark'>
      {title}
    </NavBar>
  );
};

MainNavBar.propTypes = {
  title: PropTypes.string
};

MainNavBar.defaultProps = {
  title: 'Navbar'
};

export default MainNavBar;
