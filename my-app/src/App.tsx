import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <header className="app_header">
      <div className="main-container">
        <h2 className="App-name">Coin Tracker</h2>
        <p className="sub-text">Let cTracker update you for YOU!</p>
        <form action="/" className="coin-input-content">
          <div className="coin-name-layout">
               <label htmlFor="coin-name" ></label>
              <input type="text" id="coin-name" placeholder="Enter your Coin" className="coin-name" required/>
              <button className="btn-first-action">Continue <i className="fa-solid fa-chevron-right"></i></button>
          </div>

          <div className="coin-holding-layout">
              <label htmlFor="holdings">How much coin are you holding?</label>
              <input type="number" name="holdings" placeholder="Coin amount" id="holdings" required/>
              <div className="btn-section">
              <button className="go-back-btn"><i className="fa-solid fa-chevron-left"></i> back </button>
              <button className="move-from-holdings">Next <i className="fa-solid fa-chevron-right"></i></button>
              </div>
          </div>
        </form>
      </div>
    </header>
  );
}

export default App;
