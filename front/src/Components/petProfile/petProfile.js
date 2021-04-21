import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header"
import { BiCurrentLocation } from "react-icons/bi";
import "./petProfile.css"


const PetProfile = () => {
  const petId = useParams();
  const [pet, setPet] = useState({
    petInfo: null,
    status: null,
  });

  const petStatus = pet.status;
  const mascota = pet.petInfo;

  console.log(pet.petInfo)

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/api/pet/profile/" + petId.petId,
    })
      .then((res) => {
        setPet({...pet, petInfo: res.data, status:"success" });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="container-profile">
      <Header />

      <div className="image">

      {petStatus == "success" ?

      <div className="container-image">
      <div
                    className="card"
                     key={mascota.name}
                     style={{
                      backgroundImage: `url(${
                        "http://localhost:4000/api/pet/get-image/" + mascota.image
                      })`, 
                    }}
                  >
                    <div className="pet-info">
                      <div className="pet-name">
                         <p>
                          {mascota.name} , {mascota.age}
                        </p> 
                        <div className="location">
                          <BiCurrentLocation /> <span>Lugo</span>
                        </div>
                      </div>
                    </div>
                  </div>
      </div>
       : <span>Hay un problema al cargar la mascota.</span> }
       <div className="bio">
       "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.
       </div>
      </div>
    </div>
  );

};

export default PetProfile;
