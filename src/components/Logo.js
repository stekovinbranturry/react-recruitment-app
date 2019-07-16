import React from 'react';
import logoImg from '../image/logo.png';
import '../style/index.css';

const Logo = () => {
  return (
    <div className='logo-image'>
      <img src={logoImg} alt='logo' />
    </div>
  );
};

export default Logo;
