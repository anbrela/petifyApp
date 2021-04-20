import React, { useEffect, useState } from "react";
import "./Match.css";
import axios from "axios";
import logo from "../../Images/Huppy.png";
import { FaPaw } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import Dog from "../../Images/dog.jpg";
import TinderCard from "react-tinder-card";

const Match = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/api/pet/",
    })
      .then((res) => {
        setPets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-match">
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

      {pets.map((pet) => {
        <div className="image">
          <div className="container-image">
            <TinderCard
              className="swipe"
              key={pet.id}
              preventSwipe={["up", "down"]}
            ></TinderCard>
            <div className="pet-info">
              <div className="pet-name">
                <p></p>
                <p>
                  <i className="fas fa-map-marker-alt"></i>Lugo
                </p>
              </div>
            </div>
            <img src={"http://localhost:4000/api/pet/" + pet.image} alt="" />
          </div>
        </div>;
      })}

      <div className="footer">
        <li className="corazon">
          <RiHeart2Fill />
        </li>
        <li className="unmatch">
          <ImCross />
        </li>
      </div>
    </div>
  );
};

export default Match;
