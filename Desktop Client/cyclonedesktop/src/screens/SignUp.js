import logo from '../images/icon.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import { IoMail, IoKey, IoPerson } from "react-icons/io5";

import {Register} from '../api/Authentication';
import Modal from '../components/Modal';

export default function SignUp() {
  let history = useHistory();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [iShow, setiShow] = useState(false);

  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (state) {
      setUsername(state.username);
      setPassword(state.password);
    }

    if(localStorage.getItem("accessToken")){
      history.replace("/home");
    }
  }, [state, history]);
  
  const doSignUp = async () => {
    setLoading(true);
    const data = await Register(email,password,username);
    setLoading(false);

    if(data.status === "success"){
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("username", username);
      setModalMessage("Your registration is successful. Logging in...");
      setTimeout(()=>{history.replace("/home")}, 4000);
    }else{
      setModalMessage(data.message);
    }
    
    setiShow(true);
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      doSignUp();
    }
  }
  
  return (
    <div className="parallax-back">
      <Modal mState={{iShow, setiShow}}>
          {
            loading ? <p>Loading</p>
            :
            modalMessage
          }
      </Modal>
      <div className="App">
        <div className="App-Auth">
          <header style={{ zIndex: 20 }}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Cyclone™</p>
          </header>
          <div className="row inputplace">
              <div className="inputfield">
                <IoPerson/>
                <input type="text" id="UsernameInput" placeholder="Username" value={username} autoComplete="off" onChange={(e)=>{setUsername(e.target.value);}}></input>
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
                <input type="password" id="PasswordRInput" onKeyDown={onKeyDown} placeholder="Confirm Password" value={passwordr} autoComplete="off" onChange={(e) => { setPasswordr(e.target.value); }}></input>

              </div>

              <div className="inputfield">
                <button onClick={doSignUp} disabled={loading} className="primaryColor" style={{marginRight:20}}>{loading ? "Processing" : "Sign Up"}</button>
                <button onClick={()=>{history.goBack()}} className="secondaryColor">Back</button>
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
