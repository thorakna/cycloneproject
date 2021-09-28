import logo from '../images/icon_small.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Home.css';
import { IoExit, IoSend, IoSettings, IoPeople, IoSearch } from "react-icons/io5";


export default function Chat() {
  const history = useHistory();
  const [message, setMessage] = useState("");
  
  return (
    <>
        <div className="ChannelContainer">
            <h4>Chat Channels</h4>
            <p className="descGray">Stay in touch with your contacts!</p>
            <ul className="Channels">
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Onur Yaşar</b>
                  <aside className="descGray">Selam kanka</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Umut Türk</b>
                  <aside className="descGray">Öyle mi?</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Burak Can Altunoğlu</b>
                  <aside className="descGray">Geliyorum şimdi</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Onur Yaşar</b>
                  <aside className="descGray">Selam kanka</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Umut Türk</b>
                  <aside className="descGray">Öyle mi?</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Burak Can Altunoğlu</b>
                  <aside className="descGray">Geliyorum şimdi</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Onur Yaşar</b>
                  <aside className="descGray">Selam kanka</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Umut Türk</b>
                  <aside className="descGray">Öyle mi?</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Burak Can Altunoğlu</b>
                  <aside className="descGray">Geliyorum şimdi</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Onur Yaşar</b>
                  <aside className="descGray">Selam kanka</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Umut Türk</b>
                  <aside className="descGray">Öyle mi?</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Burak Can Altunoğlu</b>
                  <aside className="descGray">Geliyorum şimdi</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Onur Yaşar</b>
                  <aside className="descGray">Selam kanka</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Umut Türk</b>
                  <aside className="descGray">Öyle mi?</aside>
                </div>
              </li>
              <li>
                <img src={logo}></img>
                <div className="ChCon">
                  <b>Burak Can Altunoğlu</b>
                  <aside className="descGray">Geliyorum şimdi</aside>
                </div>
              </li>
            </ul>
        </div>
        <div className="ChatContainer">
          <div className="ChatHeader">
            <div className="UserPP">
              <img src={logo} className="Online"></img>
            </div>
            <div className="UserDetails">
              Onur YAŞAR
              <aside className="descGray">Full Stack Developer</aside>
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
    </>
  );
}
