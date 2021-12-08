import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/Settings.css';
import { IoPerson, IoInformation } from "react-icons/io5";
import Modal from '../components/Modal';

import {getCredentials, changeCredentials} from "../api/SettingsAPI";


export default function Settings({ModalHandler}) {
  const history = useHistory();
  const [fullname, setFullname] = useState("Loading...");
  const [username, setUsername] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [oldData, setoldData] = useState([]);

  const [password, setPass] = useState("");
  const [passwordc, setPassc] = useState("");

  const [iShow, setiShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(async () => {
    var lusername = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");
    setLoading(true);
    const data = await getCredentials(lusername, token);
    setLoading(false);
    if(data.status == "success"){
      setFullname(data.credentials.fullName);
      setUsername(data.credentials.username);
      setBio(data.credentials.description);
      setEmail(data.credentials.mail);
      setoldData(data.credentials);
    }else{
      setModalMessage(data.message);
      setiShow(true);
    }
  },[]);
  
  const setCredentials = async () => {
    var lusername = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");

    // Buraya popup açılıp current pass aldırılacak...
    var currentPass = "deneme";
    const data = await changeCredentials(lusername, token, fullname, email, username, bio, currentPass, password);

    if(data.status == "success"){
      setModalMessage(data.message);
      setiShow(true);
    }else{
      setModalMessage(data.message);
      setiShow(true);
    }
  }

  const discardChanges = () => {
    setFullname(oldData.fullName);
    setEmail(oldData.mail);
    setBio(oldData.description);
    setUsername(oldData.username);
    setPass("");
    setPassc("");
  }
  
  return (
    <>
        <Modal mState={{iShow, setiShow}}>
            {
              loading ? <p>Loading</p>
              :
              modalMessage
            }
        </Modal>
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
                Biography
                <input type="text" id="BioInput" value={bio} autoComplete="off" onChange={(e)=>{setBio(e.target.value);}}></input>
              </div>

              <div className="setfield" style={{animationDelay: 0.6+"s"}}>
                Email Address
                <input type="text" id="EmailInput" value={email} autoComplete="off" onChange={(e)=>{setEmail(e.target.value);}}></input>
              </div>

              <div className="satirfield">
                <div className="setfield" style={{marginRight: 20, animationDelay: 0.8+"s"}}>
                  Password
                  <input type="password" id="PassInput" placeholder="•••••••••" value={password} autoComplete="off" onChange={(e)=>{setPass(e.target.value);}}></input>
                </div>
                <div className="setfield" style={{animationDelay: 1+"s"}}>
                  Password Confirm
                  <input style={{'box-shadow': password !== passwordc && '0px 0px 10px 1px red'}} type="password" id="PassCInput" placeholder="•••••••••" value={passwordc} autoComplete="off" onChange={(e)=>{setPassc(e.target.value);}}></input>
                </div>
              </div>

              <div className="satirfield" style={{float:"right", animation: "slideInSoft 0.2s backwards", animationDelay: "1.02s"}}>
                <button onClick={discardChanges} className="SendButton secondaryColor">Discard Changes</button>
                <button disabled={(oldData.username === username && oldData.fullName === fullname && oldData.description === bio && oldData.mail === email && password === "")} onClick={setCredentials} className="SendButton primaryColor">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
