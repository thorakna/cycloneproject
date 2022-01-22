import React, { useEffect, useState } from 'react';
// Belki daha sonra kullanırız :: import { useHistory, useLocation } from 'react-router-dom';
import '../style/Search.css';
import swImage from "../images/sw_image.png";
import { IoSearch, IoPersonAdd, IoCheckmarkSharp, IoCloseSharp, IoChatbubbleEllipses } from "react-icons/io5";
import Modal from '../components/Modal';

import { server_address } from "../api/Config";
import { getSearchData } from '../api/SearchAPI';

let currentPageNumber = 1;

export default function Search() {
  // Belki daha sonra kullanırız :: const history = useHistory();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [Sloading, setSLoading] = useState(false);
  //const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [iShow, setiShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const renderSearchData = async (val) => {
    if(val.length < 3) return;

    var username = localStorage.getItem("username");
    var token = localStorage.getItem("accessToken");
    console.log(currentPageNumber+".sayfa çekiliyor");
    const data = await getSearchData(username, token, val, currentPageNumber);
    setSLoading(false);
    if(data.status == "success"){
      setResults([...results, ...data.data]);
      console.log(data.data);
    }else{
      setModalMessage(data.message);
      setiShow(true);
    }
  }

  const SearchListOnScroll = (e) => {
    var offHeight = e.target.offsetHeight;
    var scrollingHeight = e.target.scrollHeight - e.target.scrollTop;
    if(offHeight >= scrollingHeight){
      console.log("Şu sayfa gelecek: "+(currentPageNumber+1));
      //setCurrentPageNumber(currentPageNumber+1);
      currentPageNumber++;
      console.log("Ayarlanmış current page: "+currentPageNumber);
      renderSearchData(search);
    }
  }

  const setTimeLimit = (val) => {
    setResults([]);
    setSLoading(true);
    //setCurrentPageNumber(1);
    currentPageNumber = 1;

    if(window.timeInterval){
      clearTimeout(window.timeInterval);
    }
    window.timeInterval = setTimeout(()=>{renderSearchData(val);}, 2000);
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      // Enter eventinde timeout'a gerek yok
      if(window.timeInterval){
        clearTimeout(window.timeInterval);
      }
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

            <ul className="SearchResults" onScroll={SearchListOnScroll}>

              {search.length > 2 && !Sloading && results.length === 0 && 
                <div className="SearchInfo">
                  <img src={swImage}></img>
                  <h4>No results found</h4>
                  It seems we can't find any user based on your search.
                </div>
              }

              {search.length > 2 && Sloading && 
                <div className="SearchInfo">
                  <div className="TLoading">
                    <div className="Le1"></div>
                    <div className="Le2"></div>
                    <div className="Le3"></div>
                  </div>
                </div>
              }

              {search.length > 2 && results.map((e, i) => <li key={i} style={{animationDelay: i*0.1+"s"}}>
                 <img src={`${server_address}api/users/avatars/${e.imageUrl}`}></img>
                 <div>
                   {e.fullName}
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
