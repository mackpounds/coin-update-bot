import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [step, setSteps] = useState(0)
    const nextStep = () => {
        setSteps((prev) => prev + 1);
    };
    const prevStep = () => {
        setSteps((prev) => prev - 1);
    };
  return (
    <header className="app_header">
      <div className="main-container">
        <h2 className="App-name">Coin Tracker</h2>
        <p className="sub-text">Let cTracker update you for YOU!</p>
        <form action="/" className="coin-input-content">
            {step === 0 && (
          <div className="coin-name-layout">
               <label htmlFor="coin-name" ></label>
              <input type="text" id="coin-name" placeholder="Enter your Coin" className="coin-name" required/>
              <button onClick={nextStep} className="btn-first-action" >Continue <i className="fa-solid fa-chevron-right"></i></button>
          </div>
            )}

            {step === 1 && (
          <div className="coin-holding-layout">
              <label htmlFor="holdings" className="label-holding-coin">How much coin are you holding?
              <input type="number" name="holdings" placeholder="Coin amount" id="holdings" required/></label>
              <div className="btn-section">
              <button onClick={prevStep} className="go-back-btn"><i className="fa-solid fa-chevron-left"></i> back </button>
              <button onClick={nextStep} className="move-from-holdings">Next <i className="fa-solid fa-chevron-right"></i></button>
              </div>
          </div>
            )}

            {step === 2 && (
            <div className="coin-price-layout">
                <div className="price-update">
                    <span className="price-alert">Your <code>coin</code> current price is now <code>$2000</code></span>
                </div>
                <div className="btn-section">
                  <button onClick={prevStep} className="go-back-btn"><i className="fa-solid fa-chevron-left"></i> back </button>
                  <button onClick={nextStep} className="move-from-holdings">Next <i className="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>
            )}

            {step === 3 && (
            <div className="coin-threshold-layout">
                <label htmlFor="up-threshold" className="label-threshold-up">
                    Enter the Upper price threshold:
                    <input type="number" name="up-threshold" placeholder="0.5000" id="up-threshold"/>
                </label>
                <label htmlFor="down-threshold" className="label-threshold-down">
                    Enter the Low price threshold:
                    <input type="number" name="down-threshold" placeholder="0.4500" id="down-threshold"/>
                </label>
                <p className="threshold-info"><i className="fa-solid fa-info-circle"></i>  Set the price limit at which you want to be notified when your price goes above or below.</p>
                <div className="btn-section">
              <button onClick={prevStep} className="go-back-btn"><i className="fa-solid fa-chevron-left"></i> back </button>
              <button onClick={nextStep} className="move-from-holdings">Next <i className="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>
            )}

            {step === 4 && (
            <div className="holder-email-layout">
                <label htmlFor="user-email" className="label-email">Enter your email & password
                    <input type="email" name="user-email" placeholder="a@example.com" id="user-email" aria-autocomplete="inline" required/>
                </label>
                <label htmlFor="user-password" className="label-password">
                    <input type="password" name="user-password" placeholder="Password" id="user-password" required/>
                </label>
                <label htmlFor="user-confirm-pass" className="label-confirm-pass">
                    <input type="password" name="user-confirm-pass" placeholder="Confirm password" id="user-confirm-pass" required/>
                </label>
                <div className="btn-section">
                <button onClick={prevStep} className="go-back-btn"><i className="fa-solid fa-chevron-left"></i> back </button>
              <button onClick={nextStep} className="move-from-holdings">Next <i className="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>
            )}

            {step === 5 && (
            <div className="code-authenticator-layout">
                <label htmlFor="code-input" className="code-label">
                    Please input the 4-digit code we sent to your email.
                    <input type="text" name="code-input" id="code-input" placeholder="0000" />
                </label>
                    <p className="code-info"><i className="fa-solid fa-info-circle"></i> Please wait one minutes before requesting for another code.</p>
                    <div className="btn-section">
                       <span className="resend-code">Resend code</span>
                      <button onClick={nextStep} className="move-from-holdings">Done <i className="fa-solid fa-check"></i></button>
                  </div>

            </div>
            )}
        </form>
      </div>
    </header>
  );
}

export default App;
