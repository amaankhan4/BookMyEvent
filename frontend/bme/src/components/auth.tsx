import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className='formTitle'>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-link">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={toggleForm}>{isLogin ? 'Sign Up' : 'Login'}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
