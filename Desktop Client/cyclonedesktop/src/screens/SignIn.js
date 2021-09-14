import logo from '../images/icon.png';
import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import '../style/parallax-star.css';
import {IoPerson, IoKey} from "react-icons/io5";

import Login from "../api/Authentication";
import Modal from '../components/Modal';

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [iShow, setiShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  let history = useHistory();

  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      history.replace("/home");
    }
  }, [history]);

  const doSignIn = async () => {
    setLoading(true);
    const data = await Login(username, password);
    setLoading(false);

    if(data.status === "success"){
      localStorage.setItem("accessToken", data.token);
      history.replace("/home");
    }else{
      setModalMessage(data.message);
      setiShow(true);
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      doSignIn();
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
          <header style={{zIndex: 20}}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Cyclone™</p>
          </header>
            <div className="row inputplace">
              <div className="inputfield">
                <IoPerson/>
                <input type="text" id="UsernameInput" placeholder="Username" value={username} autoComplete="off" onChange={(e)=>{setUsername(e.target.value);}}></input>
              </div>

              <div className="inputfield">
                <IoKey/>
                <input type="password" id="PasswordInput" onKeyDown={onKeyDown} placeholder="Password" value={password} autoComplete="off" onChange={(e)=>{setPassword(e.target.value);}}></input>
              </div>

              <div className="inputfield">
                <button onClick={doSignIn} className="primaryColor" style={{marginRight:20}}>{loading ? "Processing" : "Sign in"}</button>
                <button onClick={()=>{history.push({pathname: "/register", state: {username, password}});}} className="secondaryColor">Sign Up</button>
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
