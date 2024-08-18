import React, { useState } from 'react';

const AuthPage:React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const authreq = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event?.preventDefault();
    if(isLogin){
    const request = new Request('http://localhost:3000/event-m/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'evmEmail':(document.getElementById('email') as HTMLInputElement).value,
          'evmPassword':(document.getElementById('password') as HTMLInputElement).value
        })
      }
    );
    try{
      const response = await fetch(request);
      console.log(response)
      if(!response.ok){
        throw new Error(`HTTP error! Status${response.status}`)
      }
      const data = await response.json()
      console.log(response,data)

    }
    catch(error){
      console.log(error)
    }
  }
  else{
    const request = new Request('http://localhost:3000/event-m/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'evmName':(document.getElementById('name') as HTMLInputElement).value,
          'evmEmail':(document.getElementById('email') as HTMLInputElement).value,
          'evmPassword':(document.getElementById('password') as HTMLInputElement).value,
          'evmUserId':(document.getElementById('userid') as HTMLInputElement).value
        })
      }
    );
    try{
      const response = await fetch(request);
      console.log(response)
      if(response.status !== 201){
        throw new Error(`HTTP error! Status ${response.status}`)
      }
      const data = await response.json()
      console.log(response,data)

    }
    catch(error){
      console.log(error)
    }
  }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className='formTitle'>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="userid">User Id</label>
              <input type="text" id="userid" name="userid" required />
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
          <button type="submit" className="auth-button" onClick={authreq}>
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
