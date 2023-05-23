import * as React from "react";
import BorrowerFinder from "../api/BorrowerFinder";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import NetflixSansReg from "../fonts/NetflixSans-Regular.ttf";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { green, purple } from '@mui/material/colors';

/******************** Theme for whole table **********************************/
const theme = createTheme({
  // palette:{
  //   primary:{
  //     main: purple[900],
  //   },
  //   secondary: {
  //     main: green[500],
  //   },
  // },
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/************************* Creates a styled table look ************************/
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/***************** This function is responsible for the expanded row  **************/
function ExpandRow({ children, expandComponent, ...otherProps }) {
  const { row } = otherProps;
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);

  /**************** When clicking on the email hyperlink, this function opens a snack popup **********/
  /**************** This also saves the email hyperlink into clipboard *******************************/
  const handleClick = () => {
    setOpenSnack(true);
    console.log(openSnack);
    navigator.clipboard.writeText(row.borroweremailaddress);
  };

  /***************** Handles closing of snackbar *****************************************************/
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  /****************** Return renders whole table ******************************************************/
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableRow key={row.borrowerID} {...otherProps}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout={"auto"} unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Borrower Contact Details
                </Typography>
                <p>Phone Number-{row.borrowercontactnumber}</p>
                <p>
                  Email-
                  <Tooltip title="Copy">
                    <Link
                      variant="body2"
                      underline="hover"
                      component="button"
                      onClick={handleClick}
                    >
                      {row.borroweremailaddress}
                    </Link>
                  </Tooltip>
                  <Snackbar
                    open={openSnack}
                    autoHideDuration={2000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Copied!
                    </Alert>
                  </Snackbar>
                </p>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Loan</TableCell>
                      <TableCell align="right">Loan Amount</TableCell>
                      <TableCell align="right">Active</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* need to figure out how to map through the history of loans for each borrower  */}
                    {/* {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                        {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.loanId}</TableCell>
                        <TableCell align="right">${historyRow.amount.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell>
                        <TableCell align="right">{historyRow.active}</TableCell>
                      </TableRow>
                  ))} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </ThemeProvider>
    </React.Fragment>
  );
}

var indexData = 0;

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowData, setRowData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openAdd, setAdd] = React.useState(false);
  const [openCheckbox, setCheckbox] = React.useState([]);
  const [active, setActive] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [errorFirst, setErrorFirst] = React.useState(false);
  const [errorLast, setErrorLast] = React.useState(false);

  /****************Gathers data from the backend database*******************/
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BorrowerFinder.get("/");
        setRowData(response.data.data.borrower);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /*When a new borrower is created, handleAddSubmit adds new borrower to db*/
  /*and it also resets the form data ***************************************/

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (firstName === "" && lastName === "") {
      setErrorFirst(true);
      setErrorLast(true);
    } else if (firstName === "") {
      setErrorFirst(true);
    } else if (lastName === "") {
      setErrorLast(true);
    } else {
      try {
        const response = await BorrowerFinder.post("/", {
          borrowerFirstName: firstName,
          borrowerLastName: lastName,
          borrowerEmailAddress: email,
          borrowerContactNumber: phone,
        });
        setRowData([...rowData, response.data.data.borrower]);
      } catch (err) {
        console.log(err);
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAdd(false);
    }
  };

  /*********************** Handles the deletion of a borrower ***************/
  const handleDeletePopup = async () => {
    try {
      const response = await BorrowerFinder.delete(`/${indexData}`);
      setRowData(
        rowData.filter((row) => {
          return row.borrower_id !== indexData;
        })
      );
    } catch (err) {
      console.error(err);
    }

    // setRowData((prevData) =>
    //   prevData.filter((_, index) => index !== indexData)
    // );
    // console.log(rowData)
    setModal(false);
    setOpenSnack(true);
  };

  /*************** Handles 'active' field display ******************************/
  const handleActiveChange = (event) => {
    setActive(event.target.value);
  };

  /************* Calculates how many rows to display per page ******************/
  const currentRows = rowData.filter((r, ind) => {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });

  /************** Calculates the table height in relation to the empty rows ****/
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

  /******************* Handles the table pagination. **************************/
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /******************* Handles how many rows are displayed per page ***********/
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /******************** Handles the pop when deleting a borrower **************/
  const handlePopupClose = () => {
    setModal(false);
  };

  /****************** When clicking on a borrower, this gets the ID of a borrower and sets the modal to true */
  const handlePopup = (dataIndex) => {
    indexData = dataIndex;
    console.log(indexData);
    setModal(true);
  };

  /************* Handles the snackbar popup **********************************/
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  /************** Handles the add button popup ********************************/
  const handleAdd = () => {
    setAdd(true);
  };

  /*************** Handles the 'Cancel' button in the popup  ******************/
  /*************** Also clears the form fields ********************************/
  const handleAddClose = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAdd(false);
    setCheckbox([]);
    setActive("");
  };

  /**************** Handles the checkbox in the add borrower modal ************/
  const handleCheckboxClick = (event) => {
    if (event.target.checked === true) {
      setCheckbox([...openCheckbox, ""]);
    } else {
      setCheckbox([]);
    }
  };

  /**************** Saves the first name field into a state *******************/
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
    setErrorFirst(false);
  };

  /**************** Saves the last name field into a state *******************/
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
    setErrorLast(false);
  };

  /**************** Return renders whole table *******************************/
  return (
    <div className="tableView">
      <ThemeProvider theme={theme}>
        <Paper
          elevation={0}
          style={{ height: "100%", paddingLeft: 100, paddingRight: 100 }}
        >
          <TableContainer>
            <h3>Borrowers</h3>
            <div className="align-row">
              <Button
                endIcon={<AddIcon />}
                sx={{ color: "black", textTransform: "capitalize" }}
                onClick={handleAdd}
              >
                Add Borrower
              </Button>
            </div>
            <Dialog open={openAdd} onClose={handleAddClose}>
              <DialogTitle>Add Borrower</DialogTitle>
              <DialogContent>
                <Typography sx={{ color: "gray", fontSize: 15 }}>
                  * Required Fields
                </Typography>
                <TextField
                  value={firstName}
                  error={errorFirst}
                  required
                  onChange={(e) => onChangeFirstName(e)}
                  autoFocus
                  margin="dense"
                  id="outlined-required"
                  label="First Name"
                  type="name"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  value={lastName}
                  error={errorLast}
                  required
                  onChange={(e) => onChangeLastName(e)}
                  autoFocus
                  margin="dense"
                  id="outlined-required"
                  label="Last Name"
                  type="name"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="outlined-number"
                  label="Email"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  variant="standard"
                />
                <TextField
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="outlined-number"
                  label="Phone Number"
                  sx={{ m: 1 }}
                  variant="standard"
                />
                <div>
                  <Typography variant="caption" sx={{ color: "grey" }}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxClick} />}
                        label="Does this borrower have a history with ASL Mortgages?"
                      />
                    </FormGroup>
                  </Typography>
                </div>
                {openCheckbox.map((index) => (
                  <Box key={index}>
                    <p style={{ color: "red" }}>
                      **probably change these text fields to drop down menus and
                      pull data from loans page. Currently will not save the
                      information below - Just testing for now**
                    </p>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-required"
                      label="Date"
                      type="name"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      label="Loan Amount"
                      variant="standard"
                      fullWidth
                    />
                    <FormControl sx={{ mt: 2.5 }} fullWidth>
                      <InputLabel>Active?</InputLabel>
                      <Select
                        value={active}
                        label="Active"
                        onChange={handleActiveChange}
                        fullWidth
                        sx={{ color: "black" }}
                      >
                        <MenuItem value={10}>Yes</MenuItem>
                        <MenuItem value={20}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                ))}
              </DialogContent>
              <DialogActions>
                <Button sx={{ color: "red" }} onClick={handleAddClose}>
                  Cancel
                </Button>
                <Button sx={{ color: "black" }} onClick={handleAddSubmit}>
                  Add
                </Button>
              </DialogActions>
            </Dialog>
            <Table aria-label="collapsible table" size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell />
                  <StyledTableCell>Borrower</StyledTableCell>
                  <StyledTableCell align="right">Loan Amount</StyledTableCell>
                  <StyledTableCell align="right">Interest Rate</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((row, dataIndex) => (
                  <React.Fragment>
                    <ThemeProvider theme={theme}>
                      <ExpandRow row={row}>
                        <TableCell component="th" scope="row">
                          {row.borrowerfirstname + " " + row.borrowerlastname}
                        </TableCell>
                        <TableCell align="right">$</TableCell>
                        <TableCell align="right">{row.intRate}%</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              value={row.borrowerID}
                              onClick={() => handlePopup(row.borrower_id)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                          <Dialog
                            open={modal}
                            onClose={handlePopupClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            PaperProps={{
                              elevation: 3,
                            }}
                            BackdropProps={{
                              style: {
                                backgroundColor: "rgba(0,0,0,0.1)",
                                boxShadow: "none",
                              },
                            }}
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Delete"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you sure you want delete this borrower?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                sx={{ color: "red" }}
                                onClick={handlePopupClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                sx={{ color: "black" }}
                                onClick={handleDeletePopup}
                                autoFocus
                              >
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <Snackbar
                            open={openSnack}
                            autoHideDuration={3000}
                            onClose={handleSnackClose}
                          >
                            <Alert
                              onClose={handleSnackClose}
                              severity="error"
                              sx={{ width: "100%" }}
                            >
                              Deleted Borrower
                            </Alert>
                          </Snackbar>
                        </TableCell>
                      </ExpandRow>
                    </ThemeProvider>
                  </React.Fragment>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={rowData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </ThemeProvider>
    </div>
  );
}
