import React, { useEffect, useState } from 'react';
// Belki daha sonra kullanırız :: import { useHistory, useLocation } from 'react-router-dom';
import '../style/Search.css';
import swImage from "../images/sw_image.png";
import { IoSearch, IoPersonAdd, IoCheckmarkSharp, IoCloseSharp, IoChatbubbleEllipses } from "react-icons/io5";
import Modal from '../components/Modal';

import { server_address } from "../api/Config";
import { getSearchData } from '../api/SearchAPI';


export default function Search() {
  // Belki daha sonra kullanırız :: const history = useHistory();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [Sloading, setSLoading] = useState(false);

  const [iShow, setiShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const renderSearchData = async (val) => {
    if(val.length < 3) return;

    var username = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");
    const data = await getSearchData(username, token, val, 1);
    setSLoading(false);
    if(data.status == "success"){
      setResults(data.data);
      console.log(data.data);
    }else{
      setModalMessage(data.message);
      setiShow(true);
    }
  }

  const setTimeLimit = (val) => {
    setResults([]);
    setSLoading(true);
    if(window.timeInterval){
      console.log("Timeout silindi");
      clearTimeout(window.timeInterval);
    }
    window.timeInterval = setTimeout(()=>{renderSearchData(val);}, 2000);
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      renderSearchData(search);
    }
  }

  return (
    <>
        <Modal mState={{iShow, setiShow}}>
            {
              modalMessage
            }
        </Modal>
        <div className="PageContainer">
          <div className="PageHeader">
            <h4>Search</h4>
            <aside className="descGray">Search friends!</aside>
          </div>
          <div className="Page" style={{overflowY:"auto"}}>
            <div className="SearchBack"></div>
            <div className="SearchInput">
              <input type="text" id="SearchInput" onKeyDown={onKeyDown} placeholder="Search friends!" value={search} autoComplete="off" onChange={(e)=>{setTimeLimit(e.target.value); setSearch(e.target.value);}}></input>
            </div>

            <ul className="SearchResults">

              {search.length > 2 && !Sloading && results.length === 0 && 
                <div className="SearchInfo">
                  <img src={swImage}></img>
                  <h4>No results found</h4>
                  It seems we can't find any user based on your search.
                </div>
              }

              {Sloading && 
                <div className="SearchInfo">
                  <div className="CustomLoading">
                    <div className="Le1"></div>
                    <div className="Le2"></div>
                    <div className="Le3"></div>
                  </div>
                </div>
              }

              {search.length > 2 && results.map((e, i) => <li key={i} style={{animationDelay: i*0.1+"s"}}>
                 <img src={`${server_address}api/users/avatars/${e.imageUrl}`}></img>
                 <div>
                   {e.username}
                   <aside className="descGray">@{e.username}</aside>
                 </div>
                 {e.isFriend ? <button onClick={()=>{}} className="AddButton primaryColor"><IoChatbubbleEllipses/></button>
                  : 
                  e.isSentReq ? <button onClick={()=>{}} disabled={true} className="AddButton primaryColor"><IoPersonAdd/></button>
                  : <button onClick={()=>{}} className="AddButton primaryColor"><IoPersonAdd/></button>
                }
                {
                  e.isPendingReq &&
                  <>
                    <button onClick={()=>{}} className="AddButton primaryColor"><IoCheckmarkSharp/></button>
                    <button onClick={()=>{}} className="AddButton cancelColor"><IoCloseSharp/></button>
                  </>
                }
                 
               </li>)}
            </ul>
          </div>
        </div>
    </>
  );
}
