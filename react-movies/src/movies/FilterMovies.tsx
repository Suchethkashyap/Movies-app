import { Field, Form, Formik } from "formik";
import Button from "../utils/Button";
import { genreDTO } from "../genres/genre.model";
import axios, { AxiosResponse } from "axios";
import { urlGenres, urlMovies } from "../endpoints";
import { useEffect, useState } from "react";
import { movieDTO } from "./movies.model";
import MoviesList from "./MoviesList";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../utils/Pagination";

export default function FilterMovies() {
  const initialValues: filterMoviesForm = {
    title: " ",
    GenreIds: 0,
    upcomingReleases: false,
    inTheaters: false,
    page: 1,
    recordsPerPage: 10,
  };

  const [genres, setGenres] = useState<genreDTO[]>([]);
  const [movies, setMovies] = useState<movieDTO[]>([]);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${urlGenres}/all`)
      .then((response: AxiosResponse<genreDTO[]>) => {
        setGenres(response.data);
      });
  }, []);

  useEffect(() => {
    if (query.get('title')){
        initialValues.title = query.get('title')!;
    }
    if (query.get('GenreIds')){
        initialValues.GenreIds = parseInt(query.get('GenreIds')!,10);
    }
    if (query.get('upcomingReleases')){
        initialValues.upcomingReleases = true;
    }
    if (query.get('inTheaters')){
        initialValues.inTheaters = true;
    }
    if (query.get('page')){
        initialValues.page = parseInt(query.get('page')!,10);
    }


    searchMovies(initialValues);
  }, []);

  function searchMovies(values: filterMoviesForm) {
    modifyURL(values);
    axios
      .get(`${urlMovies}/filter`, { params: values })
      .then((response: AxiosResponse<movieDTO[]>) => {
        const records = parseInt(response.headers['totalamountofrecords'],10);
        setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
        setMovies(response.data);
      });
  }

  function modifyURL(values: filterMoviesForm) {
    const queryString: string[] = [];
    if (values.title) {
      queryString.push(`title=${values.title}`);
    }

    if (values.GenreIds !== 0) {
      queryString.push(`GenreIds=${values.GenreIds}`);
    }

    if (values.upcomingReleases) {
      queryString.push(`upcomingReleases=${values.upcomingReleases}`);
    }

    if (values.inTheaters) {
      queryString.push(`inTheaters=${values.inTheaters}`);
    }

    queryString.push(`page=${values.page}`);
    navigate(`/movies/filter?${queryString.join("&")}`);
  }

  return (
    <div className="container" >
      <h3>Filter Movies</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => searchMovies(values)}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className="row gx-3 align-items-center">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title of the movie"
                    {...formikProps.getFieldProps("title")}
                  />
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    {...formikProps.getFieldProps("GenreIds")}
                  >
                    <option value="0">--Choose a genre--</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="upcomingReleases"
                      name="upcomingReleases"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="upcomingReleases"
                    >
                      Upcoming Releases
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="inTheaters"
                      name="inTheaters"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="inTheaters">
                      In Theaters
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <Button
                    className="btn btn-primary"
                    onClick={() => formikProps.submitForm()}
                  >
                    Filter
                  </Button>
                  <Button
                    color="red"
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      formikProps.setValues(initialValues);
                      searchMovies(initialValues);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Form>

            <MoviesList movies={movies} />
            <Pagination totalAmountOfPages={totalAmountOfPages} onChange={newPage => {
               formikProps.values.page = newPage;
               searchMovies(formikProps.values); 
            }} currentPage={formikProps.values.page} />
          </>
        )}
      </Formik>
    </div>
  );
}

interface filterMoviesForm {
  title: string;
  GenreIds: number;
  upcomingReleases: boolean;
  inTheaters: boolean;
  page: number;
  recordsPerPage: number;
}
