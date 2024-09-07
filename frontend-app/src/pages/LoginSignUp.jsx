import React, { useState }  from 'react'
import './LoginSignUp.css';
import  OTP  from './OTP';
import 'react-phone-number-input/style.css'

const LoginSignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [toggle,setToogle] = useState(false);

  
  const handleSubmit =  (e)=>{
    e.preventDefault();
    setToogle(true);
  }

  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };


  const handleKeyDown = (e) => {
    // Allow only digits, backspace, delete, arrow keys, and tab
    if (
      !/^\d$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Tab'
    ) {
      e.preventDefault();
    }
  };

  
  return (<>
   
      {
        toggle === true ? 
           <OTP phone ={phoneNumber}/> :
           <div className='login-main'>
            <div className="login-inner-1">
                  <form className='form-login'  onSubmit={handleSubmit} >
                      <b id='login-bold'>Login <span id='span'>or</span> SignUp</b>
                      <div className="phone-input-container">
                        <span className={`phone-input-prefix ${isFocused ? 'focused' : ''}`}>+91 |</span>
                          <input
                            type="tel"
                            className={`phone-input ${isFocused ? 'focused' : ''}`}
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            maxLength={10}
                            onKeyDown={handleKeyDown}
                          />
                      </div>
                      <p className='paragraph-policy'>By Continuing, I agree to the <b id='paragraph-bold'>Terms of Use & Privacy Policy</b></p>
                        <button type='submit' id='button'>CONTINUE</button>
                  </form>
                  <div className="login-inner-2">
                     <p>Having trouble logging in? <b>Get help</b></p>
                  </div>
              </div>
            </div> 
      }
   
    </>
  )
}

export default LoginSignUp;

