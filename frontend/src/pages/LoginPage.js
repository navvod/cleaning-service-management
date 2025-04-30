import React from 'react';
import Navbar from '../components/common/Navbar';
import LoginForm from '../components/user/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Sign In to Continue</h1>
        <p>Please log in to access your account.</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;