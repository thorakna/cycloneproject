import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/Settings.css';
import { IoPerson, IoInformation } from "react-icons/io5";


export default function Settings() {
  const history = useHistory();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  
  return (
    <>
        <div className="PageContainer">
          <div className="PageHeader">
            <h4>Settings</h4>
            <aside className="descGray">Edit your profile settings</aside>
          </div>
          <div className="Page" style={{overflowY:"auto"}}>
            <div className="settingsPlace">
              <div className="setfield">
                Fullname
                <input type="text" id="FullnameInput" value={fullname} autoComplete="off" onChange={(e)=>{setFullname(e.target.value);}}></input>
              </div>
              <div className="setfield" style={{animationDelay: 0.5+"s"}}>
                Username
                <input type="text" id="UsernameInput" value={username} autoComplete="off" onChange={(e)=>{setUsername(e.target.value);}}></input>
              </div>
              <div className="setfield" style={{animationDelay: 1+"s"}}>
                Email Address
                <input type="text" id="EmailInput" value={email} autoComplete="off" onChange={(e)=>{setEmail(e.target.value);}}></input>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
