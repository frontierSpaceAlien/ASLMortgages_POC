import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Browse from "./pages/Browse";
import logo from "./assets/logo/image01.png"

const App = () =>  {

  return (
        <Router basename="/Browse">
          <div>
              <ul className="header">
              <li>
                  <NavLink exact to = "/">
                    <a href="d" className="logo">
                      <img className="logo" src={logo} alt=""/>
                    </a>
                  </NavLink>
{/* Remember to change the header names to appropriate tab names
remove this comment when done */}
              </li>
                <li><NavLink to = "/">Home</NavLink></li>
                <li><NavLink to = "/TVShows">TV Shows</NavLink></li>
                <li><NavLink to = "/Movies">Movies</NavLink></li>
                <li><NavLink to = "/NewPopular">New & Popular</NavLink></li>
                <li><NavLink to = "/List">My List</NavLink></li>
                <li><NavLink to = "/Language">Browse by Languages</NavLink></li>
              </ul>
              <div className="content">
                <Routes>
                  <Route exact path="/" element={<Browse />} />
                </Routes>
              </div>
          </div>
        </Router>
    );
}
 
export default App;
