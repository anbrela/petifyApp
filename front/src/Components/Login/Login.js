import React, { useEffect } from "react";
import "./Login.css";
import background from "../../Images/background.jpg";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

const CssTextField = withStyles({
  root: {
    "input:-webkit-autofill": {
      backgroundColor: "transparent !important",
    },

    "& input:-internal-autofill-selected": {
      backgroundColor: "none !important",
      background: "none !important",
    },

    "& label": {
      color: "white",
      fontSize: "15px",
    },

    "& label.Mui-focused": {
      color: "#ecf8f8",
      fontSize: "15px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ecf8f8",
    },
    "& .MuiOutlinedInput-root": {
      color: "white",
      fieldset: {
        borderColor: "#ffa0fd",
      },
      "&:hover fieldset": {
        borderColor: "#ecf8f8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffa0fd",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      background: "#ffa0fd",
      backgroundColor: "#ffa0fd",
    },
    background: "#ffa0fd",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "var(--negro)",
    width: 70,
    height: 38,
    padding: "0 30px",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const PinkSwitch = withStyles({
  switchBase: {
    color: "#ecf8f8",
    "&$checked": {
      color: "#ecf8f8",
    },
    "&$checked + $track": {
      backgroundColor: "#ecf8f8",
    },
  },
  checked: {},
  track: {},
})(Switch);

const Login = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className="container-login">
      <div className="wrapper-login">
        <h2>huppy</h2>

        <PinkSwitch
          checked={state.checkedA}
          onChange={handleChange}
          name="checkedA"
        />

        <form className={classes.form} noValidate autoComplete="off">
          <CssTextField
            className={classes.margin}
            label="Email o teléfono"
            labelClassName={classes.root}
            variant="outlined"
            id="custom-css-outlined-input"
          />
          <CssTextField
            className={classes.margin}
            label="Contraseña"
            variant="outlined"
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button className={classes.root}>Enviar</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
