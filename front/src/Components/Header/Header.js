import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../Images/Huppy.png";
import { FaPaw } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";


const Header = () => {


    return (

        <div className="header-container">
        <div className="logo-match">
          <img src={logo} alt="adopcion de perros happy" />
        </div>

        <div className="container-header">
          <li className="user">
            <FaUserAlt />
          </li>
          <li className="paw">
            <FaPaw />
          </li>
          <li className="link">
            <RiHeart2Fill />
            <div className="new"></div>{" "}
          </li>
        </div>
      </div>


    )



}

export default Header;