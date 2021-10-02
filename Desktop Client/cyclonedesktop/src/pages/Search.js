import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/parallax-star.css';
import '../style/Search.css';
import logo from "../images/icon_small.png";
import { IoSearch, IoPersonAdd } from "react-icons/io5";


export default function Search() {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const results = [];
  for(var c=0; c < 20; c++){
    results.push(<li style={{animationDelay: c*0.1+"s"}}>
      <img src="https://onuryasar.online/images/clients/brkcanaltun.jpg"></img>
      <div>
        Cyclone User {c}
        <aside class="descGray">#user{c}</aside>
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
