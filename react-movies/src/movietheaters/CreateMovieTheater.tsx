import axios from "axios";
import { movieTheaterCreationDTO } from "./MovieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";
import { urlMovieTheaters } from "../endpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateMovieTheater(){
    const[errors,setErrors] = useState([]);
    const navigate = useNavigate();

    async function create(movieTheater: movieTheaterCreationDTO){
        try{
            await axios.post(urlMovieTheaters, movieTheater);
            navigate("/movietheaters");


        }
        catch(error:any){
            if (error && error.response){
                setErrors(error.response.data)
            }

        }
    }
    return(
        <div className="container-fluid" style={{height:'auto'}}>
            <h3>Create Movie Theater</h3> 
            <DisplayErrors errors={errors}/> 
            <MovieTheaterForm model={{name: ""}} 
            onSubmit={async values => await create(values)}/> 
            
        
        </div>

    )
}