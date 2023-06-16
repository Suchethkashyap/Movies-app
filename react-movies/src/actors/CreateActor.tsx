
import { Link, useNavigate } from "react-router-dom";
import ActorForm from "./ActorForm";
import { useState } from "react";
import { actorCreationDTO } from "./actors.model";
import DisplayErrors from "../utils/DisplayErrors";
import { convertActorToFormData } from "../utils/formDataUtils";
import axios from "axios";
import { urlActors } from "../endpoints";

export default function CreateActor(){
    const[errors,setErrors] = useState([]);
    const navigate = useNavigate();

    async function create(actor: actorCreationDTO){
        try{
            const formData= convertActorToFormData(actor);
            await axios({
                method: "post",
                url: urlActors,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/actors");

        }
        catch(error:any){
            if (error && error.response){
                setErrors(error.response.data)
            }

        }
    }
    return(
        <div className="container">
        <h3>Create Actor</h3> 
        <DisplayErrors errors={errors}/>
        <ActorForm model={{name: "" , dateOfBirth: undefined}}  
        onSubmit={async values => await create(values)}/>
        
        
        </div>

    )
}