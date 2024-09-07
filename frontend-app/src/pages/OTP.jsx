import React, { useEffect, useState, useRef } from 'react';
import './OTP.css';

const OTP = ({ phone }) => {
  const [seconds, updateSeconds] = useState(30);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [blink, setBlink] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateSeconds(prevCount => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(interval);
          setBlink(true);
          return 0; // Ensure count remains 0 after clearInterval
        }
      });
    }, 1000);

    // Clear the interval when component unmounts to avoid memory leaks
    return () => clearInterval(interval);
  }, [seconds]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus the next input box if a number is entered
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all inputs are filled
    if (newOtp.every(item => item !== "")) {
      setIsOtpValid(true);
    } else {
      setIsOtpValid(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Add your OTP verification logic here
    if (enteredOtp === "123456") { // Replace with actual validation logic
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  const handleResend = () => {
    // Send OTP again
    console.log("Resending OTP to:", phone);
    // Logic to send OTP to the phone number
    setBlink(false);
    updateSeconds(30);
  };

  return (
    <div className='container'>
      <div className='main'>
        <h2>OTP Verification</h2>
        <h3>Verify with OTP</h3>
        <p id='number-p'>sent to <span>{phone}</span></p>
        <p id='otp-p'>OTP will expire in <span>{seconds}</span>s</p>
        <div className="row">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              className={data !== "" ? 'filled' : ''}
              onChange={e => handleChange(e.target, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              ref={el => inputRefs.current[index] = el}
            />
          ))}
        </div>
        <button id="otp-button"
        onClick={handleSubmit} 
        disabled={!isOtpValid} 
        className={isOtpValid ? 'enabled' : 'disabled'}
        >
          Verify
        </button>
        <p id='resend-p' className={blink ? 'blink' : ''}>Resend OTP? <a href='handle' onClick={handleResend}>request again</a></p>
      </div>
    </div>
  )
}
export default OTP;