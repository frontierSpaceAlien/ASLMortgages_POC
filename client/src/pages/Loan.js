import * as React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import NetflixSansReg from '../fonts/NetflixSans-Regular.ttf';
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { green, indigo  } from '@mui/material/colors';
import { differenceInMonths, format, parseISO  } from "date-fns";

const theme = createTheme({
  palette:{
    primary:{
      main: indigo['A700'],
    },
    secondary: {
      main: green[500],
    },
  },
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
      MuiDataGrid:{
        styleOverrides:{
          root:{
            '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none',
          },
          }
        }
      }
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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

var calculateCompoundMonthlyInterest = function(p, r, t) {
  var convertTimeMonths = t/12;
  var intConvertToDecimal = r/100;
  var intRate = 1 + intConvertToDecimal/12;
  var expo = 12*convertTimeMonths;
  var intExpo = Math.pow(intRate, expo);
  var result = parseFloat(p * intExpo);
  var interest = result - p;

  return interest;
}

  const rows = [
    { 
      id: 1, 
      borrower: "John Stamos",
      capitalised: 'Yes',
      netadv: 326860.20,
      intrate: 14.95,
      interest: 0,
      dailyInt: 147.07,
      monthInt: 0.00,
      manageFee: 7000,
      brokerFee: 0.00,
      legalFee: 0.00,
      variation: 0.00,
      totalRepay: 359066.74,
      // for some reason, the months are -1.
      // so if you want to set it to the 3rd month, you have to
      // set it to 2 instead of 3.
      startdate: format(new Date(2022, 2, 10), 'dd/M/yyyy'), 
      enddate: format(new Date(2022, 8, 10), 'dd/M/yyyy'),
      dayintdue: 10, 
      loan: 'Stamos2022', 
    },

];



const customRowOverlay = () =>{
 return(
  <GridOverlay>
    <ErrorOutlineIcon></ErrorOutlineIcon>
    <div>No Loan data found</div>
  </GridOverlay>
 )
}

const columns = [
  { field: 'loan', headerName: 'Loan', flex: 1, headerClassName: 'super-app-theme--header', },
  { field: 'startdate', headerName: 'Start Date', flex: 1, headerClassName: 'super-app-theme--header', },
  { field: 'enddate', headerName: 'End Date', flex: 1, headerClassName: 'super-app-theme--header', },
  { field: 'dayintdue', headerName: 'Day Interest Due', flex: 1, headerClassName: 'super-app-theme--header', },
  { field: 'intrate', headerName: 'Interest Rate', flex: 1, headerClassName: 'super-app-theme--header', },
  {
    field: 'netadv',
    headerName: 'Net Advanced',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    type: 'number',
    width: 90,
    headerAlign: 'left',
    align: 'left'
  },
];


export default function DataTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [bgcolor , setBgcolor] = React.useState("black");

  

    return (
      <div style={{height: '100%',paddingLeft: 100, paddingRight:100}}>
        <div>
          <ThemeProvider theme  = {theme}>
            <Typography>
              <h2>
                Loan Information
              </h2>
              {/* <Button>asd</Button> */}
              <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Day Interest Due
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          {selectedRows[0] === undefined ? 0 : selectedRows[0].dayintdue}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Borrower
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          John Stamos
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Capitalised
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          Yes
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Interest
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          {selectedRows[0] === undefined ? 0 : selectedRows[0].interest}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Daily Interest
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          $147.07
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Monthly Interest
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          $0.00
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Management Fee
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          $7,000.00
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Broker Fee
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          $0.00
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Legal Fee
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          $0.00
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Variation
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          $0.00
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Total Repayable
                        </Typography>
                        <Typography variant="h9" component="div" color="white">
                          $359,066.74
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Investor(s)
                        </Typography>
                        <Typography variant="h8" component="div" color="white">
                          Investors **replace later**
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Typography>
          </ThemeProvider>
        </div>
        <ThemeProvider theme={theme}>
          <Grid container>
            <Box
            sx={{
              width: '66.6%',
              '& .super-app-theme--header': {
                backgroundColor: 'rgba(0,0,0)',
                color: "white",
                flex: 1,
                flexDirection: 'row'
              },
            }}>
              <Grid item xs={12}>
                <StyledDataGrid
                  sx ={{color: "black", marginTop: 4, height: 531.5
                }}
                rows={rows}
                columns={columns}
                slots={{ noRowsOverlay: customRowOverlay }}
                {...rows}
                initialState={{
                  ...rows.initialState,
                  pagination: { paginationModel: { pageSize: 20 } },
                }}
                pageSizeOptions={[]}
                getRowHeight={() => 'auto'}

                // this gets the all the information of a selected row.
                // check console for details
                onRowSelectionModelChange={(ids) => {
                  const selectedIDS = new Set(ids);
                  const selectedRows = rows.filter((row) =>
                  selectedIDS.has(row.id),
                  );

                  if (selectedRows[0] === undefined){
                    setSelectedRows(selectedRows)
                  }else{
                    var result = calculateCompoundMonthlyInterest(selectedRows[0].netadv, selectedRows[0].intrate, 6)
                    selectedRows[0].interest = result.toLocaleString(undefined, {maximumFractionDigits: 2})
                    setSelectedRows(selectedRows)
                  }
                }}
                  
                  {...rows}
                  />
              </Grid>
            </Box>
            <Grid Item xs={4}>
              <Paper sx={{
                marginTop: 4.3, 
                width: 'auto', 
                height: '93.5%', 
                marginLeft: 2, 
                border: 1,
                borderColor: 'black',
                borderRadius: 1,
                backgroundColor: 'black'
                }}>
                  <Typography sx={{marginLeft: 4, color: 'white'}}>
                    <p>Loan Details</p>
                    ASDASDASd
                  </Typography>
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  
} 

