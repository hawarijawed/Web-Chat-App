import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup,login } from '../../config/firebase';


const Login = () => {
    const [currState, setCurrState] = useState('Sign up');

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        if(currState == 'Sign up'){
          signup(userName, email, password);
        }
        else{
          login(email, password);
        }
    }


  return (
    <div className='login'>
      <img src={assets.logo_big} alt='login image' className='logo'/>
      <form onSubmit={onSubmitHandler} className='login-form'>
        <h2>{currState}</h2>
        {currState === 'Sign up'?<input onChange={(e) =>setUserName(e.target.value)} value={userName} type="text" placeholder='user name' className="form-input" required/>:null}
        <input onChange={(e) =>setEmail(e.target.value)} value={email} type="email" placeholder='email' className="form-input" required/>
        <input onChange={(e) =>setPassword(e.target.value)} value={password} type="password" placeholder='password' className="form-input" required/>
        {currState === 'Sign up'?<button type="submit" >Sign Up</button>:<button type="submit">Sign in</button>}
        <div className="login-term">
            <input type='checkbox' id='myCheck' required/>
            <p>Agree to the terms of use & privacy policy</p>
        </div>      
        <div className="login-forgot">
            {currState === 'Sign up'
            ?<p className='login-toggle'>Already have an account <span onClick={()=>setCurrState("Login")}>click here </span></p>
            :<p className='login-toggle'>Don't have an account <span onClick={()=>setCurrState("Sign up")}>click here </span></p>}
            
        </div>
      </form>
    </div>
  )
}

export default Login
