import React, { useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../style/parallax-star.css';

export default function Auth() {
  let history = useHistory();

  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      history.replace("/home");
    }else{
      history.replace("/login");
    }
  }, [history]);

  return (
    <div className="parallax-back">
      <div className="App">
        <div className="App-Auth">
          <header style={{zIndex: 20}}>
            <p>Cyclone™</p>
            Authentication is in progress...
          </header>
        </div>
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
  );
}
