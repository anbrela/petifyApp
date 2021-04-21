import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import cat from "../../Images/cat.svg";
import dog from "../../Images/dog.svg";
import logo from "../../Images/Huppy.png";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserDispatch";
import axios from "axios";

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
  let history = useHistory();

  const [user, setUser] = useContext(UserContext);

  const [values, setValues] = useState({ email: "", password: "" });
  const [resetPass, setResetPass] = useState(false);

  const [errores, setErrores] = useState({
    emailError: null,
    passwordError: null,
    loginError: null,
  });

  const errorLogin = () => {
    setErrores({ ...errores, loginError: false });
  };

  const handleEmailChange = (e) => {
    setValues({ ...values, email: e.currentTarget.value });

    if (typeof e.currentTarget.value !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(e.currentTarget.value)) {
        setErrores({ ...errores, emailError: true });
      } else {
        setErrores({ ...errores, emailError: false });
      }
    }
  };
  const handlePasswordChange = (e) => {
    setValues({ ...values, password: e.currentTarget.value });

    if (e.currentTarget.value.length < 6) {
      setErrores({
        ...errores,
        passwordError: "La contraseña tiene que ser mayor de 6 carácteres",
      });
    } else {
      setErrores({ ...errores, passwordError: false });
    }
  };

  const sendLogin = (e) => {
    e.preventDefault()
    if (!errores.passwordError && !errores.emailError) {
      axios({
        method: "POST",
        url: "http://localhost:4000/api/users/signin",
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((res) => {
          if (res.data.token) {
            setUser({
              type: "login",
              token: res.data.token,
              user: res.data.username,
              userID: res.data.userID,
              expires: res.data.expires,
              dislikedPets: res.data.dislikedPets,
              likedPets: res.data.likedPets,
            });
            history.push("/petlove");
          }
        })
        .catch((error) => {
          setResetPass(!resetPass);
          setErrores({
            ...errores,
            loginError: "La contraseña y el usuario no se corresponden",
          });
        });
    } else {
    }
  };

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

        <form className={classes.form} onSubmit={sendLogin}  noValidate autoComplete="new-password">
          <CssTextField
            autoComplete="off"
            className={classes.margin}
            label="Email o teléfono"
            labelclassname={classes.root}
            variant="outlined"
            value={values.email}
            onChange={handleEmailChange}
            id="custom-css-outlined-input"
          />
          <CssTextField
            className={classes.margin}
            autoComplete="new-password"
            label="Contraseña"
            variant="outlined"
            value={values.password}
            onChange={handlePasswordChange}
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
          <Button className={classes.root}>
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
