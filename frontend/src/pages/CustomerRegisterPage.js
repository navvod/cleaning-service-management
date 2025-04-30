import React from 'react';
import Navbar from '../components/common/Navbar';
import CustomerSignup from '../components/user/CustomerSignup';

const CustomerRegisterPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Customer Sign Up</h1>
        <p>Create your customer account to start booking services.</p>
        <CustomerSignup />
      </div>
    </div>
  );
};

export default CustomerRegisterPage;