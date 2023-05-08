import * as React from "react";
import { IconButton, Typography } from "@mui/material";
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
import moment from "moment";
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

export default function UpdateForm(props) {
  const { borrowerData, updateState, closeUpdate, loanData, submitState } =
    props;
  const dateFormat = "YYYY-MM-DD";

  const dateStuff = new Date(loanData.startdate);
  const stringDate = toISOLocal(dateStuff).split("T")[0];
  const dateNew = dayjs(stringDate, dateFormat);

  const endStuff = new Date(loanData.enddate);
  const stringEnd = toISOLocal(endStuff).split("T")[0];
  const newEnd = dayjs(stringEnd, dateFormat);

  var modifiedStartMonth = stringDate.split("-")[1];
  var modifiedEndMonth = stringEnd.split("-")[1];

  var modifiedStartYear = stringDate.split("-")[0];
  var modifiedEndYear = stringEnd.split("-")[0];
  const differenceInMonths =
    Number(modifiedStartMonth) - Number(modifiedEndMonth);
  const differenceInYears = Math.abs(
    Number(modifiedStartYear) - Number(modifiedEndYear)
  );

  const [loanID, setLoanID] = React.useState();
  const [loanName, setLoanName] = React.useState();
  const [borrower, setBorrower] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [year, setYear] = React.useState();
  const [month, setMonth] = React.useState();
  const [investor, setInvestor] = React.useState();
  const [interest, setInterest] = React.useState();
  const [netAdv, setNetAdv] = React.useState();
  const [lenderFee, setLenderFee] = React.useState();
  const [brokerFee, setBrokerFee] = React.useState();
  const [legalFee, setLegalFee] = React.useState();
  const [variation, setVariation] = React.useState();
  const [region, setRegion] = React.useState();
  const [cap, setCap] = React.useState();
  const [errorLoanName, setLoanNameError] = React.useState(false);
  const [errorBorrower, setBorrowerError] = React.useState(false);
  const [errorStart, setStartError] = React.useState(false);
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
  var regions = [];
  var borrowers = [];

  /************************HANDLES ALL FORM FIELD ************************************/

  React.useEffect(() => {
    setLoanID(loanData.id);
    setLoanName(loanData.loan);
    setBorrower(loanData.borrower);
    setInvestor(loanData.investors);
    setRegion(loanData.region);
    setCap(loanData.capitalised);
    setStartDate(dateNew);
    setEndDate(newEnd);
    setYear(String(differenceInYears));
    setMonth(String(differenceInMonths));
    setInterest(loanData.intrate);
    setNetAdv(loanData.netadv);
    setLenderFee(loanData.managefee);
    setBrokerFee(loanData.brokerfee);
    setLegalFee(loanData.legalfee);
    setVariation(loanData.variation);
  }, [differenceInYears, differenceInMonths]);

  console.log(loanData.capitalised);

  const onChangeLoanName = (e) => {
    setLoanName(e.target.value);
    setLoanNameError(false);
    // console.log(loanData.investors);
  };

  const onChangeBorrower = (e) => {
    setBorrower(e);
    setBorrowerError(false);
  };

  const onChangeDate = (e) => {
    setStartDate(e);
    setStartError(false);
    setEndError(false);
    if (e === null) {
      setDisabledField(true);
      // console.log(e);
      // console.log(disabledField);
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
    if (startDate === "") {
      setStartError(true);
    }
    if (endDate === "") {
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
      startDate !== "" &&
      endDate !== "" &&
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
        loanID,
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
    { label: "Investor 1", id: 1 },
    { label: "Investor 2", id: 2 },
    { label: "Investor 3", id: 3 },
    { label: "Investor 4", id: 4 },
    { label: "Investor 5", id: 5 },
    { label: "Investor 6", id: 6 },
  ];

  const newData = NZData.map((object) => ({
    city: object.city,
  }));

  for (let i = 0; i < newData.length; ++i) {
    regions.push(newData[i].city);
  }

  return (
    <Dialog open={updateState} onClose={closeUpdate}>
      <DialogTitle>Update Loan</DialogTitle>
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
          defaultValue={loanData.loan}
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
          disabled
          value={borrower}
          defaultValue={loanData.borrower}
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
          value={investor}
          defaultValue={loanData.investors}
          options={tempInvestors}
          isOptionEqualToValue={(option, value) => option.label === value}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Investor(s)" />
          )}
          onChange={(e, v) => onChangeInvestor(v)}
        />
        <Autocomplete
          id="tags-standard"
          value={region}
          defaultValue={loanData.region}
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
            value={cap}
            defaultValue={loanData.capitalised}
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
            value={startDate}
            defaultValue={dayjs(stringDate)}
            format={dateFormat}
            size={"large"}
            style={{
              colorBorder: "black",
              marginBottom: 10,
            }}
            onChange={(e) => onChangeDate(e)}
            placeholder="Select start date *"
          />
          <DatePicker
            disabled
            value={endDate}
            defaultValue={dayjs(stringEnd)}
            format={dateFormat}
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
            size={"large"}
            style={{
              colorBorder: "black",
              marginBottom: 10,
            }}
            placeholder="End Date"
          />
        </ConfigProvider>
        <TextField
          error={errorYear}
          value={year}
          defaultValue={String(differenceInYears)}
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
          error={errorMonth}
          value={month}
          defaultValue={String(differenceInMonths)}
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
          value={interest}
          defaultValue={loanData.intrate}
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
          value={netAdv}
          defaultValue={loanData.netadv}
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
        />
        <TextField
          error={errorLender}
          value={lenderFee}
          defaultValue={loanData.managefee}
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
          variant="standard"
        />
        <TextField
          error={errorBroker}
          value={brokerFee}
          defaultValue={loanData.brokerfee}
          autoFocus
          margin="dense"
          id="outlined-number"
          label="Broker Fee $ *"
          sx={{ m: 1 }}
          onChange={(e) => onChangeBrokerFee(e)}
          InputProps={{
            inputComponent: CurrencyFormat,
          }}
          variant="standard"
        />
        <TextField
          error={errorLegal}
          value={legalFee}
          defaultValue={loanData.legalfee}
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
          variant="standard"
        />
        <TextField
          error={errorVariation}
          value={variation}
          defaultValue={loanData.variation}
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
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "red" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ color: "black" }} onClick={handleSubmitClose}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
