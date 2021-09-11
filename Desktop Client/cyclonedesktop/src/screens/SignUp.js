import logo from '../images/icon.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import { IoMail, IoKey, IoPerson } from "react-icons/io5";

export default function SignUp() {
  let history = useHistory();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordr, setPasswordr] = useState("");

  useEffect(() => {
    if (state) {
      setEmail(state.email);
      setPassword(state.password);
    }
  }, [state]);

  return (
    <div className="parallax-back">
      <div className="App">
        <div className="App-Auth">
          <header style={{ zIndex: 20 }}>
            <div className="backRound" style={{ backgroundColor: "#3b3b3b", zIndex: -1 }}></div>
            <div className="backRound" style={{ backgroundColor: "#2a2a2a", zIndex: -2 }}></div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Cyclone™</p>
          </header>
          <div className="row inputplace">
            <div className="inputfield">
              <IoPerson />
              <input type="text" id="UsernameInput" placeholder="Username" value={username} autoComplete="off" onChange={(e) => { setUsername(e.target.value); }}></input>
            </div>

            <div className="inputfield">
              <IoMail />
              <input type="text" id="EmailInput" placeholder="Email" value={email} autoComplete="off" onChange={(e) => { setEmail(e.target.value); }}></input>
            </div>
            <div className="inputfield">
              <IoKey />
              <input type="password" id="PasswordInput" placeholder="Password" value={password} autoComplete="off"  onChange={(e) => { setPassword(e.target.value); }}></input>
            </div>

            <div className="inputfield">
              <IoKey />
              <input type="password" id="PasswordRInput" placeholder="Confirm Password" value={passwordr} autoComplete="off" onChange={(e) => { setPasswordr(e.target.value); }}></input>

            </div>

            <div className="inputfield">
              <button onClick={() => { }} className="primaryColor" style={{ marginRight: 20 }}>Sign Up</button>
              <button onClick={() => { history.goBack() }} className="secondaryColor">Back</button>
            </div>
          </div>
        </div>
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
  );
}
