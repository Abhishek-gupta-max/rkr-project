import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import Loader from '../components/common/Loader/Loader';
import FloatingActions from '../components/common/FloatingActions/FloatingActions';
import { useAppContext } from '../context/AppContext';

export const MainLayout = () => {
  const { pathname } = useLocation();
  const { globalLoading } = useAppContext();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--cream)' }}>
      {globalLoading && <Loader />}

      {/* Header — Navbar uses position:sticky internally */}
      <Header />

      {/* Main Page Area */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Floating Contact Actions (desktop pill stack + mobile sticky bar) */}
      <FloatingActions />
    </div>
  );
};

export default MainLayout;
