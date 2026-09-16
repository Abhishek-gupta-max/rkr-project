import React from 'react';
import Navbar from '../Navbar/Navbar';

/**
 * Header wrapper — The Navbar component itself now contains
 * the announcement bar and uses `position: sticky` internally,
 * so this wrapper just renders Navbar directly.
 */
export const Header = () => {
  return (
    <header className="w-full z-50">
      <Navbar />
    </header>
  );
};

export default Header;
