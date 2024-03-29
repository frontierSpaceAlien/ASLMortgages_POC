import * as React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Browse from "./pages/Browse";
import Borrowers from "./pages/Borrower";
import Loan from "./pages/Loan";
import logo from "./assets/logo/image01.png";
import Investors from "./pages/Investor";
import NetflixSansReg from "./fonts/NetflixSans-Regular.ttf";
import { green, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo["A700"],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: "NetflixSans",
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

/**************************** Handles the navbar on the page  ****************************/
const App = () => {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <ul className="header">
            <li>
              <NavLink exact to="/">
                <a href="d" className="logo">
                  <img className="logo" src={logo} alt="" />
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <Button sx={{ color: "black", textTransform: "capitalize" }}>
                  Home
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Investors">
                <Button sx={{ color: "black", textTransform: "capitalize" }}>
                  Investors
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Borrowers">
                <Button sx={{ color: "black", textTransform: "capitalize" }}>
                  Borrowers
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Loan ">
                <Button sx={{ color: "black", textTransform: "capitalize" }}>
                  Loans
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Schedule">
                <Button sx={{ color: "black", textTransform: "capitalize" }}>
                  Payment Schedule
                </Button>
              </NavLink>
            </li>
          </ul>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Browse />} />
              <Route exact path="/Loan" element={<Loan />} />
              <Route exact path="/Borrowers" element={<Borrowers />} />
              <Route exact path="/Investors" element={<Investors />} />
            </Routes>
          </div>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
