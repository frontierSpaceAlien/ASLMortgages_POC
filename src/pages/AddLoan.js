import React, { Component } from "react";
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';


function createData(name, Investors, Borrowers, carbs, protein, price) {
  return {
    name,
    Investors,
    Borrowers,
    carbs,
    protein,
    price,
    history: [
      {
        Net_Adanve: '200',
        Interest_Rate: '10%',
        Broker_Fee: 300,
      },
      {
        Net_Adanve: '200',
        Interest_Rate: '10%',
        Broker_Fee: 100,
      },
    ],
  };
}

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
        <TableCell align="right">{row.Investors}</TableCell>
        <TableCell align="right">{row.Borrowers}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Net Advance</TableCell>
                    <TableCell>Interest Rate</TableCell>
                    <TableCell align="right">Lender Fee</TableCell>
                    <TableCell align="right">Broker Fee</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.Net_Adanve}>
                      <TableCell component="th" scope="row">
                        {historyRow.Net_Adanve}
                      </TableCell>
                      <TableCell>{historyRow.Interest_Rate}</TableCell>
                      <TableCell align="right">{historyRow.Broker_Fee}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.Broker_Fee * row.price * 100) / 100}
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
    Investors: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    Borrowers: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        Broker_Fee: PropTypes.number.isRequired,
        Interest_Rate: PropTypes.string.isRequired,
        Net_Adanve: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  
  createData('getLoanName()+route(Infor)', 'getname（sudo）', 'getname（sudo）', 'getDate()', 'getDate()', 3.99),
  createData('getLoanName()+route(Infor)', 'getname（sudo）', 'getname（sudo）', 'getDate()', 'getDate()', 4.99),
  createData('getLoanName()+route(Infor)', 'getname（sudo）', 'getname（sudo）', 'getDate()', 'getDate()', 3.79),
  createData('getLoanName()+route(Infor)', 'getname（sudo）', 'getname（sudo）', 'getDate()', 'getDate()', 2.5),
  createData('getLoanName()+route(Infor)', 'getname（sudo）', 'getname（sudo）', 'getDate()', 'getDate()', 1.5),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>

    {/*search bar to be formed and resize*/}
    <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
    />
    {/*Add A New Loan button */}
    <Button variant="contained">Add a Loan</Button>


      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Loan Name</TableCell>
            <TableCell align="right">Investors</TableCell>
            <TableCell align="right">Borrowers</TableCell>
            <TableCell align="right">StartDate</TableCell>
            <TableCell align="right">EndDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}