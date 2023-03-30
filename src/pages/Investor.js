import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NetflixSansReg from '../fonts/NetflixSans-Regular.ttf';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function createData(borrowerID, ird, name, bankAccount, rwtRate, dob, country) {
  return {
    borrowerID,
    ird,
    name,
    bankAccount,
    rwtRate,
    dob,
    country,
    email: "test@test.com",
    history: [
      {
        date: '2020-01-05',
        loanId: 'Investor1',
        amount: 395632.05,
        active: "No"
      },
      {
        date: '2020-01-02',
        loanId: 'Investor',
        amount: 156798.18,
        active: "No"
      },
    ],
  };
}

/** DUMMY DATA **/
// Never have duplicate borrower ids. Duplicate borrower ids will cause the table to break.
const rows = [
  createData(0,'Investor 1', 0, 0, 0, 0),

]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


function ExpandRow({children, expandComponent, ...otherProps}){
  const { row } = otherProps;
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClick = () => {
    setOpenSnack(true);
    console.log(openSnack);
    navigator.clipboard.writeText(rows.email)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
    <TableRow key={row.borrowerID}  {...otherProps}>
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
          <Collapse in={open} timeout= {"auto"} unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                  Investor Contact Details
                </Typography>
                  <p>Phone Number-02222222</p>
                  <p>Email-   
                    <Tooltip title="Copy">
                      <Link variant = "body2" underline ="hover" component ="button" onClick={handleClick}>
                        {row.email}
                      </Link>
                    </Tooltip>       
                  <Snackbar open = {openSnack} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
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
                        <TableCell>Investor</TableCell>
                        <TableCell align="right">Investor Amount</TableCell>
                        <TableCell align="right">Active</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                        {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.loanId}</TableCell>
                        <TableCell align="right">${historyRow.amount.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell>
                        <TableCell align="right">{historyRow.active}</TableCell>
                      </TableRow>
              ))}
              </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
  </ThemeProvider>
    </React.Fragment>
  )
}

var indexData = 0;

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowData, setRowData] = React.useState(rows);
  const [modal, setModal] = React.useState(false);
  const [editInvestorIndex, setEditInvestorIndex] = useState(null);
  const [editInvestorModal, setEditInvestorModal] = useState(false);

  const handleEditInvestorModalOpen = (index) => {
    setEditInvestorIndex(index);
    setInvestorName(rowData[index].name);
    setInterestBankAccount(rowData[index].bankAccount);
    setRwtRate(rowData[index].rwtRate);
    setIrdNumber(rowData[index].ird);
    setDob(rowData[index].dob);
    setCountry(rowData[index].country);
    setEditInvestorModal(true);
  };

  const handleUpdateInvestor = () => {
    
    const updatedInvestor = {
      ...rowData[editInvestorIndex],
      name: investorName,
      bankAccount: parseFloat(InterestBankAccount),
      rwtRate: parseFloat(RwtRate),
      ird: IrdNumber,
      dob: Dob.toLocaleString(undefined, {maximumFractionDigits:2}),
      country: Country.toLocaleString(undefined, {maximumFractionDigits:2}),
    };
  
    const updatedRowData = [...rowData];
    updatedRowData[editInvestorIndex] = updatedInvestor;
    setRowData(updatedRowData);
    setEditInvestorModal(false);
  };

  const handleEditInvestorModalClose = () => {
    setEditInvestorModal(false);
  };

  const handleAddInvestorModalOpen = () => {
    setAddInvestorModal(true);
  };

  const handleAddInvestorModalClose = () => {
    setAddInvestorModal(false);
  };

const handleAddInvestor = () => {

  const newInvestor = {
    borrowerID: rowData.length,
    name: investorName,
    bankAccount: InterestBankAccount,
    rwtRate: parseFloat(RwtRate),
    ird: IrdNumber,
    dob: Dob,
    country: Country,
    history: [],
  };

  // Add the new investor object to your data source (e.g., rowData)
  setRowData([...rowData, newInvestor]);
  setAddInvestorModal(false);
};
  
  const currentRows = rowData.filter((r, ind) => {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalClose = () =>{
    setModal(false)
  };

  const handleDeletePopup = () =>{
    setRowData((prevData) =>
      prevData.filter((_, index) => index !== indexData)
    );
    setModal(false)
  }

  const handlePopup = (dataIndex) =>{
    indexData = dataIndex
    setModal(true)
  }
  
  const [addInvestorModal, setAddInvestorModal] = useState(false);

   
    // Add the new investor object to your data source (e.g., rowData)


const [investorName, setInvestorName] = useState('');
const [InterestBankAccount, setInterestBankAccount] = useState('');
const [RwtRate, setRwtRate] = useState('');
const [IrdNumber, setIrdNumber] = useState('');
const [Dob, setDob] = useState('');
const [Country, setCountry] = useState('');

  return (
    <div className = "tableView">
    <ThemeProvider theme={theme}>
    <Paper elevation={0} style={{ height: "100%", paddingLeft: 100, paddingRight:100}}>
        <TableContainer>
        <h3>Investor</h3>
            <div className = "align-row">
                <Button
                    endIcon={<AddIcon />}
                    sx={{ color: "black", textTransform: 'capitalize' }}
                    onClick={handleAddInvestorModalOpen}
                    >
                Add Investor
                </Button>
                <Dialog
                open={addInvestorModal}
                onClose={handleAddInvestorModalClose}
                aria-labelledby="add-investor-dialog-title"
                aria-describedby="add-investor-dialog-description"
              >
                <DialogTitle id="add-investor-dialog-title">Add Investor</DialogTitle>
                <DialogContent>
                  <TextField
                  label="IRD Number"
                  value={IrdNumber}
                  onChange={(e) => setIrdNumber(e.target.value)}
                  fullWidth
                  />
                  <TextField
                    label="Investor"
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Interest Bank Account"
                    value={InterestBankAccount}
                    onChange={(e) => setInterestBankAccount(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="RWT Rate"
                    value={RwtRate}
                    onChange={(e) => setRwtRate(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="DOB"
                    value={Dob}
                    onChange={(e) => setDob(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Country"
                    value={Country}
                    onChange={(e) => setCountry(e.target.value)}
                    fullWidth
                  />

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddInvestorModalClose}>Cancel</Button>
                  <Button onClick={handleAddInvestor}>Add</Button>
                </DialogActions>
              </Dialog>
            </div>
          <Table  aria-label="collapsible table" size='small'>
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>IRD Number</StyledTableCell>
                <StyledTableCell>Investor</StyledTableCell>
                <StyledTableCell align="right">Interest Bank Account</StyledTableCell>
                <StyledTableCell align="right">RWT Rate</StyledTableCell>
                <StyledTableCell align="right">DOB</StyledTableCell>
                <StyledTableCell align="right">Country</StyledTableCell>
                <StyledTableCell align="right">Edit/Cancel</StyledTableCell>        
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row, dataIndex) => (
                <React.Fragment>
                  <ThemeProvider theme={theme}>
                    <ExpandRow row ={row}>
                    <TableCell component="th" scope="row">
                       {row.ird}
                  </TableCell>  
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.bankAccount}</TableCell>
                    <TableCell align="right">{row.rwtRate}%</TableCell>
                    <TableCell align="right">{row.dob}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">
                        <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditInvestorModalOpen(dataIndex)}>
                            <EditIcon/>
                          </IconButton>
                        </Tooltip>
                        <Dialog
                          open={editInvestorModal}
                          onClose={handleEditInvestorModalClose}
                          aria-labelledby="edit-investor-dialog-title"
                          aria-describedby="edit-investor-dialog-description"
                        >
                          <DialogTitle id="edit-investor-dialog-title">Edit Investor</DialogTitle>
                          <DialogContent>
                            <TextField
                              label="IRD Number"
                              value={IrdNumber}
                              onChange={(e) => setIrdNumber(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="Investor"
                              value={investorName}
                              onChange={(e) => setInvestorName(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="Interest Bank Account"
                              value={InterestBankAccount}
                              onChange={(e) => setInterestBankAccount(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="RWT Rate"
                              value={RwtRate}
                              onChange={(e) => setRwtRate(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="DOB"
                              value={Dob}
                              onChange={(e) => setDob(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="Country"
                              value={Country}
                              onChange={(e) => setCountry(e.target.value)}
                              fullWidth
                            />

                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleEditInvestorModalClose}>Cancel</Button>
                            <Button onClick={handleUpdateInvestor}>Save</Button>
                          </DialogActions>
                        </Dialog>
                        <Tooltip title="Delete">
                          <IconButton value={row.borrowerID} onClick={() => handlePopup(dataIndex)}>
                            <DeleteIcon color = "error"/>
                          </IconButton>
                        </Tooltip>
                      <Dialog
                        open={modal}
                        onClose={handleModalClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Delete"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure you want delete this Investor?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleModalClose}>Disagree</Button>
                          <Button onClick={handleDeletePopup} autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
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





