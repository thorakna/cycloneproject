//import logo from '../images/icon.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
//import { IoMail, IoKey, IoPerson } from "react-icons/io5";

import Modal from '../components/Modal';

export default function Home() {
//  let history = useHistory();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [iShow, setiShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    
  });
  
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
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
  );
}
