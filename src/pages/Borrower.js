import * as React from 'react';
import PropTypes from 'prop-types';
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

function createData(name, startDate, endDate, dayIntDue, intRate, price) {
  return {
    name,
    startDate,
    endDate,
    dayIntDue,
    intRate,
    price,
    history: [
      {
        date: '2020-01-05',
        loanId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        loanId: '12736711',
        amount: 1,
      },
    ],
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.startDate}</TableCell>
        <TableCell align="right">{row.endDate}</TableCell>
        <TableCell align="right">{row.dayIntDue}</TableCell>
        <TableCell align="right">{row.intRate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <h3>Borrower Info here</h3>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                                      <TableCell>Loan</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.loanId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    dayIntDue: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        loanId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    intRate: PropTypes.number.isRequired,
  }).isRequired,
};

/** DUMMY DATA **/
// Never have duplicate borrower ids. Duplicate borrower ids will cause the table to break.
const rows = [
  createData('Borrower 1', 159, 6.0, 10, 14.95, 3.99),
  createData('Borrower 2', 237, 9.0, 13, 15.95, 4.99),
  createData('Borrower 3', 262, 16.0, 6, 15.00, 3.79),
  createData('Borrower 4', 305, 3.7, 19, 12.95, 2.5),
  createData('Borrower 5', 356, 16.0, 25, 13.95, 1.5),
  createData('Borrower 6', 356, 16.0, 1, 15.00, 1.5),
  createData('Borrower 7', 159, 6.0, 10, 14.95, 3.99),
  createData('Borrower 8', 237, 9.0, 13, 15.95, 4.99),
  createData('Borrower 9', 262, 16.0, 6, 15.00, 3.79),
  createData('Borrower 10', 305, 3.7, 19, 12.95, 2.5),
  createData('Borrower 11', 356, 16.0, 25, 13.95, 1.5),
  createData('Borrower 12', 356, 16.0, 1, 15.00, 1.5),
  createData('Borrower 13', 159, 6.0, 10, 14.95, 3.99),
  createData('Borrower 14', 237, 9.0, 13, 15.95, 4.99),
  createData('Borrower 15', 262, 16.0, 6, 15.00, 3.79),
  createData('Borrower 16', 305, 3.7, 19, 12.95, 2.5),
  createData('Borrower 17', 356, 16.0, 25, 13.95, 1.5),
  createData('Borrower 18', 356, 16.0, 1, 15.00, 1.5),
  createData('Borrower 19', 159, 6.0, 10, 14.95, 3.99),
  createData('Borrower 20', 237, 9.0, 13, 15.95, 4.99),
  createData('Borrower 21', 262, 16.0, 6, 15.00, 3.79),
  createData('Borrower 22', 305, 3.7, 19, 12.95, 2.5),
  createData('Borrower 23', 356, 16.0, 25, 13.95, 1.5),
  createData('Borrower 24', 356, 16.0, 1, 15.00, 1.5),
  createData('Borrower 25', 159, 6.0, 10, 14.95, 3.99),
  createData('Borrower 26', 237, 9.0, 13, 15.95, 4.99),
  createData('Borrower 27', 262, 16.0, 6, 15.00, 3.79),
  createData('Borrower 28', 305, 3.7, 19, 12.95, 2.5),
  createData('Borrower 29', 356, 16.0, 25, 13.95, 1.5),
  createData('Borrower 30', 356, 16.0, 1, 15.00, 1.5),
  createData('Borrower 31', 159, 6.0, 10, 14.95, 3.99),
  createData('Borrower 32', 237, 9.0, 13, 15.95, 4.99),
  createData('Borrower 33', 262, 16.0, 6, 15.00, 3.79),
  createData('Borrower 34', 305, 3.7, 19, 12.95, 2.5),
  createData('Borrower 35', 356, 16.0, 25, 13.95, 1.5),
  createData('Borrower 36', 356, 16.0, 1, 15.00, 1.5),
]

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const currentRows = rows.filter((r, ind) => {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
  <div className = "tableView">
    <Paper elevation={0} style={{ height: "100%", paddingLeft: 100, paddingRight:100}}>
        <TableContainer>
        <h3>Borrower Information</h3>
        <ThemeProvider theme={theme}>
            <div className = "align-row">
                <Button
                    endIcon={<AddIcon />}
                    sx={{ color: "black", textTransform: 'capitalize' }}
                    onClick={console.log("hello")}
                >
                Add Borrower
                </Button>  
            </div>
        </ThemeProvider>
          <Table  aria-label="collapsible table" size='small'>
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>Borrower</StyledTableCell>
                <StyledTableCell align="right">Start Date</StyledTableCell>
                <StyledTableCell align="right">End Date</StyledTableCell>
                <StyledTableCell align="right">Day Interest Due</StyledTableCell>
                <StyledTableCell align="right">Interest Rate %</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row) => (
                <Row key={row.name} row={row} />
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </TableContainer>
    </Paper>

  </div>
  );
}