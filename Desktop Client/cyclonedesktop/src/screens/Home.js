import logo from '../images/icon_small.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Home.css';
import { IoExit, IoSend } from "react-icons/io5";

import Modal from '../components/Modal';

export default function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
            <h4>Chat Channels</h4>
            <p className="descGray">Stay in touch with your contacts!</p>
            <button style={{bottom:20, position:"absolute"}} onClick={logout} className="cycloButton primaryColor"><IoExit/> Log out</button>
        </div>
        <div className="ChatContainer">
          <div className="ChatHeader">
            <div className="UserPP">
              <img src={logo} className="Online"></img>
            </div>
            <div className="UserDetails">
              Onur YAŞAR
              <p className="descGray">Full Stack Developer</p>
            </div>
          </div>
          <div className="Chat">
            <div className="MessageContainer">
              <div className="MessagerPP">
                <img src={logo}></img>
              </div>
              <div className="MessageBox">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tincidunt odio a elementum. Nunc a erat consequat, vulputate nunc sit amet, molestie arcu. Etiam vel magna elit. Suspendisse sed eleifend mi, a porttitor ante. Fusce in placerat orci. Suspendisse erat tortor, laoreet ut mattis quis, interdum sed lorem. Ut venenatis placerat diam, vel volutpat massa malesuada in. Sed pulvinar odio ac tincidunt volutpat. Aenean vitae mi nisl. Sed sodales efficitur nibh, in ultricies est volutpat at. Sed sed lectus auctor, egestas nunc at, commodo tortor. Nunc dictum dolor non pharetra euismod. Morbi purus est, sodales id libero sit amet, maximus facilisis elit. In varius, turpis ac interdum luctus, eros metus mollis tortor, in malesuada elit ligula vitae leo. Vestibulum dictum orci ut nibh imperdiet, in pretium justo venenatis. Sed id pretium sapien.</div>
            </div>

            <div className="MessageContainer">
              <div className="MessageBox">Lorem ipsum dolor sit amet consetectur mora la far!</div>
              <div className="MessagerPP">
                <img src={logo}></img>
              </div>
            </div>

            <div className="MessageContainer">
              <div className="MessageBox">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada tincidunt odio a elementum. Nunc a erat consequat, vulputate nunc sit amet, molestie arcu. Etiam vel magna elit. Suspendisse sed eleifend mi, a porttitor ante. Fusce in placerat orci. Suspendisse erat tortor, laoreet ut mattis quis, interdum sed lorem. Ut venenatis placerat diam, vel volutpat massa malesuada in. Sed pulvinar odio ac tincidunt volutpat. Aenean vitae mi nisl. Sed sodales efficitur nibh, in ultricies est volutpat at. Sed sed lectus auctor, egestas nunc at, commodo tortor. Nunc dictum dolor non pharetra euismod. Morbi purus est, sodales id libero sit amet, maximus facilisis elit. In varius, turpis ac interdum luctus, eros metus mollis tortor, in malesuada elit ligula vitae leo. Vestibulum dictum orci ut nibh imperdiet, in pretium justo venenatis. Sed id pretium sapien.</div>
              <div className="MessagerPP">
                <img src={logo}></img>
              </div>
            </div>
          </div>
          <div className="ChatInput">
            <input type="text" placeholder="Send message!" value={message} autoComplete="off"  onChange={(e) => { setMessage(e.target.value); }}></input>
            <button onClick={()=>{}} className="SendButton primaryColor"><IoSend/></button>
          </div>
        </div>
        <div className="DetailContainer">

        </div>
      </div>
  );
}
