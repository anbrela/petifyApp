import React, { useEffect, useState } from "react";
import "./Match.css";
import axios from "axios";
import logo from "../../Images/Huppy.png";
import { FaPaw } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { BiCurrentLocation } from "react-icons/bi";
import Dog from "../../Images/dog.jpg";
import TinderCard from "react-tinder-card";

const Match = () => {
  const [pets, setPets] = useState({
    lista: [],
    status: null,
  });

  useEffect(() => {
    if (pets !== [])
      axios({
        method: "GET",
        url: "http://localhost:4000/api/pet/",
      })
        .then((res) => {
          setPets({ ...pets, lista: res.data, status: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const lista = pets.lista;

  const onSwipe = (direction) => {
    console.log(direction);
  };

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
      <div className="image">
        <div className="container-image">
          {pets.status != null ? (
            lista.map((pet) => (
              <TinderCard
                className="swipe"
                key={pet.name}
                onSwipe={onSwipe}
                preventSwipe={["up", "down"]}
              >
                <div
                  className="card"
                  style={{
                    backgroundImage: `url(${
                      "http://localhost:4000/api/pet/get-image/" + pet.image
                    })`,
                  }}
                >
                  <div className="pet-info">
                    <div className="pet-name">
                      <p>
                        {pet.name} , {pet.age}
                      </p>
                      <div className="location">
                        <BiCurrentLocation /> <span>Lugo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TinderCard>
            ))
          ) : (
            <span>No hay perros</span>
          )}
        </div>
      </div>
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
