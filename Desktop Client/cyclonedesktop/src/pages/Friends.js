import React, { useEffect, useState } from 'react';
import logo from "../images/icon_small.png";
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Friends.css';
import { IoExit, IoSend, IoSettings, IoPeople, IoSearch } from "react-icons/io5";


export default function Friends() {
  const history = useHistory();
  
  return (
    <>
        <div className="PageContainer">
          <div className="PageHeader">
            <h4>Friends</h4>
            <aside className="descGray">Stay in touch with your friends!</aside>
          </div>
          <div className="Page">
            <ul className="FriendList">
              <li>
                <img src={logo}></img>
                Friend1
                <aside className="descGray">Offline</aside>
              </li>
              <li>
                <img src={logo}></img>
                Friend1
                <aside className="descGray">Offline</aside>
              </li>
              <li>
                <img src={logo}></img>
                Friend1
                <aside className="descGray">Offline</aside>
              </li>
              <li>
                <img src={logo}></img>
                Friend1
                <aside className="descGray">Offline</aside>
              </li>
              
            </ul>
          </div>
        </div>
    </>
  );
}
