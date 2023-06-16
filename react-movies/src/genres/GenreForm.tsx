import Button from "../utils/Button";
import { Field, Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import { Link } from "react-router-dom";
import { genreCreationDTO } from "./genre.model";

export default function GenreForm(props: genreFormProps){
    return(
        <Formik initialValues={props.model} 
          onSubmit={props.onSubmit} 
          validationSchema={Yup.object({
            name: Yup.string().required('This Field is Required!')
            .firstLetterUppercase("First letter must be uppercase")
            .max(50, 'Max Length is 50 characters')
          })}
          >
            {(formikProps) => (
               <Form>
               <TextField field="name" displayName="Name" />
      
                <Button disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
                <Link className="btn btn-primary" to="/genres">Cancel</Link>
              </Form>
        
    
            )}
    
           
    
          </Formik>
    )
}

interface genreFormProps{
    model: genreCreationDTO;
    onSubmit(value: genreCreationDTO, action: FormikHelpers<genreCreationDTO>): void;

}