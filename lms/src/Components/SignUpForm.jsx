import React, { useState } from 'react'

export default function SignUpForm() {

    const [isLogin, setIsLogin] = useState(true)
    const headingText = isLogin ? 'Login Form' : 'SignUp Form';
    const buttonText = isLogin ? 'Login' : 'SignUp';
  return (
    <div className='container'>
        <div className='form-container'>
            <div className='form-toggle'>
                <button className= {isLogin ? 'active' : '' } onClick={() => setIsLogin(true)}>Login</button>
                <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>SignUP</button>

            </div>
            <>
            <div className='form'> 
            <h2>{headingText}</h2>
            <input type='email' placeholder='Email' />
            <input type='password' placeholder='Password' />
            {isLogin ? <a href="#">Forgot Password?</a> : <input type='password' placeholder='Confirm Password' />}
            <button>{buttonText}</button>
            {isLogin ? <p>Not a Member? <a href="#" onClick={() => setIsLogin(false)}>SignUp Now</a></p> : null}
            </div>
            </>

        </div>   
    </div>
  )
}
