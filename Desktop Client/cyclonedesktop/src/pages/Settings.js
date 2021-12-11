import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/Settings.css';
import { IoCloudUpload, IoTrash } from "react-icons/io5";
import Modal from '../components/Modal';

import {getCredentials, changeCredentials, deletePP, changePP} from "../api/SettingsAPI";
import { setTokens } from '../api/TokenOperations';


export default function Settings() {
  const history = useHistory();
  const inputFileRef = useRef(null);
  
  const [ppImage, setppImage] = useState("init.png");
  const [fullname, setFullname] = useState("Loading...");
  const [username, setUsername] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [oldData, setoldData] = useState([]);

  const [password, setPass] = useState("");
  const [passwordc, setPassc] = useState("");
  const [currPass, setcurrPass] = useState("");

  const [iShow, setiShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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
      console.log(data);
    }else{
      setModalMessage(data.message);
      setiShow(true);
      console.log(data);
    }
  },[]);
  
  const setCredentials = async () => {
    var lusername = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");

    const data = await changeCredentials(lusername, token, fullname, email, username, bio, currPass, password);

    if(data.status == "success"){
      setModalMessage(data.message);
      setiShow(true);
      setoldData({
        username:username,
        fullName: fullname, 
        description: bio,
        mail: email 
      });

      if(data.accessToken && data.refreshToken){
        setTokens(data.accessToken, data.refreshToken);
      }
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

  const passPopup = () => {
    setcurrPass("");
    setModalMessage("currentpass-send");
    setiShow(true);
  }

  const changeImage = async (file, setProgress) => {
    var lusername = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");
    const data = await changePP(lusername, token, file, setProgress);
    console.log(data);
    // if(data.status == "success"){
    //   //setppImage(data);
    //   console.log(data);
    // }else{
    //   setModalMessage(data.message);
    //   setiShow(true);
    // }
  }

  const deleteImage = async () => {
    var lusername = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");
    const data = await deletePP(lusername, token);
    if(data.status == "success"){
      setppImage("init.png");
    }else{
      setModalMessage(data.message);
      setiShow(true);
    }
  }
  
  return (
    <>
        <Modal mState={{iShow, setiShow}} buttonShow={modalMessage === "currentpass-send" && "yes"}>
            {
              loading ? <p>Loading</p>
              :
              modalMessage === "currentpass-send" ? 
              <>
                <div className="setfield" style={{animationDelay: 0.2+"s"}}>
                  Current Password
                  <input type="password" id="CurrentPass" placeholder="•••••••••" value={currPass} autoComplete="off" onChange={(e)=>{setcurrPass(e.target.value);}}></input>
                </div>
                <div className="satirfield" style={{float:"left", animation: "slideInSoft 0.2s backwards", animationDelay: "0.4s"}}>
                  <button onClick={setCredentials} className="SendButton primaryColor">Save</button>
                  <button onClick={()=>{setiShow(false)}} className="SendButton secondaryColor">Cancel</button>
                </div>
              </>
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
              <div className="setfield">
                <div className="profilePic" style={ppImage !== "init.png" ? {backgroundImage: "url("+ppImage+")"} : {backgroundImage: "url(https://cyclone-api.raas.onuryasar.online/api/users/avatars/"+ppImage+")"}}>
                  <input type="file" name="userImage" ref={inputFileRef} id="PPInput" accept="image/png, image/gif, image/jpeg" onChange={(e)=>{setppImage(URL.createObjectURL(e.target.files[0])); changeImage(e.target.files[0], setProgress)}}></input>
                  <button onClick={()=>{inputFileRef.current.click();}} className="AddButton primaryColor"><IoCloudUpload/></button><br></br>
                  {ppImage !== "init.png" && <button onClick={deleteImage} className="AddButton secondaryColor"><IoTrash/></button>}
                </div>
              </div>
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
                  <input style={{'boxShadow': password !== passwordc && '0px 0px 10px 1px red'}} type="password" id="PassCInput" placeholder="•••••••••" value={passwordc} autoComplete="off" onChange={(e)=>{setPassc(e.target.value);}}></input>
                </div>
              </div>

              <div className="satirfield" style={{float:"right", animation: "slideInSoft 0.2s backwards", animationDelay: "1.02s"}}>
                <button onClick={discardChanges} className="SendButton secondaryColor">Discard Changes</button>
                <button disabled={(oldData.username === username && oldData.fullName === fullname && oldData.description === bio && oldData.mail === email && password === "")} onClick={passPopup} className="SendButton primaryColor">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
