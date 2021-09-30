import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Search.css';
import logo from "../images/icon_small.png";
import { IoExit, IoSend, IoSettings, IoPeople, IoSearch } from "react-icons/io5";


export default function Search() {
  const history = useHistory();
  const [search, setSearch] = useState("");

  return (
    <>
        <div className="PageContainer">
          <div className="PageHeader">
            <h4>Search</h4>
            <aside className="descGray">Search friends!</aside>
          </div>
          <div className="Page">
            <div className="SearchBack"></div>
            <div className="SearchInput">
              <input type="text" id="SearchInput" placeholder="Search friends!" value={search} autoComplete="off" onChange={(e)=>{setSearch(e.target.value);}}></input>
              <button onClick={()=>{}} className="SendButton primaryColor"><IoSearch/></button>
            </div>

          </div>
        </div>
    </>
  );
}
