import * as React from "react";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker, ConfigProvider } from "antd";
import { NumericFormat } from "react-number-format";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NZData from "../../data/nz.json";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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

function toISOLocal(d) {
  var z = (n) => ("0" + n).slice(-2);
  var zz = (n) => ("00" + n).slice(-3);
  var off = d.getTimezoneOffset();
  var sign = off > 0 ? "-" : "+";
  off = Math.abs(off);

  return (
    d.getFullYear() +
    "-" +
    z(d.getMonth() + 1) +
    "-" +
    z(d.getDate()) +
    "T" +
    z(d.getHours()) +
    ":" +
    z(d.getMinutes()) +
    ":" +
    z(d.getSeconds()) +
    "." +
    zz(d.getMilliseconds()) +
    sign +
    z((off / 60) | 0) +
    ":" +
    z(off % 60)
  );
}

function addYears(date, years) {
  const dateCopy = new Date(date);
  dateCopy.setFullYear(dateCopy.getFullYear() + Number(years));
  return dateCopy;
}

function addMonth(date, month) {
  const dateCopy = new Date(date);
  dateCopy.setMonth(dateCopy.getMonth() + Number(month));
  return dateCopy;
}

function subtractYears(date, years) {
  const dateCopy = new Date(date);
  dateCopy.setFullYear(dateCopy.getFullYear() - Number(years));
  return dateCopy;
}

function subtractMonths(date, month) {
  const dateCopy = new Date(date);
  dateCopy.setMonth(dateCopy.getMonth() - Number(month));
  return dateCopy;
}

export default function AddForm(props) {
  const [loanName, setLoanName] = React.useState("");
  const [borrower, setBorrower] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [investor, setInvestor] = React.useState([]);
  const [interest, setInterest] = React.useState("");
  const [netAdv, setNetAdv] = React.useState(0);
  const [lenderFee, setLenderFee] = React.useState(0);
  const [brokerFee, setBrokerFee] = React.useState(0);
  const [legalFee, setLegalFee] = React.useState(0);
  const [variation, setVariation] = React.useState(0);
  const [region, setRegion] = React.useState("");
  const [cap, setCap] = React.useState("");
  const [errorLoanName, setLoanNameError] = React.useState(false);
  const [errorBorrower, setBorrowerError] = React.useState(false);
  const [errorStart, setStartError] = React.useState("");
  const [errorEnd, setEndError] = React.useState(false);
  const [errorYear, setErrorYear] = React.useState(false);
  const [errorMonth, setErrorMonth] = React.useState(false);
  const [errorInterest, setErrorInterest] = React.useState(false);
  const [errorNet, setErrorNet] = React.useState(false);
  const [errorLender, setErrorLender] = React.useState(false);
  const [errorBroker, setErrorBroker] = React.useState(false);
  const [errorLegal, setErrorLegal] = React.useState(false);
  const [errorVariation, setErrorVariation] = React.useState(false);
  const [errorRegion, setErrorRegion] = React.useState(false);
  const [errorCap, setErrorCap] = React.useState(false);
  const [disabledField, setDisabledField] = React.useState(true);
  const [saveDateState, setSaveDateState] = React.useState(null);
  const [saveMonthState, setSaveMonthState] = React.useState(null);
  const formRef = React.useRef();

  const { borrowerData, addState, closeState, submitState } = props;

  var regions = [];
  var borrowers = [];

  const dateFormat = "YYYY-MM-DD";

  /************************HANDLES ALL FORM FIELD ************************************/

  const onChangeLoanName = (e) => {
    setLoanName(e.target.value);
    setLoanNameError(false);
  };

  const onChangeBorrower = (e) => {
    setBorrower(e);
    setBorrowerError(false);
  };

  const onChangeDate = (e) => {
    setStartDate(e);
    setEndError(false);
    if (e === null) {
      setDisabledField(true);
      setStartError("error");
    } else {
      setMonth("0");
      setYear("0");
      setDisabledField(false);
    }
  };

  const onChangeYear = (e) => {
    if (e.target.value.trim().length === 0) {
      setYear("0");
    } else {
      setYear(e.target.value);
    }
    if (month === "0") {
      const newDate = addYears(startDate, e.target.value);
      const stringDate = newDate.toISOString().split("T")[0];
      const dateNew = dayjs(stringDate, dateFormat);
      setSaveDateState(dateNew);
      setEndDate(dateNew);
    } else {
      if (e.target.value === "0") {
        const subDate = subtractYears(saveMonthState, e.target.value);
        const stringDate = toISOLocal(subDate).split("T")[0];
        const dateNew = dayjs(stringDate, dateFormat);
        const startDateString = startDate.toISOString().split("T")[0];

        if (startDateString.split("-")[0] < stringDate) {
          var originalDate = startDateString.split("-")[0];
          var modifiedDate = stringDate.split("-")[0];

          const differenceBetweenYears =
            Number(modifiedDate) - Number(originalDate);

          const newModifiedDate = subtractYears(
            stringDate,
            differenceBetweenYears
          );
          const convert = toISOLocal(newModifiedDate).split("T")[0];
          const newStuff = dayjs(convert, dateFormat);

          setEndDate(newStuff);
        } else {
          setSaveDateState(dateNew);
          setEndDate(dateNew);
        }
      } else {
        const newDate = addYears(saveMonthState, e.target.value);
        const stringDate = toISOLocal(newDate).split("T")[0];
        const dateNew = dayjs(stringDate, dateFormat);
        setSaveDateState(dateNew);
        setEndDate(dateNew);
      }
    }

    setErrorYear(false);
  };

  const onChangeMonth = (e) => {
    if (e.trim().length === 0) {
      setMonth("0");
    } else {
      setMonth(e);
    }
    if (year === "0") {
      const newDate = addMonth(startDate, e);
      const stringDate = newDate.toISOString().split("T")[0];
      const dateNew = dayjs(stringDate, dateFormat);
      setSaveMonthState(dateNew);
      setEndDate(dateNew);
    } else {
      if (e === "0") {
        const subDate = subtractYears(saveMonthState, e);
        const stringDate = toISOLocal(subDate).split("T")[0];
        const dateNew = dayjs(stringDate, dateFormat);
        const startDateString = startDate.toISOString().split("T")[0];

        if (startDateString.split("-")[0] < stringDate) {
          var originalDate = startDateString.split("-")[1];
          var modifiedDate = stringDate.split("-")[1];

          const differenceBetweenMonths =
            Number(modifiedDate) - Number(originalDate);

          const newModifiedDate = subtractMonths(
            stringDate,
            differenceBetweenMonths
          );
          const convert = toISOLocal(newModifiedDate).split("T")[0];
          const newStuff = dayjs(convert, dateFormat);

          setEndDate(newStuff);
        } else {
          setSaveDateState(dateNew);
          setEndDate(dateNew);
        }
      } else {
        const newDate = addMonth(saveDateState, e);
        const stringDate = toISOLocal(newDate).split("T")[0];
        const dateNew = dayjs(stringDate, dateFormat);
        setSaveMonthState(dateNew);
        setEndDate(dateNew);
      }
    }
    setErrorMonth(false);
  };

  const onChangeInvestor = (e) => {
    setInvestor(e);
  };

  const onChangeInterest = (e) => {
    setInterest(e.target.value);
    setErrorInterest(false);
  };

  const onChangeNet = (e) => {
    setNetAdv(e.target.value);
    setErrorNet(false);
  };

  const onChangeLenderFee = (e) => {
    setLenderFee(e.target.value);
    setErrorLender(false);
  };

  const onChangeBrokerFee = (e) => {
    setBrokerFee(e.target.value);
    setErrorBroker(false);
  };

  const onChangeLegalFee = (e) => {
    setLegalFee(e.target.value);
    setErrorLegal(false);
  };

  const onChangeVariation = (e) => {
    setVariation(e.target.value);
    setErrorVariation(false);
  };

  const handleChangeCap = (event) => {
    setCap(event.target.value);
    setErrorCap(false);
  };

  const onChangeRegion = (e) => {
    setRegion(e);
    setErrorRegion(false);
  };

  /********************************************************************************/

  const handleSubmitClose = () => {
    if (loanName === "") {
      setLoanNameError(true);
    }
    if (borrower === "") {
      setBorrowerError(true);
    }
    if (startDate === null) {
      setStartError(true);
    }
    if (endDate === null) {
      setEndDate(true);
    }
    if (interest === "") {
      setErrorInterest(true);
    }
    if (netAdv === "") {
      setErrorNet(true);
    }
    if (lenderFee === "") {
      setErrorLender(true);
    }
    if (brokerFee === "") {
      setErrorBroker(true);
    }
    if (legalFee === "") {
      setErrorLegal(true);
    }
    if (variation === "") {
      setErrorVariation(true);
    }
    if (region === "") {
      setErrorRegion(true);
    }
    if (cap === "") {
      setErrorCap(true);
    }
    if (year === "") {
      setErrorYear(true);
    }
    if (month === "") {
      setErrorMonth(true);
    }

    if (
      loanName !== "" &&
      borrower !== "" &&
      startDate !== null &&
      endDate !== null &&
      interest !== "" &&
      netAdv !== "" &&
      lenderFee !== "" &&
      brokerFee !== "" &&
      legalFee !== "" &&
      variation !== "" &&
      region !== "" &&
      cap !== "" &&
      year !== "" &&
      month !== ""
    ) {
      submitState(
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
      );
      setLoanName("");
      setBorrower("");
      setStartDate("");
      setEndDate("");
      setYear("");
      setMonth("");
      setInvestor([]);
      setInterest("");
      setNetAdv("");
      setLenderFee("");
      setBrokerFee("");
      setLegalFee("");
      setVariation("");
      setRegion("");
      setCap("");

      setLoanNameError(false);
      setBorrowerError(false);
      setStartError(false);
      setErrorInterest(false);
      setErrorNet(false);
      setErrorLender(false);
      setErrorBroker(false);
      setErrorLegal(false);
      setErrorVariation(false);
      setErrorRegion(false);
      setErrorCap(false);
    }
  };

  const handleClose = () => {
    closeState();
    setLoanNameError(false);
    setBorrowerError(false);
    setStartError(false);
    setErrorInterest(false);
    setErrorNet(false);
    setErrorLender(false);
    setErrorBroker(false);
    setErrorLegal(false);
    setErrorVariation(false);
    setErrorRegion(false);
    setErrorCap(false);
    setLoanName("");
    setBorrower("");
    setStartDate("");
    setEndDate("");
    setYear("");
    setMonth("");
    setInvestor([]);
    setInterest("");
    setNetAdv("");
    setLenderFee("");
    setBrokerFee("");
    setLegalFee("");
    setVariation("");
    setRegion("");
    setCap("");
  };

  borrowerData.map((data) => {
    return borrowers.push(data.borrowerfirstname + " " + data.borrowerlastname);
  });

  var tempInvestors = [
    "Investor 1",
    "Investor 2",
    "Investor 3",
    "Investor 4",
    "Investor 5",
    "Investor 6",
  ];

  const newData = NZData.map((object) => ({
    city: object.city,
  }));

  for (let i = 0; i < newData.length; ++i) {
    regions.push(newData[i].city);
  }

  return (
    <Dialog open={addState} onClose={closeState}>
      <DialogTitle>Add Loan</DialogTitle>
      <DialogContent>
        <Typography sx={{ color: "gray", fontSize: 15, marginBottom: 0.5 }}>
          * Required Fields
        </Typography>
        <Typography sx={{ color: "black", fontSize: 20 }}>
          Loan Information
        </Typography>
        <TextField
          error={errorLoanName}
          required
          value={loanName}
          onChange={(e) => onChangeLoanName(e)}
          autoFocus
          margin="dense"
          id="outlined-required"
          label="Loan Name"
          type="name"
          fullWidth
          variant="standard"
        />
        <Autocomplete
          required
          options={borrowers}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              error={errorBorrower}
              {...params}
              label="Borrower *"
              variant="standard"
            />
          )}
          variant="standard"
          onChange={(e, v) => onChangeBorrower(v)}
        />
        <Autocomplete
          required
          multiple
          id="tags-standard"
          sx={{ marginTop: 1 }}
          options={tempInvestors}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Investor(s)" />
          )}
          onChange={(e, v) => onChangeInvestor(v)}
        />
        <Autocomplete
          id="tags-standard"
          options={regions}
          sx={{ marginTop: 1 }}
          onChange={(event, value) => onChangeRegion(value)}
          renderInput={(params) => (
            <TextField
              error={errorRegion}
              {...params}
              variant="standard"
              label="Region *"
            />
          )}
          ListboxProps={{
            style: {
              maxHeight: "150px",
            },
          }}
        />
        <FormControl
          variant="standard"
          sx={{ marginTop: 1, width: "25ch", marginBottom: 3 }}
        >
          <TextField
            variant="standard"
            label="Capitalised *"
            sx={{ width: 300 }}
            select
            error={errorCap}
            onChange={(e) => handleChangeCap(e)}
          >
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </TextField>
        </FormControl>
        <Typography sx={{ color: "black", fontSize: 20, marginBottom: 2 }}>
          Loan Term
        </Typography>
        <ConfigProvider
          theme={{
            token: {
              colorBorder: "grey",
              colorPrimaryHover: "black",
              colorTextPlaceholder: "grey",
            },
          }}
        >
          <DatePicker
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
            size={"large"}
            style={{
              colorBorder: "black",
              marginBottom: 10,
            }}
            onChange={(e) => onChangeDate(e)}
            placeholder="Select start date *"
            status={errorStart}
          />
          <DatePicker
            disabled
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
            size={"large"}
            style={{
              colorBorder: "black",
              marginBottom: 10,
            }}
            value={endDate}
            placeholder="End Date"
          />
        </ConfigProvider>
        <TextField
          disabled={disabledField}
          error={errorYear}
          value={year}
          onChange={(e) => onChangeYear(e)}
          autoFocus
          sx={{ marginRight: 1, marginBottom: 2 }}
          margin="dense"
          id="outlined-required"
          label="Year(s)"
          type="name"
          variant="standard"
        />
        <TextField
          disabled={disabledField}
          error={errorMonth}
          required
          value={month}
          onChange={(e) => onChangeMonth(e.target.value)}
          autoFocus
          margin="dense"
          id="outlined-required"
          label="Month(s)"
          type="name"
          variant="standard"
        />
        <Typography sx={{ color: "black", fontSize: 20 }}>
          Loan Details
        </Typography>
        <TextField
          required
          error={errorInterest}
          autoFocus
          margin="dense"
          id="outlined-number"
          type="text"
          label="Interest Rate %"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onChange={(e) => onChangeInterest(e)}
          InputProps={{
            inputComponent: PercentageNumericFormat,
          }}
          variant="standard"
        />
        <TextField
          error={errorNet}
          autoFocus
          margin="dense"
          id="outlined-number"
          type="text"
          label="Net Advanced $ *"
          sx={{ m: 1 }}
          onChange={(e) => onChangeNet(e)}
          InputProps={{
            inputComponent: CurrencyFormat,
          }}
          variant="standard"
          value="$0.00"
        />
        <TextField
          error={errorLender}
          autoFocus
          margin="dense"
          id="outlined-number"
          label="Lender Fee $ *"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onChange={(e) => onChangeLenderFee(e)}
          InputProps={{
            inputComponent: CurrencyFormat,
          }}
          value="$0.00"
          variant="standard"
        />
        <TextField
          error={errorBroker}
          autoFocus
          margin="dense"
          id="outlined-number"
          label="Broker Fee $ *"
          sx={{ m: 1 }}
          onChange={(e) => onChangeBrokerFee(e)}
          InputProps={{
            inputComponent: CurrencyFormat,
          }}
          value="$0.00"
          variant="standard"
        />
        <TextField
          error={errorLegal}
          autoFocus
          margin="dense"
          id="outlined-number"
          label="Legal Fee $ *"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onChange={(e) => onChangeLegalFee(e)}
          InputProps={{
            inputComponent: CurrencyFormat,
          }}
          value="$0.00"
          variant="standard"
        />
        <TextField
          error={errorVariation}
          autoFocus
          margin="dense"
          id="outlined-number"
          label="Variation $ *"
          sx={{ m: 1 }}
          onChange={(e) => onChangeVariation(e)}
          InputProps={{
            inputComponent: CurrencyFormat,
          }}
          variant="standard"
          value="$0.00"
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "red" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ color: "black" }} onClick={handleSubmitClose}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
