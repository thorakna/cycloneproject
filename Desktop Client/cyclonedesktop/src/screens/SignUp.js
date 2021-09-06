import logo from '../images/icon.png';
import '../style/parallax-star.css';
export default function SignUp() {
  return (
    <div className="parallax-back">
      <div className="App">
        <div className="App-Auth">
          <header>
            <div className="backRound" style={{backgroundColor:"#3b3b3b", zIndex: -1}}></div>
            <div className="backRound" style={{backgroundColor:"#2a2a2a", zIndex: -2}}></div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Cyclone™</p>
          </header>
          <div className="AuthButtons">
            <p> Kayıt olma ekranındasın!</p>
          </div>
        </div>
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
  );
}
