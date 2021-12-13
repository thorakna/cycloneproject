import logo from '../images/icon_small.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Home.css';
import { IoExit, IoSend, IoSettings, IoPeople, IoSearch } from "react-icons/io5";

import {
  Route
} from "react-router-dom";

import Chat from "../pages/Chat";
import Friends from "../pages/Friends";
import Search from "../pages/Search";
import Settings from '../pages/Settings';

export default function Home({children}) {
  const history = useHistory();

  const [pageActive, setActivePage] = useState("/home/");
  let location = useLocation();

  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      history.replace("/");
    }
    setActivePage(location.pathname);
  }, [history, location]);
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    history.replace("/");
  }

  return (
      <div className="App-Home">
        <div className="Navigator">
          <img style={{animation: "slideInSoft 0.3s backwards"}} onClick={()=>{history.push("/home/");}} src={logo} className={pageActive === "/home/" || pageActive === "/home" ? "App-H-Logo NaviActive" : "App-H-Logo"} alt="App Logo" />
          <button style={{animation: "slideInSoft 0.3s backwards", animationDelay: "0.1s"}}  onClick={()=>{history.push("/home/friends");}} className={pageActive === "/home/friends" ? "NaviButton NaviActive" : "NaviButton"}><IoPeople/></button>
          <button style={{animation: "slideInSoft 0.3s backwards", animationDelay: "0.2s"}} onClick={()=>{history.push("/home/search");}} className={pageActive === "/home/search" ? "NaviButton NaviActive" : "NaviButton"}><IoSearch/></button>
          <button style={{animation: "slideInSoft 0.3s backwards", animationDelay: "0.3s"}} onClick={()=>{history.push("/home/settings");}} className={pageActive === "/home/settings" ? "NaviButton NaviActive" : "NaviButton"}><IoSettings/></button>
          <button style={{animation: "slideInSoft 0.3s backwards", animationDelay: "0.4s"}} onClick={logout} className="NaviButton"><IoExit/></button>
        </div>
        <Route exact path={"/home/"} component={Chat} />
        <Route path={"/home/friends"} component={Friends} />
        <Route path={"/home/search"} component={Search} />
        <Route path={"/home/settings"} component={Settings} />
      </div>
  );
}
