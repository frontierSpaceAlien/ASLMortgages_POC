import * as React from "react";
import BorrowerFinder from "../api/BorrowerFinder";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import NetflixSansReg from "../fonts/NetflixSans-Regular.ttf";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { Grid, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { differenceInMonths, parse } from "date-fns";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker, ConfigProvider } from "antd";
import { NumericFormat } from "react-number-format";
import InputAdornment from "@mui/material/InputAdornment";
const { RangePicker } = DatePicker;

const theme = createTheme({
  typography: {
    fontFamily: "NetflixSans",
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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },
        },
      },
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
    color: "white",
  },
}));

var calculateCompoundMonthlyInterest = function (p, r, t) {
  // int = interest, not to be confused with integer.
  var convertTimeMonths = t / 12;
  var intConvertToDecimal = r / 100;
  var intRate = 1 + intConvertToDecimal / 12;
  var expo = 12 * convertTimeMonths;
  var intExpo = Math.pow(intRate, expo);
  var result = parseFloat(p * intExpo);
  var interest = result - p;

  return interest;
};

var calculateRepayableCap = function (
  variation,
  broker,
  manage,
  netAdv,
  legal,
  int
) {
  let result = variation + broker + manage + netAdv + legal + int;
  return result;
};

var calculateRepayableNon = function (
  variation,
  broker,
  manage,
  netAdv,
  legal
) {
  let result = variation + broker + manage + netAdv + legal;
  return result;
};

/** DUMMY DATA **/
const rows = [
  {
    id: 1,
    borrower: "John Stamos",
    capitalised: "Yes",
    netadv: 326860.2,
    intrate: 14.95,
    interest: 0,
    dailyInt: 0.0,
    monthInt: 0.0,
    manageFee: 7000,
    brokerFee: 0.0,
    legalFee: 0.0,
    variation: 0.0,
    totalRepay: 0.0,
    startdate: "10/03/2022",
    enddate: "10/09/2022",
    dayintdue: 10,
    loan: "Stamos2022",
    active: "Yes",
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
    ],
  },
  {
    id: 2,
    borrower: "Guy Pece",
    capitalised: "No",
    netadv: 400000.0,
    intrate: 15.95,
    interest: 0,
    dailyInt: 0.0,
    monthInt: 0.0,
    manageFee: 12000.0,
    brokerFee: 6000.0,
    legalFee: 3500.0,
    variation: 0.0,
    totalRepay: 0.0,
    startdate: "13/04/2022",
    enddate: "13/10/2022",
    dayintdue: 13,
    loan: "Pece2022",
    active: "No",
    investors: [
      "Investor 1",
      "Investor 2",
      "Investor 4",
      "Investor 6",
      "Investor 10",
    ],
  },
];

var col1 = [];

const customRowOverlay = () => {
  return (
    <GridOverlay>
      <ErrorOutlineIcon></ErrorOutlineIcon>
      <div>No Loan data found</div>
    </GridOverlay>
  );
};

const columns = [
  {
    field: "loan",
    headerName: "Loan",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "startdate",
    headerName: "Start Date",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "enddate",
    headerName: "End Date",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "dayintdue",
    headerName: "Day Interest Due",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "intrate",
    headerName: "Interest Rate",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "netadv",
    headerName: "Net Advanced",
    headerClassName: "super-app-theme--header",
    flex: 1,
    type: "number",
    width: 90,
    headerAlign: "left",
    align: "left",
  },
];

const PercentageNumericFormat = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
      suffix="%"
      decimalScale={2}
    />
  );
});

const CurrencyFormat = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
      thousandSeparator
      prefix="$"
      decimalScale={2}
    />
  );
});

export default function DataTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const [bgcolor, setBgcolor] = React.useState("black");
  const [modal, setModal] = React.useState(false);
  const [openAdd, setAdd] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [values, setValues] = React.useState("0.00");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BorrowerFinder.get("/");
        setRowData(response.data.data.borrower);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handlePopupClose = () => {
    setModal(false);
  };

  const handleAddClose = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setAdd(false);
  };

  const handleAddSubmit = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setAdd(false);
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const seeMore = () => {
    setModal(true);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  var borrower = [];

  rowData.map((data) => {
    return borrower.push(data.borrowerfirstname + " " + data.borrowerlastname);
  });

  var tempInvestors = [
    "Investor 1",
    "Investor 2",
    "Investor 3",
    "Investor 4",
    "Investor 5",
    "Investor 6",
  ];

  return (
    <div style={{ height: "100%", paddingLeft: 100, paddingRight: 100 }}>
      <div>
        <ThemeProvider theme={theme}>
          <Typography>
            <h2 style={{ display: "inline" }}>
              Loan Information
              <div
                style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
              >
                <IconButton onClick={handleAdd}>
                  <AddIcon />
                </IconButton>
                <Dialog open={openAdd} onClose={handleAddClose}>
                  <DialogTitle>Add Loan</DialogTitle>
                  <DialogContent>
                    <Typography
                      sx={{ color: "gray", fontSize: 15, marginBottom: 0.5 }}
                    >
                      * Required Fields
                    </Typography>
                    <TextField
                      value={firstName}
                      autoFocus
                      margin="dense"
                      id="outlined-required"
                      label="Loan Name"
                      type="name"
                      fullWidth
                      variant="standard"
                    />
                    <Autocomplete
                      options={borrower}
                      sx={{ width: 300, marginBottom: 3 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Borrower"
                          variant="standard"
                        />
                      )}
                      variant="standard"
                    />
                    <ConfigProvider
                      theme={{
                        token: {
                          colorBorder: "grey",
                          colorPrimaryHover: "black",
                          colorTextPlaceholder: "grey",
                        },
                      }}
                    >
                      <RangePicker
                        getPopupContainer={(triggerNode) => {
                          return triggerNode.parentNode;
                        }}
                        size={"large"}
                        style={{
                          colorBorder: "black",
                          marginBottom: 10,
                          marginTop: 10,
                        }}
                      />
                    </ConfigProvider>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      sx={{ marginTop: 1 }}
                      options={tempInvestors}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Investors"
                        />
                      )}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      type="text"
                      label="Interest Rate %"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      onChange={(e) => handleChange(e)}
                      InputProps={{
                        inputComponent: PercentageNumericFormat,
                      }}
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      type="text"
                      label="Net Advanced $"
                      sx={{ m: 1 }}
                      onChange={(e) => handleChange(e)}
                      InputProps={{
                        inputComponent: CurrencyFormat,
                      }}
                      variant="standard"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      value="$0.00"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      label="Management Fee $"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      InputProps={{
                        inputComponent: CurrencyFormat,
                      }}
                      value="$0.00"
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      label="Broker Fee $"
                      sx={{ m: 1 }}
                      InputProps={{
                        inputComponent: CurrencyFormat,
                      }}
                      value="$0.00"
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      label="Legal Fee $"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      InputProps={{
                        inputComponent: CurrencyFormat,
                      }}
                      value="$0.00"
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      label="Variation $"
                      sx={{ m: 1 }}
                      InputProps={{
                        inputComponent: CurrencyFormat,
                      }}
                      variant="standard"
                      value="$0.00"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="outlined-number"
                      label="Capitalised?"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button sx={{ color: "red" }} onClick={handleAddClose}>
                      Cancel
                    </Button>
                    <Button sx={{ color: "black" }} onClick={handleAddSubmit}>
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ color: "red" }}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </h2>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Day Interest Due
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        {selectedRows[0] === undefined
                          ? 0
                          : selectedRows[0].dayintdue}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Borrower
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        {selectedRows[0] === undefined
                          ? "Unknown"
                          : selectedRows[0].borrower}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Capitalised
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        {selectedRows[0] === undefined
                          ? "Unknown"
                          : selectedRows[0].capitalised}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Interest
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].interest}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Daily Interest
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].dailyInt.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Monthly Interest
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].monthInt.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Management Fee
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].manageFee.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Broker Fee
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].brokerFee.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Legal Fee
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].legalFee.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Variation
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].variation.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Total Repayable
                      </Typography>
                      <Typography variant="h9" component="div" color="white">
                        $
                        {selectedRows[0] === undefined
                          ? "0.00"
                          : selectedRows[0].totalRepay.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ backgroundColor: bgcolor }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="white"
                        gutterBottom
                      >
                        Active(?)
                      </Typography>
                      <Typography variant="h8" component="div" color="white">
                        {selectedRows[0] === undefined
                          ? "Unknown"
                          : selectedRows[0].active}
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
              width: "66.6%",
              "& .super-app-theme--header": {
                backgroundColor: "rgba(0,0,0)",
                color: "white",
                flex: 1,
                flexDirection: "row",
              },
            }}
          >
            <Grid item xs={12}>
              <StyledDataGrid
                sx={{ color: "black", marginTop: 4, height: 531.5 }}
                rows={rows}
                columns={columns}
                slots={{ noRowsOverlay: customRowOverlay }}
                {...rows}
                initialState={{
                  ...rows.initialState,
                  pagination: { paginationModel: { pageSize: 20 } },
                }}
                pageSizeOptions={[]}
                getRowHeight={() => "auto"}
                // this gets the all the information of a selected row.
                // check console for details
                onRowSelectionModelChange={(ids) => {
                  const selectedIDS = new Set(ids);
                  const selectedRows = rows.filter((row) =>
                    selectedIDS.has(row.id)
                  );

                  if (selectedRows[0] === undefined) {
                  } else {
                    // resets the arrays so it doesn't add to existing data.
                    col1 = [];

                    // parse date to be able to get the difference between two dates
                    // also converts the final result from a negative int to a positive int
                    const startDateFormat = parse(
                      selectedRows[0].startdate,
                      "dd/MM/yyyy",
                      new Date()
                    );
                    const endDateFormat = parse(
                      selectedRows[0].enddate,
                      "dd/MM/yyyy",
                      new Date()
                    );
                    var months = differenceInMonths(
                      startDateFormat,
                      endDateFormat
                    );
                    var monthsConvert = months * -1;

                    // calculates compound interest and saves it
                    // monthly interest is also calculated
                    var result = calculateCompoundMonthlyInterest(
                      selectedRows[0].netadv,
                      selectedRows[0].intrate,
                      monthsConvert
                    );
                    selectedRows[0].interest = result.toLocaleString(
                      undefined,
                      { maximumFractionDigits: 2 }
                    );

                    // calculates repayable on capitalised and non capitalised loans
                    var totRepayNon = calculateRepayableNon(
                      selectedRows[0].variation,
                      selectedRows[0].brokerFee,
                      selectedRows[0].manageFee,
                      selectedRows[0].netadv,
                      selectedRows[0].legalFee
                    );
                    var totRepayCap = calculateRepayableCap(
                      selectedRows[0].variation,
                      selectedRows[0].brokerFee,
                      selectedRows[0].manageFee,
                      selectedRows[0].netadv,
                      selectedRows[0].legalFee,
                      result
                    );

                    // checks if a loan is capitalised
                    // tbh I still don't know how capitalised and non capitalised loans work.
                    if (selectedRows[0].capitalised === "No") {
                      selectedRows[0].monthInt = result / monthsConvert;
                      selectedRows[0].totalRepay = totRepayNon;
                    } else {
                      selectedRows[0].monthInt = 0.0;
                      selectedRows[0].totalRepay = totRepayCap;
                    }

                    // converts interest rate before calculating daily interest
                    var intRateConvert = selectedRows[0].intrate / 100;
                    var dailyInterest =
                      (selectedRows[0].totalRepay * intRateConvert) / 365;
                    selectedRows[0].dailyInt = dailyInterest;

                    // this just sets a max of 6 investors on the loan page at a time.
                    for (let i = 0; i < selectedRows[0].investors.length; ++i) {
                      if (i >= 6) {
                        console.log("");
                      } else {
                        col1.push(selectedRows[0].investors[i]);
                      }
                    }
                    setSelectedRows(selectedRows);
                  }
                }}
                {...rows}
              />
            </Grid>
          </Box>
          <Grid Item xs={4}>
            <Paper
              sx={{
                marginTop: 4.3,
                width: "auto",
                height: "93.5%",
                marginLeft: 2,
                border: 1,
                borderColor: "black",
                borderRadius: 1,
                backgroundColor: "black",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  p: 1,
                  m: 1,
                  height: 190,
                  bgcolor: "black",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ marginLeft: 4, color: "white" }}>
                  <p>Investors</p>
                  <Typography
                    sx={{ marginLeft: 1, color: "white", fontSize: 14 }}
                  >
                    <div className="contain">
                      {selectedRows[0] === undefined
                        ? "Investor(s) not found"
                        : col1.map((investor) => {
                            return <li>{investor}</li>;
                          })}
                      {selectedRows[0] === undefined ? (
                        ""
                      ) : selectedRows[0].investors.length > 6 ? (
                        <Tooltip title="See More">
                          <IconButton
                            sx={{ color: "white", marginBottom: 5 }}
                            onClick={seeMore}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </div>
                    <Dialog
                      open={modal}
                      onClose={handlePopupClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      PaperProps={{
                        elevation: 3,
                      }}
                      BackdropProps={{
                        style: {
                          backgroundColor: "rgba(0,0,0,0.1)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Investors"}
                      </DialogTitle>
                      <DialogContent sx={{ marginLeft: 3, marginRight: 3 }}>
                        <DialogContentText id="alert-dialog-description">
                          {selectedRows[0] === undefined
                            ? ""
                            : selectedRows[0].investors.map(function (d, idx) {
                                return (
                                  <li>{selectedRows[0].investors[idx]}</li>
                                );
                              })}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          sx={{ color: "red" }}
                          onClick={handlePopupClose}
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Typography>
                </Typography>
              </Box>
              <Divider sx={{ backgroundColor: "white", marginTop: 4 }} />
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
