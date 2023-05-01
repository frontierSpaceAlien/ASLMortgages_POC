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
  const [netAdv, setNetAdv] = React.useState("");
  const [manageFee, setManageFee] = React.useState("");
  const [brokerFee, setBrokerFee] = React.useState("");
  const [legalFee, setLegalFee] = React.useState("");
  const [variation, setVariation] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [cap, setCap] = React.useState("");

  const { borrowerData, addState, closeState, submitState } = props;

  var regions = [];
  var borrowers = [];

  /************************HANDLES ALL FORM FIELD ************************************/

  const onChangeLoanName = (e) => {
    setLoanName(e.target.value);
  };

  const onChangeBorrower = (e) => {
    setBorrower(e);
  };

  const onChangeDate = (range) => {
    setStartDate(range[0].format("DD/MM/YYYY"));
    setEndDate(range[1].format("DD/MM/YYYY"));
  };

  const onChangeInvestor = (e) => {
    setInvestor(e);
  };

  const onChangeInterest = (e) => {
    setInterest(e.target.value);
  };

  const onChangeNet = (e) => {
    setNetAdv(e.target.value);
  };

  const onChangeManageFee = (e) => {
    setManageFee(e.target.value);
  };

  const onChangeBrokerFee = (e) => {
    setBrokerFee(e.target.value);
  };

  const onChangeLegalFee = (e) => {
    setLegalFee(e.target.value);
  };

  const onChangeVariation = (e) => {
    setVariation(e.target.value);
  };

  const handleChangeCap = (event) => {
    setCap(event.target.value);
  };

  const onChangeRegion = (e) => {
    setRegion(e);
  };

  /********************************************************************************/

  const handleSubmitClose = () => {
    submitState(
      loanName,
      borrower,
      startDate,
      endDate,
      investor,
      interest,
      netAdv,
      manageFee,
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
    setManageFee("");
    setBrokerFee("");
    setLegalFee("");
    setVariation("");
    setRegion("");
    setCap("");
  };

  const handleClose = () => {
    closeState();
    setLoanName("");
    setBorrower("");
    setStartDate("");
    setEndDate("");
    setInvestor([]);
    setInterest("");
    setNetAdv("");
    setManageFee("");
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
        <TextField
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
          options={borrowers}
          sx={{ width: 300, marginBottom: 3 }}
          renderInput={(params) => (
            <TextField {...params} label="Borrower" variant="standard" />
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
          autoFocus
          margin="dense"
          id="outlined-number"
          type="text"
          label="Net Advanced $"
          sx={{ m: 1 }}
          onChange={(e) => onChangeNet(e)}
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
          label="Management Fee $"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onChange={(e) => onChangeManageFee(e)}
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
          onChange={(e) => onChangeBrokerFee(e)}
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
          onChange={(e) => onChangeLegalFee(e)}
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
            <TextField {...params} variant="standard" label="Region" />
          )}
          ListboxProps={{
            style: {
              maxHeight: "150px",
            },
          }}
        />
        <FormControl variant="standard" sx={{ marginTop: 3, width: "25ch" }}>
          <InputLabel>Capitilised</InputLabel>
          <Select value={cap} onChange={handleChangeCap} label="Capitilised">
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
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
