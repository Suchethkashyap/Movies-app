import axios, { AxiosResponse } from "axios";
import { useState, useEffect, ReactElement } from "react";
import { Link } from "react-router-dom";

import Button from "./Button";
import customConfirm from "./CustomConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>();
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  function loadData() {
    axios
      .get(props.url, {
        params: { page, recordsPerPage },
      })
      .then((response: AxiosResponse<T[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setEntities(response.data);
      });
  }

  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
      loadData();
    } catch (error: any) {
      if (error && error.response) {
        console.error(error.response.data);
      }
    }
  }

  const buttons = (editURL: string, id: number) => (
    <>
      <Link className="btn btn-success" to={editURL}>
        Edit
      </Link>
      <Button onClick={() => customConfirm(() => deleteEntity(id))} color="red">
        Delete
      </Button>
    </>
  );

  useEffect(() => {
    loadData();
  }, [page, recordsPerPage]);

  return (
    <>
      <h3>{props.title}</h3>
      <Link
        className="btn btn-primary"
        style={{ backgroundColor: "green" }}
        to={props.createURL}
      >
        Create {props.entityName}
      </Link>
      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      />
      <Pagination
        currentPage={page}
        totalAmountOfPages={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />
      <GenericList list={entities}>
        <table className="table table-striped">
          {props.children(entities!, buttons)}
        </table>
      </GenericList>
    </>
  );
}

interface indexEntityProps<T> {
  url: string;
  title: string;
  createURL: string;
  entityName: string;
  children(
    entities: T[],
    buttons: (editURL: string, id: number) => ReactElement
  ): ReactElement;
}
