import React from 'react';
import './src/component/auth/SignupForm.css';

const SignupForm = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup successful! You can now log in.');
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
