import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../style/Search.css';
import logo from "../images/icon_small.png";
import { IoSearch, IoPersonAdd, IoCheckmarkSharp, IoCloseSharp, IoChatbubbleEllipses } from "react-icons/io5";
import Modal from '../components/Modal';

import { server_address } from "../api/Config";
import { getSearchData } from '../api/SearchAPI';



export default function Search() {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [iShow, setiShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const renderSearchData = async (val) => {
    if(val.length < 3) return;

    var username = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");
    const data = await getSearchData(username, token, val);
    if(data.status == "success"){
      setResults(data.data);
      console.log(data.data);
    }else{
      setModalMessage(data.message);
      setiShow(true);
    }
  }

  const setTimeLimit = (val) => {
    if(window.timeInterval){
      console.log("Timeout silindi");
      clearTimeout(window.timeInterval);
    }
    window.timeInterval = setTimeout(()=>{renderSearchData(val);}, 2500);
  }

  return (
    <>
        <Modal mState={{iShow, setiShow}} buttonShow={modalMessage === "currentpass-send" && "yes"}>
            {
              modalMessage === "currentpass-send" ? 
              <>

              </>
               : 
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
              <input type="text" id="SearchInput" placeholder="Search friends!" value={search} autoComplete="off" onChange={(e)=>{setTimeLimit(e.target.value); setSearch(e.target.value);}}></input>
            </div>

            <ul className="SearchResults">
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
