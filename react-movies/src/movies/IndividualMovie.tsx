import { movieDTO } from "./movies.model"
import css from './IndividualMovie.module.css'
import { Link } from "react-router-dom"
import Button from "../utils/Button"
import customConfirm from "../utils/CustomConfirm"
import { urlMovies } from "../endpoints"
import axios from "axios"
import AlertContext from "../utils/AlertContext"
import { useContext } from "react"
import {FaStar} from "react-icons/fa"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IndividualMovie(props: movieDTO){
    const buildLink = () => `/movie/${props.id}`
    const customAlert = useContext(AlertContext);


    function deleteMovie(){
        axios.delete(`${urlMovies}/${props.id}`)
        .then(() =>{
            customAlert();
        });
        
    }

    
    return(
        <div className={css.div}>
            <Link to={buildLink()}>
                <img src={props.poster} alt="Poster" />
            </Link>
            <p className="pt-3 align-items-center ">
                <Link style={{color: "black"}} to={buildLink()}>{props.title}</Link>
            </p>
            <div>
                <Link style={{marginRight: '1rem'}} className="btn btn-outline-success" to={`/movies/edit/${props.id}`}
                >Edit</Link>
                <button  onClick={() => customConfirm(() => deleteMovie())} 
                className="btn btn-outline-danger ">Delete </button>
            </div>

        </div>
    )
}