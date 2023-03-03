import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Browse from "./pages/Browse";
import Borrowers from "./pages/Borrower";
import AddLoan from "./pages/AddLoan";
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
                <li><NavLink to = "/Investors">Investors</NavLink></li>
                <li><NavLink to = "/Borrowers">Borrowers</NavLink></li>
                <li><NavLink to = "/AddLoan ">Add Loan</NavLink></li>
                <li><NavLink to = "/Schedule">Payment Schedule</NavLink></li>
                <li><NavLink to = "/Loans">Loans</NavLink></li>
              </ul>
              <div className="content">
                <Routes>
                  <Route exact path="/" element={<Browse />} />
                  <Route exact path="/AddLoan" element={<AddLoan />} />
                  <Route exact path="/Borrowers" element={<Borrowers />} />
                </Routes>
              </div>
          </div>
        </Router>
    );
}
 
export default App;
