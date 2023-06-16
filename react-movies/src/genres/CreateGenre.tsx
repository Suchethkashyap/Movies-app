
import axios from "axios";
import { urlGenres } from "../endpoints";
import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./genre.model";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
// import './../Validations';

export default function CreateGenre() {
  const navigate = useNavigate();
  const [errors,setErrors] = useState([]);

  async function create(genre: genreCreationDTO){
    try{
      await axios.post(urlGenres,genre);
      navigate("/genres");
      
    }
    catch(error: any){
     
      if(error && error.response){
        setErrors(error.response.data);

      }
    }
  }

  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      
      <h3>Create Genre</h3>
      <DisplayErrors errors={errors}/>
      <GenreForm model={{name: ''}}
      onSubmit={async value => {
        await create(value);
      
        
      }} 
      /> 

     

  

     
    </div>
  );
}
