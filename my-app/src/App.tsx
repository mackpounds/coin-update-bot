import axios from "axios";
import React, { useState, useEffect } from 'react';
import './App.css';
import {spawn} from "node:child_process";

function App() {

    // Function to fetch Coins name to ensure there valid crypto coins the user is inputing
     // Ensuring the performance of the input is strictly strong.
    // d5c2ded4-4495-4e8b-ba83-aadb0fb03d44


    // Update coin list with search input and highting
    const getHighlightedText = (text: string, highlight: string) => {
        const index = text.toLowerCase().indexOf(highlight.toLowerCase());
        if (index === -1 || highlight == "") return text;

        const before = text.slice(0, index);
        const match = text.slice(index, index + highlight.length);
        const after = text.slice(index + highlight.length);

        return (
        <>
        {before}
        <code style = {{ backgroundColor: "yellow", color: "black" }}>{match}</code>
        {after}
        </>
        );
    };




    // function CoinList() {
        const [coins, setCoins] = useState<string[]>([]);
        const [input, setInput] = useState("");
        const [isToggleInput, setIsToggleInput] = useState(false);

        useEffect(() => {
            const fetchCoins = async () => {
                try{
                    const response = await fetch("http://localhost:5000/coins")
                    const data = await response.json()
                    setCoins(data.coins)
                } catch (error) {
                    console.error("Error fetching coin :", error)
                }
            };

            fetchCoins();
        }, []);
    // }

     const filteredCoins = coins.filter((coin) =>
            coin.toLowerCase().includes(input.toLowerCase().trim())
        )

    const handToggler = () => {
         setIsToggleInput((prev) => !prev);
    };

     const toggleHelp = () => {
         const container = document.querySelector(".card-popup-container")
         if(container && !container.classList.contains(".active")) {
             container.classList.add("active")
         }
     }


    // send the input details to python for security
    const handleSubmit = async () => {
        const formData ={
            coinName,
            holdings,
            upThreshold,
            downThreshold,
            userEmail,
            userPassword,
            userConfirmPass,
            codeAuth,
        }

        const response = await fetch("http://localhost:5000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result.message)
    }



    // For the form indexes
    const [step, setSteps] = useState(0)
    // for Next | back buttons
    const [direction, setDirection] = useState<"next" | "back" | null>(null);

    // useState for each Input
    const [coinName, setCoinName] = useState("");
    const [holdings, setHoldings] = useState("");
    const [upThreshold, setUpThreshold] = useState("")
    const [downThreshold, setDownThreshold] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPass, setUserConformPass] = useState("")
    const [codeAuth, setCodeAuth] = useState("")





    // action button, move next | back
    const nextStep = () => {
        setDirection("next")
        setSteps(prev => Math.max(prev + 1, 0));
    };
    const prevStep = () => {
        setDirection("back")
        setSteps(prev => Math.max(prev - 1, 0));
    };

    const getClass = (index: number) => {
        if (index === step) return `parent next ${direction ===  "back" ? "back": ""}`
        return "parent";
    }


  return (

    <header className="app_header">
        <div className="card-popup-container">
            <i className="fa-solid fa-times"></i>
            <div className="card-container">
                <div className="coin-name-list">
                    <h6>Coins to Track</h6>
                    <span
                        className="fa-solid fa-search"
                        onClick={handToggler}
                    >
                        {isToggleInput}
                    </span>
                </div>
                <div className={`search-container ${isToggleInput ? "active" : ""}`}>
                    <input
                        type="text"
                        placeholder="search coin.."
                        onChange={(e) => setInput(e.target.value)}
                        name="searchCoin"
                        id="searchCoin"/>
                </div>
                <div className="coin-list-content">

                    {filteredCoins.length > 0 ? (
                        filteredCoins.map((coin, index) => (
                            <li key={index}>{getHighlightedText(coin, input)}</li>
                        ))
                    ) : (
                       <p style={{
                           color: "#D3D1D14C",
                           textAlign: "center",
                           width: "100%",
                           height: "100%",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center"
                       }}> Coin not found.</p>
                    )}

                </div>
            </div>
        </div>

      <div className="main-container">
        <h2 className="App-name">Coin Tracker</h2>
        <p className="sub-text">Let cTracker update you for YOU!</p>
        <div  className="coin-input-content">

            {step === 0 && (
          <div className={getClass(0)}>
              <div className="input-container">
               <label
                   htmlFor="coin-name" className="label-coin-name"> Enter your coin

              <input
                  type="text"
                  id="coin-name"
                  value={coinName}
                  onChange={(e) => setCoinName(e.target.value)}
                  placeholder="e.g, bitcoin"
                  className="coin-name"
              />
               </label>
                  <span className="help-icon" onClick={toggleHelp}>
                      <i className="fa-solid fa-question"
                         title="Check the available coin for Tracking">
                      </i></span>
              </div>
              <button
                  onClick={nextStep}
                  className="btn-first-action">
                  Continue
                  <i className="fa-solid fa-chevron-right"></i>
              </button>
          </div>
            )}


            {step === 1 && (
          <div className={getClass(1)}>
              <label
                  htmlFor="holdings"
                  className="label-holding-coin">
                  How much coin are you holding?
              <input
                  type="number"
                  name="holdings"
                  value={holdings}
                  onChange={(e) => setHoldings(e.target.value)}
                  placeholder="Coin amount"
                  id="holdings"
              /></label>
              <div className="btn-section">
              <button
                  onClick={prevStep}
                  className="go-back-btn">
                  <i className="fa-solid fa-chevron-left"></i>
                  back
              </button>
              <button
                  onClick={nextStep}
                  className="move-from-holdings">
                  Next
                  <i className="fa-solid fa-chevron-right"></i>
              </button>
              </div>
          </div>
                )}

            {step === 2 && (
            <div className={getClass(2)}>
                <div className="price-update">
                    <span className="price-alert" >
                        Your <code>coin</code> current price is now <code>$2000</code>

                    </span>
                </div>
                <div className="btn-section">
                  <button
                      onClick={prevStep}
                      className="go-back-btn">
                      <i className="fa-solid fa-chevron-left"></i>
                      back
                  </button>
                  <button
                      onClick={nextStep}
                      className="move-from-holdings">
                      Next
                      <i
                          className="fa-solid fa-chevron-right">

                      </i>
                  </button>
              </div>
            </div>
                )}


            {step === 3 && (
            <div className={getClass(3)}>
                <label
                    htmlFor="up-threshold"
                    className="label-threshold-up">
                    Enter the Upper price threshold:
                    <input
                        type="number"
                        name="up-threshold"
                        value={upThreshold}
                        onChange={(e) => setUpThreshold(e.target.value)}
                        placeholder="0.5000"
                        id="up-threshold"
                    />
                </label>
                <label
                    htmlFor="down-threshold"
                    className="label-threshold-down">
                    Enter the Low price threshold:
                    <input
                        type="number"
                        name="down-threshold"
                        value={downThreshold}
                        onChange={(e) => setDownThreshold(e.target.value)}
                        placeholder="0.4500"
                        id="down-threshold"
                    />
                </label>
                <p className="threshold-info">
                    <i className="fa-solid fa-info-circle"></i>
                    Set the price limit at which you want to be notified when your price goes above or below.
                </p>
                <div className="btn-section">
              <button
                  onClick={prevStep}
                  className="go-back-btn">
                  <i className="fa-solid fa-chevron-left"></i>
                  back
              </button>
              <button
                  onClick={nextStep}
                  className="move-from-holdings">
                  Next
                  <i className="fa-solid fa-chevron-right"></i>
              </button>
              </div>
            </div>
                )}


            {step === 4 && (
            <div className={getClass(4)}>
                <label
                    htmlFor="user-email"
                    className="label-email">
                    Enter your email & password
                    <input
                        type="email"
                        name="user-email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="a@example.com"
                        id="user-email"
                        aria-autocomplete="inline"
                    />
                </label>
                <label
                    htmlFor="user-password"
                    className="label-password">
                    <input
                        type="password"
                        name="user-password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="Password"
                        id="user-password"
                    />
                </label>
                <label
                    htmlFor="user-confirm-pass"
                    className="label-confirm-pass">
                    <input
                        type="password"
                        name="user-confirm-pass"
                        value={userConfirmPass}
                        onChange={(e) => setUserConformPass(e.target.value)}
                        placeholder="Confirm password"
                        id="user-confirm-pass"
                    />
                </label>
                <div className="btn-section">
                <button onClick={prevStep} className="go-back-btn"><i className="fa-solid fa-chevron-left"></i> back </button>
              <button onClick={nextStep} className="move-from-holdings">Next <i className="fa-solid fa-chevron-right"></i></button>
              </div>
            </div>
                )}

            {step === 5 && (
            <div className={getClass(5)}>
                <label
                    htmlFor="code-input"
                    className="code-label">
                    Please input the 4-digit code we sent to your email.
                    <input
                        type="text"
                        name="code-input"
                        value={codeAuth}
                        onChange={(e) => setCodeAuth(e.target.value)}
                        id="code-input"
                        placeholder="0000"
                    />
                </label>
                    <p className="code-info"><i className="fa-solid fa-info-circle"></i>
                        Please wait one minutes before requesting for another code.</p>
                    <div className="btn-section">
                       <span className="resend-code">Resend code</span>
                      <button
                          onClick={handleSubmit}
                          className="move-from-holdings">
                          Done <i className="fa-solid fa-check"></i>
                      </button>
                  </div>

            </div>
                )}
        </div>
      </div>
    </header>
  );
}

export default App;
