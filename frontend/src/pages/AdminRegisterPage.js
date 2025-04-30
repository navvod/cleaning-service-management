import React from 'react';
import Navbar from '../components/common/Navbar';
import AdminSignup from '../components/user/AdminSignup';

const AdminRegisterPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Admin Sign Up</h1>
        <p>Create your admin account to manage services.</p>
        <AdminSignup />
      </div>
    </div>
  );
};

export default AdminRegisterPage;