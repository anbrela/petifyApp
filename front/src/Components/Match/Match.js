import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserDispatch";
import { Link } from "react-router-dom";
import "./Match.css";
import axios from "axios";
import Header from "../Header/Header";
import { BiCurrentLocation } from "react-icons/bi";
import TinderCard from "react-tinder-card";
import { FaDog } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";

const Match = () => {
  const [user, setUser] = useContext(UserContext);

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

  console.log(user);

  const updateLikedList = () => {
    axios({
      method: "PUT",
      url: "http://localhost:4000/api/users/" + user.userID,
      headers: {
        "x-access-token": user.token,
      },
      data: {
        likedPets: user.likedPets,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateDisikedList = () => {
    axios({
      method: "PUT",
      url: "http://localhost:4000/api/users/" + user.userID,
      headers: {
        "x-access-token": user.token,
      },
      data: {
        dislikedPets: user.dislikedPets,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const lista = pets.lista;

  const onSwipe = (id) => (direction) => {
    switch (direction) {
      case "left": {
        user.likedPets.push(id);
        updateLikedList();
      }
      case "right": {
        user.dislikedPets.push(id);
        updateDisikedList();
      }
    }
  };

  return (
    <>
      <Header />
      <div className="image">
        <div className="container-image">
          {pets.status != null ? (
            lista.map((pet) => (
              <React.Fragment key={pet.name}>
                <TinderCard
                  className="swipe"
                  onSwipe={onSwipe(pet._id)}
                  preventSwipe={["up", "down"]}
                >
                  <div
                    className="card"
                    key={pet.name}
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
                <div className="footer">
                  <li className="corazon">
                    <RiHeart2Fill />
                  </li>

                  <li className="more">
                    <Link to={"/profile/" + pet._id}>
                      <FaDog />
                    </Link>
                  </li>

                  <li className="unmatch">
                    <ImCross />
                  </li>
                </div>
              </React.Fragment>
            ))
          ) : (
            <span>No hay perros</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Match;
