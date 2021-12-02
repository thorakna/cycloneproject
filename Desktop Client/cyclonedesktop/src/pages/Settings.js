import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/Settings.css';
import { IoPerson, IoInformation } from "react-icons/io5";


export default function Settings() {
  const history = useHistory();
  const [fullname, setFullname] = useState("Onur YAŞAR");
  const [username, setUsername] = useState("Thorakna");
  const [email, setEmail] = useState("onuryasar@mail.com");

  const [password, setPass] = useState("");
  const [passwordc, setPassc] = useState("");

  useEffect(() => {
    // Settings bilgileri get edilecek
  });
  
  const setCredentials = () => {
    // Settings api çağırılacak
  }
  
  return (
    <>
        <div className="PageContainer">
          <div className="PageHeader">
            <h4>Settings</h4>
            <aside className="descGray">Edit your profile settings</aside>
          </div>
          <div className="Page" style={{overflowY:"auto"}}>
            <div className="settingsPlace">
              <div className="satirfield">
                <div className="setfield" style={{marginRight: 20}}>
                  Fullname
                  <input type="text" id="FullnameInput" value={fullname} autoComplete="off" onChange={(e)=>{setFullname(e.target.value);}}></input>
                </div>
                <div className="setfield" style={{animationDelay: 0.2+"s"}}>
                  Username
                  <input type="text" id="UsernameInput" value={username} autoComplete="off" onChange={(e)=>{setUsername(e.target.value);}}></input>
                </div>
              </div>
              
              <div className="setfield" style={{animationDelay: 0.4+"s"}}>
                Email Address
                <input type="text" id="EmailInput" value={email} autoComplete="off" onChange={(e)=>{setEmail(e.target.value);}}></input>
              </div>

              <div className="satirfield">
                <div className="setfield" style={{marginRight: 20, animationDelay: 0.6+"s"}}>
                  Password
                  <input type="password" id="PassInput" placeholder="•••••••••••••" value={password} autoComplete="off" onChange={(e)=>{setPass(e.target.value);}}></input>
                </div>
                <div className="setfield" style={{animationDelay: 0.8+"s"}}>
                  Password Confirm
                  <input type="password" id="PassCInput" placeholder="•••••••••••••" value={passwordc} autoComplete="off" onChange={(e)=>{setPassc(e.target.value);}}></input>
                </div>
              </div>

              <div className="satirfield" style={{float:"right", animation: "slideInSoft 0.2s backwards", animationDelay: "1s"}}>
                <button onClick={()=>{}} className="SendButton secondaryColor">Discard Changes</button>
                <button onClick={()=>{}} className="SendButton primaryColor">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
