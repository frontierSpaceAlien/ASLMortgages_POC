import * as React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Browse from "./pages/Browse";
import Borrowers from "./pages/Borrower";
import AddLoan from "./pages/AddLoan";
import logo from "./assets/logo/image01.png"
import NetflixSansReg from "./fonts/NetflixSans-Regular.ttf";

const theme = createTheme({
    typography: {
        fontFamily: 'NetflixSans',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'NetflixSans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('NetflixSans'), url(${NetflixSansReg}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
        },
    },
});

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
                  <ThemeProvider theme={theme}>
                      <li><NavLink to="/"><Button sx={{ color: 'black', textTransform: 'capitalize' }}>Home</Button></NavLink></li>
                      <li><NavLink to="/Investors"><Button sx={{ color: 'black', textTransform: 'capitalize' }}>Investors</Button></NavLink></li>
                      <li><NavLink to="/Borrowers"><Button sx={{ color: 'black', textTransform: 'capitalize' }}>Borrowers</Button></NavLink></li>
                      <li><NavLink to="/AddLoan "><Button sx={{ color: 'black', textTransform: 'capitalize' }}>Add Loan</Button></NavLink></li>
                      <li><NavLink to="/Schedule"><Button sx={{ color: 'black', textTransform: 'capitalize' }}>Payment Schedule</Button></NavLink></li>
                      <li><NavLink to="/Loans"><Button sx={{ color: 'black', textTransform: 'capitalize' }}>Loans</Button></NavLink></li>
                 </ThemeProvider>
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
