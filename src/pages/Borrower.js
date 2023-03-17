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
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

function createData(borrowerID, name, loanAmount, intRate, price) {
  return {
    borrowerID,
    name,
    loanAmount,
    intRate,
    price,
    email: "test@test.com",
    history: [
      {
        date: '2020-01-05',
        loanId: 'Borrower123',
        amount: 395632.05,
        active: "No"
      },
      {
        date: '2020-01-02',
        loanId: 'Borrower321',
        amount: 156798.18,
        active: "No"
      },
    ],
  };
}

/** DUMMY DATA **/
// Never have duplicate borrower ids. Duplicate borrower ids will cause the table to break.
const rows = [
  createData(0,'Borrower 1', 359066.74, 16.95),
  createData(1,'Borrower 2', 421500.00, 15.95),
  createData(2,'Borrower 3', 1107549.91, 16.95),
  createData(3,'Borrower 4', 1627000.04, 14.95),
  createData(4,'Borrower 5', 83172.63, 15.0),
  createData(5,'Borrower 6', 363300.00, 15.0),
  createData(6,'Borrower 7', 985263.96, 6.0),
  createData(7,'Borrower 8', 389421.50, 9.0),
  createData(8,'Borrower 9', 954231.17, 16.0),
  createData(9,'Borrower 10', 305987.60, 3.7),
  createData(10,'Borrower 11', 592953.41, 16.0),
  createData(11,'Borrower 12', 356956.80, 16.0),
  createData(12,'Borrower 13', 159481.40, 6.0),
  createData(13,'Borrower 14', 237597.30, 9.0),
  createData(14,'Borrower 15', 262956.26, 16.0),
  createData(15,'Borrower 16', 305654.11, 3.7),
  createData(16,'Borrower 17', 356123.95, 16.0),
  createData(17,'Borrower 18', 356897.65, 16.0),
  createData(18,'Borrower 19', 159463.99, 6.0),
  createData(19,'Borrower 20', 237956.64, 9.0),
  createData(20,'Borrower 21', 262123.00, 16.0),
  createData(21,'Borrower 22', 305144.05, 3.7),
  createData(22,'Borrower 23', 356789.15, 16.0),
  createData(23,'Borrower 24', 356753.46, 16.0),
  createData(24,'Borrower 25', 159159.05, 6.0),
  createData(25,'Borrower 26', 237879.12, 9.0),
  createData(26,'Borrower 27', 2621595.77, 16.0),
  createData(27,'Borrower 28', 3056652.94, 3.7),
  createData(28,'Borrower 29', 3565563.80, 16.0),
  createData(29,'Borrower 30', 356957.78, 16.0),
  createData(30,'Borrower 31', 159897.63, 6.0),
  createData(31,'Borrower 32', 237485.99, 9.0),
  createData(32,'Borrower 33', 26265.45, 16.0),
  createData(33,'Borrower 34', 305323.12, 3.7),
  createData(34,'Borrower 35', 356222.65, 16.0),
  createData(35,'Borrower 36', 356154.00, 16.0),
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
    navigator.clipboard.writeText(row.email)
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
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
                  Borrower Contact Details
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
                        <TableCell>Loan</TableCell>
                        <TableCell align="right">Loan Amount</TableCell>
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
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openAdd, setAdd] = React.useState(false);
  const [openCheckbox, setCheckbox] = React.useState([]);
  const [active, setActive] = React.useState('');

  const handleActiveChange = (event) => {
    setActive(event.target.value);
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

  const handlePopupClose = () =>{
    setModal(false)
  };

  const handleDeletePopup = () =>{
    setRowData((prevData) =>
      prevData.filter((_, index) => index !== indexData)
    );
    setModal(false)
    setOpenSnack(true);
  }

  const handlePopup = (dataIndex) =>{
    indexData = dataIndex
    setModal(true)
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleAdd = () =>{
    setAdd(true)
  }

  const handleAddClose = () => {
    setAdd(false);
    setCheckbox([])
    setActive('')
  }

  const handleCheckboxClick = (event) =>{
    if (event.target.checked === true){
      setCheckbox([...openCheckbox, ""])
    }else{
      setCheckbox([])
    }
  }

  return (
    <div className = "tableView">
    <ThemeProvider theme={theme}>
    <Paper elevation={0} style={{ height: "100%", paddingLeft: 100, paddingRight:100}}>
        <TableContainer>
        <h3>Borrowers</h3>
            <div className = "align-row">
                <Button
                    endIcon={<AddIcon />}
                    sx={{ color: "black", textTransform: 'capitalize' }}
                    onClick={handleAdd}
                    >
                Add Borrower
                </Button>  
            </div>
            <Dialog open={openAdd} onClose={handleAddClose}>
              <DialogTitle>Add Borrower</DialogTitle>
              <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="outlined-required"
                    label="Borrower Name"
                    type="name"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="outlined-number"
                    label="Email"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="outlined-number"
                    label="Phone Number"
                    sx={{ m: 1}}
                    variant="standard"
                  />
                  <div>
                    <Typography variant ="caption" sx={{ color : "grey"}}>
                      <FormGroup>
                        <FormControlLabel control ={
                        <Checkbox onChange={handleCheckboxClick}/>
                        } label = "Does this borrower have a history with ASL Mortgages?"/>
                      </FormGroup>
                    </Typography>
                  </div>
                  {openCheckbox.map((index) => (
                    <Box key={index}>
                      <p style={{color: 'red'}}>**probably change these text fields to drop 
                          down menus and pull data from loans page. Currently will not save the information below - Just testing for now**</p>
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
                          sx={{ color: 'black'}}
                        >
                          <MenuItem value={10}>Yes</MenuItem>
                          <MenuItem value={20}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  ))}
              </DialogContent>
              <DialogActions>
                <Button sx={{ color: 'red'}} onClick={handleAddClose}>Cancel</Button>
                <Button sx={{ color: 'black'}} onClick={handleAddClose}>Add</Button>
              </DialogActions>
            </Dialog>
          <Table  aria-label="collapsible table" size='small'>
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
                    <ExpandRow row ={row}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">${row.loanAmount.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">{row.intRate}%</TableCell>
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
                        onClose={handlePopupClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{
                          elevation: 3,
                        }}
                        BackdropProps={{style: {backgroundColor: 'rgba(0,0,0,0.1)', boxShadow: 'none'}}}
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
                          <Button sx={{ color: 'red'}} onClick={handlePopupClose}>Cancel</Button>
                          <Button sx={{ color: 'black'}} onClick={handleDeletePopup} autoFocus>
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                        <Snackbar open = {openSnack} autoHideDuration={3000} onClose={handleSnackClose}>
                          <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
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