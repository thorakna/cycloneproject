import logo from '../images/icon.png';
import { useHistory } from "react-router-dom";
function AuthChoose() {
  let history = useHistory();
  return (
    <div className="App">
      <div className="App-Auth">
        <header>
          <div className="backRound animCircle1" style={{backgroundColor:"#3b3b3b", zIndex: -1}}></div>
          <div className="backRound animCircle2" style={{backgroundColor:"#2a2a2a", zIndex: -2}}></div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Cyclone™</p>
        </header>
        <div className="AuthButtons">
          <button onClick={()=>{history.push("/girisyap")}} className="primaryColor">GİRİŞ YAP</button>
          <button onClick={()=>{history.push("/kayitol")}} className="secondaryColor">KAYIT OL</button>
        </div>
      </div>
    </div>
  );
}

export default AuthChoose;
