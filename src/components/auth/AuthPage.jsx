import React, { useState } from 'react';
import LoginForm from 'src/components/auth/LoginForm';
import SignupForm from 'src/components/auth/SignupForm';
import 'src/components/auth/AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {isLogin ? <LoginForm /> : <SignupForm />}
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
