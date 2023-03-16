//import React from 'react';
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

  
  const calculateTotalPrice = (investment, interestRate) => {
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

