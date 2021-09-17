import logo from '../images/icon_small.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Home.css';
import { IoExit } from "react-icons/io5";

import Modal from '../components/Modal';

export default function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [iShow, setiShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      history.replace("/");
    }
  }, [history]);
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    history.replace("/");
  }

  return (
      <div className="App-Home">
        <Modal mState={{iShow, setiShow}}>
            {
              loading ? <p>Loading</p>
              :
              modalMessage
            }
        </Modal>
        <div className="Navigator">
          <img src={logo} className="App-H-Logo" alt="App Logo" />
        </div>
        <div className="ChannelContainer">
            <h3>Chat Channels</h3>
            <button style={{bottom:20, position:"absolute"}} onClick={logout} className="cycloButton primaryColor"><IoExit/> Log out</button>
        </div>
        <div className="ChatContainer">
          <div className="ChatHeader">
            <div className="UserPP">
              <img src={logo}></img>
            </div>
            <div className="UserDetails">
              Onur YAŞAR
              <p>Full Stack Developer</p>
            </div>
          </div>
        </div>
        <div className="DetailContainer">

        </div>
      </div>
  );
}
