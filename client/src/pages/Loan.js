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

  const rows = [
    { id: 1, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 2, startdate: '13/04/2022', enddate: '13/10/2022' ,dayintdue: 13, loan: 'Ron2022', intrate: 15.95,netadv: 400000.00 },
    { id: 3, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 4, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 5, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 6, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 7, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 8, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 9, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 10, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 11, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 12, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 13, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 14, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 15, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 16, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 17, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 18, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 19, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },
    { id: 20, startdate: '10/03/2022', enddate: '10/09/2022' ,dayintdue: 10, loan: 'Stamos2022', intrate: 14.95,netadv: 326860.20 },

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


function LoanView({children, component, ...otherProps}){
  return(
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
          <Card sx={{backgroundColor: "black"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Day Interest Due
              </Typography>
              <Typography variant="h9" component="div" color="white">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Interest
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $25,206.54
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
          <Card sx={{backgroundColor: "black"}}>
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
  );
}


export default function DataTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  
    return (
      <div style={{height: '100%',paddingLeft: 100, paddingRight:100}}>
        <div>
          <ThemeProvider theme  = {theme}>
            <Typography>
              <h2>
                Loan Information
              </h2>
              {/* <Button>asd</Button> */}
              <LoanView>
              </LoanView>
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
                  sx ={{color: "black", marginTop: 4
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
                autoHeight
                getRowHeight={() => 'auto'}

                // this gets the all the information of a selected row.
                // check console for details
                onRowSelectionModelChange={(ids) => {
                  const selectedIDS = new Set(ids);
                  const selectedRows = rows.filter((row) =>
                  selectedIDS.has(row.id),
                  );
                  
                  setSelectedRows(selectedRows);
                    console.log(selectedRows)
                  }}
                  
                  {...rows}
                  />
              </Grid>
            </Box>
            <Grid Item xs={4}>
              <Paper sx={{
                marginTop: 4.3, 
                width: 'auto', 
                height: '93.3%', 
                marginLeft: 2, 
                border: 1,
                borderColor: 'black',
                borderRadius: 1,
                backgroundColor: 'black'
                }}>
                  <Typography sx={{marginLeft: 4, color: 'white'}}>
                    <p>Loan Details</p>
                  </Typography>
                  <Card sx={{marginLeft: 3, marginRight: 3, height: '30%', marginTop: 3}}>
                    <Typography sx={{marginLeft: 4}}>
                      PUT STUFF HERE LIKE LOAN DETAILS AND WHAT NOT ** maybe change this tho, looks kinda ugly
                    </Typography>
                  </Card>
                  <Card sx={{marginLeft: 3, marginRight: 3, height: '30%', marginTop: 3}}>
                    <Typography sx={{marginLeft: 4}}>
                      PUT STUFF HERE LIKE LOAN DETAILS AND WHAT NOT
                    </Typography>
                  </Card>
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  
} 

