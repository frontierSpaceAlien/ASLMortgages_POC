import * as React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import NetflixSansReg from '../fonts/NetflixSans-Regular.ttf';
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";



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

const columns = [
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function loanView({children, expandComponent, ...otherProps}){

}

export default function dataTable() {

    return (
      <div style={{ height: 500, width: 1540, alignContent: "center", margin: "auto" }}>
        <div>
          <ThemeProvider theme  = {theme}>
            <Typography>
              <h2>
                Loan info here extended
              </h2>
            </Typography>
          </ThemeProvider>
        </div>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            />
        </ThemeProvider>
      </div>
    );
  
} 

