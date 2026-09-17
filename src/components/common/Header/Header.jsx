import React from 'react';
import Navbar from '../Navbar/Navbar';

export const Header = () => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%'
      }}
    >
      <Navbar />
    </header>
  );
};

export default Header;
