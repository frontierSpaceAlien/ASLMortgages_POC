import { useState } from 'react';
import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, Button, Paper, Tooltip, Link, Snackbar, TextField } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import NetflixSansReg from '../fonts/NetflixSans-Regular.ttf';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import { Alert as MuiAlert } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';



//website Format&stylings
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

//insert SampleData from Client
const SampleData =[
  {
    'Investor Name': 'Investor 1',
    Name: 'A',
    'IRD Number': '123-123-123',
    'Interest Bank Account': '01-0190-0399949-01',
    'Capital Bank Account': '',
    'RWT Rate': '0.00%',
    DOB: '',
    Country: 'New Zealand',
    Address: 'address 1',
    Email: 'email1',
    'Contact Number': 'number1',
    InvestorCount: '1'
  },
  {
    'Investor Name': 'Investor 10',
    Name: 'B',
    'IRD Number': '123-123-124',
    'Interest Bank Account': '01-0190-0399949-02',
    'Capital Bank Account': '',
    'RWT Rate': '33.00%',
    DOB: '1982/2/4',
    Country: 'New Zealand',
    Address: 'address 2',
    Email: 'email2',
    'Contact Number': 'number2',
    InvestorCount: '19'
  },
  {
    'Investor Name': 'Investor 11',
    Name: 'C',
    'IRD Number': '123-123-125',
    'Interest Bank Account': '01-0190-0399949-03',
    'Capital Bank Account': '',
    'RWT Rate': '10.50%',
    DOB: '1987/10/9',
    Country: 'New Zealand',
    Address: 'address 3',
    Email: 'email3',
    'Contact Number': 'number3',
    InvestorCount: '15'
  },
  {
    'Investor Name': 'Investor 12',
    Name: 'D',
    'IRD Number': '123-123-126',
    'Interest Bank Account': '01-0190-0399949-04',
    'Capital Bank Account': '',
    'RWT Rate': '17.50%',
    DOB: '1962/7/17',
    Country: 'New Zealand',
    Address: 'address 4',
    Email: 'email4',
    'Contact Number': 'number4',
    InvestorCount: '26'
  },
  {
    'Investor Name': 'Investor 13',
    Name: 'E',
    'IRD Number': '123-123-127',
    'Interest Bank Account': '01-0190-0399949-05',
    'Capital Bank Account': '',
    'RWT Rate': '28.00%',
    DOB: '1980/9/7',
    Country: 'New Zealand',
    Address: 'address 5',
    Email: 'email5',
    'Contact Number': 'number5',
    InvestorCount: '4'
  },
  {
    'Investor Name': 'Investor 14',
    Name: 'F',
    'IRD Number': '123-123-128',
    'Interest Bank Account': '01-0190-0399949-06',
    'Capital Bank Account': '',
    'RWT Rate': '33.00%',
    DOB: '1973/5/12',
    Country: 'New Zealand',
    Address: 'address 6',
    Email: 'email6',
    'Contact Number': 'number6',
    InvestorCount: '29'
  },
  {
    'Investor Name': 'Investor 2',
    Name: 'G',
    'IRD Number': '123-123-129',
    'Interest Bank Account': '01-0190-0399949-07',
    'Capital Bank Account': '',
    'RWT Rate': '33.00%',
    DOB: '1980/9/7',
    Country: 'New Zealand',
    Address: 'address 7',
    Email: 'email7',
    'Contact Number': 'number7',
    InvestorCount: '2'
  },
  {
    'Investor Name': 'Investor 3',
    Name: 'H',
    'IRD Number': '123-123-130',
    'Interest Bank Account': '01-0190-0399949-08',
    'Capital Bank Account': '',
    'RWT Rate': '33.00%',
    DOB: '1982/2/4',
    Country: 'New Zealand',
    Address: 'address 8',
    Email: 'email8',
    'Contact Number': 'number8',
    InvestorCount: '6'
  },
  {
    'Investor Name': 'Investor 4',
    Name: 'I',
    'IRD Number': '123-123-131',
    'Interest Bank Account': '01-0190-0399949-09',
    'Capital Bank Account': '',
    'RWT Rate': '28.00%',
    DOB: '1963/12/25',
    Country: 'New Zealand',
    Address: 'address 9',
    Email: 'email9',
    'Contact Number': 'number9',
    InvestorCount: '17'
  },
  {
    'Investor Name': 'Investor 5',
    Name: 'J',
    'IRD Number': '123-123-132',
    'Interest Bank Account': '01-0190-0399949-10',
    'Capital Bank Account': '',
    'RWT Rate': '17.50%',
    DOB: '1981/11/7',
    Country: 'New Zealand',
    Address: 'address 10',
    Email: 'email10',
    'Contact Number': 'number10',
    InvestorCount: '3'
  },
  {
    'Investor Name': 'Investor 6',
    Name: 'K',
    'IRD Number': '123-123-133',
    'Interest Bank Account': '01-0190-0399949-11',
    'Capital Bank Account': '',
    'RWT Rate': '17.50%',
    DOB: '1980/9/7',
    Country: 'New Zealand',
    Address: 'address 11',
    Email: 'email11',
    'Contact Number': 'number11',
    InvestorCount: '18'
  },
  {
    'Investor Name': 'Investor 7',
    Name: 'L',
    'IRD Number': '123-123-134',
    'Interest Bank Account': '01-0190-0399949-12',
    'Capital Bank Account': '',
    'RWT Rate': '17.50%',
    DOB: '1967/9/2',
    Country: 'New Zealand',
    Address: 'address 12',
    Email: 'email12',
    'Contact Number': 'number12',
    InvestorCount: '21'
  },
  {
    'Investor Name': 'Investor 8',
    Name: 'M',
    'IRD Number': '123-123-135',
    'Interest Bank Account': '01-0190-0399949-13',
    'Capital Bank Account': '',
    'RWT Rate': '17.50%',
    DOB: '1996/12/23',
    Country: 'New Zealand',
    Address: 'address 13',
    Email: 'email13',
    'Contact Number': 'number13',
    InvestorCount: '20'
  },
  {
    'Investor Name': 'Investor 9',
    Name: 'N',
    'IRD Number': '123-123-136',
    'Interest Bank Account': '01-0190-0399949-14',
    'Capital Bank Account': '',
    'RWT Rate': '10.50%',
    DOB: '1960/5/2',
    Country: 'New Zealand',
    Address: 'address 14',
    Email: 'email14',
    'Contact Number': 'number14',
    InvestorCount: '24'
  },

]

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function createData(InvestorID, name, loanAmount, intRate, dailyInterest, totalPrice) {
  return {
    InvestorID,
    name,
    loanAmount,
    intRate,
    dailyInterest,
    totalPrice,
    //subrow data insert
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
    <TableRow key={row.InvestorID}  {...otherProps}>
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
                    More Information
                  </Typography>

                  <Table size="small" aria-label="purchases">
                    <TableHead>

                      {/*subtable title*/}
                      <TableRow>
                        <TableCell>IDXXX</TableCell>
                        <TableCell>InvestorName</TableCell>
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

  //edit button
  const handleEditInvestorModalOpen = (index) => {
    setEditInvestorIndex(index);
    setInvestorName(rowData[index].name);
    setInvestorAmount(rowData[index].loanAmount);
    setInterestRate(rowData[index].intRate);
    setInvestorDate(rowData[index].date);
    setEditInvestorModal(true);
  };

  const handleUpdateInvestor = () => {
    
    var resultToString = parseFloat(investorAmount) + (parseFloat(investorAmount) * parseFloat(interestRate) / 100);
    var dailyInt = parseFloat(investorAmount) * parseFloat(interestRate) / 100

    const updatedInvestor = {
      ...rowData[editInvestorIndex],
      name: investorName,
      loanAmount: parseFloat(investorAmount),
      intRate: parseFloat(interestRate),
      date: investorDate,
      dailyInterest: dailyInt.toLocaleString(undefined, {maximumFractionDigits:2}),
      totalPrice: resultToString.toLocaleString(undefined, {maximumFractionDigits:2}),
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
  const dailyInterest = investorAmount * interestRate / 100;
  const totalPrice = parseFloat(investorAmount) + dailyInterest;

  const newInvestor = {
    InvestorID: rowData.length,
    name: investorName,
    loanAmount: parseFloat(investorAmount),
    intRate: parseFloat(interestRate),
    date: investorDate,
    dailyInterest: dailyInterest,
    totalPrice: totalPrice,
    history: [],
  };

  // Add the new investor object to your data source (e.g., rowData)
  setRowData([...rowData, newInvestor]);
  setAddInvestorModal(false);
};
  //filter
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

  //delect button
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
const [investorAmount, setInvestorAmount] = useState('');
const [interestRate, setInterestRate] = useState('');
const [investorDate, setInvestorDate] = useState('');

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
                Add New Investor
                </Button>
                <Dialog
                open={addInvestorModal}
                onClose={handleAddInvestorModalClose}
                aria-labelledby="add-investor-dialog-title"
                aria-describedby="add-investor-dialog-description"
              >
                <DialogTitle id="add-investor-dialog-title">New Investor</DialogTitle>
                
                <DialogContent>
                  <TextField
                    label="Investor"
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Investor Amount"
                    value={investorAmount}
                    onChange={(e) => setInvestorAmount(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="RWT Rate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    fullWidth
                  />
                  <TextField
                  label="Start Date"
                  value={investorDate}
                  onChange={(e) => setInvestorDate(e.target.value)}
                  fullWidth
                  />
                </DialogContent>


                <DialogActions>
                  <Button onClick={handleAddInvestorModalClose}>Cancel</Button>
                  <Button onClick={handleAddInvestor}>Add</Button>
                </DialogActions>
              </Dialog>
            </div>
          <Table  aria-label="collapsible table" size='meduim'>

            {/*Main table header */}
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Investors Name</StyledTableCell>
                <StyledTableCell align="right">Start Date</StyledTableCell>
                <StyledTableCell align="right">Invest Total Amount</StyledTableCell>
                <StyledTableCell align="right">RWT Rate</StyledTableCell>
                <StyledTableCell align="right">Invest Count</StyledTableCell>
                <StyledTableCell align="right">Edit/Cancel</StyledTableCell>        
              </TableRow>
            </TableHead>
            <TableBody>



              {currentRows.map((row, dataIndex) => (
                <React.Fragment>
                  <ThemeProvider theme={theme}>
                    <ExpandRow row ={row}>
                    <TableCell component="th" scope="row">
                       {row.date}
                  </TableCell>  
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">${row.loanAmount.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell>
                    <TableCell align="right">{row.intRate}%</TableCell>
                    <TableCell align="right">${row.dailyInterest}</TableCell>
                    <TableCell align="right">${row.totalPrice}</TableCell>
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
                              label="Investor"
                              value={investorName}
                              onChange={(e) => setInvestorName(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="Investor Amount"
                              value={investorAmount}
                              onChange={(e) => setInvestorAmount(e.target.value)}
                              fullWidth
                            />
                            <TextField
                              label="Interest Rate"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              fullWidth
                            />
                            <TextField
                                label="Date"
                                value={investorDate}
                                onChange={(e) => setInvestorDate(e.target.value)}
                                fullWidth
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleEditInvestorModalClose}>Cancel</Button>
                            <Button onClick={handleUpdateInvestor}>Save</Button>
                          </DialogActions>
                        </Dialog>
                        <Tooltip title="Delete">
                          <IconButton value={row.InvestorID} onClick={() => handlePopup(dataIndex)}>
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





