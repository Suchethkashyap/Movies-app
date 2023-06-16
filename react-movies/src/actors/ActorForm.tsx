import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { actorCreationDTO } from "./actors.model";
import * as Yup from 'yup';
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkdownField from "../forms/MarkdownField";

export default function ActorForm(props: actorformprops){
    return(
        <Formik initialValues={props.model} 
        onSubmit={props.onSubmit} 
        validationSchema={Yup.object({
          name: Yup.string().required('This Field is Required!')
          .firstLetterUppercase("First letter must be uppercase"),
          dateOfBirth: Yup.date().nullable().required('This Field is required!')

        })}
        >
          {(formikProps) => (
             <Form>
             <TextField field="name" displayName="Name" />
             <DateField displayName="Date Of Birth" field="dateOfBirth" />
             <ImageField displayName="Picture" field="picture" 
                    imageURL={props.model.pictureURL} />
              <MarkdownField displayName="Biography" field="biography" />       
    
              <Button color="green" disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
              <Link className="btn btn-secondary" to="/actors">Cancel</Link>
            </Form>
      
  
          )}
  
         
  
        </Formik>

    )
}

interface actorformprops{
    model: actorCreationDTO;
    onSubmit(value: actorCreationDTO, action: FormikHelpers<actorCreationDTO>): void;

}