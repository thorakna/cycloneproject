import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Home.css';
import { IoExit, IoSend, IoSettings, IoPeople, IoSearch } from "react-icons/io5";


export default function Search() {
  const history = useHistory();
  
  return (
    <>
        <div className="ChatContainer">
          <div className="ChatHeader">
            <div className="UserDetails">
              Burası search sayfası!
            </div>
          </div>
        </div>
    </>
  );
}
