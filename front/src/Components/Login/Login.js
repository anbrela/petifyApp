import React, {useEffect} from "react";
import "./Login.css";
import background from "../../Images/background.jpg";
import { Button } from '@material-ui/core';



const Login = () => {


    return (

        <div className="login">
        <img className="background" src={background} alt="huppy adopción de mascotas" />

        <div className="wrapper-login">

        <h2>Happet</h2>
        <input type="email"></input>
        <input type="text"></input>
        <Button variant="contained">
         Primary
        </Button>
        </div>


        </div>


    )


}


export default Login;