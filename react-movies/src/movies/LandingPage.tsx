import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.model";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";

export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get(urlMovies).then((response: AxiosResponse) => {
      setMovies(response.data);
    });
  }

  return (
    <AlertContext.Provider
      value={() => {
        loadData();
      }}
    >
      <div className="container align-items-center p-4 ">
        <h3 style={{border: '2px solid black', textAlign: 'center'}}>In Theaters</h3>
        <MoviesList movies={movies.inTheaters} />
        <h3 className="mt-4 " style={{border: '2px solid black', textAlign: 'center'}}>Upcoming Releases</h3>
        <MoviesList movies={movies.upcomingReleases} />
      </div>
    </AlertContext.Provider>
  );
}
