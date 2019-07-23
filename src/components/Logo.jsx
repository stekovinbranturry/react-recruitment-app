import React from 'react';
import logoImg from '../image/logo.png';

const Logo = () => {
  return (
    <div className='logo-image'>
      <img src={logoImg} alt='logo' />
    </div>
  );
};

export default Logo;
