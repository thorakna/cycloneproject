import logo from '../images/icon.png';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import '../style/parallax-star.css';
import {IoMail, IoKey} from "react-icons/io5";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  return (
    <div className="parallax-back">
      <div className="App">
        <div className="App-Auth">
          <header style={{zIndex: 20}}>
            <div className="backRound" style={{backgroundColor:"#3b3b3b", zIndex: -1}}></div>
            <div className="backRound" style={{backgroundColor:"#2a2a2a", zIndex: -2}}></div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Cyclone™</p>
          </header>
            <div className="row inputplace">
              <div className="inputfield">
                <IoMail/>
                <input type="text" id="EmailInput" placeholder="Email" value={email} autoComplete="off" onChange={(e)=>{setEmail(e.target.value);}}></input>
              </div>

              <div className="inputfield">
                <IoKey/>
                <input type="password" id="PasswordInput" placeholder="Password" value={password} autoComplete="off" onChange={(e)=>{setPassword(e.target.value);}}></input>
              </div>

              <div className="inputfield">
                <button onClick={()=>{}} className="primaryColor" style={{marginRight:20}}>Sign in</button>
                <button onClick={()=>{history.push({pathname: "/kayitol", state: {email, password}});}} className="secondaryColor">Sign Up</button>
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
