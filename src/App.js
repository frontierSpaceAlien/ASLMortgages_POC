import * as React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Button from '@mui/material/Button';
import Browse from "./pages/Browse";
import Borrowers from "./pages/Borrower";
import AddLoan from "./pages/AddLoan";
import logo from "./assets/logo/image01.png"

const App = () =>  { 
  return (
        <Router>
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
                <li><NavLink to = "/"><Button sx={{ color: 'black'}}>Home</Button></NavLink></li>
                <li><NavLink to ="/Investors"><Button sx={{ color: 'black'}}>Investors</Button></NavLink></li>
                <li><NavLink to ="/Borrowers"><Button sx={{ color: 'black'}}>Borrowers</Button></NavLink></li>
                <li><NavLink to = "/AddLoan "><Button sx={{ color: 'black'}}>Add Loan</Button></NavLink></li>
                <li><NavLink to = "/Schedule"><Button sx={{ color: 'black'}}>Payment Schedule</Button></NavLink></li>
                <li><NavLink to = "/Loans"><Button sx={{ color: 'black'}}>Loans</Button></NavLink></li>
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
