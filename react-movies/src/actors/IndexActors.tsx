import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.model";
import { urlActors } from "../endpoints";

export default function IndexActors() {
  return (
    <IndexEntity<actorDTO>
      url={urlActors}
      createURL="/actors/create"
      title="Actors"
      entityName="Actor"
    >
      {(actors, buttons) => (
        <>
          <thead>
            <tr>
              <th>Action</th>

              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {actors?.map((actor) => (
              <tr key={actor.id}>
                <td>{buttons(`/actors/edit/${actor.id}`, actor.id)}</td>
                <td>{actor.name}</td>
                <td>
                  {" "}
                  <img
                    alt="actor"
                    src={actor.picture}
                    style={{
                      height: "64px",
                      marginRight: "10px",
                      width: "64px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
