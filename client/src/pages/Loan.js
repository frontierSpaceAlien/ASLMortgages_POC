import * as React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import NetflixSansReg from '../fonts/NetflixSans-Regular.ttf';
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { Grid, Tooltip, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { green, indigo  } from '@mui/material/colors';
import { differenceInMonths, parse } from "date-fns";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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


var calculateCompoundMonthlyInterest = function(p, r, t) {
  // int = interest, not to be confused with integer.
  var convertTimeMonths = t/12;
  var intConvertToDecimal = r/100;
  var intRate = 1 + intConvertToDecimal/12;
  var expo = 12*convertTimeMonths;
  var intExpo = Math.pow(intRate, expo);
  var result = parseFloat(p * intExpo);
  var interest = result - p;

  return interest;
}

var calculateRepayableCap = function(variation, broker, manage, netAdv, legal, int){
  let result = variation+broker+manage+netAdv+legal+int
  return result;
}

var calculateRepayableNon = function(variation, broker, manage, netAdv, legal){
  let result = variation+broker+manage+netAdv+legal
  return result;
}

/** DUMMY DATA **/
  const rows = [
    { 
      id: 1, 
      borrower: "John Stamos",
      capitalised: 'Yes',
      netadv: 326860.20,
      intrate: 14.95,
      interest: 0,
      dailyInt: 0.00,
      monthInt: 0.00,
      manageFee: 7000,
      brokerFee: 0.00,
      legalFee: 0.00,
      variation: 0.00,
      totalRepay: 0.00,
      startdate: '10/03/2022', 
      enddate: '10/09/2022',
      dayintdue: 10, 
      loan: 'Stamos2022', 
      active: 'Yes',
      investors: [
        "ASL Mortgages Limited_Niehaus Family Trust 2",
        "Investor 2_Niehaus Family Trust 2",
        "Tenki Trust_Niehaus Family Trust 2",
        "Investor 4",
        "Investor 5",
        "Investor 6",
        "Investor 7",
        "Investor 8",
        "Investor 9",
        "Investor 10",
        "Investor 11",
        "Investor 12",
        "Investor 13",
        "Investor 14",
        "Investor 15",
      ]
    },    
    { 
      id: 2, 
      borrower: "Guy Pece",
      capitalised: 'No',
      netadv: 400000.00,
      intrate: 15.95,
      interest: 0,
      dailyInt: 0.00,
      monthInt: 0.00,
      manageFee: 12000.00,
      brokerFee: 6000.00,
      legalFee: 3500.00,
      variation: 0.00,
      totalRepay: 0.00,
      startdate: '13/04/2022', 
      enddate: '13/10/2022',
      dayintdue: 13, 
      loan: 'Pece2022', 
      active: 'No',
      investors: [
        "Investor 1",
        "Investor 2",
        "Investor 4",
        "Investor 6",
        "Investor 10",
      ]
    },
];

var col1=[], col2=[];

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
              <h2 style={{ display: "inline"}}>
                Loan Information
                <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                  <IconButton>
                    <AddIcon/>
                  </IconButton>
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
                  <IconButton sx={{color: 'red'}}>
                    <DeleteIcon/>
                  </IconButton>
                </div>
              </h2>
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
                          {selectedRows[0] === undefined ? "Unknown" : selectedRows[0].borrower}
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
                          {selectedRows[0] === undefined ? "Unknown" : selectedRows[0].capitalised}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].interest}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].dailyInt.toLocaleString(undefined, {maximumFractionDigits: 2})}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].monthInt.toLocaleString(undefined, {maximumFractionDigits: 2})}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].manageFee.toLocaleString(undefined, {maximumFractionDigits: 2})}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].brokerFee.toLocaleString(undefined, {maximumFractionDigits: 2})}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].legalFee.toLocaleString(undefined, {maximumFractionDigits: 2})}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].variation.toLocaleString(undefined, {maximumFractionDigits: 2})}
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
                          ${selectedRows[0] === undefined ? "0.00" : selectedRows[0].totalRepay.toLocaleString(undefined, {maximumFractionDigits: 2})}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2}>
                    <Card sx={{backgroundColor: bgcolor}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                          Active(?)
                        </Typography>
                        <Typography variant="h8" component="div" color="white">
                          {selectedRows[0] === undefined ? "Unknown" : selectedRows[0].active}
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
                    // resets the arrays so it doesn't build up over time.
                    col1 = [];
                    col2 = [];

                    // parse date to be able to get the difference between two dates
                    // also converts the final result from a negative int to a positive int
                    const startDateFormat = parse(selectedRows[0].startdate, "dd/MM/yyyy", new Date())
                    const endDateFormat = parse(selectedRows[0].enddate, "dd/MM/yyyy", new Date())
                    var months = differenceInMonths(startDateFormat, endDateFormat)
                    var monthsConvert = months*-1

                    // calculates compound interest and saves it
                    // monthly interest is also calculated
                    var result = calculateCompoundMonthlyInterest(selectedRows[0].netadv, selectedRows[0].intrate, monthsConvert)
                    selectedRows[0].interest = result.toLocaleString(undefined, {maximumFractionDigits: 2})


                    // calculates repayable on capitalised and non capitalised loans
                    var totRepayNon = calculateRepayableNon(selectedRows[0].variation, selectedRows[0].brokerFee, selectedRows[0].manageFee,selectedRows[0].netadv,selectedRows[0].legalFee)                                                        
                    var totRepayCap = calculateRepayableCap(selectedRows[0].variation, selectedRows[0].brokerFee, selectedRows[0].manageFee,selectedRows[0].netadv,selectedRows[0].legalFee,result)

                    // checks if a loan is capitalised
                    // tbh I still don't know how capitalised and non capitalised loans work.                          
                    if (selectedRows[0].capitalised === 'No'){
                      selectedRows[0].monthInt = result / monthsConvert;
                      selectedRows[0].totalRepay = totRepayNon;
                    }else{
                      selectedRows[0].monthInt = 0.00
                      selectedRows[0].totalRepay = totRepayCap;
                    }

                    // converts interest rate before calculating daily interest
                    var intRateConvert = selectedRows[0].intrate / 100
                    var dailyInterest = selectedRows[0].totalRepay * intRateConvert / 365
                    selectedRows[0].dailyInt = dailyInterest

                    // this just sets a max of 6 investors on the loan page at a time.
                    for ( let i = 0; i < selectedRows[0].investors.length; ++i){
                        if (i >= 6 ){
                          console.log("")
                        }else{
                          col1.push(selectedRows[0].investors[i]);
                        }
                    }

                    for ( let i = 0; i < selectedRows[0].investors.length; ++i){
                        col2.push(selectedRows[0].investors[i]);
                    }
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
                  <Box sx={{          
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    height: 190,
                    bgcolor: 'black',
                    borderRadius: 1,
                    }}>
                    <Typography sx={{marginLeft: 4, color: 'white'}}>
                      <p>Investors</p>
                      <Typography sx={{marginLeft: 1, color: 'white', fontSize: 14}}>
                        <div className="contain">
                          {selectedRows[0] === undefined ? "Investor(s) not found" : col1.map((investor) => {
                            return <li>{investor}</li>
                          })}
                          {col2.length > 6 ? 
                          <Tooltip title="See More">
                            <IconButton sx={{color: 'white', marginBottom: 5}}>
                                <MoreHorizIcon />
                            </IconButton> 
                          </Tooltip>
                            : ""}
                        </div>
                      </Typography>
                    </Typography>
                  </Box>
                  <Divider sx={{backgroundColor: 'white', marginTop: 4}} />
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  
} 

