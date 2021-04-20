import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import cat from "../../Images/cat.svg";
import dog from "../../Images/dog.svg";
import logo from "../../Images/Huppy.png";
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

    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px white inset",
        background: "none",
      },
      "&:-webkit-autofill-selected": {
        background: "none !important",
      },

      "&:-internal-autofill": {
        background: "none !important",
      },

      "&:-internal-autofill-selected": {
        background: "none !important",
      },
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
    color: "#ffa0fd",
    "&$checked": {
      color: "#ffa0fd",
    },
    "&$checked + $track": {
      backgroundColor: "#ffa0fd",
    },
  },

  checked: {},
  track: {},
})(Switch);

const Login = () => {
  const classes = useStyles();
  const [animal, setAnimal] = React.useState({
    dog: true,
  });

  const handleChange = (event) => {
    console.log("el evento", event);
    setAnimal({ ...animal, [event.target.name]: event.target.checked });
  };

  return (
    <div className="container-login">
      <div className="wrapper-login">
        <div className="logo">
          <img src={logo} alt="logo de huppy" />
        </div>
        <div className="switch-login">
          <span className="circle-span">
            <img src={cat} alt="adoptar gato huppy" />
          </span>

          <PinkSwitch checked={animal.dog} onChange={handleChange} name="dog" />
          <span className="circle-span">
            <img src={dog} alt="adoptar perro huppy" />
          </span>
        </div>

        <form className={classes.form} noValidate autoComplete="new-password">
          <CssTextField
            autoComplete="off"
            className={classes.margin}
            label="Email o teléfono"
            labelClassName={classes.root}
            variant="outlined"
            id="custom-css-outlined-input"
          />
          <CssTextField
            className={classes.margin}
            autoComplete="new-password"
            label="Contraseña"
            variant="outlined"
            id="standard-password-input"
            label="Password"
            type="password"
          />
          <div className="login-info">
            <button className="btn-text">¿Contraseña olvidada?</button>
            <button className="btn-text-destacado">
              <Link to="/petlove">Registro </Link>
            </button>
          </div>
          <Button className={classes.root}>Enviar</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
