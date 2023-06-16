import GenericList from "../utils/GenericList";
import IndividualMovie from "./IndividualMovie";
import { movieDTO } from "./movies.model";
import css from "./MoviesList.module.css";

export default function MoviesList(props: moviesListProps) {
  return (
    <div className="mt-3">
      <GenericList list={props.movies}>
        <div className={css.div}>
          {props.movies?.map((movie) => (
            <IndividualMovie {...movie} key={movie.id} />
          ))}
        </div>
      </GenericList>
    </div>
  );
}

interface moviesListProps {
  movies?: movieDTO[];
}
