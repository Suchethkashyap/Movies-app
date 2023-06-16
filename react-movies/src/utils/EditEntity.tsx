import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";
import { ReactElement } from "react-markdown/lib/react-markdown";

export default function EditEntity<TCreation, TRead>(
  props: editEntityProps<TCreation, TRead>
) {
  const { id }: any = useParams();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
      setEntity(props.transform(response.data));
    });
  }, []);

  async function edit(entityToEdit: TCreation) {
    try {
      if(props.transformFormData){
        const formData = props.transformFormData(entityToEdit);
        await axios({
          method: 'put',
          url: `${props.url}/${id}`,
          data: formData,
          headers: {
                      'Content-Type':'multipart/form-data'
                    }
        });
      }else{
        await axios.put(`${props.url}/${id}`, entityToEdit);
      

      }
      navigate(props.indexURL);
      
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <div className="container-fluid" style={{ height: "auto" }}>
      <h3>Edit {props.entityName}</h3>
      <DisplayErrors errors={errors} />
      {entity ? props.children(entity, edit) : <Loading />}
    </div>
  );
}

interface editEntityProps<TCreation, TRead> {
  url: string;
  transform(entity: TRead): TCreation;
  transformFormData?(model: TCreation): FormData;
  entityName: string;
  children: (
    entity: TCreation,
    edit: (entity: TCreation) => void
  ) => ReactElement;
  indexURL: string;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
