//import logo from '../images/icon.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
//import { IoMail, IoKey, IoPerson } from "react-icons/io5";

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
    <div className="parallax-back">
      <Modal mState={{iShow, setiShow}}>
          {
            loading ? <p>Loading</p>
            :
            modalMessage
          }
      </Modal>
      <div className="App">
        Burası home ekranımız!!!

        <button onClick={logout} className="cycloButton primaryColor">Çıkış yap bakem</button>
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
  );
}
