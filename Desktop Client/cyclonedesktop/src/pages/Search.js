import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/Search.css';
import logo from "../images/icon_small.png";
import { IoSearch, IoPersonAdd } from "react-icons/io5";

import { server_address } from "../api/Config";



export default function Search() {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const results = [];
  for(var c=0; c < 50; c++){
    results.push(<li key={c} style={{animationDelay: c*0.1+"s"}}>
      <img src={`${server_address}api/users/avatars/init.png`}></img>
      <div>
        Cyclone User {c}
        <aside className="descGray">@user{c}</aside>
      </div>
      <button onClick={()=>{}} className="AddButton primaryColor"><IoPersonAdd/></button>
    </li>);
  }

  return (
    <>
        <div className="PageContainer">
          <div className="PageHeader">
            <h4>Search</h4>
            <aside className="descGray">Search friends!</aside>
          </div>
          <div className="Page" style={{overflowY:"auto"}}>
            <div className="SearchBack"></div>
            <div className="SearchInput">
              <input type="text" id="SearchInput" placeholder="Search friends!" value={search} autoComplete="off" onChange={(e)=>{setSearch(e.target.value);}}></input>
            </div>

            <ul className="SearchResults">
              {search.length > 3 && results}
            </ul>
          </div>
        </div>
    </>
  );
}
