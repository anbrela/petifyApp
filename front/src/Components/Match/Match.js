import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "./Match.css";
import axios from "axios";
import Header from "../Header/Header"
import { BiCurrentLocation } from "react-icons/bi";
import TinderCard from "react-tinder-card";
import {FaDog} from "react-icons/fa"
import { RiHeart2Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";


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
      <Header />
      <div className="image">
        <div className="container-image">
          {pets.status != null ? (
            lista.map((pet) => (
              <>             >
              <TinderCard
                className="swipe"
                
                onSwipe={onSwipe}
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
                  <div className="pet-info" key={pet.age}>
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
               <div className="footer" key={pet.location}>
               <li className="corazon">
                 <RiHeart2Fill />
               </li>
               <li className="more">
                      <Link to={"/" + pet._id}>
                        <FaDog />
                      </Link>
                      </li>
               <li className="unmatch">
                 <ImCross />
               </li>
             </div>
             </>
            ))
          ) : (
            <span>No hay perros</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Match;
