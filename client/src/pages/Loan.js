import * as React from "react";
import BorrowerFinder from "../api/BorrowerFinder";
import LoanFinder from "../api/LoanFinder";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import NetflixSansReg from "../fonts/NetflixSans-Regular.ttf";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { Grid, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Paper from "@mui/material/Paper";
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
import Cards from "../components/Loan/Card";
import Add from "../components/Loan/AddForm";
import Update from "../components/Loan/UpdateForm";
import Months from "../data/months.json";
import dayjs from "dayjs";

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

var calculateRepayableCap = function (
  variation,
  broker,
  manage,
  netAdv,
  legal,
  int
) {
  let result =
    Number(variation) +
    Number(broker) +
    Number(manage) +
    Number(netAdv) +
    Number(legal) +
    Number(int);
  return result;
};

var calculateRepayableNon = function (
  variation,
  broker,
  manage,
  netAdv,
  legal
) {
  let result =
    Number(variation) +
    Number(broker) +
    Number(manage) +
    Number(netAdv) +
    Number(legal);
  return result;
};

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

var calculateMonthlyInterest = function (repay, intRate) {
  const currDate = new Date().toLocaleDateString("en-GB", {
    month: "numeric",
  });
  let daysInMonths = [];
  let monthResult = [];

  const newData = Months.map((object) => ({
    daysInMonth: object.daysInMonth,
    months: object.monthNum,
  }));

  for (let i = 0; i < newData.length; ++i) {
    daysInMonths.push(newData[i].daysInMonth);
  }

  for (let i = 0; i < newData.length; ++i) {
    monthResult = daysInMonths[currDate - 1];
    console.log(monthResult);
  }

  var interest = intRate / 100;
  var result = ((repay * interest) / 365) * monthResult;

  return result;
};

/** DUMMY DATA **/
const rowsDummy = [
  {
    id: 0,
    borrower: "John Stamos",
    capitalised: "Yes",
    netadv: 326860.2,
    intrate: 14.95,
    interest: 0,
    dailyint: 0.0,
    monthint: 0.0,
    managefee: 7000,
    brokerfee: 0.0,
    legalfee: 0.0,
    variation: 0.0,
    totalrepay: 0.0,
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
    region: "Waikato",
  },
  {
    id: 1,
    borrower: "Guy Pece",
    capitalised: "No",
    netadv: 400000.0,
    intrate: 15.95,
    interest: 0,
    dailyint: 0.0,
    monthint: 0.0,
    managefee: 12000.0,
    brokerfee: 6000.0,
    legalfee: 3500.0,
    variation: 0.0,
    totalrepay: 0.0,
    startdate: "12/10/2022",
    enddate: "12/10/2022",
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
    region: "Wellington",
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
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  {
    field: "enddate",
    headerName: "End Date",
    flex: 1,
    headerClassName: "super-app-theme--header",
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
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
    valueFormatter: (params) => {
      if (params.value == null) {
        return "";
      }
      return `${params.value.toLocaleString()} %`;
    },
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
    valueFormatter: (params) => {
      if (params.value == null) {
        return "";
      }
      return `$ ${params.value.toLocaleString()}`;
    },
  },
];

var loanIndex = 0;

export default function DataTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows, setRow] = React.useState(rowsDummy);
  const [rowData, setRowData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [openAdd, setAdd] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [updateState, setUpdateState] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BorrowerFinder.get("/");
        setRowData(response.data.data.borrower);

        // const responseLoan = await LoanFinder.get("/");
        // setRow(responseLoan.data.data.loan);

        // console.log(responseLoan);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handlePopupClose = () => {
    setModal(false);
  };

  const handleAddSubmit = async (
    loanName,
    borrower,
    startDate,
    endDate,
    investor,
    interest,
    netAdv,
    lenderFee,
    brokerFee,
    legalFee,
    variation,
    region,
    cap
  ) => {
    const startMonth = new Date(startDate);
    const endMonth = new Date(endDate);

    var date = new Date();

    if (startMonth.getMonth() === endMonth.getMonth()) {
      date = endMonth.getDate();
    } else {
      date = startMonth.getDate();
    }

    try {
      const response = await LoanFinder.post("/", {
        borrower: borrower,
        capitalised: cap,
        netAdv: Number(netAdv),
        intRate: interest,
        interest: 0,
        dailyInt: 0.0,
        monthInt: 0.0,
        manageFee: Number(lenderFee),
        brokerFee: Number(brokerFee),
        legalFee: Number(legalFee),
        variation: Number(variation),
        totalRepay: 0.0,
        startDate: startDate.format("DD/MM/YYYY"),
        endDate: endDate.format("DD/MM/YYYY"),
        dayIntDue: date,
        loan: loanName,
        active: "No", // make it dynamic
        investors: investor,
        region: region,
      });
      setRow([...rows, response.data.data.loan]);
      setAdd(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = (
    id,
    loanName,
    borrower,
    startDate,
    endDate,
    investor,
    interest,
    netAdv,
    lenderFee,
    brokerFee,
    legalFee,
    variation,
    region,
    cap
  ) => {
    const startMonth = new Date(startDate);
    const endMonth = new Date(endDate);

    var date = new Date();

    if (startMonth.getMonth() === endMonth.getMonth()) {
      date = endMonth.getDate();
    } else {
      date = startMonth.getDate();
    }

    const response = {
      id: id,
      borrower: borrower,
      capitalised: cap,
      netAdv: Number(netAdv),
      intRate: interest,
      interest: 0,
      dailyInt: 0.0,
      monthInt: 0.0,
      manageFee: Number(lenderFee),
      brokerFee: Number(brokerFee),
      legalFee: Number(legalFee),
      variation: Number(variation),
      totalRepay: 0.0,
      startDate: startDate.format("DD/MM/YYYY"),
      endDate: endDate.format("DD/MM/YYYY"),
      dayIntDue: date,
      loan: loanName,
      active: "No", // make it dynamic
      investors: investor,
      region: region,
    };
    loanIndex = selectedRows[0].id;

    setRow((prevRows) => {
      return prevRows.map((row, index) =>
        index === loanIndex
          ? {
              ...row,
              loan: response.loan,
              investor: response.investors,
              region: response.region,
              capitalised: response.capitalised,
              startdate: response.startDate,
              enddate: response.endDate,
              intrate: response.intRate,
              netadv: response.netAdv,
              managefee: response.manageFee, // remmeber to change when in db
              brokerfee: response.brokerFee,
              legalfee: response.legalFee,
              variation: response.variation,
            }
          : row
      );
    });

    console.log(loanIndex);
    console.log(response);
    console.log(cap);
    setUpdateState(false);
  };

  const handleDeleteModal = () => {
    loanIndex = selectedRows[0].id;
    console.log(loanIndex);
    setDeleteModal(true);
  };

  const handleModalClose = () => {
    setDeleteModal(false);
  };

  const handleDeletePopup = async () => {
    // Add database stuff here for deleting

    setDeleteModal(false);
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const handleAddClose = () => {
    setAdd(false);
  };

  const handleUpdate = () => {
    loanIndex = selectedRows[0].id;
    setUpdateState(true);
  };

  const handleUpdateClose = () => {
    setUpdateState(false);
  };

  const handleUpdateRow = () => {
    // add database stuff for updating here
  };

  const seeMore = () => {
    setModal(true);
  };

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
                <Add
                  borrowerData={rowData}
                  addState={openAdd}
                  closeState={handleAddClose}
                  submitState={(
                    loanName,
                    borrower,
                    startDate,
                    endDate,
                    investor,
                    interest,
                    netAdv,
                    lenderFee,
                    brokerFee,
                    legalFee,
                    variation,
                    region,
                    cap
                  ) =>
                    handleAddSubmit(
                      loanName,
                      borrower,
                      startDate,
                      endDate,
                      investor,
                      interest,
                      netAdv,
                      lenderFee,
                      brokerFee,
                      legalFee,
                      variation,
                      region,
                      cap
                    )
                  }
                />
                <IconButton
                  onClick={handleUpdate}
                  disabled={selectedRows[0] === undefined ? true : false}
                >
                  <EditIcon />
                </IconButton>
                <Update
                  borrowerData={rowData}
                  loanData={
                    selectedRows[0] === undefined ? "" : selectedRows[0]
                  }
                  updateState={updateState}
                  closeUpdate={handleUpdateClose}
                  submitState={(
                    id,
                    loanName,
                    borrower,
                    startDate,
                    endDate,
                    investor,
                    interest,
                    netAdv,
                    lenderFee,
                    brokerFee,
                    legalFee,
                    variation,
                    region,
                    cap
                  ) =>
                    handleUpdateSubmit(
                      id,
                      loanName,
                      borrower,
                      startDate,
                      endDate,
                      investor,
                      interest,
                      netAdv,
                      lenderFee,
                      brokerFee,
                      legalFee,
                      variation,
                      region,
                      cap
                    )
                  }
                />
                <IconButton sx={{ color: "red" }} onClick={handleDeleteModal}>
                  <DeleteIcon />
                </IconButton>
                <Dialog
                  open={deleteModal}
                  onClose={handleModalClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  PaperProps={{
                    elevation: 3,
                  }}
                >
                  <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want delete this loan?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button sx={{ color: "red" }} onClick={handleModalClose}>
                      Cancel
                    </Button>
                    <Button
                      sx={{ color: "black" }}
                      onClick={handleDeletePopup}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </h2>
            <Cards data={selectedRows} />
          </Typography>
        </ThemeProvider>
      </div>
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
              onRowSelectionModelChange={(ids) => {
                const selectedIDS = new Set(ids);
                const selectedRows = rows.filter((row) =>
                  selectedIDS.has(row.id)
                );

                if (selectedRows[0] === undefined) {
                } else {
                  // resets the arrays so it doesn't add to existing data.
                  col1 = [];

                  // // parse date to be able to get the difference between two dates
                  // // also converts the final result from a negative int to a positive int
                  // const startDateFormat = parse(
                  //   selectedRows[0].startdate,
                  //   "dd/MM/yyyy",
                  //   new Date()
                  // );
                  // const endDateFormat = parse(
                  //   selectedRows[0].enddate,
                  //   "dd/MM/yyyy",
                  //   new Date()
                  // );
                  // var months = differenceInMonths(
                  //   startDateFormat,
                  //   endDateFormat
                  // );
                  // var monthsConvert = months * -1;

                  // console.log(monthsConvert);

                  // calculates compound interest and saves it
                  // monthly interest is also calculated
                  var result = calculateMonthlyInterest(
                    selectedRows[0].netadv,
                    selectedRows[0].intrate
                  );

                  selectedRows[0].interest = result.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  });

                  // calculates repayable on capitalised and non capitalised loans
                  var totRepayNon = calculateRepayableNon(
                    selectedRows[0].variation,
                    selectedRows[0].brokerfee,
                    selectedRows[0].managefee,
                    selectedRows[0].netadv,
                    selectedRows[0].legalfee
                  );
                  var totRepayCap = calculateRepayableCap(
                    selectedRows[0].variation,
                    selectedRows[0].brokerfee,
                    selectedRows[0].managefee,
                    selectedRows[0].netadv,
                    selectedRows[0].legalfee,
                    result
                  );

                  // converts interest rate before calculating daily interest
                  var intRateConvert = selectedRows[0].intrate / 100;
                  var dailyInterest =
                    (selectedRows[0].totalrepay * intRateConvert) / 365;
                  selectedRows[0].dailyint = dailyInterest;

                  // checks if a loan is capitalised
                  // tbh I still don't know how capitalised and non capitalised loans work.
                  if (selectedRows[0].capitalised === "No") {
                    selectedRows[0].monthint = result;
                    selectedRows[0].totalrepay = totRepayNon;
                    // selectedRows[0].interest =
                    //   (totRepayNon * intRateConvert) / 2;
                    // selectedRows[0].monthInt = totRepayNon * intRateConvert;
                  } else {
                    selectedRows[0].monthint = 0.0;
                    selectedRows[0].totalrepay = totRepayCap;
                  }

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
                  <div>
                    {selectedRows[0] === undefined ||
                    selectedRows[0].investors.length === 0
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
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Investors"}
                    </DialogTitle>
                    <DialogContent sx={{ marginLeft: 3, marginRight: 3 }}>
                      <DialogContentText id="alert-dialog-description">
                        {selectedRows[0] === undefined
                          ? ""
                          : selectedRows[0].investors.map(function (d, idx) {
                              return <li>{selectedRows[0].investors[idx]}</li>;
                            })}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button sx={{ color: "red" }} onClick={handlePopupClose}>
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
    </div>
  );
}
