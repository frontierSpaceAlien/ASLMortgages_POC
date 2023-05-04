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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NZData from "../../data/nz.json";
const { RangePicker } = DatePicker;

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

export default function AddForm(props) {
  const [loanName, setLoanName] = React.useState("");
  const [borrower, setBorrower] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [investor, setInvestor] = React.useState([]);
  const [interest, setInterest] = React.useState("");
  const [netAdv, setNetAdv] = React.useState(0);
  const [lenderFee, setLenderFee] = React.useState(0);
  const [brokerFee, setBrokerFee] = React.useState(0);
  const [legalFee, setLegalFee] = React.useState(0);
  const [variation, setVariation] = React.useState(0);
  const [region, setRegion] = React.useState("");
  const [cap, setCap] = React.useState("");
  const formRef = React.useRef();
  const [errorLoanName, setLoanNameError] = React.useState(false);
  const [errorBorrower, setBorrowerError] = React.useState(false);
  const [errorStart, setStartError] = React.useState(false);
  const [errorEnd, setEndError] = React.useState(false);
  const [errorInterest, setErrorInterest] = React.useState(false);
  const [errorNet, setErrorNet] = React.useState(false);
  const [errorLender, setErrorLender] = React.useState(false);
  const [errorBroker, setErrorBroker] = React.useState(false);
  const [errorLegal, setErrorLegal] = React.useState(false);
  const [errorVariation, setErrorVariation] = React.useState(false);
  const [errorRegion, setErrorRegion] = React.useState(false);
  const [errorCap, setErrorCap] = React.useState(false);

  const { borrowerData, addState, closeState, submitState } = props;

  var regions = [];
  var borrowers = [];

  /************************HANDLES ALL FORM FIELD ************************************/

  const onChangeLoanName = (e) => {
    setLoanName(e.target.value);
    setLoanNameError(false);
  };

  const onChangeBorrower = (e) => {
    setBorrower(e);
    setBorrowerError(false);
  };

  const onChangeDate = (range) => {
    setStartDate(range[0].format("DD/MM/YYYY"));
    setEndDate(range[1].format("DD/MM/YYYY"));
    setStartError(false);
    setEndError(false);
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
      cap !== ""
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
      setEndDate(false);
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
    const currDate = new Date().toLocaleDateString("en-GB", {
      month: "numeric",
    });
    console.log(currDate);
    // closeState();
    setLoanNameError(false);
    setBorrowerError(false);
    setStartError(false);
    setEndDate(false);
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
        <form ref={formRef}>
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
            sx={{ width: 300, marginBottom: 3 }}
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
              onChange={(e) => onChangeDate(e)}
            />
          </ConfigProvider>
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
          <Autocomplete
            id="tags-standard"
            sx={{ marginTop: 1 }}
            options={regions}
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
          <FormControl variant="standard" sx={{ marginTop: 3, width: "25ch" }}>
            <TextField
              variant="standard"
              label="Capitalised *"
              select
              error={errorCap}
              onChange={(e) => handleChangeCap(e)}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </TextField>
          </FormControl>
        </form>
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
