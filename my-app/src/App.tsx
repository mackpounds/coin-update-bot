import axios from "axios";
import React, { useState, useEffect } from 'react';
import './App.css';
import {spawn} from "node:child_process";

function App() {

    // Function to fetch Coins name to ensure there valid crypto coins the user is inputting
     // Ensuring the performance of the input is strictly strong.
    // d5c2ded4-4495-4e8b-ba83-aadb0fb03d44


    // Update coin list with search input and highlight
    const getHighlightedText = (text: string, highlight: string) => {
        const index = text.toLowerCase().indexOf(highlight.toLowerCase());
        if (index === -1 || highlight === "") return text;

        const before = text.slice(0, index);
        const match = text.slice(index, index + highlight.length);
        const after = text.slice(index + highlight.length);

        return (
        <>
        {before}
        <span style = {{ backgroundColor: "white", color: "black" }}>{match}</span>
        {after}
        </>
        );
    };




    // function CoinList() {
        const [coins, setCoins] = useState<string[]>([]);
        const [input, setInput] = useState("");
        const [isToggleInput, setIsToggleInput] = useState(false);
        const [showPopup, setShowPopup] = useState(false);

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


     const openPopup = () => setShowPopup(true)
     const closePopup = () => {
         setShowPopup(false);
         setInput("");
     };


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





    // inputChange function page first
    // ******
    // *******
    const [status, setStatus] = useState<"valid" | "inValid" | "">("")

    // action button, move next | back
    const contNextStep = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCoinName(value)

        if (value === ""){
            setStatus("")
            return
        }
        const isValid = coins.some((coin) =>
            coin.toLowerCase().trim() === value.toLowerCase().trim()
        );
        setStatus(isValid ? "valid" : "inValid");
    };
    const handleNext = () => {
            if(status === "valid") {
                nextStep();
            }
        }


     // inputChange function page second
    // ******
    // *******
    const [statusCoinAmt, setStatusCoinAmt] = useState<"true" | "false" | "">("")
    const coinAmountFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let coinAmountValue = Number(value);
        setHoldings(value);

        if (value === ""){
            setStatusCoinAmt("")
            return
        }
        // if the value is less than 0 return 0
        if(coinAmountValue <= 0){
            // coinAmountValue = 0;
            setStatusCoinAmt("false")
        } else{
            setStatusCoinAmt("true")
        }


    }
    const handleNextPage2 = () => {
            if(statusCoinAmt === "true") {
                nextStep();
            }
        }

    // inputChange function for the threshold page (*fourth-page*)
    const [statusThresholdUp, setStatusThresholdUp] = useState<"true" | "false" | "">("")
    const [statusThresholdDown, setStatusThresholdDown] = useState<"true" | "false" | "">("")

    const thresholdFunctionUp = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let Upvalue = Number(value);
        setUpThreshold(value)

        if (value === ""){
            setStatusThresholdUp("")
            return
        }

        if (Upvalue <= 0) {
            setStatusThresholdUp("false")
        } else{
            setStatusThresholdUp("true")
        }

    }

    const thresholdFunctionDown = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let Downvalue = Number(value);
        setDownThreshold(value.toString())

         if (value === ""){
            setStatusThresholdDown("")
            return
        }

        if (Downvalue <= 0) {
            setStatusThresholdDown("false")
        } else{
            setStatusThresholdDown("true")
        }

    }
    const handleNextPage4 = () => {
            if(statusThresholdUp === "true" && statusThresholdDown) {
                nextStep();
            }
        }


    //     input change for email and password page (5)
    const [statusEmail, setStatusEmail] = useState<"true" | "false" | "">("")
    const [statusPassword, setStatusPassword] = useState<"true" | "false" | "">("")
    const [statusPassConfirm, setStatusPassConfirm] = useState<"true" | "false" | "">("")
    const [statusOPT, setStatusOTP] = useState<"true" | "false" | "">("")
    // EMAIL FUNCTION
    const email = (e: React.ChangeEvent<HTMLInputElement>)=> {
        let emailValue = e.target.value;
        setUserEmail(emailValue)

        if(emailValue === ""){
            setStatusEmail("")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailValue)){
            setStatusEmail("true")
        } else{
            setStatusEmail("false")
        }

    }
    // PASSWORD FUNCTION
    const validatePassword = (value: string) => {
        const numberMatch = value.match(/\d/g);
        const hasTwoNumbers = numberMatch && numberMatch.length >= 2
        const numberLength = value.length >= 7

        if (numberLength && hasTwoNumbers) {
            setStatusPassword("true")
        }else {
            setStatusPassword("false")
        }
    }
    const password = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserPassword(value)

         if(value === ""){
            setStatusPassword("")
            return
        }
        validatePassword(value)
        if (userConfirmPass !== ""){
            setStatusPassConfirm(value === userConfirmPass ? 'true' : 'false')
        }
    };
    // CONFIRM PASSWORD
    const confPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserConformPass(value)

        if(value === ""){
            setStatusPassConfirm("")
            return
        }
        if (userPassword !== ""){
            setStatusPassConfirm(value === userPassword ? 'true' : 'false')
        }
    }
    // OPT SECTION
    const optFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCodeAuth(value)

        if (value === ""){
            setStatusOTP("")
            return
        }

        if (value.length === 4){
            setStatusOTP("true")
        }else{
            setStatusOTP("false")
        }
    }


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
        <div className={`card-popup-container ${showPopup ? "active" : ""}`} onClick={closePopup}>
            <i className="fa-solid fa-times" onClick={closePopup}></i>
            <div className={`card-container ${showPopup ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="coin-name-list">
                    <h6>Available coins</h6>
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
        <p className="sub-text">Let cTracker update you for YOU!</p><br/>
        <div  className="coin-input-content">

            {step === 0 && (
          <div className={getClass(0)}>
              <div className="input-container"
                   style={{
                      border: status === "valid" ? "1px solid green":
                              status === "inValid" ? "1px solid red":
                                          "0",
                   }}
              >
               <label
                   htmlFor="coin-name" className="label-coin-name"> Enter your coin

              <input
                  type="text"
                  id="coin-name"
                  value={coinName}
                  onKeyDown={(e) => {
                      if (e.key === "Enter" && status === "valid") {
                          nextStep()
                      }
                    }
                  }
                  onChange={contNextStep}
                  placeholder="e.g, bitcoin"
                  className="coin-name"
                  autoComplete="off"
              />
               </label>
                  <span className="help-icon"
                        onClick={openPopup}
                        style={{
                             backgroundColor: status === "valid" ? "green":
                                              status === "inValid" ? "rgba(57, 57, 58, 0.6)":
                                              "rgba(57, 57, 58, 0.6)",
                             pointerEvents: status === "valid" ? "none":
                                            status === "inValid" ? "auto":
                                                "auto",
                             cursor: status === "valid" ? "none":
                                     status === "inValid" ? "pointer":
                                        "pointer",
                         }}>

                      <i className={`${status === "valid" ? "fa-solid fa-check":
                                       status === "inValid" ? "fa-solid fa-question": "fa-solid fa-question"}`}
                         title="Check the available coin for Tracking">
                      </i></span>
              </div>
              {status === "valid" && <p className="p-success-field" ><i className="fa-solid fa-info-circle"></i> Coin Found</p>}
              {status === "inValid" && <p className="p-error-field" ><i className="fa-solid fa-info-circle"></i> Coin not Found</p>}
              <button
                  disabled={status === "valid"}
                  onClick={handleNext}
                  className="btn-first-action"
                  style={{
                      backgroundColor: status === "valid" ? "#282c34":
                                       status === "inValid" ? "lightgrey":
                                           "lightgrey",
                      pointerEvents: status === "valid" ? "auto":
                                     status === "inValid" ? "none":
                                         "none",
                      cursor: status === "valid" ? "pointer":
                              status === "inValid" ? "none":
                                  "none",

                      color: status === "valid" ? "white":
                             status === "inValid" ? "grey":
                             "grey"

                  }}
              >
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
                  onChange={coinAmountFunc}
                  onKeyDown={(e) => {
                      if (e.key === "Enter" && statusCoinAmt === "true"){
                          nextStep();
                      }
                  }}
                  placeholder="Coin amount"
                  id="holdings"
              /></label>
              {statusCoinAmt === "false" && <p className="p-error-field">Input a valid coin amount.</p>}

              <div className="btn-section">
              <button
                  onClick={prevStep}
                  className="go-back-btn">
                  <i className="fa-solid fa-chevron-left"></i>
                  back
              </button>
              <button
                  onClick={handleNextPage2}
                  className="move-from-holdings"
                   style={{
                      backgroundColor: statusCoinAmt === "true" ? "#282c34":
                                       statusCoinAmt === "false" ? "lightgrey":
                                           "lightgrey",
                      pointerEvents: statusCoinAmt === "true" ? "auto":
                                     statusCoinAmt === "false" ? "none":
                                         "none",
                      cursor: statusCoinAmt === "true" ? "pointer":
                              statusCoinAmt === "false" ? "none":
                                  "none",

                      color: statusCoinAmt === "true" ? "white":
                             statusCoinAmt === "false" ? "grey":
                             "grey"

                  }}
              >
                  Next
                  <i className="fa-solid fa-chevron-right"></i>
              </button>
              </div>
          </div>
                )}


            {step === 2 && (
            <div className={getClass(2)} onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                  nextStep();
                              }
                          }}
                          tabIndex={0}>
                <div className="price-update">
                    <span className="price-alert">
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && statusThresholdDown === "true" && statusThresholdUp === "true"){
                                nextStep()
                            }
                        }}
                        onChange={thresholdFunctionUp}
                        placeholder="0.5000"
                        id="up-threshold"
                    />
                </label>
                {statusThresholdUp === "false" && <p className="p-error-field"><i className="fa-solid fa-info-circle"></i>High threshold should be above zero!</p>}
                <label
                    htmlFor="down-threshold"
                    className="label-threshold-down">
                    Enter the Low price threshold:
                    <input
                        type="number"
                        name="down-threshold"
                        value={downThreshold}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && statusThresholdDown === "true" && statusThresholdUp === "true"){
                                nextStep()
                            }
                        }}
                        onChange={thresholdFunctionDown}
                        placeholder="0.4500"
                        id="down-threshold"
                    />
                </label>
                {statusThresholdDown === "false" && <p className="p-error-field"><i className="fa-solid fa-info-circle"></i>Low threshold should be above zero!</p>}

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
                  onClick={handleNextPage4}
                   style={{
                      backgroundColor: statusThresholdUp === "true" && statusThresholdDown === 'true' ? "#282c34":
                                       statusThresholdUp === "false" && statusThresholdDown === 'false' ? "lightgrey":
                                           "lightgrey",
                      pointerEvents: statusThresholdUp === "true" && statusThresholdDown === 'true' ? "auto":
                                     statusThresholdUp === "false" && statusThresholdDown === 'false' ? "none":
                                         "none",
                      cursor: statusThresholdUp === "true" && statusThresholdDown === 'true' ? "pointer":
                              statusThresholdUp === "false" && statusThresholdDown === 'false' ? "none":
                                  "none",

                      color: statusThresholdUp === "true" && statusThresholdDown === 'true' ? "white":
                             statusThresholdUp === "false" && statusThresholdDown === 'false' ? "grey":
                             "grey"

                  }}
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
                        onChange={email}
                        onKeyDown={(e) => {
                          if(e.key === 'Enter' && statusEmail === 'true' && statusPassword === 'true' && statusPassConfirm === 'true'){
                              nextStep();
                            }
                         }}
                        style={{
                          border: statusEmail === "true" ? "1px solid green":
                                  statusEmail === "false" ? "1px solid red":
                                              "0",
                       }}
                        placeholder="a@example.com"
                        id="user-email"
                        aria-autocomplete="inline"
                    />
                </label>
                {statusEmail === "false" && <p className="p-error-field"><i className="fa-solid fa-info-circle"></i>Email not Valid</p>}
                {statusEmail === "true" && <p className="p-success-field"><i className="fa-solid fa-check-circle"></i>Email Okay</p>}
                <label
                    htmlFor="user-password"
                    className="label-password">
                    <input
                        type="password"
                        name="user-password"
                        value={userPassword}
                          onKeyDown={(e) => {
                          if(e.key === 'Enter' && statusEmail === 'true' && statusPassword === 'true' && statusPassConfirm === 'true'){
                              nextStep();
                            }
                         }}
                        onChange={password}
                        style={{
                          border: statusPassword === "true" ? "1px solid green":
                                  statusPassword === "false" ? "1px solid red":
                                              "0",
                       }}
                        placeholder="Password"
                        id="user-password"
                    />
                </label>
                {statusPassword === "false" && <p className="p-error-field"><i className="fa-solid fa-info-circle"></i>Password must be at least 8 characters long & contains at least 2 numbers</p>}
                {statusPassword === "true" && <p className="p-success-field"><i className="fa-solid fa-check-circle"></i>Strong password</p>}
                <label
                    htmlFor="user-confirm-pass"
                    className="label-confirm-pass">
                    <input
                        type="password"
                        name="user-confirm-pass"
                        value={userConfirmPass}
                         onKeyDown={(e) => {
                          if(e.key === 'Enter' && statusEmail === 'true' && statusPassword === 'true' && statusPassConfirm === 'true'){
                              nextStep();
                            }
                         }}
                        onChange={confPass}
                        style={{
                          border: statusPassConfirm === "true" ? "1px solid green":
                                  statusPassConfirm === "false" ? "1px solid red":
                                              "0",
                       }}
                        placeholder="Confirm password"
                        id="user-confirm-pass"
                    />
                </label>
                {statusPassConfirm === "false" && <p className="p-error-field"><i className="fa-solid fa-info-circle"></i>Password do not match.</p>}
                {statusPassConfirm === "true" && <p className="p-success-field"><i className="fa-solid fa-check-circle"></i>Matched!</p>}
                <div className="btn-section">
                <button onClick={prevStep} className="go-back-btn"><i className="fa-solid fa-chevron-left"></i> back </button>
              <button
                  onClick={nextStep}
                  onKeyDown={(e) => {
                          if(e.key === 'Enter' && statusEmail === 'true' && statusPassword === 'true' && statusPassConfirm === 'true'){
                              nextStep();
                            }
                         }}
                   style={{
                      backgroundColor: statusEmail === "true" && statusPassword === 'true' && statusPassConfirm === 'true' ? "#282c34":
                                       statusEmail === "false" && statusPassword === 'false' && statusPassConfirm === 'false' ? "lightgrey":
                                           "lightgrey",
                      pointerEvents: statusEmail === "true" && statusPassword === 'true' && statusPassConfirm === 'true' ? "auto":
                                     statusEmail === "false" && statusPassword === 'false' && statusPassConfirm === 'false' ? "none":
                                         "none",
                      cursor: statusEmail === "true" && statusPassword === 'true' && statusPassConfirm === 'true' ? "pointer":
                              statusEmail === "false" && statusPassword === 'false' && statusPassConfirm === 'false' ? "none":
                                  "none",

                      color: statusEmail === "true" && statusPassword === 'true' && statusPassConfirm === 'true' ? "white":
                             statusEmail === "false" && statusPassword === 'false' && statusPassConfirm === 'false' ? "grey":
                             "grey"

                  }}
                  className="move-from-holdings">Next
                  <i className="fa-solid fa-chevron-right"></i></button>
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
                        onChange={optFunction}
                        onKeyDown={(e) => {
                            if(e.key === "Enter" && statusOPT === 'true'){
                                handleSubmit();
                            }
                        }}
                        id="code-input"
                        placeholder="0000"
                        maxLength={4}
                    />
                </label>
                {statusOPT === "false" && <p className="p-error-field"><i className="fa-solid fa-info-circle"></i>Enter the 4-digit OPT Code that was sent to you.</p>}

                    <p className="code-info"><i className="fa-solid fa-info-circle"></i>
                        Please wait one minutes before requesting for another code.</p>
                    <div className="btn-section">
                       <span className="resend-code">Resend code</span>
                      <button
                          onClick={handleSubmit}
                          className="move-from-holdings"
                          style={{
                          backgroundColor: statusOPT === "true" ? "#282c34":
                                           statusOPT === "false" ? "lightgrey":
                                               "lightgrey",
                          pointerEvents: statusOPT === "true"  ? "auto":
                                         statusOPT === "false" ? "none":
                                             "none",
                          cursor: statusOPT === "true" ? "pointer":
                                   statusOPT === "false" ? "none":
                                      "none",

                          color: statusOPT === "true" ? "white":
                                  statusOPT === "false" ? "grey":
                                 "grey"

                  }}
                      >
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
