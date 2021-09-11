import './App.css';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { CSSTransition } from 'react-transition-group';


const routes = [
  { path: '/', Component: SignIn },
  { path: '/home', Component: Home},
  { path: '/kayitol', Component: SignUp },
]

function App() {
  return (
    <Router>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
    </Router>
  );
}

export default App;
