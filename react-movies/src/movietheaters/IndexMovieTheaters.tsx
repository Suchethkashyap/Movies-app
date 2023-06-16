import { urlMovieTheaters } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./MovieTheater.model";

export default function IndexMovieTheaters() {
  return (
    <IndexEntity<movieTheaterDTO>
      url={urlMovieTheaters}
      createURL="/movietheaters/create"
      title="Movie Theaters"
      entityName="Movie Theater"
    >
      {(movieTheaters, buttons) => (
        <>
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {movieTheaters?.map((movieTheater) => (
              <tr key={movieTheater.id}>
                <td>
                  {buttons(
                    `/movietheaters/edit/${movieTheater.id}`,
                    movieTheater.id
                  )}
                </td>
                <td>{movieTheater.name}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
