import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { urlMovies } from '../endpoints';
import { genreDTO } from '../genres/genre.model';
import { movieTheaterDTO } from '../movietheaters/MovieTheater.model';
import DisplayErrors from '../utils/DisplayErrors';
import { convertMovieToFormData } from '../utils/formDataUtils';
import Loading from '../utils/Loading';
import MovieForm from './MovieForm';
import { movieCreationDTO, moviesPostGetDTO } from './movies.model';
import { useNavigate } from 'react-router-dom';

export default function CreateMovie() {

    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] =
        useState<movieTheaterDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${urlMovies}/postget`)
            .then((response: AxiosResponse<moviesPostGetDTO>) => {
                setNonSelectedGenres(response.data.genres);
                setNonSelectedMovieTheaters(response.data.movieTheaters);
                setLoading(false);
            })
    }, [])

    async function create(movie: movieCreationDTO){
        try{
            const formData = convertMovieToFormData(movie);
            const response = await axios({
                method: 'post',
                url: urlMovies,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })

            navigate(`/movie/${response.data}`);

        } catch(error:any){
            setErrors(error.response.data);
        }
    }

    return (
        <div className='p-3 '>
            <h3>Create Movie</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading /> :
                <MovieForm model={{ title: '', inTheaters: false, trailer: '' }}
                    onSubmit={async values => await create(values)}
                    nonSelectedGenres={nonSelectedGenres}
                    selectedGenres={[]}

                    nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                    selectedMovieTheaters={[]}
                    selectedActors={[]}
                />}
        </div>
    )
}