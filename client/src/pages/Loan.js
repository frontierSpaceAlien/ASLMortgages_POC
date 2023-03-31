import * as React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import NetflixSansReg from '../fonts/NetflixSans-Regular.ttf';
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

const StyledDataGrid = styled(DataGrid)((theme) => ({
  "& .MuiDataGrid-sortIcon": {
  opacity: 1,
  color: "white",
  },
  "& .MuiDataGrid-menuIconButton": {
  opacity: 1,
  color: "white"
  },
  }));

  
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

export default function DataTable() {
  const [dummyData, setData] = React.useState(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRows, setSelectedRows] = React.useState([]);
  
  const columns = [
    { field: 'firstName', headerName: 'First name', flex: 1, headerClassName: 'super-app-theme--header', },
    { field: 'lastName', headerName: 'Last name', flex: 1, headerClassName: 'super-app-theme--header', },
    {
      field: 'age',
      headerName: 'Age',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      type: 'number',
      width: 90,
    },
  ];

  const currentRows = dummyData.filter((r, ind) => {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });


    return (
      <div style={{ width: 1540, alignContent: "center", margin: "auto" }}>
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
          <Box
          sx={{
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: 'rgba(0,0,0 )',
              color: "white"
            },
          }}>
            <StyledDataGrid
              sx ={{color: "black"}}
              rows={currentRows}
              columns={columns}
              autoHeight
              pagination


              // this gets the all the information of a selected row.
              // check console for details
              onRowSelectionModelChange={(ids) => {
                const selectedIDS = new Set(ids);
                const selectedRows = currentRows.filter((row) =>
                  selectedIDS.has(row.id),
                );

                setSelectedRows(selectedRows);
                console.log(selectedRows)
              }}

              {...currentRows}
              />
          </Box>
        </ThemeProvider>
      </div>
    );
  
} 

