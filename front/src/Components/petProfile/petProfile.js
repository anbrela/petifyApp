import React, { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"





const Profile = () => {
    const petId = useParams();
    const [pet, setPet] = useState(null);



    useEffect(() => {
          axios({
            method: "GET",
            url: "http://localhost:4000/api/pet/" + petId.petId,
          })
            .then((res) => {
              setPet({pet: res.data});
            })
            .catch((error) => {
              console.log(error);
            });
      }, []);

return (
    <div className="container-profile">
    {pet !== null ?  (
    <div>{pet.pet.name}</div>
    ) : <span> Hay un problema al cargar los perros</span> }
    </div>
)





}


export default Profile;