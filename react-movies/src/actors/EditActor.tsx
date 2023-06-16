import { transform } from "typescript";
import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertActorToFormData } from "../utils/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.model";


export default function EditActor(){

    function transform(actor: actorDTO): actorCreationDTO{
        return {
                   
                    name: actor.name,
                    biography: actor.biography,
                    pictureURL:actor.picture,
                    dateOfBirth: new Date(actor.dateOfBirth),
                }
    }
    
    return(
       <EditEntity<actorCreationDTO,actorDTO>
        url={urlActors} indexURL="/actors" entityName="Actor"
        transformFormData={convertActorToFormData}
        transform={transform}
        >
            {(entity,edit) =>
            <ActorForm model={entity}
            onSubmit={async values => await edit(values)}/>
            }

       </EditEntity>
    )
}