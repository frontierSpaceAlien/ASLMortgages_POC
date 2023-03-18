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

function createData(borrowerID, name, loanAmount, intRate, dailyInterest, totalPrice) {
  return {
    borrowerID,
    name,
    loanAmount,
    intRate,
    dailyInterest,
    totalPrice,
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
  createData(0,'Investor 1', 359066.74, 16.95, 100, 200000),

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
    borrowerID: rowData.length,
    name: investorName,
    loanAmount: parseFloat(investorAmount),
    intRate: parseFloat(interestRate),
    dailyInterest: dailyInterest,
    totalPrice: totalPrice,
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
const [investorAmount, setInvestorAmount] = useState('');
const [interestRate, setInterestRate] = useState('');

// Calculate daily interest and total price
const dailyInterest = investorAmount * interestRate / 100;
const totalPrice = parseFloat(investorAmount) + dailyInterest;
  


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
                <StyledTableCell>Investor</StyledTableCell>
                <StyledTableCell align="right">Investor Amount</StyledTableCell>
                <StyledTableCell align="right">Interest Rate</StyledTableCell>
                <StyledTableCell align="right">Daily Interest</StyledTableCell>
                <StyledTableCell align="right">Total Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row, dataIndex) => (
                <React.Fragment>
                  <ThemeProvider theme={theme}>
                    <ExpandRow row ={row}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">${row.loanAmount.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell>
                    <TableCell align="right">{row.intRate}%</TableCell>
                    <TableCell align="right">{row.dailyInterest}</TableCell>
                    <TableCell align="right">{row.totalPrice}</TableCell>
                    <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon/>
                          </IconButton>
                        </Tooltip>
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




/*import React from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/*const InvestorTable = () => {
  // Dummy data
  const investors = [
    { name: 'John Doe', investment: 429258, interestRate: 0.15 },
    { name: 'Jane Smith', investment: 457388, interestRate: 0.15 },
    { name: 'Bob Johnson', investment: 553832, interestRate: 0.15 },
  ];

  const calculateDailyInterest = (investment, interestRate) => {
    // Calculate daily interest
    return (investment * interestRate) / 365;
  };

  const calculateTotalPrice = (investment, interestRate) => {
    // Calculate total price (investment + interest)
    const dailyInterest = calculateDailyInterest(investment, interestRate);
    const totalInterest = dailyInterest * 365;
    return investment + totalInterest;
  };
  */

  
  /*const calculateTotalPrice = (investment, interestRate) => {
    // Calculate total price (investment + interest)
    const dailyInterest = calculateDailyInterest(investment, interestRate);
    const totalInterest = dailyInterest * 365;
    return investment + totalInterest;
  };

  const calculateDailyInterest = (investment, interestRate) => {
    // Calculate daily interest
    return (investment * interestRate) / 365;
  };

  function createData(Investor, Investment, InterestRate, DailyInterest, TotalPrice) {
    return {Investor, Investment, InterestRate, DailyInterest, TotalPrice};
  }
  
  const rows = [
    createData('Leo', 159, 6.0, 24, 4.0),
    createData('Alex', 237, 9.0, 37, 4.3),
    createData('Jason', 262, 16.0, 24, 6.0),
    createData('Angus', 305, 3.7, 67, 4.3),
    createData('Des', 356, 16.0, 49, 3.9),
  ];
  
  export default function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Investor</TableCell>
              <TableCell align="right">Investment</TableCell>
              <TableCell align="right">Interest rate</TableCell>
              <TableCell align="right">Daily Interest</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.Investor}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Investor}
                </TableCell>
                <TableCell align="right">{row.Investment}</TableCell>
                <TableCell align="right">{row.InterestRate}</TableCell>
                <TableCell align="right">{calculateDailyInterest(row.Investment, row.InterestRate)}</TableCell>
                <TableCell align="right">{calculateTotalPrice(row.Investment, row.InterestRate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  




  /*
  return (
    <table>
      <thead>
        <tr>
          <th>Investor</th>
          <th>Investment</th>
          <th>Interest Rate</th>
          <th>Daily Interest</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {investors.map((investor) => (
          <tr key={investor.name}>
            <td>{investor.name}</td>
            <td>${investor.investment}</td>
            <td>{investor.interestRate * 100}%</td>
            <td>${calculateDailyInterest(investor.investment, investor.interestRate).toFixed(2)}</td>
            <td>${calculateTotalPrice(investor.investment, investor.interestRate).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  
};

export default InvestorTable;
*/

