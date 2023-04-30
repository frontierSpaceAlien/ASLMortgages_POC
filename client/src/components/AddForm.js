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
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
  const [values, setValues] = React.useState("0.00");
  const [cap, setCap] = React.useState("");

  const { borrowerData, addState, closeState, submitState } = props;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitClose = () => {
    submitState(loanName);
    setLoanName("");
  };

  const handleClose = () => {
    setLoanName("");
    closeState();
  };

  const handleChangeCap = (event) => {
    setCap(event.target.value);
  };

  const onChangeLoanName = (e) => {
    setLoanName(e.target.value);
  };

  var borrower = [];

  borrowerData.map((data) => {
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
          options={borrower}
          sx={{ width: 300, marginBottom: 3 }}
          renderInput={(params) => (
            <TextField {...params} label="Borrower" variant="standard" />
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
            <TextField {...params} variant="standard" label="Investor(s)" />
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
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
        <FormControl variant="standard" sx={{ m: 0.49, width: 90 }}>
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
