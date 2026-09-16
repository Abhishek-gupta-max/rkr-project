import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Services from '../pages/Services/Services';
import Process from '../pages/Process/Process';
import WhyUs from '../pages/WhyUs/WhyUs';
import Requirements from '../pages/Requirements/Requirements';
import Contact from '../pages/Contact/Contact';
import Jobs from '../pages/Jobs/Jobs';
import JobDetails from '../pages/JobDetails/JobDetails';
import ApplyJob from '../pages/ApplyJob/ApplyJob';

// Auth Pages
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Admin Pages
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminApplications from '../pages/Admin/Applications';
import AdminRequirements from '../pages/Admin/Requirements';
import AdminSettings from '../pages/Admin/Settings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes under MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-info" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:slug" element={<JobDetails />} />
        <Route path="/apply" element={<ApplyJob />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Login Route (without main header/footer layout) */}
      <Route path="/admin-login" element={<Login />} />

      {/* Guarded Admin Routes under AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="requirements" element={<AdminRequirements />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
